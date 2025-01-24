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
            <footer className="bg-neutral-900 pt-12">
                <div className="container mx-auto px-6">
                    {/* Logo and About Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                        {/* Logo */}
                        <div className="flex items-center">
                            <img src="/images/logo.png" className="h-10 sm:h-12" alt="AIGOS Logo" />
                        </div>

                        {/* About Section */}
                        <div className="max-w-2xl">
                            <h2 className="mb-6 text-lg font-semibold uppercase text-gray-400">About</h2>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                We started as TMC in 2016 with an Ethereum mining company. After more than 2 years of continued success, Ethereum rewards declined with no business case for our users. <br />
                                In early 2019, we switched to Proof of Stake and rebranded to XTMCSWAP, offering low-fee swapping and staking rewards for users. <br />
                                This is still the way forward for the future, but now we are integrating AI and Gaming into DeFi. <br />
                                We have developed our dEX into a unique cross-chain platform where value can be transferred between EVMs and the Bitcoin protocol.
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
                                © 2024 <a href="#" className="hover:text-white transition-colors">X-MAN</a>. All Rights Reserved.
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
                                <a href="https://aigos.gitbook.io/untitled/" className="text-gray-400 hover:text-white transition-colors">
                                    <FontAwesomeIcon icon={faGithub} className="h-5 w-5" />
                                    <span className="sr-only">Gitbook</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
