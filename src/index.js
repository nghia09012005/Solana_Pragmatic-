import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import {
  ConnectionProvider,
  WalletProvider
} from '@solana/wallet-adapter-react';
import {
  PhantomWalletAdapter
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

// Quan trọng: import styles cho Wallet Adapter UI modal
import '@solana/wallet-adapter-react-ui/styles.css';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

const endpoint = clusterApiUrl('devnet');
const wallets = [new PhantomWalletAdapter()];

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <App />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </BrowserRouter>
  </React.StrictMode>
);
