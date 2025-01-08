# Delivery Agent

A CLI-based delivery agent that helps you make purchases using cryptocurrency.

## Prerequisites

- Node.js and pnpm installed
- 25 USDC in your wallet
- Base Sepolia testnet configured in your wallet

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd delivery-agent
```

2. Install dependencies:
```bash
pnpm install
```

3. Configure your environment variables by creating a `.env` file:
```env
WALLET_PRIVATE_KEY=your_wallet_private_key
CROSSMINT_SERVER_API_KEY=your_crossmint_api_key
RPC_PROVIDER_URL=your_base_rpc_url
```

Where:
- `WALLET_PRIVATE_KEY`: Your wallet's private key (will be used for payment)
- `CROSSMINT_SERVER_API_KEY`: API key for Crossmint's headless checkout
- `RPC_PROVIDER_URL`: Base network RPC endpoint for transaction processing

## Usage

1. Start the delivery agent:
```bash
pnpm start
```

2. Follow the interactive CLI prompts:
   - Ask the agent what items are available for sale
   - Select the product you want to purchase
   - Confirm your selection and approve the payment transaction
   - Provide your email address for the purchase receipt
   - Submit your shipping information

3. Check your email for:
   - Purchase receipt
   - Shipping details and tracking information
