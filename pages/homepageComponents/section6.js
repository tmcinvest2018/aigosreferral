import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram, faTwitter } from "@fortawesome/free-brands-svg-icons";

export default function Section6() {
    return (
        <>
            <section id="section6" className="flex items-center justify-center h-fit min-h-screen bg-fixed bg-center bg-cover bg-[url('/images/bg/24.jpg')] relative overflow-hidden">
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
                <div className="text-center relative z-10">
                    <div className="box-cont h-fit w-fit max-w-[90%] mx-auto mt-[10%] px-8 sm:px-14 py-8 shadow-lg bg-gradient-to-r from-neutral-900/90 to-neutral-800/90 rounded-xl border border-neutral-700">
                        <h5 className="uppercase text-red-500 font-bold text-lg md:text-xl mb-2">
                            AIGOS MISSION
                        </h5>
                        <h5 className="uppercase text-white font-bold text-xl md:text-2xl mb-6">
                            AI GAMING OMNICHAIN
                        </h5>
                        <p className="text-white text-sm md:text-base mb-8 max-w-[600px] mx-auto">
                            Welcome to Aigos, a groundbreaking project at the forefront of blockchain innovation. At Aigos, our mission is clear: to empower omnichain interoperability and revolutionize the way blockchain networks communicate and transact.
                        </p>
                        <a
                            href="https://twitter.com/xtmcswap/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold uppercase text-sm px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                            <span>Follow on Twitter <FontAwesomeIcon icon={faTwitter} className="ml-2" /></span>
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
