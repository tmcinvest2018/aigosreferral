import SeedSale from "./seedSale.js";

export default function Section4() {
    return (
        <section id="section4" className="relative min-h-screen flex items-center justify-center bg-[url('/images/bg/20.jpg')] bg-cover bg-center bg-fixed overflow-hidden">
            {/* Dark overlay for better readability */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>
            
{/* Main container */}
<div className="relative z-10 flex flex-col items-center gap-6 px-6 sm:px-12 py-8 w-full max-w-6xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-white/20">
    
    {/* Steps to Buy - Centered Container with Left-Aligned Text */}
    <div className="bg-black/50 text-white p-5 sm:p-6 rounded-lg border border-white/20 w-full max-w-md">
        <h3 className="text-xl md:text-2xl font-extrabold mb-4 text-red-400 text-center">
            🚀 Join the AIGOS Presale Now!
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
                    <p className="text-xs md:text-sm">{step}</p>
                </div>
            ))}
        </div>
    </div>

    {/* Disclaimer Card */}
    <div className="bg-black/50 text-white p-3 rounded-lg border border-white/20 w-full max-w-xs text-[9px] text-center leading-tight">
    <p className="mb-2 font-semibold text-red-400">
        ⚠️ Important: Due to regulatory restrictions, U.S. citizens and residents are strictly prohibited from participating in this presale.
    </p>
    <p className="mb-2">
        By participating, you confirm that you are not a U.S. citizen or resident. Any attempt to bypass this restriction will result in an immediate ban and exclusion from the presale.
    </p>
    <p className="mb-2 text-gray-300">
        If violations are detected, the Aigos team reserves the right to take legal action.
    </p>
    <div className="flex items-center justify-center gap-2">
        <input type="checkbox" id="us-disclaimer" className="w-3 h-3 accent-red-500" />
        <label htmlFor="us-disclaimer" className="cursor-pointer">
            I confirm that I am not a U.S. citizen or resident.
            </label>
        </div>
    </div>
                
                {/* Seed Sale Component */}
                <div className="w-full max-w-md p-6 bg-white/20 backdrop-blur-lg rounded-xl shadow-md border border-white/30">
                    <SeedSale />
                </div>
            </div>
        </section>
    );
}
