// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import
{
    faTelegram
} from "@fortawesome/free-brands-svg-icons";

// Homepage HOW TO BUY Section
export default function Section2()
{
    return (
        <>
            {/* PARALLAX TWO START */}
            <section id="section2" className="flex items-center justify-center h-fit min-h-screen bg-fixed bg-center bg-cover bg-[url('/images/bg/12.jpg')]">
                <div className="text-center">
                    <div className="box-cont h-fit w-fit mt-[10%] px-14 mb-10 py-8 shadow-md bg-gradient-to-r from-neutral-900 rounded-lg">
                        <h5 className="uppercase text-red-600 font-bold">HOW TO BUY?</h5>
                        <h5 className="uppercase text-white font-bold">CHECK OUT OUR YOUTUBE TUTORIAL</h5>
                        <div className="flex items-center justify-center mb-6 mt-5">
                        <iframe className="md:w-[350px] md:h-[350px] h-[250px] w-[250px]"
                            src="https://www.youtube.com/embed/hP-Zpm7FeVk?rel=0"
                            title="AIGOS INVEST IN OMNICHAIN DEFI"
                            frame ="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen></iframe>
                        </div>
                        <a href="https://t.me/Otje86"
                            target="_blank"
                            className="bg-slate-300 text-black hover:bg-red-600 active:bg-red-900 font-bold uppercase text-base px-8 py-3 rounded-[24px] shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                            <span>PERSONAL GUIDANCE ASK ON TELEGRAM <FontAwesomeIcon icon={faTelegram} className="ml-2" /></span>
                        </a>
                    </div>
                </div>
            </section>
            {/* PARALLAX TWO END */}
        </>
    )
}