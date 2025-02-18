# 🛍️ Amazon AI Shopper

An AI-powered shopping assistant that helps you purchase items from Amazon with an onchain balance.

## 🌟 Features

- Natural language shopping interface
- Cryptocurrency payments (USDC on Solana)
- Automatic order processing and receipt
- Real-time wallet balance display
- Secure transaction handling

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Paella-Labs/mnt-dao-agent.git 
cd mnt-dao-agent
```

2. Prerequisites:

- Node.js & pnpm installed
- Solana wallet with private key
- USDC balance on Solana
- OpenAI API key
- Crossmint API key (with required scopes)

3. Install dependencies:

```bash
pnpm install
```

4. Set up environment variables:

```bash
cp .env.template .env
```

Configure the following in your `.env`:
- `WALLET_PRIVATE_KEY`: Your Solana wallet's private key
- `RPC_PROVIDER_URL`: Solana RPC endpoint (e.g., Helius)
- `OPENAI_API_KEY`: Your OpenAI API key
- `CROSSMINT_API_KEY`: Your Crossmint API key

5. Start the development server:

```bash
pnpm dev
```

## 💬 How to Use

1. Visit the application in your browser
2. Your wallet balance will be displayed at the top
3. Start a conversation with the AI assistant
4. Share what you'd like to buy from Amazon
5. Provide shipping details when prompted
6. Confirm the purchase
7. Track your order via email notifications

## 📦 Order Tracking

After purchase you'll receive an order confirmation email.
