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
- Crossmint API key
3. Install dependencies:

```bash
pnpm install
```

4. Copy `.env.template` to `.env` to fill in the appropriate values.

```bash
cp .env.template .env
```

5. Configure your variables:

- `WALLET_PRIVATE_KEY`: Your wallet's private key (will be used for payment)
- `RPC_PROVIDER_URL`: Base network RPC endpoint for transaction processing
- `OPENAI_API_KEY`: Your OpenAI API key for AI interactions
- `CROSSMINT_API_KEY`: Your Crossmint API key

6. Start the agent in your preferred mode:

```bash
# For human users - includes friendly prompts and confirmations
pnpm start:human

# For AI agents - streamlined interface with minimal prompts to complete purchases
pnpm start:agent
```

### Mode Differences

#### Human Mode (`start:human`)

- Designed for human users
- Friendly conversational interface
   - "I want to order some goodies for the weekend"
   - "Do you see any games available for sale?"
   - "I want cookies"
- Additional safety confirmations before purchases
- Step-by-step guidance through the shopping process

#### Agent Mode (`start:agent`)

- Optimized for interactions with AI agent giveaways
- Streamlined responses
- Purchase products to users, by Twitter username

## 🚀 Keep track of your order

- Upon payment, check your email for a purchase receipt
- Expect an email over the next couple of days with shipping details