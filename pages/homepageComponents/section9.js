import Typewriter from 'typewriter-effect';

export default function Section9() {
    return (
        <>
            <section id="section9" className="flex items-center justify-center min-h-screen h-fit bg-fixed bg-center bg-cover bg-[url('/images/bg/15.jpg')] relative overflow-hidden">
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
                <div className="text-center relative z-10">
                    <div className="box-cont h-fit w-fit max-w-[90%] mx-auto px-8 sm:px-14 py-8 shadow-lg bg-gradient-to-r from-neutral-900/90 to-neutral-800/90 rounded-xl border border-neutral-700">
                        <h2 className="text-white font-bold text-3xl md:text-4xl mb-4">
                            The Road to the Moon is through the Sky
                        </h2>
                        <h4 className="text-white font-bold text-xl md:text-2xl mb-6">
                            <Typewriter
                                options={{
                                    strings: ["ROADMAP 2024/2025"],
                                    autoStart: true,
                                    loop: true,
                                    pauseFor: 600000
                                }}
                            />
                        </h4>
                        <div className="container mx-auto w-fit">
                            <ol className="relative border-l border-gray-200 dark:border-gray-700">
                                <li className="mb-10 ml-4">
                                    <div className="absolute w-3 h-3 bg-green-500 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900"></div>
                                    <time className="text-white text-lg font-semibold text-gray-900 dark:text-white">
                                        2nd Quarter 2024
                                    </time>
                                    <p className="text-white mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                                        ✅ Launch of AIGOS PRESALE.<br/>
                                        Finish off AIGOS OmniChain Swap.<br/>
                                        Adding bitcoin to cross chain Swap. <br/>
                                        Select Beta testers for the platform. <br/>
                                        Implement suggested improvements.
                                    </p>
                                </li>
                                <li className="mb-10 ml-4">
                                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                    <time className="text-white text-lg font-semibold text-gray-900 dark:text-white">
                                        3rd Quarter 2024
                                    </time>
                                    <p className="text-white mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                                        Finish Aigos presale <br/>
                                        Distribute Aigos token and NFT's <br/>
                                        Public testing of Aigos OmniChain Swap
                                    </p>
                                </li>
                                <li className="mb-10 ml-4">
                                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                    <time className="text-white text-lg font-semibold text-gray-900 dark:text-white">
                                        4th Quarter 2024
                                    </time>
                                    <p className="text-white mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                                        Launch Aigos Omnichain Swap Mainnet<br/>
                                        Selecting beta testers for Aigos Omnichain Staking pools<br/>
                                        Implement suggested improvements
                                    </p>
                                </li>
                                <li className="mb-10 ml-4">
                                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                    <time className="text-white text-lg font-semibold text-gray-900 dark:text-white">
                                        1st Quarter 2025
                                    </time>
                                    <p className="text-white mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                                        Launch Aigos Omnichain Staking pools Mainnet<br/>
                                        Continue development of Aigos Omnichain Games<br/>
                                        Implement necessary improvements to games
                                    </p>
                                </li>
                                <li className="mb-10 ml-4">
                                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                    <time className="text-white text-lg font-semibold text-gray-900 dark:text-white">
                                        2nd Quarter 2025
                                    </time>
                                    <p className="text-white mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                                        Development of Aigos Omnichain AI strategy<br/>
                                        Selecting beta testers for Aigos Omnichain AI strategy<br/>
                                        Continue development of Aigos Omnichain Games<br/>
                                        Implement necessary improvements to both
                                    </p>
                                </li>
                                <li className="mb-10 ml-4">
                                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                    <time className="text-white text-lg font-semibold text-gray-900 dark:text-white">
                                        3rd Quarter 2025
                                    </time>
                                    <p className="text-white mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                                        First Aigos Omnichain games public testing
                                    </p>
                                </li>
                                <li className="mb-10 ml-4">
                                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                    <time className="text-white text-lg font-semibold text-gray-900 dark:text-white">
                                        4th Quarter 2025
                                    </time>
                                    <p className="text-white mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                                        Launch Aigos Omnichain Game Mainnet<br/>
                                        Much more in due time<br/>
                                        !!Disclaimer Roadmap as well as any documentation are subject to changes in case Aigos team feels necessary!!
                                    </p>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
