import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import Typewriter from 'typewriter-effect'; // <-- Add this import

export default function Section8() {
    return (
        <>
            <section id="section8" className="flex items-center justify-center min-h-screen h-fit bg-fixed bg-center bg-cover bg-[url('/images/bg/26.jpg')] relative overflow-hidden">
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
                <div className="text-center relative z-10">
                    <div className="box-cont h-fit w-fit max-w-[90%] mx-auto px-8 sm:px-14 py-8 shadow-lg bg-gradient-to-r from-neutral-900/90 to-neutral-800/90 rounded-xl border border-neutral-700">
                        <h2 className="text-white font-bold text-3xl md:text-4xl mb-4">
                            OUR TEAM
                        </h2>
                        <h4 className="text-white font-bold text-xl md:text-2xl mb-6">
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
                            <div className="team-member bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-xl p-6 shadow-lg border border-neutral-700">
                                <h5 className="text-red-500 font-bold text-lg mb-2">Founder</h5>
                                <h6 className="text-white font-semibold text-xl mb-4">Alex</h6>
                                <p className="text-white text-sm md:text-base">
                                    Alex is the visionary behind Aigos, focusing on the big picture, strategic planning, and driving the project's long-term vision. With a background in blockchain, Alex aims to revolutionize the DeFi and GameFi ecosystems.
                                </p>
                            </div>

                            <div className="team-member bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-xl p-6 shadow-lg border border-neutral-700">
                                <h5 className="text-red-500 font-bold text-lg mb-2">Lead Developer</h5>
                                <h6 className="text-white font-semibold text-xl mb-4">Jamie</h6>
                                <p className="text-white text-sm md:text-base">
                                    Jamie brings over 12 years of IT experience and has been a full-stack blockchain developer since 2016. Jamie has contributed to several successful blockchain projects and is responsible for Aigos' technical development and infrastructure.
                                </p>
                            </div>

                            <div className="team-member bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-xl p-6 shadow-lg border border-neutral-700">
                                <h5 className="text-red-500 font-bold text-lg mb-2">Front-End Developer</h5>
                                <h6 className="text-white font-semibold text-xl mb-4">Taylor</h6>
                                <p className="text-white text-sm md:text-base">
                                    Taylor is the creative force behind Aigos' platform design and user experience. Taylor’s focus is on ensuring the platform’s interface is both user-friendly and visually appealing, with a strong emphasis on the upcoming gaming features.
                                </p>
                            </div>

                            <div className="team-member bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-xl p-6 shadow-lg border border-neutral-700">
                                <h5 className="text-red-500 font-bold text-lg mb-2">Financial Strategist</h5>
                                <h6 className="text-white font-semibold text-xl mb-4">Morgan</h6>
                                <p className="text-white text-sm md:text-base">
                                    With over 5 years of experience in executive roles at major financial institutions, Morgan is responsible for Aigos' tokenomics and liquidity strategies, ensuring sustainable growth and a strong financial foundation.
                                </p>
                            </div>

                            <div className="team-member bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-xl p-6 shadow-lg border border-neutral-700">
                                <h5 className="text-red-500 font-bold text-lg mb-2">Marketing & Community Manager</h5>
                                <h6 className="text-white font-semibold text-xl mb-4">Casey</h6>
                                <p className="text-white text-sm md:text-base">
                                    Casey is the voice of Aigos on social media and within the community. Focusing on blockchain marketing and community engagement, Casey’s mission is to spread the word about Aigos and foster a vibrant and active user base.
                                </p>
                            </div>
                        </div>

                        {/* Telegram CTA */}
                        <div className="flex justify-center gap-4">
                            <a
                                href="https://t.me/Otje86"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-gradient-to-r from-teal-500 to-green-600 text-white font-bold uppercase text-sm px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
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
