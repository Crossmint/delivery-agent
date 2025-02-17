import Chat from './components/Chat';
import WalletBalance from './components/WalletBalance';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 flex items-center justify-center">
          <span className="text-5xl mr-2 leading-none">⛰️</span>
          <span>Amazon AI Shopper</span>
        </h1>
        <div className="mb-8 flex justify-center">
          <WalletBalance />
        </div>
        <Chat />
      </div>
    </main>
  );
}
