import { NextResponse } from 'next/server';
import { privateKeyToAccount } from "viem/accounts";
import { Keypair } from "@solana/web3.js";
import base58 from "bs58";

export async function GET() {
  try {
    console.log('Fetching wallet balances...');
    
    if (!process.env.WALLET_PRIVATE_KEY) {
      console.error('WALLET_PRIVATE_KEY is not set');
      throw new Error('WALLET_PRIVATE_KEY is not set');
    }

    if (!process.env.CROSSMINT_API_KEY) {
      console.error('CROSSMINT_API_KEY is not set');
      throw new Error('CROSSMINT_API_KEY is not set');
    }

    // Determine wallet type based on RPC URL
    const isSolanaWallet = process.env.RPC_PROVIDER_URL?.includes('helius');

    let walletAddress: string;
    if (isSolanaWallet) {
      const keypair = Keypair.fromSecretKey(
        base58.decode(process.env.WALLET_PRIVATE_KEY)
      );
      walletAddress = keypair.publicKey.toString();
    } else {
      const account = privateKeyToAccount(
        process.env.WALLET_PRIVATE_KEY as `0x${string}`
      );
      walletAddress = account.address;
    }

    console.log('Wallet address:', walletAddress);

    const url = `https://www.crossmint.com/api/v1-alpha2/wallets/${walletAddress}/balances?tokens=usdc,sol,eth`;
    console.log('Fetching from URL:', url);

    const response = await fetch(url, {
      headers: {
        'X-API-KEY': process.env.CROSSMINT_API_KEY,
        'Accept': 'application/json',
      },
    });

    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Crossmint API error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`Failed to fetch balances: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Received data:', data);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in wallet balance API:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch wallet balances' },
      { status: 500 }
    );
  }
} 