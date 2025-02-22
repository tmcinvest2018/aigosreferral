// pages/homepageComponents/home.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
import { faBrain, faGamepad, faExchangeAlt, faMoneyBillTrendUp, faEllipsisH, faRobot, faDiceD20, faHandshake } from "@fortawesome/free-solid-svg-icons"; // Added icons
import React, { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";
import Link from 'next/link';

const calculateTimeLeft = () => {
    const targetDate = new Date("2025-03-03");
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

    const features = [
      { text: "ARTIFICIAL INTELLIGENCE", icon: faBrain },
      { text: "GAMING", icon: faGamepad },
      { text: "CROSS CHAIN SWAPS", icon: faExchangeAlt },
      { text: "BITCOIN TO EVM SWAPS", icon: faExchangeAlt },
      { text: "OMNICHAIN STAKING", icon: faMoneyBillTrendUp },
      { text: "MUCH MORE", icon: faEllipsisH },
    ];

    // Array of product data (image paths and descriptions)
   const products = [
        { image: "/degen.png", title: "Aigos DeFi Hub", description: "A complete cross-chain DeFi ecosystem, with Bitcoin and multi-chain support. Unlock the full potential of decentralized finance.", icon: faExchangeAlt },
        { image: "/degen12.png", title: "Aigos AI Agents Insights", description: "AI-powered trading and market insights with intelligent agents that analyze, detect opportunities and assist.", icon: faRobot },
        { image: "/degen13.png", title: "Cross Roads", description: "A blockchain-powered game where strategy meets opportunity. Play, earn, and explore.", icon: faDiceD20 },
        { image: "/degen14.png", title: "Aigos Gateway", description: "Your partner in Bitcoin Web3 integration. For projects and businesses bringing cross-chain and tailored blockchain solutions.", icon: faHandshake },
    ];


    return (
      <section className="relative flex items-center justify-center min-h-screen bg-white text-black text-center p-6">
        <div className="relative z-10 max-w-7xl w-full space-y-8"> {/* Increased max-width to 7xl */}.
          

          {/* Top Section - No changes here */}
          <div>
            <h5 className="uppercase text-red-500 text-lg md:text-xl mb-4 tracking-wider font-semibold">
              <p className="text-red-500 font-semibold text-lg animate-pulse">
                Cross Chain revolution connecting EVM and Bitcoin
              </p>
            </h5>
            <h4 className="text-4xl md:text-5xl font-bold mb-8 text-black">
              <Typewriter
                options={{
                  strings: ["AIGOS", "PRESALE"],
                  autoStart: true,
                  loop: true,
                  pauseFor: 4000,
                }}
              />
            </h4>

            <h2 className="text-lg text-black font-bold mb-4">PRESALE STARTS IN:</h2>

            <div className="flex flex-col items-center text-black">
              <div className="flex justify-center gap-4 text-center bg-white/30 backdrop-blur-lg rounded-lg p-6 border border-purple-400/30">
                {[
                  { label: "Days", value: days },
                  { label: "Hours", value: hours },
                  { label: "Minutes", value: minutes },
                  { label: "Seconds", value: seconds },
                ].map((unit, index) => (
                  <div key={index} className="flex flex-col">
                    <span className="text-3xl font-bold">{unit.value}</span>
                    <span className="text-sm text-gray-700">{unit.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 text-lg">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center justify-center">
                   <FontAwesomeIcon icon={feature.icon} className="text-red-500 mr-2 text-xl" />
                   <span className="font-bold text-gray-700">{feature.text}</span>
                </div>
              ))}
            </div>

           <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://t.me/AIGOS2025"
              target="_blank"
              rel="noopener noreferrer"
               className="inline-block bg-gradient-to-r from-red-500 to-purple-600 text-white font-bold uppercase px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105"

            >
              Join our Telegram <FontAwesomeIcon icon={faTelegram} className="ml-2" />
            </a>
            <Link href="#section4" className="inline-block bg-gradient-to-r from-purple-500 to-red-500 text-white font-bold uppercase px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105">
                    Buy Now
            </Link>
          </div>
          </div>


          {/* Product Cards Section */}
          <div>
            <h2 className="text-3xl font-bold text-red-500 mb-6 uppercase">AIGOS Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">  {/* Keep this grid layout */}
            {products.map((product, index) => (
                <div key={index} className="bg-white/50 backdrop-blur-md rounded-3xl shadow-xl border border-purple-400/50 p-4 flex flex-col">
                    {/* Image */}
                    <div className="w-full aspect-w-16 aspect-h-9"> {/*  Keep aspect ratio for consistent image sizing */}
                        <img
                            src={product.image}
                            alt={`Product ${index + 1}`}
                            className="rounded-lg w-full h-full object-cover"
                        />
                    </div>

                    {/* Title and Description */}
                    <div className="mt-4">
                        <h3 className={`font-bold text-lg mb-2 ${index % 2 === 0 ? 'text-black' : 'text-red-500'}`}>  {/* Alternating title colors */}
                        <FontAwesomeIcon icon={product.icon} className="mr-2" />
                            {product.title}
                        </h3>
                        <p className="text-gray-700">{product.description}</p>
                    </div>
                </div>
            ))}
            </div>
          </div>
        </div>
    </section>
  );
}