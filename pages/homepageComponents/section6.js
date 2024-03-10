// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import
{
    faTelegram, faTwitter
} from "@fortawesome/free-brands-svg-icons";

// Homepage Section2 Section
export default function Section6()
{
    return (
        <>
            <section id="section6" className="flex items-center justify-center h-fit min-h-screen bg-fixed bg-center bg-cover bg-[url('/images/bg/24.jpg')]">
                <div className="text-center">
                    <div className="box-cont h-fit w-fit mt-[10%] px-14 mb-10 py-8 shadow-md bg-gradient-to-r from-neutral-900 rounded-lg">
                        <h5 className="uppercase text-red-600 font-bold">
                            AIGOS MISSION 
                        </h5>
                        <h5 className="uppercasecase text-white font-bold">
                            AI GAMING OMNICHAIN 
                        </h5>
                        <p className="text-white mb-5">
                        Welcome to Aigos, a groundbreaking project 
                        at the forefront of blockchain innovation. 
                        At Aigos, our mission is clear: 
                        to empower omnichain interoperability and 
                        revolutionize the way blockchain networks communicate and transact.
                        </p>
                        <a href="https://twitter.com/xtmcswap/"
                            target="_blank"
                            className="bg-slate-300 mt-5 text-black hover:bg-red-600 active:bg-red-900 font-bold uppercase text-base px-8 py-3 rounded-[24px] shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                            <span>Follow on twitter <FontAwesomeIcon icon={faTwitter} className="ml-2" /></span>
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}