import React, { useState } from 'react';
import { mindpath } from '../assets';
import { navLinks } from '../constants';
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    return (
        <nav className="w-full flex py-4 justify-between items-center navbar relative">
            {/* Left side: Logo */}
            <div className="flex items-center">
                <a href="/">
                    <img src={mindpath} alt="mindpth" className="w-[100%]" />
                </a>
            </div>


            {/* Right side: Contact Us */}
            <div className="hidden md:flex items-center space-x-2">
                <li className="list-none gradient-button font-poppins font-regular font-white text-gray cursor-pointer text-[16px] rounded-[30px]">
                    <Link to="/AboutPage">About</Link>
                </li>
                <li className="list-none gradient-button font-poppins font-regular font-white text-gray cursor-pointer text-[16px] px-6 py-3 rounded-[30px]">
                    <Link to="/ContactUsPage">Contact Us</Link>
                </li>
                <li href="#" className="list-none font-poppins font-medium text-white cursor-pointer text-[14px] bg-blue px-4 py-2 rounded-lg border border-blue-600">
                    <Link to="/MindPathLogin">Login</Link>
                </li>
                {/* <li href="#" className="list-none font-poppins font-medium text-white cursor-pointer text-[14px] bg-blue px-4 py-2 rounded-lg border border-blue-600">
          Find a therapist 
        </li> */}
            </div>

            {/* Hamburger Menu Icon */}
            <div className="md:hidden flex items-center">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="#072E52" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                    </svg>
                </button>
            </div>

            {/* Dropdown Menu for smaller screens */}
            {isMenuOpen && (
                <div className="absolute top-16 right-0 justify-center w-[50%] bg-blue shadow-lg md:hidden mt-10 rounded-md">
                    <ul className="flex flex-col items-center space-y-6 py-8">
                        {navLinks.map((link) => (
                            <li key={link.id} className={`font-poppins font-regular text-white cursor-pointer text-[16px] ${location.pathname === link.id ? 'text-orange-500' : 'text-white' } hover:text-orange-500`}>
                                <Link to={link.id}>{link.title}</Link>
                            </li>
                        ))}
                        {/* <li className="gradient-button font-poppins font-white text-white cursor-pointer text-[16px] px-6 py-3 rounded-[30px]">
                <Link to="/About">About</Link>
            </li>
            <li className="gradient-button font-poppins font-white text-white cursor-pointer text-[16px] px-6 py-3 rounded-[30px]">
                <Link to="/ContactUsPage">Contact Us</Link>
            </li> */}
                    </ul>
                </div>
            )}
        </nav>
    );
}

export default Navbar;