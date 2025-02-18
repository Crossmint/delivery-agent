import { NextResponse } from 'next/server';
import { openai } from "@ai-sdk/openai";
import { CoreMessage, generateText } from "ai";

import { http, WalletClient } from "viem";
import { createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base } from "viem/chains";

import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { viem } from "@goat-sdk/wallet-viem";
import { crossmintHeadlessCheckout } from "@goat-sdk/plugin-crossmint-headless-checkout";
import { erc20, USDC as EVM_USDC } from "@goat-sdk/plugin-erc20";
import { splToken, USDC as SPL_USDC } from "@goat-sdk/plugin-spl-token";

// Solana
import { Connection, Keypair } from "@solana/web3.js";
import { solana } from "@goat-sdk/wallet-solana";
import base58 from "bs58";

// Determine wallet type based on RPC URL
const isSolanaWallet = process.env.RPC_PROVIDER_URL?.includes('helius');

// Initialize appropriate wallet
let walletClient: WalletClient;
let keypair: Keypair;
let connection: Connection;

if (isSolanaWallet) {
  connection = new Connection(process.env.RPC_PROVIDER_URL as string);
  keypair = Keypair.fromSecretKey(
    base58.decode(process.env.WALLET_PRIVATE_KEY as string)
  );
} else {
  const account = privateKeyToAccount(
    process.env.WALLET_PRIVATE_KEY as `0x${string}`
  );
  walletClient = createWalletClient({
    account,
    transport: http(process.env.RPC_PROVIDER_URL),
    chain: base,
  });
}

const apiKey = process.env.CROSSMINT_API_KEY;
if (!apiKey) {
  throw new Error("CROSSMINT_API_KEY is not set");
}

// Add these interfaces at the top
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
}

let conversationHistory: ChatMessage[] = [];

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Add user message to history
    conversationHistory.push({
      role: 'user',
      content: message,
      id: `user-${Date.now()}`
    });

    // Reference to existing tools setup
    const tools = await getOnChainTools({
      wallet: isSolanaWallet 
        ? solana({ keypair, connection }) 
        : viem(walletClient),
      plugins: [
        isSolanaWallet 
          ? splToken({ tokens: [SPL_USDC] })
          : erc20({ tokens: [EVM_USDC] }),
        crossmintHeadlessCheckout({ apiKey: apiKey as string }),
      ],
    });

    console.log('Available tools:', Object.keys(tools));

    const messages: CoreMessage[] = [
      {
        role: "system",
        content: "Always ask for ALL required information in the first response: 1) name, 2) shipping address, 3) email address, 4) payment method (USDC, SOL, or ETH), and 5) preferred chain (EVM, Solana, or others). Only proceed with the purchase when all information is provided."
      },
      {
        role: "system",
        content:
          "When buying a product, prefer to use productLocator, i.e. 'amazon:B08SVZ775L', as the product locator.",
      },
      {
        role: "system",
        content:
          "When buying a product, extract the product locator from the product URL in the user's message, i.e. for 'https://www.amazon.com/dp/B08SVZ775L', the product locator is 'amazon:B08SVZ775L'.",
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
          "When buying a product, if a user has already provided a product URL, use that product URL and don't ask for it again.",
      },
      {
        role: "system",
        content:
          "When buying a product, use the checkout tool with recipient information (email and shipping address) rather than wallet addresses.",
      },
      {
        role: "system",
        content:
          "When a user has already provided a shipping address, use that address and don't ask for it again.",
      },
      {
        role: "system",
        content:
          "When a user has already provided an email address, use that email and don't ask for it again.",
      },
      {
        role: "system",
        content:
          "If a user has already provided a product URL, use that product URL and don't ask for it again.",
      },
      {
        role: "system",
        content:
          "When a user provides their shipping address in the format 'Name, Street, City, State ZIP, Country', parse and store these details. Do not ask for the address again in the same conversation.",
      },
      ...conversationHistory
    ];

    const result = await generateText({
      model: openai("gpt-4"),
      tools,
      maxSteps: 5,
      messages,
      onStepFinish: (step) => {
        if ('tool' in step) {
          console.log('\n🔧 Tool Called:', {
            name: (step.tool as { name: string, args: any }).name,
            args: (step.tool as { name: string, args: any }).args,
            result: (step as any).result,
            timestamp: new Date().toISOString()
          });
        }
      }
    });

    // Add assistant response to history
    conversationHistory.push({
      role: 'assistant',
      content: result.text,
      id: `assistant-${Date.now()}`
    });

    return NextResponse.json({ message: result.text });
  } catch (error) {
    console.error('Error processing chat:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
} 