import { createInterface } from "node:readline";
import { openai } from "@ai-sdk/openai";
import { CoreMessage, generateText } from "ai";

import { http } from "viem";
import { createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base } from "viem/chains";

import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
// import { worldstore } from "@goat-sdk/plugin-worldstore";
import { viem } from "@goat-sdk/wallet-viem";
import { z } from "zod";
import { crossmintHeadlessCheckout } from "@goat-sdk/plugin-crossmint-headless-checkout";

import "dotenv/config";
import { LoadingSpinner } from "./LoadingSpinner";

const asciiArt = `
888       888  .d88888b.  8888888b.  888      8888888b.   .d8888b. 88888888888 .d88888b.  8888888b.  8888888888 
888   o   888 d88P" "Y88b 888   Y88b 888      888  "Y88b d88P  Y88b    888    d88P" "Y88b 888   Y88b 888        
888  d8b  888 888     888 888    888 888      888    888 Y88b.         888    888     888 888    888 888        
888 d888b 888 888     888 888   d88P 888      888    888  "Y888b.      888    888     888 888   d88P 8888888    
888d88888b888 888     888 8888888P"  888      888    888     "Y88b.    888    888     888 8888888P"  888        
88888P Y88888 888     888 888 T88b   888      888    888       "888    888    888     888 888 T88b   888        
8888P   Y8888 Y88b. .d88P 888  T88b  888      888  .d88P Y88b  d88P    888    Y88b. .d88P 888  T88b  888        
888P     Y888  "Y88888P"  888   T88b 88888888 8888888P"   "Y8888P"     888     "Y88888P"  888   T88b 8888888888`;

const account = privateKeyToAccount(process.env.WALLET_PRIVATE_KEY as `0x${string}`);

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

const worldstoreSchema = z.object({
    id: z.string(),
    to: z.string(),
    quantity: z.number(),
    totalPrice: z.string(),
});

(async () => {
    const tools = await getOnChainTools({
        wallet: viem(walletClient),
        plugins: [crossmintHeadlessCheckout({
            apiKey: 'sk_production_5YV474EEkpYcyzVrUx3TVbEm5fA1mNw4Ejb7UTbAyMEWLhXXEAMVZNrUJegFC4GCxZxu8b7gtqd4jFUs7Rksc3xbqHDAtyS9Sv7EdSshuC2acPsmiVPuDq6XC57nUcZBu5YqsioAWDtvdjmBX5afpECTso35VGRBXSFRJqUYtE7XeFB5um47PHrVsuXimRAvvLuDPyULxXMnAGRk15NabMci'
        }, worldstoreSchema)],
    });

    const spinner = new LoadingSpinner();

    console.clear();

    console.log(asciiArt + "\n\n");
    console.log("👋 Welcome to the World Store Assistant!");
    console.log("🛍️  I can help you browse and purchase products from across the world.");
    console.log("💡 Type 'exit' to end our conversation.\n");

    const messages: CoreMessage[] = [
        {
            role: "system",
            content: "You are a friendly and knowledgeable World Store retail assistant. Your goal is to help customers discover and purchase amazing products from around the world. Be enthusiastic, helpful, and always prioritize the customer's needs. Keep responses concise but warm."
        },
        {
            role: "system",
            content: "When buying a product from a store, prefer to use <chain>:<contract_address> as the collection locator."
        },
        {
            role: "system",
            content: "When buying a product from a store, You MUST collect the user's email address and use it as the payment.receiptEmail, and recipient.walletAddress MUST be the user's wallet address"
        },
        {
            role: "system",
            content: "When buying a product from a store, You MUST receive explicit confirmation from the user before you start the checkout process."
        },
        {
            role: "system",
            content: "When buying a product from a store, callData.id should be the id of the product, for example 'RED_BULL_250ML'."
        },
        {
            role: "system",
            content: "After buying a product from a store, the user needs to start a redemption in order to initiate the shipment process. DO NOT collect the user's shipping address before they bought the product."
        }
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


