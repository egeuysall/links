"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IoIosClose } from "react-icons/io";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuAnimation, setMenuAnimation] = useState(false);
  const date = new Date();
  const year = date.getFullYear();

  // Handle animation timing
  useEffect(() => {
    if (mobileMenuOpen) {
      setMenuAnimation(true);
      // Prevent scrolling when menu is open
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => {
        setMenuAnimation(false);
        // Restore scrolling when menu is closed
        document.body.style.overflow = "";
      }, 300); // Match animation duration
      return () => clearTimeout(timer);
    }
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-10 flex justify-center w-full">
      <header className="w-[82.5vw] md:w-[87.5vw] lg:w-[92.5vw] bg-[#7F5539]/75 border-2 border-[#9C6644] h-18 rounded-lg flex justify-between shadow-sm backdrop-blur-md">
        <Link href="/" className="flex items-center">
          <Image
            width={18}
            height={18}
            className="ml-6 transition duration-200 hover:opacity-75"
            alt="Link logo for header"
            src="/logos/header-logo.svg"
          />
        </Link>
        <NavigationMenu className="items-center justify-center md:mr-3.5">
          <NavigationMenuList className="font-bold text-[#EDE0D4] flex">
            <NavigationMenuItem className="hidden md:flex">
              <NavigationMenuTrigger>Documentation</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="/docs/getting-started">
                  Getting started
                </NavigationMenuLink>
                <NavigationMenuLink href="/docs/changelog">
                  Changelog
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem className="hidden md:flex">
              <NavigationMenuTrigger>Links</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="/links/our-links">
                  Our links
                </NavigationMenuLink>
                <NavigationMenuLink href="/#newsletter">
                  Newsletter
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem className="hidden md:flex">
              <NavigationMenuTrigger>Discover</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="/discover/featured-links">
                  Featured links
                </NavigationMenuLink>
                <NavigationMenuLink href="/discover/tips">
                  Tips
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem className="hidden md:flex">
              <NavigationMenuTrigger>Create</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="/create/new-links">
                  New links
                </NavigationMenuLink>
                <NavigationMenuLink href="/create/new-links#customize">
                  Customize
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem className="hidden md:flex">
              <NavigationMenuTrigger>Contact</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="mailto:hello@egeuysal.com">
                  Support
                </NavigationMenuLink>
                <NavigationMenuLink href="/#contact">
                  Feedback
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
          <button onClick={toggleMobileMenu} className="flex md:hidden mr-6 ml-2.5">
            <Image
              width={28}
              height={28}
              alt="Hamburger menu"
              src="/icons/hamburger-menu.svg"
            />
          </button>
        </NavigationMenu>
      </header>

      {/* Full Screen Mobile Menu with Accordion */}
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
              className="text-[#593116] text-4xl transform transition-transform duration-300 hover:rotate-90"
              aria-label="Close menu"
            >
              <IoIosClose />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center px-8">
            <Accordion type="single" collapsible className="w-full max-w-md">
              <AccordionItem value="documentation" className="border-b-0">
                <AccordionTrigger className="font-bold text-3xl text-[#593116] flex items-center justify-center">
                  <span>Documentation</span>
                </AccordionTrigger>
                <AccordionContent className="text-center">
                  <Link 
                    href="/docs/getting-started" 
                    className="block py-3 text-[#593116] text-xl hover:text-[#9C6644] transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Getting started
                  </Link>
                  <Link 
                    href="/docs/changelog" 
                    className="block py-3 text-[#593116] text-xl hover:text-[#9C6644] transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Changelog
                  </Link>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="discover" className="border-b-0">
                <AccordionTrigger className="font-bold text-3xl text-[#593116] flex items-center justify-center">
                  <span>Discover</span>
                </AccordionTrigger>
                <AccordionContent className="text-center">
                  <Link 
                    href="/discover/featured-links" 
                    className="block py-3 text-[#593116] text-xl hover:text-[#9C6644] transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Featured links
                  </Link>
                  <Link 
                    href="/discover/tips" 
                    className="block py-3 text-[#593116] text-xl hover:text-[#9C6644] transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Tips
                  </Link>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="contact" className="border-b-0">
                <AccordionTrigger className="font-bold text-3xl text-[#593116] flex items-center justify-center">
                  <span>Contact</span>
                </AccordionTrigger>
                <AccordionContent className="text-center">
                  <Link 
                    href="mailto:hello@egeuysal.com" 
                    className="block py-3 text-[#593116] text-xl hover:text-[#9C6644] transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Support
                  </Link>
                  <Link 
                    href="/#contact" 
                    className="block py-3 text-[#593116] text-xl hover:text-[#9C6644] transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Feedback
                  </Link>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="create" className="border-b-0">
                <AccordionTrigger className="font-bold text-3xl text-[#593116] flex items-center justify-center">
                  <span>Create</span>
                </AccordionTrigger>
                <AccordionContent className="text-center">
                  <Link 
                    href="/create/new-links" 
                    className="block py-3 text-[#593116] text-xl hover:text-[#9C6644] transition-colors"
                    onClick={closeMobileMenu}
                  >
                    New links
                  </Link>
                  <Link 
                    href="/create/new-links#customize" 
                    className="block py-3 text-[#593116] text-xl hover:text-[#9C6644] transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Customize
                  </Link>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="links" className="border-b-0">
                <AccordionTrigger className="font-bold text-3xl text-[#593116] flex items-center justify-center">
                  <span>Links</span>
                </AccordionTrigger>
                <AccordionContent className="text-center">
                  <Link 
                    href="/links/our-links" 
                    className="block py-3 text-[#593116] text-xl hover:text-[#9C6644] transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Our links
                  </Link>
                  <Link 
                    href="/#newsletter" 
                    className="block py-3 text-[#593116] text-xl hover:text-[#9C6644] transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Newsletter
                  </Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="pb-10 text-center text-[#593116] opacity-70">
            <p className="font-bold">&copy; {year} Links</p>
          </div>
        </div>
      )}
    </div>
  );
}