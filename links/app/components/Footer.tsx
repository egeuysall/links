import Image from "next/image";
import Link from "next/link";

function Footer() {
    return (
        <footer className="w-full bg-[#7F5539]/75 border-2 border-[#9C6644] p-6 mt-auto rounded-lg bg-opacity-55 shadow-sm backdrop-blur-md">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Copyright and Description */}
                <div className="flex flex-col space-y-2">
                    <div className="text-white font-medium text-lg">Links</div>
                    <div className="text-sm text-white/80">
                        &copy; 2025 Links. All rights reserved.
                    </div>
                    <div className="text-xs text-white/70">
                        Your go-to platform for sharing multiple links in one place.
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col space-y-2">
                    <div className="text-white font-medium">Resources</div>
                    <div className="flex flex-col space-y-1">
                        <Link href="/terms" className="text-sm text-white/80 hover:text-[#DDB892] transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="/privacy" className="text-sm text-white/80 hover:text-[#DDB892] transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/about" className="text-sm text-white/80 hover:text-[#DDB892] transition-colors">
                            About Us
                        </Link>
                        <Link href="/contact" className="text-sm text-white/80 hover:text-[#DDB892] transition-colors">
                            Contact Us
                        </Link>
                    </div>
                </div>

                {/* Social Media Icons */}
                <div className="flex flex-col space-y-2">
                    <div className="text-white font-medium">Connect</div>
                    <div className="flex items-center space-x-4">
                        <Link 
                            href="https://github.com/egeuysall" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-white hover:text-[#DDB892] transition-colors"
                        >
                            <div className="relative w-5 h-5">
                                <Image
                                    src="/icons/github.svg"
                                    alt="GitHub"
                                    fill
                                    sizes="20px"
                                    className="object-contain"
                                />
                            </div>
                        </Link>
                        <Link 
                            href="https://twitter.com/egecreates" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-white hover:text-[#DDB892] transition-colors"
                        >
                            <div className="relative w-5 h-5">
                                <Image
                                    src="/icons/twitter.svg"
                                    alt="Twitter"
                                    fill
                                    sizes="20px"
                                    className="object-contain"
                                />
                            </div>
                        </Link>
                        <Link 
                            href="https://linkedin.com/in/egeuysall" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-white hover:text-[#DDB892] transition-colors"
                        >
                            <div className="relative w-5 h-5">
                                <Image
                                    src="/icons/linkedin.svg"
                                    alt="LinkedIn"
                                    fill
                                    sizes="20px"
                                    className="object-contain"
                                />
                            </div>
                        </Link>
                        <Link 
                            href="https://www.egeuysal.com/" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-white hover:text-[#DDB892] transition-colors"
                        >
                            <div className="relative w-5 h-5">
                                <Image
                                    src="/icons/globe.svg"
                                    alt="Personal Website"
                                    fill
                                    sizes="20px"
                                    className="object-contain"
                                />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;