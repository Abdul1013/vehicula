import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <div>
       <footer className="bg-gray-900 text-white py-16">
            <p className="text-center p-5 text-2xl">
              Vehiculars - Your Trusted Partner for Vehicle Services
            </p>
            <p className="text-center p-5">
              Quick & Reliable Vehicle Help – Vehicle Registration, Peer-to-Peer
              Auto Financing, Driver's Licenses, Spare Parts, Roadside
              Assistance, Auto Port Clearing, and More
            </p>
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Get In Touch */}
                <div>
                  <h5 className="text-xl font-bold mb-4">Get In Touch</h5>
                  <div className="space-y-3 font-medium">
                    <p className="flex items-start">
                      <i className="fas fa-map-marker-alt mt-1 mr-3"></i>
                      FIRST FLOOR, NOVARE CENTRAL MALL BY SHOPRITE WUSE ZONE 5 -
                      FCT, ABUJA
                    </p>
                    <div className="space-y-2">
                      <a
                        href="tel:+2349130750009"
                        className="flex items-center hover:text-blue-400"
                      >
                        <i className="fas fa-phone-alt mr-3"></i>
                        +234 913 075 0009
                      </a>
                      <a
                        href="tel:+2347044416837"
                        className="flex items-center hover:text-blue-400"
                      >
                        <i className="fas fa-phone-alt mr-3"></i>
                        +234 704 441 6837
                      </a>
                      <a
                        href="tel:+2349133352533"
                        className="flex items-center hover:text-blue-400"
                      >
                        <i className="fas fa-phone-alt mr-3"></i>
                        +234 913 335 2533
                      </a>
                    </div>
                    <a
                      href="mailto:info@vehiculars.ng"
                      className="flex items-center hover:text-blue-400"
                    >
                      <i className="fas fa-envelope mr-3"></i>
                      info@vehiculars.ng
                    </a>
                    <div className="flex space-x-4 pt-2">
                      <a
                        href="https://twitter.com/Vehicularsng"
                        className="p-2 border border-white rounded-full hover:border-green-400 hover:text-green-400"
                      >
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a
                        href="https://www.facebook.com/profile.php?id=100088576887030"
                        className="p-2 border border-white rounded-full hover:border-green-400 hover:text-green-400"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a
                        href="https://instagram.com/vehiculars_"
                        className="p-2 border border-white rounded-full hover:border-green-400 hover:text-green-400"
                      >
                        <i className="fab fa-instagram"></i>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h5 className="text-xl font-bold mb-4">Quick Links</h5>
                  <div className="space-y-2">
                    <Link href="#AboutUs" className="block hover:text-blue-400">
                      About Us
                    </Link>
                    <Link
                      href="#PricingAndInstallments"
                      className="block hover:text-blue-400"
                    >
                      Pricing & Installments
                    </Link>
                    <Link
                      href="#ServicesWeOffer"
                      className="block hover:text-blue-400"
                    >
                      Services
                    </Link>
                    <Link href="#AboutUs" className="block hover:text-blue-400">
                      Mission & Vision
                    </Link>
                    <Link
                      href="#ContactUs"
                      className="block hover:text-blue-400"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>

                {/* Popular Links */}
                <div>
                  <h5 className="text-xl font-bold mb-4">Popular Links</h5>
                  <div className="space-y-2">
                    <Link
                      href="/privacy-policy"
                      className="block hover:text-blue-400"
                    >
                      Privacy Policy
                    </Link>
                    <Link
                      href="/terms-and-conditions"
                      className="block hover:text-blue-400"
                    >
                      Terms & Condition
                    </Link>
                    <Link
                      href="#SetUpReminders"
                      className="block hover:text-blue-400"
                    >
                      Setup Reminders
                    </Link>
                    <Link href="#FAQs" className="block hover:text-blue-400">
                      FAQs
                    </Link>
                    <Link href="/careers" className="block hover:text-blue-400">
                      Career
                    </Link>
                  </div>
                </div>

                {/* Newsletter */}
                <div>
                  <h5 className="text-xl font-bold mb-4">Newsletter</h5>
                  <p className="mb-4">
                    Stay connected with updates and safety tips. Be the first to
                    know about amazing deals on Vehiculars.
                  </p>
                  <form className="relative">
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-4 py-2 rounded-full bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
                      required
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-400"
                    >
                      <i className="fas fa-paper-plane text-xl"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="container mx-auto px-4 mt-12 pt-8 border-t border-gray-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-center md:text-left">
                  <p>
                    &copy; 2024{" "}
                    <Link href="/" className="text-blue-400 hover:underline">
                      Vehicular.ng
                    </Link>
                    , All Right Reserved.
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    A subsidiary of Mimhel Engineering & Construction Company
                  </p>
                </div>
                <div className="text-center md:text-right">
                  <div className="space-x-4 mb-2">
                    <Link href="/" className="hover:text-blue-400">
                      Home
                    </Link>
                    <Link
                      href="/cookies-policy"
                      className="hover:text-blue-400"
                    >
                      Cookies
                    </Link>
                    <Link href="/site-map" className="hover:text-blue-400">
                      Sitemap
                    </Link>
                    <Link href="/blog" className="hover:text-blue-400">
                      Blog
                    </Link>
                  </div>
                  <p className="text-sm text-gray-400">
                    With <i className="fas fa-heart text-red-500"></i>{" "}
                    <a
                      href="https://www.transingenium.com"
                      className="hover:text-blue-400"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @Transingenium
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </footer>

    </div>
  )
}
