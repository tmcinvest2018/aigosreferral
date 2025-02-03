import Typewriter from 'typewriter-effect';

export default function Section9() {
    return (
        <>
            <section id="section9" className="flex items-center justify-center min-h-screen h-fit bg-fixed bg-center bg-cover bg-[url('/images/bg/15.jpg')] relative overflow-hidden">
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
                <div className="text-center relative z-10">
                    <div className="box-cont h-fit w-fit max-w-[90%] mx-auto px-8 sm:px-14 py-8 shadow-lg bg-gradient-to-r from-neutral-900/90 to-neutral-800/90 rounded-xl border border-neutral-700">

                        {/* Title & Typewriter Effect */}
                        <h2 className="text-white font-bold text-3xl md:text-4xl mb-4">
                            Pioneering the Future of Blockchain & AI
                        </h2>
                        <h4 className="text-white font-bold text-xl md:text-2xl mb-6">
                            <Typewriter
                                options={{
                                    strings: ["Aigos Roadmap 2025/2026"],
                                    autoStart: true,
                                    loop: true,
                                    pauseFor: 600000
                                }}
                            />
                        </h4>

                        {/* Roadmap Timeline */}
                        <div className="container mx-auto w-fit">
                            <ol className="relative border-l border-gray-200 dark:border-gray-700">

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
                                    <li key={index} className="mb-10 ml-4">
                                        <div className="absolute w-6 h-6 -left-3 rounded-full border-2 flex items-center justify-center"
                                            style={{
                                                backgroundColor: item.completed ? '#22c55e' : '#d1d5db',
                                                borderColor: item.completed ? '#22c55e' : '#6b7280'
                                            }}>
                                        </div>
                                        <time className="text-white text-lg font-semibold block mb-2">{item.quarter}</time>
                                        {item.points.map((point, i) => (
                                            <p key={i} className="text-white mb-1 text-base font-normal pl-6">
                                                {point}
                                            </p>
                                        ))}
                                    </li>
                                ))}
                            </ol>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}
