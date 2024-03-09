import Typewriter from 'typewriter-effect';

export default function Section9() {
    return (
        <>
            <section id="section9" className="flex place-items-center justify-around min-h-screen h-fit bg-fixed bg-center bg-cover bg-[url('/images/bg/15.jpg')]">
                <div className="text-center">
                    <div className="box-cont h-fit w-fit px-14 mb-10 py-8 shadow-md bg-gradient-to-r from-neutral-900 rounded-lg">
                        <h2 className="text-white font-bold">The Road to the Moon is thrue the Sky</h2>
                        <h4 className="lead text-white font-bold">
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
                                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                    <time className="text-white text-lg font-semibold text-gray-900 dark:text-white">
                                        2nd Quarter 2024
                                    </time>
                                    <p className="text-white mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                                        Launch of AIGOS PRESALE.<br/>
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
                                        Launch Aigos Omnichain Swap Mainnet
                                        Selecting beta testers for Aigos Omnichain Staking pools
                                        Implement suggested improvements
                                    </p>
                                </li>
                                <li className="mb-10 ml-4">
                                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                    <time className="text-white text-lg font-semibold text-gray-900 dark:text-white">
                                        1st Quarter 2025
                                    </time>
                                    <p className="text-white mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                                    Launch Aigos Omnichain Staking pools Mainnet
                                    Continue development of Aigos Omnichain Games
                                    Implement necessary improvements to games
                                    </p>
                                </li>
                                <li className="mb-10 ml-4">
                                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                    <time className="text-white text-lg font-semibold text-gray-900 dark:text-white">
                                        2nd Quarter 2025
                                    </time>
                                    <p className="text-white mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                                        Development of Aigos Omnichain AI strategy
                                        Selecting beta testers for Aigos Omnichain AI strategy
                                        Continue development of Aigos Omnichain Games
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
                                        Launch Aigos Omnichain Game Mainnet
                                        Much more in due time
                                        !!Disclaimer Roadmap as wel as any documentation are subject to changes in case Aigos team feels necessary!!
                                    </p>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
