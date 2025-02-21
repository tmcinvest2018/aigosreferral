// pages/_app.tsx
import React, { useState, useEffect } from 'react';
import '../styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

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
import { bscTestnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider } from '../contexts/AuthContext'; // Import AuthProvider


const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

const { chains, publicClient } = configureChains(
    [bscTestnet],
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
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const { ref } = router.query;
        if (ref && typeof ref === 'string') {
            // Construct the full referral link here
            const fullReferralLink = `${window.location.origin}?ref=${ref}`;
            Cookies.set('refCode', fullReferralLink, { expires: 7, path: '/' });
        }
    }, [router.query]);


    if (!mounted) return null;
    
    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains} theme={darkTheme({ accentColor: '#E02424', accentColorForeground: 'white', borderRadius: 'large', fontStack: 'system' })}>
                <AuthProvider> {/* Wrap with AuthProvider */}
                    <Component {...pageProps} />
                    <Analytics />
                </AuthProvider>
            </RainbowKitProvider>
        </WagmiConfig>
    );
}

export default MyApp;