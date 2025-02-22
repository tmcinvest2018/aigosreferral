import { Navbar, Button } from "flowbite-react";
import Link from 'next/link';

export default function Menu() {
    return (
        <>
            <Navbar
                fluid={true}
                rounded={true}
                className="px-4 sm:px-6 lg:px-8 py-2 fixed w-full z-20 top-0 left-0 bg-gradient-to-r from-red-500 to-purple-600 border-b border-purple-400/50 shadow-lg"
            >
                <Navbar.Brand href="#">
                    <img src="/logo1.png" style={{ width: '2.5rem' }} className="mr-2 hover:opacity-80 transition-opacity" alt="AIGOS LOGO" />
                </Navbar.Brand>

                <div className="flex gap-2 order-2">
                    <Link href="#section4">
                        <Button className="text-red-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1 text-center transition-all duration-300 hover:scale-105">
                            JOIN PRESALE
                        </Button>
                    </Link>
                    <Navbar.Toggle /> {/* No onClick needed! */}
                </div>

                <Navbar.Collapse>
                    {/* No extra div! Links are direct children */}
                    {[
                        { href: "#home", label: "HOME" },
                        { href: "#section2", label: "STEP BY STEP GUIDE" },
                        { href: "#section3", label: "WHITEPAPER" },
                        { href: "#section4", label: "BUY AIGOS" },
                        { href: "#section5", label: "DOCUMENTATION" },
                        { href: "#section6", label: "SOCIAL MEDIA" },
                        { href: "#section7", label: "TOKENOMICS" },
                        { href: "#section8", label: "OUR TEAM" },
                        { href: "#section9", label: "ROADMAP" },
                        { href: "https://aigosswap.vercel.app", label: "AIGOSDEX", external: true },
                        { href: "https://euphonious-biscuit-eb57a8.netlify.app/", label: "AITRADING", external: true },
                    ].map((item, index) => (
                        item.external ? (
                            <a
                                key={index}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="uppercase block py-2 pl-3 pr-4 text-white rounded hover:bg-purple-400/50 md:hover:bg-transparent md:hover:text-black md:p-0 transition-colors duration-300 text-xs"
                            >
                                {item.label}
                            </a>
                        ) : (
                            <Link key={index} href={item.href} >
                                <span
                                   className="uppercase block py-2 pl-3 pr-4 text-white rounded hover:bg-purple-400/50 md:hover:bg-transparent md:hover:text-black md:p-0 transition-colors duration-300 text-xs"
                                 >
                                    {item.label}
                                </span>
                            </Link>
                        )
                    ))}
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}