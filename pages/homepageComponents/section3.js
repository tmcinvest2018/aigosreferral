// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDown } from "@fortawesome/free-solid-svg-icons";
import Typewriter from 'typewriter-effect';
import Link from 'next/link';

export default function Whitepaper() {
    return (
        <>
            <section id="section3" className="flex items-center justify-center min-h-screen h-fit bg-white relative">
                {/* Removed background image and overlay */}

                <div className="text-center relative z-10 w-full max-w-4xl"> {/* Added max-w-4xl */}
                    {/* Glassmorphic Card */}
                    <div className="bg-white/50 backdrop-blur-md rounded-3xl shadow-xl border border-purple-400/50 p-8 md:p-12">
                        <h2 className="text-red-500 font-bold text-3xl md:text-4xl mb-4">
                            🌍 WHITEPAPER
                        </h2>
                        <h4 className="text-black font-bold text-xl md:text-2xl mb-6">
                            <Typewriter
                                options={{
                                    strings: ["AIGOS", "AI", "GAMING", "OMNICHAIN"],
                                    autoStart: true,
                                    loop: true,
                                }}
                            />
                        </h4>
                        <p className="text-gray-700 text-sm md:text-base mb-8 max-w-[600px] mx-auto">
                            Click the link below for documentation. <br />
                            Please note that due to fast developments in blockchain, <br />
                            documentation can be subject to change at any time. <br />
                            For up-to-date inquiries, please contact the team.
                        </p>

                        {/* Whitepaper Download Button - Corrected Link */}
                        <Link href="https://aigos.gitbook.io/untitled/whitepaper"
                            className="inline-block bg-gradient-to-r from-red-500 to-purple-600 text-white font-bold uppercase text-sm px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">

                                <span>WHITEPAPER <FontAwesomeIcon icon={faCircleDown} className="ml-2" /></span>

                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}