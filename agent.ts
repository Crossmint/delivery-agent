import { createInterface } from "node:readline";
import { openai } from "@ai-sdk/openai";
import { CoreMessage, generateText } from "ai";

import { http } from "viem";
import { createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base } from "viem/chains";

import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { viem } from "@goat-sdk/wallet-viem";
import { crossmintHeadlessCheckout } from "@goat-sdk/plugin-crossmint-headless-checkout";

import { LoadingSpinner } from "./LoadingSpinner";
import { crossmint } from "@goat-sdk/crossmint";
import { erc20, USDC } from "@goat-sdk/plugin-erc20";

import "dotenv/config";

const asciiArt = `
888       888  .d88888b.  8888888b.  888      8888888b.   .d8888b. 88888888888 .d88888b.  8888888b.  8888888888 
888   o   888 d88P" "Y88b 888   Y88b 888      888  "Y88b d88P  Y88b    888    d88P" "Y88b 888   Y88b 888        
888  d8b  888 888     888 888    888 888      888    888 Y88b.         888    888     888 888    888 888        
888 d888b 888 888     888 888   d88P 888      888    888  "Y888b.      888    888     888 888   d88P 8888888    
888d88888b888 888     888 8888888P"  888      888    888     "Y88b.    888    888     888 8888888P"  888        
88888P Y88888 888     888 888 T88b   888      888    888       "888    888    888     888 888 T88b   888        
8888P   Y8888 Y88b. .d88P 888  T88b  888      888  .d88P Y88b  d88P    888    Y88b. .d88P 888  T88b  888        
888P     Y888  "Y88888P"  888   T88b 88888888 8888888P"   "Y8888P"     888     "Y88888P"  888   T88b 8888888888`;

const account = privateKeyToAccount(
  process.env.WALLET_PRIVATE_KEY as `0x${string}`
);

const walletClient = createWalletClient({
  account: account,
  transport: http(process.env.RPC_PROVIDER_URL),
  chain: base,
});

// Create readline interface for user input
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to get user input
const getUserInput = () => {
  return new Promise<string>((resolve) => {
    rl.question("📢 You: ", (input) => {
      resolve(input);
    });
  });
};

const apiKey = process.env.CROSSMINT_API_KEY;
if (!apiKey) {
  throw new Error("CROSSMINT_API_KEY is not set");
}

const { wallets } = crossmint(apiKey);

(async () => {
  const tools = await getOnChainTools({
    wallet: viem(walletClient),
    plugins: [
      erc20({
        tokens: [USDC],
      }),   
      wallets(),
      crossmintHeadlessCheckout(
        {
          apiKey,
        },
      ),
    ],
  });

  const spinner = new LoadingSpinner();

  console.clear();

  console.log(asciiArt + "\n\n");
  console.log("👋 Welcome to the World Store Assistant!");
  console.log(
    "🛍️  I can help you browse and purchase products from across the world."
  );
  console.log("💡 Type 'exit' to end our conversation.\n");

  const messages: CoreMessage[] = [
    {
      role: "system",
      content:
        "When buying a product, prefer to use productLocator, i.e. 'amazon:B08SVZ775L', as the product locator.",
    },
    {
      role: "system",
      content:
        "When buying a product, payment.payerAddress MUST be the address returned from the get_address tool.",
    },
    {
      role: "system",
      content:
        "When buying a product, require the user to provide a valid shipping address and email address.",
    },
    {
      role: "system",
      content:
        "When buying a product, parse the address provided and identify required fields for the order: address, city, state, zip, country, and then complete the purchase",
    },
    {
      role: "system",
      content:
        "Once a tool returns a result, DO NOT call the same tool again with the same parameters.",
    },
  ];

  while (true) {
    const userInput = await getUserInput();

    if (userInput.toLowerCase() === "exit") {
      console.log("👋 Thanks for shopping with us! Have a great day!");
      rl.close();
      break;
    }

    messages.push({ role: "user", content: userInput });

    spinner.start();
    const result = await generateText({
      model: openai("gpt-4o"),
      tools,
      maxSteps: 5,
      messages,
    });
    spinner.stop();

    console.log("\n🤖 Assistant:", result.text, "\n");
    messages.push(...result.response.messages);
  }
})();