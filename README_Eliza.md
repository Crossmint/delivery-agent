# Delivery Agent

## Prerequisites

- Node (v23+) & pnpm installed
- At least 50 USDC in your wallet
- OpenAI API key

## Installation

1. Clone the Eliza repository & switch to the `eliza-product-delivery` branch:
```bash
git clone https://github.com/filipposl/eliza
cd eliza
git checkout eliza-product-delivery
```

2. Copy `.env.example` to `.env` to fill in the appropriate values.
```bash
cp .env.example .env
```

3. Configure your variables:

- `EVM_PRIVATE_KEY`: Your wallet's private key (will be used for payment)
- `OPENAI_API_KEY`: Your OpenAI API key for AI interactions
- `EVM_PROVIDER_URL`: Base network RPC endpoint for transaction processing

## Usage

1. Start the agent:
```bash
pnpm i
pnpm build
pnpm start --characters="characters/jarvis.character.json"
```
2. In a new terminal, launch your chat:

```bash
pnpm start:client
```

3. Interact with the agent:
   - Ask what products are available for sale
   - Specify which product you want to buy
   - Provide your email, shipping info, and confirm payment
   - Check your email for a purchase receipt and shipping details
