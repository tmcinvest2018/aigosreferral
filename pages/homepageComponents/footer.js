import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTelegram,
    faYoutube,
    faTwitter,
    faGithub,
    faDiscord,
    faReddit
} from "@fortawesome/free-brands-svg-icons";
import { faGem, faCheck, faDollarSign, faExchangeAlt, faBrain, faUsers } from "@fortawesome/free-solid-svg-icons"; // Added icons
import Link from 'next/link';

export default function Footer() {
    // Using HTML entities for a cleaner look.  Also removed unnecessary <a> tags in howToBuySection.
    const aboutSection1 = `AIGOS started in 2016 as an Ethereum mining company under the name TMC. After years of innovation, we evolved into <strong>Aigos</strong>, a cutting-edge crypto platform integrating <strong>AI, DeFi, and Gaming</strong>.`;
    const whyAigosSection = `
    <strong className="flex items-center"><FontAwesomeIcon icon={faGem} className="mr-2 text-red-500" />Why Aigos?</strong><br />
    <span className="flex items-center"><FontAwesomeIcon icon={faCheck} className="mr-2 text-green-500" /><strong>Presale is LIVE:</strong> Invest in the next-gen Aigos token before the price pumps!</span><br />
    <span className="flex items-center"><FontAwesomeIcon icon={faDollarSign} className="mr-2 text-green-500"/><strong>Low Fees & High Rewards:</strong> Stake & swap with minimal gas fees.</span><br />
    <span className="flex items-center"><FontAwesomeIcon icon={faExchangeAlt} className="mr-2 text-green-500" /><strong>Cross-Chain DeFi:</strong> Move assets seamlessly between blockchains.</span><br />
     <span className="flex items-center"><FontAwesomeIcon icon={faBrain} className="mr-2 text-green-500" /><strong>AI-Powered Trading:</strong> Our AI tools help you trade smarter.</span><br />
    <span className="flex items-center"> <FontAwesomeIcon icon={faUsers} className="mr-2 text-green-500" /><strong>Metaverse & NFTs:</strong> Future integrations with NFT staking & gaming.</span>`;
    const howToBuySection = `
    <strong className="flex items-center"><FontAwesomeIcon icon={faRocket} className="mr-2 text-red-500" />How to Buy Aigos?</strong><br />
    1. <Link href="/presale" className="text-red-500 hover:underline">Join the Aigos presale</Link><br />
    2. Connect your wallet (Metamask, Trust Wallet, etc.)<br />
    3. Swap USDT for Aigos tokens!<br /><br />
    <strong>Trending Crypto Searches:</strong><br />
    <FontAwesomeIcon icon={faFire} className="mr-2 text-red-500" /> Best crypto to invest in 2025<br />
      <FontAwesomeIcon icon={faFire} className="mr-2 text-red-500" /> Upcoming crypto presales<br />
    <FontAwesomeIcon icon={faFire} className="mr-2 text-red-500" /> Aigos token price prediction<br />
     <FontAwesomeIcon icon={faFire} className="mr-2 text-red-500" /> Is Aigos the next Shiba Inu?<br /><br />
    <span className="text-red-500 font-semibold"><FontAwesomeIcon icon={faRocket} className="mr-2" />Don’t miss out! AIGOS is the future of Web3, DeFi, and AI. Get in early before the next pump! <FontAwesomeIcon icon={faFire} className="ml-2" /></span>`;



    return (
        <>
            {/* SEO Meta Tags */}
            <Head>
                {/* (Your SEO meta tags remain unchanged) */}
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

            <footer className="bg-white pt-12">  {/* Changed background to white */}
                <div className="container mx-auto px-6">
                    {/* Top Border */}
                    <div className="border-t border-purple-400/50 pt-6"></div>

                    {/* Logo and About Section - Glassmorphic Cards */}
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                        {/* About Section - Cards */}
                        <div className="w-full flex flex-col md:flex-row gap-4">
                            <div className="md:w-1/3 bg-white/50 backdrop-blur-md p-4 rounded-3xl shadow-lg border border-purple-400/30">
                                <h2 className="mb-2 text-lg font-semibold uppercase text-red-500">About</h2>
                                <p className="text-sm text-gray-700 leading-relaxed text-left" dangerouslySetInnerHTML={{ __html: aboutSection1 }}></p>
                            </div>
                            <div className="md:w-1/3 bg-white/50 backdrop-blur-md p-4 rounded-3xl shadow-lg border border-purple-400/30">
                                <h2 className="mb-2 text-lg font-semibold uppercase text-red-500"></h2>
                                <p className="text-sm text-gray-700 leading-relaxed text-left" dangerouslySetInnerHTML={{ __html: whyAigosSection }}></p>
                            </div>
                            <div className="md:w-1/3 bg-white/50 backdrop-blur-md p-4 rounded-3xl shadow-lg border border-purple-400/30">
                                <h2 className="mb-2 text-lg font-semibold uppercase text-red-500"></h2>
                                <p className="text-sm text-gray-700 leading-relaxed text-left" dangerouslySetInnerHTML={{ __html: howToBuySection }}></p>
                            </div>
                        </div>
                    </div>

                    {/* Footer Bottom Section */}
                    <div className="border-t border-purple-400/50 mt-8 py-6"> {/* Changed border color */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            {/* Copyright */}
                            <span className="text-sm text-gray-700">  {/* Changed text color */}
                                © 2025 <Link href="#" className="hover:text-red-500 transition-colors">O.T.</Link> All Rights Reserved.
                            </span>

                            {/* Social Media Links */}
                            <div className="flex space-x-6">
                                <a href="https://t.me/AIGOS2025" className="text-gray-700 hover:text-red-500 transition-colors"> {/* Changed text color */}
                                    <FontAwesomeIcon icon={faTelegram} className="h-5 w-5" />
                                    <span className="sr-only">Telegram</span>
                                </a>
                                <a href="https://www.youtube.com/channel/UCnLdb-KeO5EvangZl00oyRA" className="text-gray-700 hover:text-red-500 transition-colors"> {/* Changed text color */}
                                    <FontAwesomeIcon icon={faYoutube} className="h-5 w-5" />
                                    <span className="sr-only">YouTube</span>
                                </a>
                                <a href="https://twitter.com/aigos2024/" className="text-gray-700 hover:text-red-500 transition-colors"> {/* Changed text color */}
                                    <FontAwesomeIcon icon={faTwitter} className="h-5 w-5" />
                                    <span className="sr-only">Twitter</span>
                                </a>
                                <a href="https://aigos.gitbook.io/untitled/" className="text-gray-700 hover:text-red-500 transition-colors"> {/* Changed text color */}
                                    <FontAwesomeIcon icon={faGithub} className="h-5 w-5" />
                                    <span className="sr-only">Gitbook</span>
                                </a>
                                <a href="#" className="text-gray-700 hover:text-red-500 transition-colors"> {/* Changed text color, Placeholder link */}
                                    <FontAwesomeIcon icon={faDiscord} className="h-5 w-5" />
                                    <span className="sr-only">Discord</span>
                                </a>
                                <a href="#" className="text-gray-700 hover:text-red-500 transition-colors">  {/* Changed text color. Placeholder link */}
                                    <FontAwesomeIcon icon={faReddit} className="h-5 w-5" />
                                    <span className="sr-only">Reddit</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}