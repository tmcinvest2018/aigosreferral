import { Navbar, Button } from "flowbite-react";

export default function Menu() {
    return (
        <>
            {/* Menu START */}
            <Navbar
                fluid={true}
                rounded={true}
                className="px-4 sm:px-6 lg:px-8 py-2 bg-gradient-to-b from-neutral-900 to-neutral-800 fixed w-full z-20 top-0 left-0 border-b border-neutral-700 shadow-lg"
            >
                {/* Brand Logo */}
                <Navbar.Brand href="#">
                    <img src="/images/logo1.png" style={{ width: '2.5rem' }} className="mr-2 hover:opacity-80 transition-opacity" alt="AIGOS LOGO" />
                </Navbar.Brand>

                {/* Join Presale Button */}
                <div className="flex md:order-2">
                    <a href="#section4">
                        <Button className="text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-4 py-2 text-center transition-all duration-300 hover:scale-105">
                            JOIN PRESALE
                        </Button>
                    </a>
                    <Navbar.Toggle />
                </div>

                {/* Navbar Links */}
                <Navbar.Collapse className="flex flex-col p-4 mt-4 rounded-lg border border-neutral-700 md:flex-row md:space-x-4 md:mt-0 md:text-sm md:font-medium md:border-0 bg-neutral-900 md:bg-transparent max-h-[60vh] overflow-y-auto md:max-h-none md:overflow-y-visible">
                    <Navbar.Link
                        href="#home"
                        className="uppercase block py-1 px-3 text-white rounded hover:bg-neutral-700 md:hover:bg-transparent md:hover:text-red-500 md:p-0 transition-colors duration-300 text-xs md:text-sm"
                    >
                        HOME
                    </Navbar.Link>
                    <Navbar.Link
                        href="#section2"
                        className="uppercase block py-1 px-3 text-white rounded hover:bg-neutral-700 md:hover:bg-transparent md:hover:text-red-500 md:p-0 transition-colors duration-300 text-xs md:text-sm"
                    >
                        STEP BY STEP GUIDE
                    </Navbar.Link>
                    <Navbar.Link
                        href="#section3"
                        className="uppercase block py-1 px-3 text-white rounded hover:bg-neutral-700 md:hover:bg-transparent md:hover:text-red-500 md:p-0 transition-colors duration-300 text-xs md:text-sm"
                    >
                        WHITEPAPER
                    </Navbar.Link>
                    <Navbar.Link
                        href="#section4"
                        className="uppercase block py-1 px-3 text-white rounded hover:bg-neutral-700 md:hover:bg-transparent md:hover:text-red-500 md:p-0 transition-colors duration-300 text-xs md:text-sm"
                    >
                        BUY AIGOS
                    </Navbar.Link>
                    <Navbar.Link
                        href="#section5"
                        className="uppercase block py-1 px-3 text-white rounded hover:bg-neutral-700 md:hover:bg-transparent md:hover:text-red-500 md:p-0 transition-colors duration-300 text-xs md:text-sm"
                    >
                        DOCUMENTATION
                    </Navbar.Link>
                    <Navbar.Link
                        href="#section6"
                        className="uppercase block py-1 px-3 text-white rounded hover:bg-neutral-700 md:hover:bg-transparent md:hover:text-red-500 md:p-0 transition-colors duration-300 text-xs md:text-sm"
                    >
                        SOCIAL MEDIA
                    </Navbar.Link>
                    <Navbar.Link
                        href="#section7"
                        className="uppercase block py-1 px-3 text-white rounded hover:bg-neutral-700 md:hover:bg-transparent md:hover:text-red-500 md:p-0 transition-colors duration-300 text-xs md:text-sm"
                    >
                        TOKENOMICS
                    </Navbar.Link>
                    <Navbar.Link
                        href="#section8"
                        className="uppercase block py-1 px-3 text-white rounded hover:bg-neutral-700 md:hover:bg-transparent md:hover:text-red-500 md:p-0 transition-colors duration-300 text-xs md:text-sm"
                    >
                        OUR TEAM
                    </Navbar.Link>
                    <Navbar.Link
                        href="#section9"
                        className="uppercase block py-1 px-3 text-white rounded hover:bg-neutral-700 md:hover:bg-transparent md:hover:text-red-500 md:p-0 transition-colors duration-300 text-xs md:text-sm"
                    >
                        ROADMAP
                    </Navbar.Link>
                    <Navbar.Link
                        href="https://aigosswap.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="uppercase block py-1 px-3 text-white rounded hover:bg-neutral-700 md:hover:bg-transparent md:hover:text-red-500 md:p-0 transition-colors duration-300 text-xs md:text-sm"
                    >
                        AIGOSDEX
                    </Navbar.Link>
                    <Navbar.Link
                        href="https://euphonious-biscuit-eb57a8.netlify.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="uppercase block py-1 px-3 text-white rounded hover:bg-neutral-700 md:hover:bg-transparent md:hover:text-red-500 md:p-0 transition-colors duration-300 text-xs md:text-sm"
                    >
                        AITRADING
                    </Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
            {/* Menu END */}
        </>
    );
}