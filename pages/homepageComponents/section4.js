import SeedSale from "./seedSale.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

export default function Section4() {
    return (
        <section id="section4" className="relative min-h-screen flex items-center justify-center bg-white">
            {/* Main container - Outer Glassmorphic Card */}
            <div className="relative z-10 w-full max-w-6xl mx-auto bg-white/50 backdrop-blur-lg rounded-3xl shadow-xl border border-purple-400/50 p-6 md:p-8">
                {/* Inner container for horizontal layout on larger screens */}
                <div className="flex flex-col md:flex-row items-start justify-center gap-6">

                    {/* Steps to Buy - Now in its own card AGAIN */}
                    <div className="bg-white/50 backdrop-blur-md text-black p-5 sm:p-6 rounded-2xl border border-purple-400/30 w-full max-w-md md:w-1/3 md:h-auto">
                        <h3 className="text-xl md:text-2xl font-extrabold mb-4 text-red-500 text-center">
                            <FontAwesomeIcon icon={faRocket} className="mr-2" /> Join the AIGOS Presale Now!
                        </h3>
                        <div className="space-y-3">
                            {[
                                "Connect Wallet",
                                "Click Buy",
                                "Approve USDT Spending in Wallet",
                                "Confirm Transaction",
                                "Sign Two Transactions (Approve & Spend)",
                                "Claim AGS After Presale Ends"
                            ].map((step, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <span className="w-6 h-6 flex items-center justify-center bg-red-600 text-white font-bold rounded-full text-xs">{index + 1}</span>
                                    <p className="text-xs md:text-base">{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Disclaimer Card - Now in its own card AGAIN */}
                    <div className="bg-white/50 backdrop-blur-md text-black p-3 rounded-2xl border border-purple-400/30 w-full max-w-xs md:w-1/3 text-[9px] text-center leading-tight">
                        <p className="mb-2 font-semibold text-red-500">
                            <FontAwesomeIcon icon={faExclamationTriangle} className="mr-1" />
                            Important: Due to regulatory restrictions, U.S. citizens and residents are strictly prohibited from participating in this presale.
                        </p>
                        <p className="mb-2">
                            By participating, you confirm that you are not a U.S. citizen or resident. Any attempt to bypass this restriction will result in an immediate ban and exclusion from the presale.
                        </p>
                        <p className="mb-2 text-gray-700">
                            If violations are detected, the Aigos team reserves the right to take legal action.
                        </p>
                        <div className="flex items-center justify-center gap-2">
                            <input type="checkbox" id="us-disclaimer" className="w-3 h-3 accent-red-500" />
                            <label htmlFor="us-disclaimer" className="cursor-pointer text-gray-700">
                                I confirm that I am not a U.S. citizen or resident.
                            </label>
                        </div>
                    </div>

                    {/* Seed Sale Component - Already in a card, keep as is */}
                    <div className="w-full max-w-md md:w-1/3 md:h-auto p-6 bg-white/30 backdrop-blur-lg rounded-2xl shadow-md border border-purple-400/30">
                        <SeedSale />
                    </div>
                </div>
            </div>
        </section>
    );
}