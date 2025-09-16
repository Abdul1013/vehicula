"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NAV_ITEMS = [
  { label: "Home", href: "/", key: "index" },
  { label: "About", href: "/about-us", key: "about-us" },
  { label: "Services", href: "/services", key: "services" },
  { label: "Pricing", href: "/pricing", key: "pricing" },
  {
    label: "Document Verification",
    href: "/verify-document",
    key: "document-verification",
  },
  { label: "Career", href: "/careers", key: "career", mobileOnly: true },
  { label: "Contact", href: "/contact-us", key: "contact" },
];

export default function NavbarHero({ currentPage }) {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userSession, setUserSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Detect mobile device
    setIsMobile(window.innerWidth < 992);
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);

    // Fetch user session
    const fetchUserSession = async () => {
      try {
        console.log("Fetching user session...");
        const response = await fetch("/api/auth/check-session", {
          credentials: "include", // Ensure cookies are sent
        });
        const data = await response.json();
        console.log("Session response:", data);
        setUserSession(data.user);
      } catch (error) {
        console.error("Error fetching user session:", error);
        setUserSession(null);
      }
    };

    fetchUserSession();

    // Re-fetch session on route change
    router.events?.on("routeChangeComplete", fetchUserSession);

    return () => {
      window.removeEventListener("resize", handleResize);
      router.events?.off("routeChangeComplete", fetchUserSession);
    };
  }, [router.events]);

  const heroStyle = isMobile
    ? "bg-[url('/img/hero_new.jpg')] bg-cover h-[350px]"
    : "bg-[url('/img/hero_new.png')] bg-cover h-[600px]";

  return (
    <div className='relative w-full'>
      {/* Navbar */}
      <nav
        className={`flex flex-wrap items-center justify-between px-4 lg:px-20 py-3 ${isMobile ? "bg-light" : "bg-white"}`}
      >
        <Link href='/'>
          <a className='flex items-center space-x-3'>
            <Image src='/img/logo.png' width={50} height={50} alt='Logo' />
            <div>
              <h1 className='text-primary font-bold text-xl uppercase'>
                {process.env.NEXT_PUBLIC_SITE_TITLE}
              </h1>
              <span className='text-gray-500 italic text-sm'>
                {process.env.NEXT_PUBLIC_SITE_SUB_TITLE}
              </span>
            </div>
          </a>
        </Link>

        {/* Hamburger for mobile */}
        <button
          className='block lg:hidden text-2xl'
          type='button'
          aria-label='Toggle menu'
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          <i className='fas fa-bars'></i>
        </button>

        {/* Menu */}
        <div
          className={`w-full lg:flex lg:items-center lg:w-auto ${mobileMenuOpen ? "block" : "hidden"}`}
        >
          <div className='lg:flex lg:space-x-4 lg:items-center'>
            {NAV_ITEMS.map((item) => {
              if (item.mobileOnly && !isMobile) return null;
              const isActive = currentPage === item.key;
              return (
                <Link key={item.key} href={item.href}>
                  <a
                    className={`block py-2 lg:py-0 text-gray-700 hover:text-primary ${isActive ? "font-bold border-b-2 border-primary" : ""}`}
                  >
                    {item.label}
                  </a>
                </Link>
              );
            })}

            <Link href='#search'>
              <a className='block py-2 lg:py-0 text-gray-700 hover:text-primary'>
                <i className='fas fa-search'></i>
              </a>
            </Link>

            {userSession ? (
              userSession.mustChangePassword ? (
                <Link href='/change-password'>
                  <a className='block py-2 lg:py-0 bg-light text-primary px-3 rounded-full text-sm'>
                    Change Password
                  </a>
                </Link>
              ) : (
                <Link
                  href={userSession.isAgent ? "/ag-dashboard" : "/dashboard"}
                >
                  <a className='block py-2 lg:py-0 bg-light text-primary px-3 rounded-full text-sm'>
                    My Account
                  </a>
                </Link>
              )
            ) : (
              <div className='block py-2 lg:py-0 bg-light rounded-full px-3 text-sm space-x-2'>
                <Link href='/login'>
                  <a className='text-primary'>Login</a>
                </Link>
                <span>|</span>
                <Link href='/register'>
                  <a className='text-primary'>Register</a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className={`w-full ${heroStyle} flex items-center justify-center`}>
        {isMobile && (
          <div className='text-center text-white'>
            <h1 className='text-3xl font-bold animate-zoomIn'>
              Welcome to {process.env.NEXT_PUBLIC_SITE_TITLE}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
