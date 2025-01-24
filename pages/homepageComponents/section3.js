// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDown } from "@fortawesome/free-solid-svg-icons";
import Typewriter from 'typewriter-effect';

export default function Whitepaper() {
    return (
        <>
            <section id="section3" className="flex items-center justify-center min-h-screen h-fit bg-fixed bg-center bg-cover bg-[url('/images/bg/13.jpg')] relative overflow-hidden">
                {/* Overlay for better readability */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

                <div className="text-center relative z-10">
                    <div className="box-cont h-fit w-fit max-w-[90%] mx-auto px-8 sm:px-14 py-8 shadow-lg bg-gradient-to-r from-neutral-900/90 to-neutral-800/90 rounded-xl border border-neutral-700">
                        <h2 className="text-white font-bold text-3xl md:text-4xl mb-4">
                            🌍 WHITEPAPER
                        </h2>
                        <h4 className="text-white font-bold text-xl md:text-2xl mb-6">
                            <Typewriter
                                options={{
                                    strings: ["AIGOS", "AI", "GAMING", "OMNICHAIN"],
                                    autoStart: true,
                                    loop: true,
                                }}
                            />
                        </h4>
                        <p className="text-white text-sm md:text-base mb-8 max-w-[600px] mx-auto">
                            Click the link below for documentation. <br />
                            Please note that due to fast developments in blockchain, <br />
                            documentation can be subject to change at any time. <br />
                            For up-to-date inquiries, please contact the team.
                        </p>

                        {/* Whitepaper Download Button */}
                        <a
                            href="https://aigos.gitbook.io/untitled/whitepaper"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold uppercase text-sm px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                            <span>WHITEPAPER <FontAwesomeIcon icon={faCircleDown} className="ml-2" /></span>
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
