// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import
{
  faTelegram
} from "@fortawesome/free-brands-svg-icons";


// Homepage Home Section
export default function HomeSection()
{
    return (
        <>
            {/* PARALLAX ONE START */}
            <section id="home" className="flex items-center justify-center h-fit min-h-screen bg-fixed bg-center bg-cover bg-[url('/images/bg/16.jpg')]">
                <div className="container mx-auto text-center mt-[100px] md:mt-0">
                    <h5 className="uppercase text-white font-bold">Buy now or cry later</h5>
                    <h2 className="uppercase lead text-white font-bold">AIGOS 2024 PRE SALE</h2>
                    <p className="text-orange-500 font-bold">Price increases 15% every 10 DAYS</p><br />
                    <p className="text-white"><strong>✓</strong> GAMING <strong>✓</strong> ARTIFFICIAL INTELLIGENCE
                        <strong>✓</strong> CROSS CHAIN SWAPS <strong>✓</strong> BITCOIN TO EVM SWAPS <strong>✓</strong> NO CEX NEEDED FOR BITCOIN SWAPS 
                        <strong>✓</strong> MUCH MORE</p>
                    <br />
                    <a href="https://t.me/Otje86" target="_blank" className="bg-neutral-900 text-white hover:bg-red-600 active:bg-red-900 font-bold uppercase text-base px-8 py-3 rounded-[24px] shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                        <span>Join our telegram <FontAwesomeIcon icon={faTelegram} className="ml-2"/></span>
                    </a>
                </div>
            </section>
            {/* PARALLAX ONE END */}
        </>
    )
}