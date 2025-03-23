"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuAnimation, setMenuAnimation] = useState(false);
  const [buttonAnimation, setButtonAnimation] = useState(false);
  const date = new Date();
  const year = date.getFullYear();

  // Handle animation timing
  useEffect(() => {
    if (mobileMenuOpen) {
      setMenuAnimation(true);
    } else {
      const timer = setTimeout(() => {
        setMenuAnimation(false);
      }, 300); // Match animation duration
      return () => clearTimeout(timer);
    }
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setButtonAnimation(true);
    setTimeout(() => setButtonAnimation(false), 300);
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-10 flex justify-center">
      <header className="w-[85vw] max-w-7xl bg-[#7F5539]/75 border-2 border-[#9C6644] h-18 rounded-lg flex justify-between bg-opacity-55 shadow-sm backdrop-blur-md">
        <Image
          width={18}
          height={18}
          className="ml-6 transition duration-200 hover:opacity-75"
          alt="Link logo for header"
          src="/logos/header-logo.svg"
        />

        <nav className="flex items-center justify-center">
          <ul className="font-bold text-[#EDE0D4] flex gap-4">
            <li className="hidden md:flex">
              <Link
                href="#explore"
                className="transition duration-200 hover:opacity-75"
              >
                Explore
              </Link>
            </li>
            <li className="hidden md:flex">
              <Link
                href="#features"
                className="transition duration-200 hover:opacity-75"
              >
                Features
              </Link>
            </li>
            <li className="hidden md:flex">
              <Link
                href="#create"
                className="transition duration-200 hover:opacity-75"
              >
                Create
              </Link>
            </li>
            <li className="hidden md:flex">
              <Link
                href="#faq"
                className="transition duration-200 hover:opacity-75"
              >
                FAQ
              </Link>
            </li>
            <li className="flex items-center justify-center mr-2">
              <button 
                onClick={toggleMobileMenu} 
                aria-label="Toggle mobile menu"
                className={`transform ${buttonAnimation ? 'scale-90' : ''} transition-transform duration-300`}
              >
                <Image
                  width={28}
                  height={28}
                  className="mr-6 flex md:hidden transition duration-200 hover:opacity-75"
                  alt="Hamburger menu for header"
                  src="/icons/hamburger-menu.svg"
                />
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Full Screen Mobile Menu with Animation */}
      {menuAnimation && (
        <div 
          className={`fixed inset-0 bg-[#EDE0D4] bg-[url("/images/texture.svg")] bg-cover bg-center z-50 md:hidden flex flex-col transition-all duration-300 ease-in-out ${
            mobileMenuOpen 
              ? "opacity-100 scale-100" 
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <div className="flex justify-end p-6">
            <button 
              onClick={toggleMobileMenu}
              className="text-[#7F5539] text-4xl transform transition-transform duration-300 hover:rotate-90"
              aria-label="Close menu"
            >
              ×
            </button>
          </div>
          
          <nav className="flex-1 flex items-center justify-center">
            <ul className="space-y-8 text-center text-[#7F5539] text-2xl font-bold">
              <li 
                className="transform transition-all duration-300 hover:scale-110"
                style={{ animationDelay: "100ms" }}
              >
                <h1>
                  <Link 
                    href="#explore"
                    className="block p-2 transition duration-200 hover:text-[#9C6644]"
                    onClick={toggleMobileMenu}
                  >
                    Explore
                  </Link>
                </h1>
              </li>
              <li 
                className="transform transition-all duration-300 hover:scale-110"
                style={{ animationDelay: "200ms" }}
              >
                <h1>
                  <Link 
                    href="#features"
                    className="block p-2 transition duration-200 hover:text-[#9C6644]"
                    onClick={toggleMobileMenu}
                  >
                    Features
                  </Link>
                </h1>
              </li>
              <li 
                className="transform transition-all duration-300 hover:scale-110"
                style={{ animationDelay: "300ms" }}
              >
                <h1>
                  <Link 
                    href="#create"
                    className="block p-2 transition duration-200 hover:text-[#9C6644]"
                    onClick={toggleMobileMenu}
                  >
                    Create
                  </Link>
                </h1>
              </li>
              <li 
                className="transform transition-all duration-300 hover:scale-110"
                style={{ animationDelay: "400ms" }}
              >
                <h1>
                  <Link 
                    href="#faq"
                    className="block p-2 transition duration-200 hover:text-[#9C6644]"
                    onClick={toggleMobileMenu}
                  >
                    FAQ
                  </Link>
                </h1>
              </li>
            </ul>
          </nav>
          
          <div className="pb-10 text-center text-[#7F5539] opacity-70">
            <p className="font-bold">&copy; {year} Links</p>
          </div>
        </div>
      )}
    </div>
  );
}