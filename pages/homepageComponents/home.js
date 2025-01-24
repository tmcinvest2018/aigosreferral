import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import { faTelegram } from "@fortawesome/free-brands-svg-icons";

// Function to calculate the time remaining until the presale starts
const calculateTimeLeft = () => {
    const targetDate = new Date('2025-05-01');
    const currentDate = new Date();
    const difference = targetDate.getTime() - currentDate.getTime();

    if (difference > 0) {
        return Math.floor(difference / 1000); // Return remaining seconds
    } else {
        return 0;
    }
};

export default function HomeSection() {
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft]); // Run effect only when timeLeft changes

    // Function to format seconds into days, hours, minutes, and seconds
    const formatTime = (time) => {
        const days = Math.floor(time / (60 * 60 * 24));
        const hours = Math.floor((time % (60 * 60 * 24)) / (60 * 60));
        const minutes = Math.floor((time % (60 * 60)) / 60);
        const seconds = Math.floor(time % 60);

        return { days, hours, minutes, seconds };
    };

    const { days, hours, minutes, seconds } = formatTime(timeLeft);

    return (
        <section id="home" className="flex items-center justify-center h-screen bg-fixed bg-center bg-cover bg-[url('/images/bg/16.jpg')] relative overflow-hidden">
            {/* Overlay for better readability */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

            <div className="container mx-auto text-center relative z-10 px-4">
                <h5 className="uppercase text-white font-semibold text-lg md:text-xl mb-4 tracking-wider">
                    Cross Chain revolution connecting EVM and Bitcoin
                </h5>
                <h4 className="text-white font-bold text-4xl md:text-5xl mb-8">
                    <Typewriter
                        options={{
                            strings: ["AIGOS", "PRESALE"],
                            autoStart: true,
                            loop: true,
                            pauseFor: 4000
                        }}
                    />
                </h4>

                {/* Countdown Section */}
                <div className="countdown-container bg-white/10 backdrop-blur-md rounded-lg p-6 inline-block">
                    <p className="text-white text-sm mb-4">Presale starts on 1st May 2025</p>
                    <div className="countdown-clock grid grid-cols-4 gap-4">
                        <div className="text-center">
                            <span className="text-3xl font-bold text-white">{days}</span>
                            <span className="block text-sm text-white/80">Days</span>
                        </div>
                        <div className="text-center">
                            <span className="text-3xl font-bold text-white">{hours}</span>
                            <span className="block text-sm text-white/80">Hours</span>
                        </div>
                        <div className="text-center">
                            <span className="text-3xl font-bold text-white">{minutes}</span>
                            <span className="block text-sm text-white/80">Minutes</span>
                        </div>
                        <div className="text-center">
                            <span className="text-3xl font-bold text-white">{seconds}</span>
                            <span className="block text-sm text-white/80">Seconds</span>
                        </div>
                    </div>
                </div>

                {/* Price Increase Notice */}
                <p className="text-orange-400 font-semibold text-lg mt-8 animate-pulse">
                    Price increases 15% every 10 DAYS
                </p>

                {/* Features List */}
                <div className="mt-8 space-y-2">
                    <p className="text-white text-lg">
                        <strong className="text-green-400">✓</strong> ARTIFICIAL INTELLIGENCE{" "}
                        <strong className="text-green-400">✓</strong> GAMING{" "}
                        <strong className="text-green-400">✓</strong> CROSS CHAIN SWAPS{" "}
                        <strong className="text-green-400">✓</strong> BITCOIN TO EVM SWAPS{" "}
                        <strong className="text-green-400">✓</strong> OMNICHAIN STAKING{" "}
                        <strong className="text-green-400">✓</strong> MUCH MORE
                    </p>
                </div>

                {/* Telegram Button */}
                <a
                    href="https://t.me/Otje86"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold uppercase text-sm px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                    <span>Join our telegram <FontAwesomeIcon icon={faTelegram} className="ml-2" /></span>
                </a>
            </div>
        </section>
    );
}
