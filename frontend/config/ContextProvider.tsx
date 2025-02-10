"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, WagmiConfig, useAccount, useDisconnect, WagmiProvider } from "wagmi";
import { type Chain } from "viem";
import { http } from "viem"; // Proveedor HTTP actualizado
import { kiichainTestnetOro } from "./chains/kiichainTestnetOro"; // Red personalizada
import { createAppKit } from "@reown/appkit";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

interface ContextProviderProps {
  children: ReactNode;
  cookies: string;
  account: string | null;
  connectWallet: () => void; // Add connectWallet property
}

const Context = createContext({});

// Crear queryClient para React Query
const queryClient = new QueryClient();

// Definir las redes soportadas
const chains: [Chain, ...Chain[]] = [kiichainTestnetOro];

// Crear configuración de Wagmi **sin conectores**
const wagmiConfig = createConfig({
  chains,
  transports: chains.reduce((acc: { [key: number]: ReturnType<typeof http> }, chain) => {
    acc[chain.id] = http();
    return acc;
  }, {}),
});

// Configurar AppKit con WagmiAdapter
const projectId = "77bfa493758f2db9babc5db5751d003a"; // Reemplaza con tu ID real
const metadata = {
  name: "Tu Aplicación Blockchain",
  description: "Una aplicación integrada con Web3",
  url: "https://tusitio.com",
  icons: ["https://tusitio.com/icon.png"],
};

createAppKit({
  adapters: [new WagmiAdapter({ networks: chains, projectId })],
  projectId,
  networks: chains,
  metadata,
  features: {
    email: true,
    socials: ["google", "x", "github", "discord", "apple", "facebook", "farcaster"],
    emailShowWallets: true,
  },
  allWallets: "SHOW",
  themeVariables: {
    "--w3m-accent": "#764cb5",
  },
});

// Crear contexto de Wallet
export interface WalletContextType {
  account: string | null;
  connectWallet: () => void; // Add connectWallet to the context type
  disconnectWallet: () => void; // Add disconnectWallet to the context type
  // other properties...
}

const WalletContext = createContext<WalletContextType>({
  account: null,
  connectWallet: () => {}, // Provide a default implementation
  disconnectWallet: () => {}, // Provide a default implementation
  // other properties...
});

const WalletProvider: React.FC<ContextProviderProps> = ({ children, cookies, account, connectWallet }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <WalletProviderInner children={children} cookies={cookies} account={account} connectWallet={connectWallet} />
      </WagmiProvider>
    </QueryClientProvider>
  );
};

const WalletProviderInner: React.FC<ContextProviderProps> = ({ children, cookies, connectWallet }) => {
  const { address, isConnected } = useAccount(); // Ahora está en el cuerpo del componente
  const { disconnect } = useDisconnect();
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    if (isConnected && address) {
      setAccount(address);
      console.log("Wallet conectada:", address);
    }
  }, [isConnected, address]);

  const disconnectWallet = () => {
    disconnect();
    setAccount(null);
    console.log("Wallet desconectada");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <WalletContext.Provider value={{ account, connectWallet, disconnectWallet }}>
        <Context.Provider value={{ cookies }}>{children}</Context.Provider>
      </WalletContext.Provider>
    </QueryClientProvider>
  );
};

// Hook para usar el contexto de la wallet
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet debe usarse dentro de WalletProvider");
  }
  return context;
};

export default WalletProvider;
