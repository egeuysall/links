import Image from "next/image";
import Link from "next/link";

function Footer() {
    return (
        <footer className="w-full bg-[#7F5539]/75 border-2 border-[#9C6644] p-4 mt-auto rounded-lg flex justify-between items-center bg-opacity-55 shadow-sm backdrop-blur-md">
            <div className="text-sm text-white">
            &copy; 2025 Links. All rights reserved.
            </div>
            <div className="flex space-x-4">
                <Link href="/terms" className="text-sm text-white hover:text-[#DDB892]">
                    Terms
                </Link>
                <Link href="/privacy" className="text-sm text-white hover:text-[#DDB892]">
                    Privacy
                </Link>
                <Link href="/contact" className="text-sm text-white hover:text-[#DDB892]">
                    Contact
                </Link>
            </div>
        </footer>
    );
}

export default Footer;