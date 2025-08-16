'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed mb-40 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      {/* navbar start */}
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="items-center">
            <Image
              src="/images/logo.png"
              alt="Vehiculars"
              width={50}
              height={50}
              className="h-12 w-auto"
            />
            <div className="ml-2">
              {/* <h1 className="text-xl font-bold text-blue-600 uppercase">Vehiculars</h1> */}
              {/* <p className="text-sm text-gray-600 italic">Vehicle Particulars - Easy Installments</p> */}
              <p className="text-sm text-gray-600 italic">Vehiculars</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link href="#AboutUs" className="text-gray-700 hover:text-blue-600">About</Link>
            <Link href="#ServicesWeOffer" className="text-gray-700 hover:text-blue-600">Services</Link>
            <Link href="#PricingAndInstallments" className="text-gray-700 hover:text-blue-600">Pricing</Link>
            <Link href="#ContactUs" className="text-gray-700 hover:text-blue-600">Contact</Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="px-4 py-2 text-blue-600 rounded-full border-2 border-blue-600 hover:bg-blue-50"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="pt-4 pb-3 space-y-3">
            <Link href="/" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Home</Link>
            <Link href="#AboutUs" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">About</Link>
            <Link href="#ServicesWeOffer" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Services</Link>
            <Link href="#PricingAndInstallments" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Pricing</Link>
            <Link href="#ContactUs" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Contact</Link>
            <div className="flex flex-col space-y-2 pt-2 border-t">
              <Link
                href="/login"
                className="px-4 py-2 text-center text-blue-600 rounded-full border-2 border-blue-600 hover:bg-blue-50"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 text-center text-white bg-blue-600 rounded-full hover:bg-blue-700"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
