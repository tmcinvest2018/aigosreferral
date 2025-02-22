import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
import Link from 'next/link';

export default function Section2() {
  return (
    <section className="relative flex items-center justify-center min-h-screen bg-white text-black text-center p-6">
      {/* Removed background image and overlay */}

      {/* Content Box - Glassmorphic Card */}
      <div className="relative z-10 w-full max-w-4xl bg-white/50 backdrop-blur-md rounded-3xl shadow-xl border border-purple-400/50 p-8 md:p-12">
        <h5 className="uppercase text-red-500 font-bold text-lg md:text-xl mb-2">HOW TO BUY?</h5>
        <h5 className="uppercase text-black font-bold text-xl md:text-2xl mb-6">CHECK OUT OUR YOUTUBE TUTORIAL</h5>

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

        {/* Telegram Support Button - Corrected Link (External) */}
        <a
          href="https://t.me/AIGOS2025"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-red-500 to-purple-600 text-white font-bold uppercase px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105"
        >
          TELEGRAM SUPPORT <FontAwesomeIcon icon={faTelegram} className="ml-2" />
        </a>
      </div>
    </section>
  );
}