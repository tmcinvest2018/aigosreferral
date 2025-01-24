import Typewriter from 'typewriter-effect';

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
                        <p className="text-white text-sm md:text-base mb-8 max-w-[800px] mx-auto">
                            We have a core team of 5 members.<br />
                            <strong>Morpheus</strong> is our Founder and the man with the plan, focusing on the big picture.<br />
                            <strong>X-MAN</strong> is our lead developer with over 12 years of experience in IT. He is a full-stack blockchain developer since 2016, contributing to various projects.<br />
                            <strong>HE-MAN</strong> is our front-end developer, focusing on the platform and game to come.<br />
                            <strong>IP-MAN</strong> is our financial expert with over 5 years in executive functions at different major financial players, focusing on tokenomics and liquidity.<br />
                            <strong>WONDER-WOMAN</strong> is our marketing specialist, focusing on blockchain marketing and social media community engagement.<br />
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
