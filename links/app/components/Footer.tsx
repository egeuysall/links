import Image from "next/image";
import Link from "next/link";

function Footer() {
    return (
        <footer className="w-full bg-[#7F5539]/75 border-2 border-[#9C6644] p-8 mt-auto rounded-xl shadow-sm backdrop-blur-md">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Copyright and Description */}
                <div className="flex flex-col space-y-3">
                    <h2 className="text-[#EDE0D4] font-bold text-2xl">Copyright</h2>
                    <p className="text-base text-[#EDE0D4]">
                        &copy; 2025 Links. All rights reserved.
                    </p>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col space-y-3">
                    <h2 className="text-[#EDE0D4] font-bold text-2xl">Resources</h2>
                    <ul className="flex flex-col space-y-2">
                        <li>
                            <Link href="/terms" className="text-base text-[#EDE0D4] hover:text-[#DDB892] transition-colors">
                                Terms of Service
                            </Link>
                        </li>
                        <li>
                            <Link href="/privacy" className="text-base text-[#EDE0D4] hover:text-[#DDB892] transition-colors">
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className="text-base text-[#EDE0D4] hover:text-[#DDB892] transition-colors">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="text-base text-[#EDE0D4] hover:text-[#DDB892] transition-colors">
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Social Media Icons */}
                <div className="flex flex-col space-y-3">
                    <h2 className="text-[#EDE0D4] font-bold text-2xl">Connect</h2>
                    <address className="not-italic">
                        <ul className="flex items-center space-x-5">
                            <li>
                                <Link 
                                    href="https://www.egeuysal.com/" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-[#EDE0D4] hover:text-[#DDB892] transition-colors"
                                    aria-label="Personal Website"
                                >
                                    <div className="relative w-6 h-6">
                                        <Image
                                            src="/icons/globe.svg"
                                            alt="Personal Website"
                                            fill
                                            sizes="24px"
                                            className="object-contain"
                                        />
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="https://github.com/egeuysall" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-[#EDE0D4] hover:text-[#DDB892] transition-colors"
                                    aria-label="GitHub"
                                >
                                    <div className="relative w-6 h-6">
                                        <Image
                                            src="/icons/github.svg"
                                            alt="GitHub"
                                            fill
                                            sizes="24px"
                                            className="object-contain"
                                        />
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="https://twitter.com/egecreates" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-[#EDE0D4] hover:text-[#DDB892] transition-colors"
                                    aria-label="Twitter"
                                >
                                    <div className="relative w-6 h-6">
                                        <Image
                                            src="/icons/twitter.svg"
                                            alt="Twitter"
                                            fill
                                            sizes="24px"
                                            className="object-contain"
                                        />
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="https://linkedin.com/in/egeuysall" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-[#EDE0D4] hover:text-[#DDB892] transition-colors"
                                    aria-label="LinkedIn"
                                >
                                    <div className="relative w-6 h-6">
                                        <Image
                                            src="/icons/linkedin.svg"
                                            alt="LinkedIn"
                                            fill
                                            sizes="24px"
                                            className="object-contain"
                                        />
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </address>
                </div>
            </div>
        </footer>
    );
}

export default Footer;