'use client';
import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-linear-to-b from-black to-[#111] px-4 py-4 sm:px-8 sm:py-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-orange-500 sm:text-2xl">
          Chamuditha
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-10 text-xs sm:text-sm font-medium">
          <li>
            <Link
              href="/"
              className="text-orange-500 transition hover:text-orange-400"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="#services"
              className="text-gray-400 transition hover:text-white"
            >
              About me
            </Link>
          </li>
         
          <li>
            <Link
              href="#portfolio"
              className="text-gray-400 transition hover:text-white"
            >
              projects
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="text-gray-400 transition hover:text-white"
            >
              Contact me
            </Link>
          </li>
        </ul>

        {/* Desktop Hire Me Button */}
        <Link
          href="#hire"
          className="hidden md:block rounded-md bg-orange-500 px-4 py-2 sm:px-6 text-xs sm:text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          Hire Me
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-orange-500 text-2xl"
        >
          {isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-gray-700">
          <ul className="flex flex-col gap-3 text-sm font-medium pt-4">
            <li>
              <Link
                href="/"
                className="text-orange-500 transition hover:text-orange-400 block py-2"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#services"
                className="text-gray-400 transition hover:text-white block py-2"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="#about"
                className="text-gray-400 transition hover:text-white block py-2"
              >
                About me
              </Link>
            </li>
            <li>
              <Link
                href="#portfolio"
                className="text-gray-400 transition hover:text-white block py-2"
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className="text-gray-400 transition hover:text-white block py-2"
              >
                Contact me
              </Link>
            </li>
            <li>
              <Link
                href="#hire"
                className="block rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600 text-center mt-2"
              >
                Hire Me
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
