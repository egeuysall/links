import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
              <Link href="#menu">
                <Image
                  width={28}
                  height={28}
                  className="mr-6 flex md:hidden transition duration-200 hover:opacity-75"
                  alt="Hamburger menu for header"
                  src="/icons/hamburger-menu.svg"
                />
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}