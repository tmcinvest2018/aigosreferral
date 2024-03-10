import Typewriter from 'typewriter-effect';

export default function Section8()
{
    return (
        <>
            <section id="section8" className="flex place-items-center justify-around min-h-screen h-fit bg-fixed bg-center bg-cover bg-[url('/images/bg/26.jpg')]">
                <div className="text-center">
                    <div className="box-cont h-fit w-fit px-14 mb-10 py-8 shadow-md bg-gradient-to-r from-neutral-900 rounded-lg">
                        <h2 className="text-white font-bold">OUR TEAM</h2>
                        <h4 className="lead text-white font-bold">
                            <Typewriter
                                options={{
                                    strings: ["WHAT IS BLOCKCHAIN WHITHOUT PEOPLE?"],
                                    autoStart: true,
                                    loop: true,
                                    pauseFor: 600000
                                }}
                            />
                        </h4>
                        <p className="text-white mb-10">
                            WE have a core team of 5 members<br />
                            Morphues is our Founder and the man with the plan focussing on the big picture <br />
                            X-MAN is our lead developer with over 12 years experience in IT
                            he is a fullstack blockchain dev since 2016 contributing to various projects<br />
                            HE-MAN is our front end dev. focussing on the platform and game to come.<br />
                            IP-MAN is our finfancial expert with over 5 years in executive functions at different
                            major financial players focussing on tokenomics and liquidity <br />
                            WONDER-WOMAN is our marketing specialist focussing on blockchain marketing
                            and social media community engagement<br />
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}