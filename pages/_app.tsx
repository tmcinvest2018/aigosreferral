// pages/_app.tsx
import React from 'react';
import '../styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Keep this
import { config } from "@fortawesome/fontawesome-svg-core"; // Keep this
config.autoAddCss = false; // Keep this
import type { AppProps } from 'next/app';

import { useState, useEffect } from 'react';
import {
    getDefaultWallets,
    RainbowKitProvider,
    darkTheme
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import {
    configureChains,
    createConfig,
    WagmiConfig
} from 'wagmi';
import { bscTestnet } from 'wagmi/chains'; // Import bscTestnet directly
import { publicProvider } from 'wagmi/providers/public';
import { Analytics } from '@vercel/analytics/react';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

const { chains, publicClient } = configureChains(
    [bscTestnet], // Use the imported chain object
    [
        publicProvider()
    ]
);

const { connectors } = getDefaultWallets({
    appName: 'Presale Dapp',
    projectId: projectId!,
    chains
});

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
})

function MyApp({ Component, pageProps }: AppProps) {
    const [mounted, setMounted] = useState(false)

    // useEffect only runs on the client
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null;

    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains} theme={darkTheme(
                {
                    accentColor: '#E02424',
                    accentColorForeground: 'white',
                    borderRadius: 'large',
                    fontStack: 'system',
                }
            )}>
                <Component {...pageProps} />
                <Analytics />
            </RainbowKitProvider>
        </WagmiConfig>
    );
}

export default MyApp;