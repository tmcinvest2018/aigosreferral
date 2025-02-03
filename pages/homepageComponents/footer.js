import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTelegram,
    faYoutube,
    faTwitter,
    faGithub
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    return (
        <>
            {/* SEO Meta Tags */}
            <Head>
                <title>AIGOS - The Future of AI, DeFi & Gaming in Web3</title>
                <meta name="description" content="AIGOS is a cutting-edge crypto token integrating AI, gaming, and DeFi with cross-chain compatibility. Join our presale now and be part of the future!" />
                <meta name="keywords" content="
                    Aigos crypto, Aigos token, Aigos coin, Aigos price, Buy Aigos, Invest in Aigos, Aigos presale, Aigos ICO, Aigos whitepaper, 
                    Aigos crypto presale, Aigos ICO price, How to buy Aigos crypto, Aigos token price prediction, Aigos cryptocurrency investment, 
                    Aigos DeFi crypto, Aigos NFT crypto, Aigos Metaverse crypto, Aigos crypto in the US, Aigos crypto in Europe, 
                    Aigos official website, Aigos community, Aigos social media, Aigos news, Aigos blog, Aigos forum, 
                    What is Aigos crypto?, How to participate in Aigos presale?, Is Aigos a good investment?, When is the Aigos ICO?, 
                    Best crypto to invest in, Top cryptocurrencies, Best DeFi projects, Top NFT projects, Metaverse cryptocurrencies, 
                    Aigos upcoming ICO, Aigos best DeFi project, Aigos blockchain technology, Aigos roadmap, Aigos team" />
                <meta property="og:title" content="🔥 AIGOS - AI & Gaming Meets DeFi 🔥" />
                <meta property="og:description" content="FOMO alert! AIGOS is merging AI, Gaming, and DeFi. The next 100x crypto gem? Join now!" />
                <meta property="og:image" content="https://aigos.app/meta-image.jpg" />
                <meta property="og:url" content="https://aigos.app" />
                <meta name="robots" content="index, follow" />
            </Head>

            <footer className="bg-neutral-900 pt-12">
                <div className="container mx-auto px-6">
                    {/* Logo and About Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                        {/* Logo */}
                        <div className="flex items-center">
                            <img src="/images/logo.png" className="h-10 sm:h-12" alt="AIGOS Logo" />
                        </div>

                        {/* About Section */}
                        <div className="max-w-2xl text-sm text-gray-400">
                            <h2 className="mb-6 text-lg font-semibold uppercase text-gray-400">About</h2>
                            <p className="leading-relaxed">
                                AIGOS started in 2016 as an Ethereum mining company under the name TMC. After years of innovation, we evolved into <strong>Aigos</strong>, a cutting-edge crypto platform integrating <strong>AI, DeFi, and Gaming</strong>.<br />
                                Our decentralized exchange (DEX) enables **cross-chain transactions**, bridging Bitcoin (BTC) and EVM-compatible chains.<br /><br />

                                <strong>💎 Why Aigos?</strong><br />
                                ✅ <strong>Presale is LIVE:</strong> Invest in the next-gen Aigos token before the price pumps!<br />
                                ✅ <strong>Low Fees & High Rewards:</strong> Stake & swap with minimal gas fees.<br />
                                ✅ <strong>Cross-Chain DeFi:</strong> Move assets seamlessly between blockchains.<br />
                                ✅ <strong>AI-Powered Trading:</strong> Our AI tools help you trade smarter.<br />
                                ✅ <strong>Metaverse & NFTs:</strong> Future integrations with NFT staking & gaming.<br /><br />

                                <strong>🚀 How to Buy Aigos?</strong><br />
                                1️⃣ <a href="/presale" className="text-yellow-400 hover:underline">Join the Aigos presale</a><br />
                                2️⃣ Connect your wallet (Metamask, Trust Wallet, etc.)<br />
                                3️⃣ Swap USDT for Aigos tokens!<br /><br />

                                <strong>🔎 Trending Crypto Searches:</strong><br />
                                🔥 Best crypto to invest in 2025<br />
                                🔥 Upcoming crypto presales<br />
                                🔥 Aigos token price prediction<br />
                                🔥 Is Aigos the next Shiba Inu?<br /><br />

                                <span className="text-yellow-400 font-semibold">
                                    🚀 Don’t miss out! AIGOS is the future of Web3, DeFi, and AI. Get in early before the next pump! 🔥
                                </span>
                            </p>
                        </div>

                        {/* Company Contacts */}
                        <div>
                            <h2 className="mb-6 text-lg font-semibold uppercase text-gray-400">Company Contacts</h2>
                            <ul className="text-gray-400 space-y-4">
                                <li>
                                    <a href="https://t.me/Otje86" className="hover:text-white transition-colors">
                                        <FontAwesomeIcon icon={faTelegram} className="mr-2" /> Telegram
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.youtube.com/channel/UCnLdb-KeO5EvangZl00oyRA" className="hover:text-white transition-colors">
                                        <FontAwesomeIcon icon={faYoutube} className="mr-2" /> YouTube
                                    </a>
                                </li>
                                <li>
                                    <a href="https://twitter.com/xtmcswap/" className="hover:text-white transition-colors">
                                        <FontAwesomeIcon icon={faTwitter} className="mr-2" /> Twitter
                                    </a>
                                </li>
                                <li>
                                    <a href="https://aigos.gitbook.io/untitled/" className="hover:text-white transition-colors">
                                        <FontAwesomeIcon icon={faGithub} className="mr-2" /> Gitbook
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Footer Bottom Section */}
                    <div className="border-t border-neutral-800 mt-8 py-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            {/* Copyright */}
                            <span className="text-sm text-gray-400">
                                © 2025 <a href="#" className="hover:text-white transition-colors">X-MAN</a>. All Rights Reserved.
                            </span>

                            {/* Social Media Links */}
                            <div className="flex space-x-6">
                                <a href="https://t.me/Otje86" className="text-gray-400 hover:text-white transition-colors">
                                    <FontAwesomeIcon icon={faTelegram} className="h-5 w-5" />
                                    <span className="sr-only">Telegram</span>
                                </a>
                                <a href="https://www.youtube.com/channel/UCnLdb-KeO5EvangZl00oyRA" className="text-gray-400 hover:text-white transition-colors">
                                    <FontAwesomeIcon icon={faYoutube} className="h-5 w-5" />
                                    <span className="sr-only">YouTube</span>
                                </a>
                                <a href="https://twitter.com/xtmcswap/" className="text-gray-400 hover:text-white transition-colors">
                                    <FontAwesomeIcon icon={faTwitter} className="h-5 w-5" />
                                    <span className="sr-only">Twitter</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
