import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
import React, { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";

const calculateTimeLeft = () => {
  const targetDate = new Date("2025-05-01");
  const currentDate = new Date();
  const difference = targetDate - currentDate;
  return difference > 0 ? Math.floor(difference / 1000) : 0;
};

export default function HomeSection() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => {
    const days = Math.floor(time / (60 * 60 * 24));
    const hours = Math.floor((time % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((time % (60 * 60)) / 60);
    const seconds = Math.floor(time % 60);
    return { days, hours, minutes, seconds };
  };

  const { days, hours, minutes, seconds } = formatTime(timeLeft);

  return (
    <section className="relative flex items-center justify-center h-screen bg-gradient-to-br from-purple-800 via-black to-black text-white text-center p-6 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-50 bg-[url('/images/bg/16.jpg')] bg-cover bg-no-repeat bg-center blur-lg"></div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl">
        <h5 className="uppercase text-lg md:text-xl mb-4 tracking-wider font-semibold">
          Cross Chain revolution connecting EVM and Bitcoin
        </h5>
        <h4 className="text-4xl md:text-5xl font-bold mb-8">
          <Typewriter
            options={{
              strings: ["AIGOS", "PRESALE"],
              autoStart: true,
              loop: true,
              pauseFor: 4000,
            }}
          />
        </h4>

        {/* Countdown */}
        <div className="flex justify-center gap-4 text-center bg-white/10 backdrop-blur-md rounded-lg p-6">
          {[
            { label: "Days", value: days },
            { label: "Hours", value: hours },
            { label: "Minutes", value: minutes },
            { label: "Seconds", value: seconds },
          ].map((unit, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-3xl font-bold">{unit.value}</span>
              <span className="text-sm text-gray-300">{unit.label}</span>
            </div>
          ))}
        </div>

        {/* Notice */}
        <p className="text-orange-400 font-semibold text-lg mt-6 animate-pulse">
          Price increases 15% every 10 DAYS
        </p>

        {/* Features */}
        <div className="mt-6 space-y-2 text-lg">
          <p>
            <span className="text-green-400">✓</span> ARTIFICIAL INTELLIGENCE {" "}
            <span className="text-green-400">✓</span> GAMING {" "}
            <span className="text-green-400">✓</span> CROSS CHAIN SWAPS {" "}
            <span className="text-green-400">✓</span> BITCOIN TO EVM SWAPS {" "}
            <span className="text-green-400">✓</span> OMNICHAIN STAKING {" "}
            <span className="text-green-400">✓</span> MUCH MORE
          </p>
        </div>

        {/* Telegram Button */}
        <a
          href="https://t.me/Otje86"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold uppercase px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105"
        >
          Join our Telegram <FontAwesomeIcon icon={faTelegram} className="ml-2" />
        </a>
      </div>
    </section>
  );
}
