import { Navbar, Button } from "flowbite-react";

export default function Menu() {
    return (
        <>
            {/* Menu START */}
            <Navbar
                fluid={true}
                rounded={true}
                className="px-4 sm:px-6 lg:px-8 py-2 bg-transparent fixed w-full z-20 top-0 left-0 backdrop-blur-md border-b border-neutral-700 shadow-lg"
            >
                {/* Brand Logo */}
                <Navbar.Brand href="#">
                    <img src="/images/logo1.png" style={{ width: '2.5rem' }} className="mr-2 hover:opacity-80 transition-opacity" alt="AIGOS LOGO" />
                </Navbar.Brand>

                {/* Join Presale Button and Menu Button */}
                <div className="flex gap-2 order-2">
                    {/* Join Presale Button */}
                    <a href="#section4">
                        <Button className="text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1 text-center transition-all duration-300 hover:scale-105">
                            JOIN PRESALE
                        </Button>
                    </a>
                    {/* Menu Button */}
                    <Navbar.Toggle />
                </div>

                {/* Navbar Links */}
                <Navbar.Collapse className="flex flex-col p-4 mt-4 rounded-lg border border-neutral-700 md:flex-row md:space-x-2 md:mt-0 md:text-xs md:font-medium md:border-0 bg-neutral-900/50 md:bg-transparent max-h-[60vh] overflow-y-auto md:max-h-none md:overflow-y-visible">
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
                        <Navbar.Link
                            key={index}
                            href={item.href}
                            target={item.external ? "_blank" : ""}
                            rel={item.external ? "noopener noreferrer" : ""}
                            className="uppercase block py-1 px-2 text-white rounded hover:bg-neutral-700 md:hover:bg-transparent md:hover:text-red-500 md:p-0 transition-colors duration-300 text-xs"
                        >
                            {item.label}
                        </Navbar.Link>
                    ))}
                </Navbar.Collapse>
            </Navbar>
            {/* Menu END */}
        </>
    );
}
