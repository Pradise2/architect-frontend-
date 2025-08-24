// src/App.tsx
import { useAccount } from 'wagmi';
import { ConnectButton } from './components/ConnectButton';
import { UserProfile } from './components/UserProfile';

function App() {
  const { isConnected } = useAccount();

  return (
    <main className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-8 space-y-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold">🏛️ The Architect 🏛️</h1>
        <p className="text-gray-400 mt-2">
          A Decentralized, Community-Governed Freelance Ecosystem
        </p>
      </div>
      
      <div className="card p-6 bg-gray-800 rounded-xl shadow-lg w-full max-w-md">
        <ConnectButton />
      </div>

      {/* This is the new section that shows the UserProfile component */}
      {isConnected && (
        <div className="card p-6 bg-gray-800 rounded-xl shadow-lg w-full max-w-md">
          <UserProfile />
        </div>
      )}
    </main>
  );
}

export default App;