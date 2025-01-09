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
        <section id="home" className="flex items-center justify-center h-screen bg-fixed bg-center bg-cover bg-[url('/images/bg/16.jpg')]">
            <div className="container mx-auto text-center">
                <h5 className="uppercase text-white font-bold">Cross Chain revolution connecting EVM and Bitcoin</h5>
                <h4 className="lead text-white font-bold">
                    <Typewriter
                        options={{
                            strings: ["AIGOS", "PRESALE"],
                            autoStart: true,
                            loop: true,
                            pauseFor: 4000
                        }}
                    />
                </h4>
                <div className="countdown-container flex justify-center">
                    <div className="countdown-box">
                        <p className="countdown-text">Presale starts on 1st May 2024</p>
                        <div className="countdown-clock">
                            <div>{days} <span className="countdown-label">Days</span></div>
                            <div>{hours} <span className="countdown-label">Hours</span></div>
                            <div>{minutes} <span className="countdown-label">Minutes</span></div>
                            <div>{seconds} <span className="countdown-label">Seconds</span></div>
                        </div>
                    </div>
                </div>
                <p className="text-orange-500 font-bold">Price increases 15% every 10 DAYS</p><br />
                <p className="text-white"><strong>✓</strong> ARTIFICIAL INTELLIGENCE <strong>✓</strong> GAMING
                    <strong>✓</strong> CROSS CHAIN SWAPS <strong>✓</strong> BITCOIN TO EVM SWAPS <strong>✓</strong> OMNICHAIN STAKING
                    <strong>✓</strong> MUCH MORE</p>
                <br />
                <a href="https://t.me/Otje86" target="_blank" rel="noopener noreferrer" className="bg-neutral-900 text-white hover:bg-red-600 active:bg-red-900 font-bold uppercase text-base px-8 py-3 rounded-[24px] shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                    <span>Join our telegram <FontAwesomeIcon icon={faTelegram} className="ml-2"/></span>
                </a>
            </div>
        </section>
    );
}
