//topbar 

// components/NavbarHero.jsx
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_ITEMS = [
  { label: "Home", href: "/", key: "index" },
  { label: "About", href: "/about-us", key: "about-us" },
  { label: "Services", href: "/services", key: "services" },
  { label: "Pricing", href: "/pricing", key: "pricing" },
  { label: "Document Verification", href: "/verify-document", key: "document-verification" },
  { label: "Career", href: "/careers", key: "career", mobileOnly: true },
  { label: "Contact", href: "/contact-us", key: "contact" },
];

export default function NavbarHero({ currentPage, userSession }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile device
    setIsMobile(window.innerWidth < 992);
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const heroStyle = isMobile
    ? "bg-[url('/img/hero_new.jpg')] bg-cover h-[350px]"
    : "bg-[url('/img/hero_new.png')] bg-cover h-[600px]";

  return (
    <div className="relative w-full">
      {/* Navbar */}
      <nav className={`flex flex-wrap items-center justify-between px-4 lg:px-20 py-3 ${isMobile ? "bg-light" : "bg-white"}`}>
        <Link href="/">
          <a className="flex items-center space-x-3">
            <Image src="/img/logo.png" width={50} height={50} alt="Logo" />
            <div>
              <h1 className="text-primary font-bold text-xl uppercase">{process.env.NEXT_PUBLIC_SITE_TITLE}</h1>
              <span className="text-gray-500 italic text-sm">{process.env.NEXT_PUBLIC_SITE_SUB_TITLE}</span>
            </div>
          </a>
        </Link>

        {/* Hamburger for mobile */}
        <button
          className="block lg:hidden text-2xl"
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* Menu */}
        <div className="hidden lg:flex space-x-4 items-center">
          {NAV_ITEMS.map((item) => {
            if (item.mobileOnly) return null;
            const isActive = currentPage === item.key;
            return (
              <Link key={item.key} href={item.href}>
                <a className={`text-gray-700 hover:text-primary ${isActive ? "font-bold border-b-2 border-primary" : ""}`}>
                  {item.label}
                </a>
              </Link>
            );
          })}

          <Link href="#search">
            <a className="text-gray-700 hover:text-primary">
              <i className="fas fa-search"></i>
            </a>
          </Link>

          {userSession ? (
            <Link href={userSession.isAgent ? "/ag-dashboard" : "/dashboard"}>
              <a className="bg-light text-primary px-3 py-1 rounded-full text-sm">My Account</a>
            </Link>
          ) : (
            <div className="bg-light rounded-full px-3 py-1 text-sm space-x-2">
              <Link href="/login"><a className="text-primary">Login</a></Link> | 
              <Link href="/register"><a className="text-primary">Register</a></Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <div className={`w-full ${heroStyle} flex items-center justify-center`}>
        {isMobile && (
          <div className="text-center text-white">
            <h1 className="text-3xl font-bold animate-zoomIn">Welcome to {process.env.NEXT_PUBLIC_SITE_TITLE}</h1>
          </div>
        )}
      </div>
    </div>
  );
}
