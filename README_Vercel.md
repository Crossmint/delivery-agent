# Delivery Agent

## Prerequisites

- Node.js & pnpm installed
- At least 50 USDC in your wallet
- OpenAI API key

## Installation

1. Install dependencies:
```bash
cd vercel-ai
pnpm install
```

2. Copy `.env.example` to `.env` to fill in the appropriate values.
```bash
cp .env.example .env
```

3. Configure your variables:

- `WALLET_PRIVATE_KEY`: Your wallet's private key (will be used for payment)
- `OPENAI_API_KEY`: Your OpenAI API key for AI interactions
- `RPC_PROVIDER_URL`: Base network RPC endpoint for transaction processing

## Usage

1. Start the agent:
```bash
pnpm start
```

2. Interact with the agent:
   - Ask what products are available for sale
   - Specify which product you want to buy
   - Provide your email, shipping info, and confirm payment
   - Check your email for a purchase receipt and shipping details
