import SeedSale from "./seedSale.js";

export default function Section4() {
    return (
        <section id="section4" className="relative min-h-screen flex items-center justify-center bg-[url('/images/bg/20.jpg')] bg-cover bg-center bg-fixed overflow-hidden">
            {/* Dark overlay for better readability */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>
            
            {/* Main container */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-10 px-6 sm:px-12 py-12 w-full max-w-6xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-white/20">
                
                {/* Steps to Buy */}
                <div className="text-white max-w-md">
                    <h3 className="text-2xl md:text-3xl font-extrabold mb-6 text-red-400">
                        🚀 Join the AIGOS Presale Now!
                    </h3>
                    <div className="space-y-4">
                        {["Connect Wallet", "Enter AIGOS Amount & Click Buy", "Approve USDT Spending in Wallet", "Confirm Transaction", "Receive AIGOS After Presale Ends", "Sign Two Transactions (Approve & Spend)"].map((step, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <span className="w-8 h-8 flex items-center justify-center bg-red-600 text-white font-bold rounded-full text-sm">{index + 1}</span>
                                <p className="text-sm md:text-base">{step}</p>
                            </div>
                        ))}
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
