// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";

// Homepage HOW TO BUY Section
export default function Section2() {
    return (
        <>
            {/* PARALLAX TWO START */}
            <section id="section2" className="flex items-center justify-center h-fit min-h-screen bg-fixed bg-center bg-cover bg-[url('/images/bg/12.jpg')] relative overflow-hidden">
                {/* Overlay for better readability */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

                <div className="text-center relative z-10">
                    <div className="box-cont h-fit w-fit max-w-[90%] mx-auto mt-[10%] px-8 sm:px-14 py-8 shadow-lg bg-gradient-to-r from-neutral-900/90 to-neutral-800/90 rounded-xl border border-neutral-700">
                        <h5 className="uppercase text-red-500 font-bold text-lg md:text-xl mb-2">
                            HOW TO BUY?
                        </h5>
                        <h5 className="uppercase text-white font-bold text-xl md:text-2xl mb-6">
                            CHECK OUT OUR YOUTUBE TUTORIAL
                        </h5>

                        {/* YouTube Video Embed */}
                        <div className="flex items-center justify-center mb-8">
                            <iframe
                                className="w-full max-w-[350px] h-[200px] sm:h-[250px] md:h-[350px] rounded-lg shadow-md"
                                src="https://youtube.com/embed/0XSY4LVEIcc?rel=0"
                                title="AIGOS INVEST IN OMNICHAIN DEFI"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>

                        {/* Telegram Support Button */}
                        <a
                            href="https://t.me/Otje86"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold uppercase text-sm px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                            <span>TELEGRAM SUPPORT <FontAwesomeIcon icon={faTelegram} className="ml-2" /></span>
                        </a>
                    </div>
                </div>
            </section>
            {/* PARALLAX TWO END */}
        </>
    );
}
