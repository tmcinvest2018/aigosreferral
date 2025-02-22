import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faRocket, faGamepad, faBrain } from "@fortawesome/free-solid-svg-icons"; // Import relevant icons
import Link from 'next/link';

export default function Section6() {
    return (
        <>
            <section id="section6" className="flex items-center justify-center h-fit min-h-screen bg-white relative">
                {/* Removed background image and overlay */}

                <div className="text-center relative z-10 w-full max-w-4xl"> {/* Added max-w-4xl */}
                    {/* Glassmorphic Card */}
                    <div className="bg-white/50 backdrop-blur-md rounded-3xl shadow-xl border border-purple-400/50 p-8 md:p-12">

                        {/* Title */}
                        <h5 className="uppercase text-red-500 font-bold text-lg md:text-xl mb-2">
                            <FontAwesomeIcon icon={faRocket} className="mr-2" /> AIGOS MISSION
                        </h5>
                        <h5 className="uppercase text-black font-bold text-xl md:text-2xl mb-6">
                            AI GAMING OMNICHAIN
                        </h5>

                        {/* Mission Statement with SEO Keywords */}
                        <p className="text-gray-700 text-sm md:text-base mb-8 max-w-[600px] mx-auto">
                            Welcome to <strong>Aigos</strong>, a groundbreaking project at the forefront of blockchain innovation.
                            Our mission is to enable <strong>AI-driven DeFi, gaming, and omnichain interoperability</strong>, allowing seamless transactions between
                            Bitcoin (BTC), Ethereum (ETH), Binance Smart Chain (BSC), and other EVM-compatible networks.
                            <br /><br />
                            <strong>Why Aigos?</strong><br />
                            <FontAwesomeIcon icon={faRocket} className="mr-2 text-red-500" /> <strong>Revolutionary Blockchain Technology:</strong> Aigos is building the future of <strong>cross-chain finance and AI-powered trading</strong>.<br />
                            <FontAwesomeIcon icon={faGamepad} className="mr-2 text-red-500" /> <strong>GameFi & NFTs:</strong> Aigos integrates <strong>Metaverse gaming</strong> and NFT ecosystems for next-level Web3 experiences.<br />
                            <FontAwesomeIcon icon={faBrain} className="mr-2 text-red-500" /> <strong>Presale is LIVE!</strong> Join the <strong>Aigos presale</strong> today.<br /><br />
                            Whether you’re looking to <strong>buy AGS tokens</strong>, explore our <strong>roadmap</strong>, or check our latest <strong>whitepaper</strong>,
                            Aigos is the ultimate <strong>crypto investment opportunity</strong> in 2025.
                        </p>

                        {/* Call-to-Actions - Corrected Links (External) */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <a
                                href="https://twitter.com/aigos2024/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold uppercase text-sm px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                            >
                                <span>Follow on Twitter <FontAwesomeIcon icon={faTwitter} className="ml-2" /></span>
                            </a>

                            <a
                                href="https://t.me/AIGOS2025"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-gradient-to-r from-red-500 to-purple-600 text-white font-bold uppercase text-sm px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                            >
                                <span>Join Telegram <FontAwesomeIcon icon={faTelegram} className="ml-2" /></span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}