import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

import { viem } from "@goat-sdk/wallet-viem";
import { http, createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";

import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";

// import { crossmintHeadlessCheckout } from "@goat-sdk/plugin-crossmint-headless-checkout";
//import { worldstore } from "@goat-sdk/plugin-worldstore";

import { z } from "zod";

import readline from "node:readline";

import "dotenv/config";

const account = privateKeyToAccount(process.env.WALLET_PRIVATE_KEY as `0x${string}`);

const walletClient = createWalletClient({
    account: account,
    transport: http(process.env.RPC_PROVIDER_URL),
    chain: baseSepolia,
});

const myCallDataSchema = z.object({
    productId: z.string(),
    to: z.string(),
    quantity: z.number(),
    totalPrice: z.string(),
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

type Message = {
    role: "user" | "assistant";
    content: string;
};

(async () => {
    const conversationHistory: Message[] = [];

    const tools = await getOnChainTools({
        wallet: viem(walletClient),
        // plugins: [
        //     // worldstore(),
        //     crossmintHeadlessCheckout(
        //         {
        //             we can hardcode this API key so users don't go through the extra step of creating a crossmint account & API key 
        //             apiKey: process.env.CROSSMINT_SERVER_API_KEY as string,
        //         },
        //         myCallDataSchema,
        //     ),
        // ],
    });

    console.log("Welcome to Worldstore! Your chat has now started. Type 'exit' to end the conversation.");

    const askQuestion = () => {
        rl.question("You: ", async (prompt) => {
            if (prompt.toLowerCase() === "exit") {
                rl.close();
                return;
            }

            conversationHistory.push({ role: "user", content: prompt });

            const result = await generateText({
                model: openai("gpt-4o-mini"),
                tools: tools,
                maxSteps: 10,
                prompt: `You are an experienced shopping assistant. You are able to help users with their transactions.
                
                Previous conversation:
                ${conversationHistory.map((m) => `${m.role}: ${m.content}`).join("\n")}

                Current request: ${prompt}`,
                onStepFinish: (event) => {
                    console.log("Tool execution:", event.toolResults);
                },
            });

            conversationHistory.push({
                role: "assistant",
                content: result.text,
            });
            console.log("Merchant:", result.text);
            askQuestion();
        });
    };

    askQuestion();
})();