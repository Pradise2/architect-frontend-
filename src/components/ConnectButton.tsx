// src/components/ConnectButton.tsx
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const connector = connectors[0];

  if (isConnected) {
    return (
      <div className="flex items-center justify-center space-x-4">
        <span className="font-mono bg-gray-700 px-3 py-1 rounded-md text-sm">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
        <button 
          onClick={() => disconnect()}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={() => connect({ connector })} 
      disabled={isPending}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-500"
    >
      {isPending ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
}