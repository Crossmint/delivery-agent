# 🤖 AI Delivery Agent

A CLI-based delivery AI agent that buys real world items from Worldstore, an onchain marketplace. Pick the agentic framework you want to use and happy shopping!

## 🌟 Features

- Natural conversation interface for shopping
- Onchain purchase of real world items
- Order tracking and status updates

## 🚀 Get Started

1. Clone the repository:
```bash
git clone https://github.com/worldstore/delivery-agent.git
cd delivery-agent
```

2. Prerequisites:
- Node & pnpm installed
- Have your wallet's private key ready (otherwise, generate new wallet via `pnpm generate-wallet`)
- Hold USDC 
- OpenAI API key

3. Install dependencies:
```bash
pnpm install
```

4. Copy `.env.example` to `.env` to fill in the appropriate values.
```bash
cp .env.example .env
```

5. Configure your variables:

- `WALLET_PRIVATE_KEY`: Your wallet's private key (will be used for payment)
- `OPENAI_API_KEY`: Your OpenAI API key for AI interactions
- `RPC_PROVIDER_URL`: Base network RPC endpoint for transaction processing

6. Start the agent:
```bash
pnpm start
```

7. Interact with the agent:
   - Tell the agent what you are looking for (i.e. "I want to order some goodies for the weekend or "Do you see any games available for sale?")
   - Specify which product you want to buy from the ones available
   - Provide your email, shipping info, and confirm payment

## 🚀 Keep track of your order

- Upon payment, check your email for a purchase receipt 
- Expect an email over the next couple of days with shipping details
