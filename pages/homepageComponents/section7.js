import Typewriter from 'typewriter-effect';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
    labels: ['Vault', 'Liquidity Pool', 'Presale', 'Joint Venture', 'Marketing', 'Team', 'Staff'],
    datasets: [
        {
            label: '%',
            data: [40, 15, 35, 2, 2, 3, 3],
            backgroundColor: [
                'rgba(3,22,52)',
                'rgba(3,54,73)',
                'rgba(3,101,100)',
                'rgba(205,179,128)',
                'rgba(232,221,203)',
                'rgba(138,155,15)',
                'rgba(248,202,0)',
                'rgba(233,127,2)',
                'rgba(189,21,80)',
                'rgba(73,10,61)',
            ],
            borderColor: [
                'rgba(3,22,52)',
                'rgba(3,54,73)',
                'rgba(3,101,100)',
                'rgba(205,179,128)',
                'rgba(232,221,203)',
                'rgba(138,155,15)',
                'rgba(248,202,0)',
                'rgba(233,127,2)',
                'rgba(189,21,80)',
                'rgba(73,10,61)',
            ],
            hoverOffset: 4,
            borderWidth: 1,
        },
    ],
};

export default function Section7() {
    return (
        <>
            <section id="section7" className="flex items-center justify-center min-h-screen h-fit bg-fixed bg-center bg-cover bg-[url('/images/bg/23.jpg')] relative overflow-hidden">
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
                <div className="text-center relative z-10">
                    <div className="box-cont h-fit w-fit max-w-[90%] mx-auto px-8 sm:px-14 py-8 shadow-lg bg-gradient-to-r from-neutral-900/90 to-neutral-800/90 rounded-xl border border-neutral-700">
                        <h2 className="text-white font-bold text-3xl md:text-4xl mb-4">
                            Transparent Overview
                        </h2>
                        <h4 className="text-white font-bold text-xl md:text-2xl mb-6">
                            <Typewriter
                                options={{
                                    strings: ["TOKEN DISTRIBUTION"],
                                    autoStart: true,
                                    loop: true,
                                    pauseFor: 600000
                                }}
                            />
                        </h4>
                        <p className="text-white text-sm md:text-base mb-8 max-w-[600px] mx-auto">
                            For a more comprehensive description of Aigos tokenomics<br />
                            please read our whitepaper and other documentation.
                        </p>
                        <h5 className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold uppercase text-sm px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mb-6">
                            Tokenomics
                        </h5>
                        <h5 className="uppercase text-red-300 font-bold text-lg md:text-xl mb-8">
                            Total supply: 1,000,000,000
                        </h5>
                        <div className="tokenomicsDiv">
                            <Doughnut
                                data={data}
                                height={350}
                                width={100}
                                options={{
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            position: 'top',
                                            labels: {
                                                color: 'rgb(255, 255, 255)',
                                                font: {
                                                    size: 14,
                                                    family: "'Poppins', sans-serif"
                                                }
                                            },
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
