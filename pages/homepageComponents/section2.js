import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";

export default function Section2() {
  return (
    <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white text-center p-6 overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 opacity-50 bg-[url('/images/bg/12.jpg')] bg-cover bg-no-repeat bg-center blur-lg"></div>

      {/* Content Box */}
      <div className="relative z-10 w-full max-w-2xl bg-gradient-to-r from-neutral-900/90 to-neutral-800/90 p-8 sm:p-12 rounded-xl shadow-lg border border-neutral-700">
        <h5 className="uppercase text-red-500 font-bold text-lg md:text-xl mb-2">HOW TO BUY?</h5>
        <h5 className="uppercase text-white font-bold text-xl md:text-2xl mb-6">CHECK OUT OUR YOUTUBE TUTORIAL</h5>

        {/* YouTube Video Embed */}
        <div className="flex justify-center mb-6">
          <iframe
            className="w-full max-w-md h-48 sm:h-56 md:h-64 rounded-lg shadow-md"
            src="https://youtube.com/embed/0XSY4LVEIcc?rel=0"
            title="AIGOS INVEST IN OMNICHAIN DEFI"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Telegram Support Button */}
        <a
          href="https://t.me/Otje86"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold uppercase px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105"
        >
          TELEGRAM SUPPORT <FontAwesomeIcon icon={faTelegram} className="ml-2" />
        </a>
      </div>
    </section>
  );
}
