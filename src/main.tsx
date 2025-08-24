// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// 1. Import Wagmi and TanStack Query dependencies
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { injected } from 'wagmi/connectors';

// 2. Create a QueryClient
const queryClient = new QueryClient();

// 3. Create a Wagmi config
const config = createConfig({
  chains: [mainnet, sepolia], // Your supported chains
  connectors: [
    injected(), // MetaMask, etc.
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    
  },
});

// 4. Render your App inside the providers
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);