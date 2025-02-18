import { createInterface } from "node:readline";
import { openai } from "@ai-sdk/openai";
import { CoreMessage, generateText } from "ai";

// GOAT Plugins
import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { crossmintHeadlessCheckout } from "@goat-sdk/plugin-crossmint-headless-checkout";
import { splToken, USDC } from "@goat-sdk/plugin-spl-token";
import { solana } from "@goat-sdk/wallet-solana";

import { Connection, Keypair } from "@solana/web3.js";
import base58 from "bs58";
import "dotenv/config";

const connection = new Connection(process.env.RPC_PROVIDER_URL as string);
const keypair = Keypair.fromSecretKey(base58.decode(process.env.WALLET_PRIVATE_KEY as string));

const apiKey = process.env.CROSSMINT_API_KEY;
if (!apiKey) {
  throw new Error("CROSSMINT_API_KEY is not set");
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const conversationHistory: ChatMessage[] = [];

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getUserInput = () => {
  return new Promise<string>((resolve) => {
    rl.question("You: ", (input) => {
      resolve(input);
    });
  });
};

(async () => {
  try {
    const tools = await getOnChainTools({
      wallet: solana({ keypair, connection }),
      plugins: [
        splToken({ tokens: [USDC] }),
        crossmintHeadlessCheckout({ apiKey: apiKey as string }),
      ],
    });

    console.clear();
    console.log("👋 Welcome! How can I assist you with your shopping today?");
    console.log("Type 'exit' to end the conversation.\n");

    while (true) {
      const userInput = await getUserInput();

      if (userInput.toLowerCase() === 'exit') {
        console.log("\n👋 Thanks for shopping with us! Have a great day!");
        rl.close();
        break;
      }

      conversationHistory.push({
        role: 'user',
        content: userInput,
        id: `user-${Date.now()}`
      });

      const messages: CoreMessage[] = [
        {
          role: "system",
          content: "Always ask for ALL required information in the first response: 1) name, 2) shipping address, 3) email address, 4) payment method (USDC, SOL, or ETH), and 5) preferred chain (EVM, Solana, or others). Only proceed with the purchase when all information is provided."
        },
        {
          role: "system",
          content: "When buying a product, prefer to use productLocator, i.e. 'amazon:B08SVZ775L', as the product locator.",
        },
        {
          role: "system",
          content: "When buying a product, extract the product locator from the product URL in the user's message.",
        },
        {
          role: "system",
          content: "When buying a product use the get_address tool to get the payment.payerAddress.",
        },
        {
          role: "system",
          content: "When buying a product, payment.payerAddress MUST be the address returned from the get_address tool.",
        },
        {
          role: "system",
          content: "When buying a product, require the user to provide a valid shipping address and email address.",
        },
        {
          role: "system",
          content: "When buying a product, payment.payerAddress MUST be a valid Solana public key.",
        },
        {
          role: "system",
          content: "When buying a product, parse the address provided and identify required fields for the order: address, city, state, zip, country.",
        },
        {
          role: "system",
          content: "When buying a product, use the checkout tool with recipient information (email and shipping address) rather than wallet addresses.",
        },
        {
          role: "system",
          content: "When a user provides their shipping address in the format 'Name, Street, City, State ZIP, Country', parse and store these details.",
        },
        {
          role: "system",
          content: "When buying a product on Solana chain, payment.payerAddress MUST be a base58-encoded Solana public key. Never use 0x-style addresses for Solana transactions."
        },
        {
          role: "system",
          content: "Always call get_address first and store its result. Use EXACTLY that address value for payment.payerAddress in subsequent operations. Do not use any other address."
        },
        ...conversationHistory.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      ];

      try {
        const result = await generateText({
          model: openai("gpt-4"),
          tools: tools,
          maxSteps: 10,
          messages,
          onStepFinish: (event) => {
            console.log(event.toolResults);
          }
        });

        conversationHistory.push({
          role: 'assistant',
          content: result.text,
          id: `assistant-${Date.now()}`
        });

        console.log("\nAssistant:", result.text, "\n");
      } catch (error) {
        console.error('Error:', error);
      }
    }
  } catch (error) {
    console.error('Fatal error:', error);
    rl.close();
    process.exit(1);
  }
})(); 