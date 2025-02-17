'use client';

import { useEffect, useState } from 'react';

interface TokenData {
  token: string;
  decimals: number;
  balances: {
    total: string;
  };
}

export default function WalletBalance() {
  const [balances, setBalances] = useState<{ [key: string]: string }>({
    USDC: '0',
    SOL: '0',
    ETH: '0',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        console.log('Fetching wallet balances from frontend...');
        const response = await fetch('/api/wallet/balance');
        console.log('Response status:', response.status);

        const data = await response.json();
        console.log('Received data:', data);

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch balances');
        }

        if (!Array.isArray(data)) {
          console.error('Unexpected data format:', data);
          throw new Error('Unexpected data format from API');
        }
        
        const formattedBalances: { [key: string]: string } = {
          USDC: '0',
          SOL: '0',
          ETH: '0',
        };

        data.forEach((item: TokenData) => {
          console.log('Processing balance:', item);
          const decimals = item.decimals || 0;
          const divisor = Math.pow(10, decimals);
          
          if (item.token?.toLowerCase() === 'usdc') {
            formattedBalances.USDC = (parseFloat(item.balances.total || '0') / divisor).toFixed(2);
          } else if (item.token?.toLowerCase() === 'sol') {
            formattedBalances.SOL = (parseFloat(item.balances.total || '0') / divisor).toFixed(2);
          } else if (item.token?.toLowerCase() === 'eth') {
            formattedBalances.ETH = (parseFloat(item.balances.total || '0') / divisor).toFixed(4);
          }
        });

        console.log('Formatted balances:', formattedBalances);
        setBalances(formattedBalances);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch balances';
        console.error('Error fetching balances:', err);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalances();
    // Removed the polling interval
  }, []); // Empty dependency array means this effect runs once on mount

  if (error) {
    return (
      <div className="text-red-500 p-2 rounded-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="bg-white px-4 py-2 rounded-lg shadow mx-auto w-fit">
      <div className="flex gap-4">
        <div className="text-mountain-blue font-semibold">
          <span className="mr-2">💰</span>
          {isLoading ? (
            <span className="animate-pulse">...</span>
          ) : (
            `${balances.USDC} USDC`
          )}
        </div>
        <div className="text-mountain-blue font-semibold">
          <span className="mr-2">◎</span>
          {isLoading ? (
            <span className="animate-pulse">...</span>
          ) : (
            `${balances.SOL} SOL`
          )}
        </div>
        <div className="text-mountain-blue font-semibold">
          <span className="mr-2">Ξ</span>
          {isLoading ? (
            <span className="animate-pulse">...</span>
          ) : (
            `${balances.ETH} ETH`
          )}
        </div>
      </div>
    </div>
  );
} 