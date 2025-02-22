import Typewriter from 'typewriter-effect';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCircle } from "@fortawesome/free-solid-svg-icons"; // Import check and circle icons

export default function Section9() {
    return (
        <>
            <section id="section9" className="flex items-center justify-center min-h-screen h-fit bg-white relative">
                {/* Removed background and overlay */}

                <div className="text-center relative z-10 w-full max-w-4xl"> {/* Added max-w-4xl */}
                    {/* Glassmorphic Card */}
                    <div className="bg-white/50 backdrop-blur-md rounded-3xl shadow-xl border border-purple-400/50 p-8 md:p-12">

                        {/* Title & Typewriter Effect */}
                        <h2 className="text-red-500 font-bold text-3xl md:text-4xl mb-4">
                            Pioneering the Future of Blockchain & AI
                        </h2>
                        <h4 className="text-black font-bold text-xl md:text-2xl mb-6">
                            <Typewriter
                                options={{
                                    strings: ["Aigos Roadmap 2025/2026"],
                                    autoStart: true,
                                    loop: true,
                                    pauseFor: 600000
                                }}
                            />
                        </h4>

                        {/* Roadmap Timeline - Redesigned */}
                        <div className="container mx-auto w-full">
                            <div className="relative">
                                {/* Vertical Line */}
                                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full border-l-2 border-purple-400/50"></div>

                                {/* Roadmap Items */}
                                {[
                                    { quarter: "Q2 2025", points: ["Aigos Presale Launch", "Development of Aigos Omnichain Swap", "Integrating Bitcoin (BTC) Cross-Chain Support", "Selecting Beta Testers", "Implementing Community-Driven Improvements"], completed: true },
                                    { quarter: "Q3 2025", points: ["Completion of Aigos Presale", "Aigos Token & NFT Airdrop", "Launch of Aigos Omnichain Swap (Public Beta)"], completed: false },
                                    { quarter: "Q3 2025", points: ["Aigos Omnichain Swap Mainnet Launch", "Launch of Aigos Omnichain Staking Pools (Beta)", "Security & Community Enhancements"], completed: false },
                                    { quarter: "Q4 2025", points: ["Aigos Omnichain Staking Pools Mainnet", "Development of Aigos Omnichain Games", "Refining AI-Powered Smart Contract Automation"], completed: false },
                                    { quarter: "Q4 2025", points: ["Development of Aigos AI Trading & Strategy Tools", "Expansion of Aigos Omnichain Gaming Ecosystem", "Beta Testing for AI & GameFi"], completed: false },
                                    { quarter: "Q4 2025", points: ["Public Testing of Aigos Omnichain Games", "Expansion Across Multiple Blockchains"], completed: false },
                                    { quarter: "Q4 2025", points: ["Launch of Aigos Omnichain Games Mainnet", "Strategic Partnerships & Ecosystem Growth", "New Features & Announcements"], completed: false }
                                ].map((item, index) => (
                                    <div key={index} className={`relative mb-8 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:text-left md:pr-6' : 'md:text-right md:pl-6'}`}
                                         style={{ marginLeft: index % 2 === 0 ? '0' : '3rem' }}>  {/* Adjusted for icon and spacing */}
                                        {/* Icon - Check or Circle */}
                                        <div className="absolute left-0 md:left-auto md:right-auto top-1/2 -translate-y-1/2  w-8 h-8 rounded-full  flex items-center justify-center"
                                             style={{
                                                 left: index % 2 === 0 ? '-1rem' : '',   // Position left for even,
                                                 right: index % 2 !== 0 ? 'calc(100% - 2.2rem)' : '',  // Position right for odd, adjust as needed.
                                             }}
                                        >
                                            <FontAwesomeIcon
                                                icon={item.completed ? faCheckCircle : faCircle}
                                                className={`text-2xl ${item.completed ? 'text-green-500' : 'text-purple-400'}`} // Larger icon
                                            />
                                        </div>

                                        {/* Content */}
                                       <div className={`bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-md border ${item.completed? 'border-green-300' : 'border-purple-400/30'}`}>
                                          <time className="text-red-500 text-lg font-semibold block mb-2">{item.quarter}</time>
                                            {item.points.map((point, i) => (
                                                <p key={i} className="text-gray-700 mb-1 text-base font-normal">
                                                    {point}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}