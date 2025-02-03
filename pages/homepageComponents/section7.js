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
                'rgba(54, 162, 235)', // Vault
                'rgba(255, 99, 132)', // Liquidity Pool
                'rgba(75, 192, 192)', // Presale
                'rgba(255, 159, 64)', // Joint Venture
                'rgba(153, 102, 255)', // Marketing
                'rgba(255, 205, 86)', // Team
                'rgba(255, 99, 71)'    // Staff
            ],
            borderColor: [
                'rgba(54, 162, 235)',
                'rgba(255, 99, 132)',
                'rgba(75, 192, 192)',
                'rgba(255, 159, 64)',
                'rgba(153, 102, 255)',
                'rgba(255, 205, 86)',
                'rgba(255, 99, 71)',
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
                        
                        {/* Displaying percentages below the pie chart */}
                        <div className="mt-6 text-white">
                            <div className="flex justify-between text-sm md:text-base">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'rgba(54, 162, 235)' }}></div>
                                    <span>Vault: 40%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'rgba(255, 99, 132)' }}></div>
                                    <span>Liquidity Pool: 15%</span>
                                </div>
                            </div>
                            <div className="flex justify-between text-sm md:text-base mt-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'rgba(75, 192, 192)' }}></div>
                                    <span>Presale: 35%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'rgba(255, 159, 64)' }}></div>
                                    <span>Joint Venture: 2%</span>
                                </div>
                            </div>
                            <div className="flex justify-between text-sm md:text-base mt-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'rgba(153, 102, 255)' }}></div>
                                    <span>Marketing: 2%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'rgba(255, 205, 86)' }}></div>
                                    <span>Team: 3%</span>
                                </div>
                            </div>
                            <div className="flex justify-between text-sm md:text-base mt-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'rgba(255, 99, 71)' }}></div>
                                    <span>Staff: 3%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
