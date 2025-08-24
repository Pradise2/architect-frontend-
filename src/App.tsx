// src/App.tsx
import { useAccount } from 'wagmi';
import { ConnectButton } from './components/ConnectButton';
// No need to import App.css anymore!

function App() {
  const { isConnected } = useAccount();

  return (
    <main className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold">🏛️ The Architect 🏛️</h1>
        <p className="text-gray-400 mt-2">
          A Decentralized, Community-Governed Freelance Ecosystem
        </p>
      </div>
      
      <div className="card my-8 p-6 bg-gray-800 rounded-xl shadow-lg w-full max-w-md">
        <ConnectButton />
      </div>

      {isConnected && (
        <div className="card p-6 bg-gray-800 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold">Welcome!</h2>
          <p className="text-gray-300 mt-2">You are now connected. The next step is to interact with the platform's features.</p>
        </div>
      )}
    </main>
  );
}

export default App;