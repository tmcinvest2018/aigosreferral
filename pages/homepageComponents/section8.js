import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import Typewriter from 'typewriter-effect';
import Link from 'next/link';

export default function Section8() {
    return (
        <>
            <section id="section8" className="flex items-center justify-center min-h-screen h-fit bg-white relative">
                {/* Removed background image and overlay */}

                <div className="text-center relative z-10 w-full max-w-4xl"> {/* Added max-w-4xl */}
                    {/* Glassmorphic Card */}
                    <div className="bg-white/50 backdrop-blur-md rounded-3xl shadow-xl border border-purple-400/50 p-8 md:p-12">
                        <h2 className="text-red-500 font-bold text-3xl md:text-4xl mb-4">
                            OUR CORE TEAM
                        </h2>
                        <h4 className="text-black font-bold text-xl md:text-2xl mb-6">
                            <Typewriter
                                options={{
                                    strings: ["WHAT IS BLOCKCHAIN WITHOUT PEOPLE?"],
                                    autoStart: true,
                                    loop: true,
                                    pauseFor: 600000
                                }}
                            />
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {/* Team Member Card */}
                            <div className="team-member bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-400/30">
                                <h5 className="text-red-500 font-bold text-lg mb-2">Founder</h5>
                                <h6 className="text-black font-semibold text-xl mb-4">TK</h6>
                                <p className="text-gray-700 text-sm md:text-base">
                                    TK is the visionary behind Aigos, focusing on the big picture, strategic planning, and driving the project's long-term vision. With a background in blockchain, Alex aims to revolutionize the DeFi and GameFi ecosystems.
                                </p>
                            </div>

                            {/* Team Member Card */}
                            <div className="team-member bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-400/30">
                                <h5 className="text-red-500 font-bold text-lg mb-2">Lead Developer</h5>
                                <h6 className="text-black font-semibold text-xl mb-4">OT</h6>
                                <p className="text-gray-700 text-sm md:text-base">
                                    OT brings over 12 years of IT experience and has been a full-stack blockchain developer since 2016. Jamie has contributed to several successful blockchain projects and is responsible for Aigos' technical development and infrastructure.
                                </p>
                            </div>

                            {/* Team Member Card */}
                            <div className="team-member bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-400/30">
                                <h5 className="text-red-500 font-bold text-lg mb-2">Front-End Dev</h5>
                                <h6 className="text-black font-semibold text-xl mb-4">JM</h6>
                                <p className="text-gray-700 text-sm md:text-base">
                                    JM is the creative force behind Aigos' platform design and user experience. Taylor’s focus is on ensuring the platform’s interface is both user-friendly and visually appealing, with a strong emphasis on the upcoming gaming features.
                                </p>
                            </div>

                            {/* Team Member Card */}
                            <div className="team-member bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-400/30">
                                <h5 className="text-red-500 font-bold text-lg mb-2">Finance</h5>
                                <h6 className="text-black font-semibold text-xl mb-4">DT</h6>
                                <p className="text-gray-700 text-sm md:text-base">
                                    With over 5 years of experience in executive roles at major financial institutions, DT is responsible for Aigos' tokenomics and liquidity strategies, ensuring sustainable growth and a strong financial foundation.
                                </p>
                            </div>

                            {/* Team Member Card */}
                            <div className="team-member bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-400/30">
                                <h5 className="text-red-500 font-bold text-lg mb-2">Marketing Manager</h5>
                                <h6 className="text-black font-semibold text-xl mb-4">JD</h6>
                                <p className="text-gray-700 text-sm md:text-base">
                                    JD is the voice of Aigos on social media and within the community. Focusing on blockchain marketing and community engagement, Casey’s mission is to spread the word about Aigos and foster a vibrant and active user base.
                                </p>
                            </div>
                        </div>

                        {/* Telegram CTA - Corrected Link (External) */}
                        <div className="flex justify-center gap-4">
                            <a
                                href="https://t.me/AIGOS2025"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-gradient-to-r from-red-500 to-purple-600 text-white font-bold uppercase text-sm px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                            >
                                <span>Get to know us on Telegram <FontAwesomeIcon icon={faTelegram} className="ml-2" /></span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}