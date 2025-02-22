import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDown } from "@fortawesome/free-solid-svg-icons";
import Typewriter from 'typewriter-effect';
import Link from 'next/link';

export default function Section5() {
    return (
        <>
            <section id="section5" className="flex items-center justify-center min-h-screen h-fit bg-white relative">
                {/* Removed background image and overlay */}
                <div className="text-center relative z-10 w-full max-w-4xl"> {/* Added max-w-4xl */}
                    {/* Glassmorphic Card */}
                    <div className="bg-white/50 backdrop-blur-md rounded-3xl shadow-xl border border-purple-400/50 p-8 md:p-12">
                        <h2 className="text-red-500 font-bold text-3xl md:text-4xl mb-4">
                            👨‍🚀 AIGOS DOCS
                        </h2>
                        <h4 className="text-black font-bold text-xl md:text-2xl mb-6">
                            <Typewriter
                                options={{
                                    strings: ["AI.", "GAMING.", "OMNICHAINSWAP."],
                                    autoStart: true,
                                    loop: true,
                                }}
                            />
                        </h4>
                        <p className="text-gray-700 text-sm md:text-base mb-8 max-w-[600px] mx-auto">
                            In our docs, we have a comprehensive explanation of Aigos. <br />
                            You will find the use case for Aigos. <br />
                            Comprehensive guides and detailed tokenomics and whitepaper. <br />
                            Details about the ongoing Aigos Presale.
                        </p>
                        {/* Corrected Link (External) - Keeping <a> for external links */}
                        <a
                            href="https://aigos.gitbook.io/untitled/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-gradient-to-r from-red-500 to-purple-600 text-white font-bold uppercase text-sm px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                            <span>DOCS <FontAwesomeIcon icon={faCircleDown} className="ml-2" /></span>
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}