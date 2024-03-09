import SeedSale from "./seedSale.js";

// Homepage Section2 Section
export default function Section4()
{
    return (
        <>
            <section id="section4" className="flex place-items-center justify-around min-h-screen h-fit bg-fixed bg-center bg-cover bg-[url('/images/bg/20.jpg')]">
                <div className="grid grid-flow-row auto-rows-min sm:grid-flow-col justify-around">
                    <div className="text-left">
                        <div className="box-cont h-fit w-fit px-14 mb-10 py-8 shadow-md bg-gradient-to-r from-neutral-900 rounded-lg">
                            <h3 className="text-white font-bold">
                                🚀 6 Steps to buy in to  <br />
                                AIGOS Presale.
                            </h3>
                            <p className="text-white"><strong>1) </strong> Connect Wallet</p>
                            <p className="text-white"><strong>2) </strong> Click buy with USDT and Enter AIGOS amount to buy</p>
                            <p className="text-white"><strong>3) </strong> Click convert USDT and approve in wallet</p>
                            <p className="text-white"><strong>4) </strong> Click convert USDT again to spend USDT </p>
                            <p className="text-white"><strong>5) </strong> AIGOS will be credited to wallet when Presale ends</p>
                            <p className="text-white mb-5"><strong>6) </strong> So you have to sign 2 tx 1 is for approve and one for spend</p>
                        </div>
                    </div>
                    <SeedSale />
                </div>
            </section>
        </>
    )
}