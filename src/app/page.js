"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
// import HowItWorks from "@/components/HowItWorks";
import VehiclePricing from "@/components/VehiclePricing";
import AboutUs from "@/components/landingpage/AboutUs";
import Footer from "@/components/Footer";
import Faqs from "@/components/landingpage/Faqs";
import HowItWorks from "@/components/landingpage/HowItWorks";
import DocumentVerification from "@/components/landingpage/DocumentVerification";
import EarningsDashboard from "@/components/landingpage/EarningsDashboard";
import PaymentOptions from "@/components/landingpage/PaymentOptions";
import Services from "@/components/landingpage/Services";
import ServicesOverview from "@/components/landingpage/ServiceOverview";
import ImageCarousel from "@/components/landingpage/Gallery";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Spinner/Loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* <main className="pt-16 bg-gradient-to-b from-gray-50 to-white"> */}
        <Header />

        {/* Hero Section */}

        <section
          className="relative flex items-center justify-center bg-cover bg-center bg-no-repeat py-24 px-4 md:px-8"
          style={{ backgroundImage: "url('/images/custom_bg_animation.gif')" }}
          aria-label="Vehicle Management Hero Section"
        >
          {/* Hero Content */}
          <div className="relative z-10 container mx-auto grid md:grid-cols-2 gap-10 items-center text-gray-200">
            {/* Left Content */}
            <div className="space-y-6 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-green-400 leading-tight animate-zoom-in">
                Vehicle Management with
                <br />
                Technology-Driven Solutions
              </h1>

              <div className="space-y-2 text-lg text-black">
                <p>
                  From Vehicle Registration to Peer-to-Peer Auto Financing,{" "}
                  <span className="font-semibold text-white">VEHICULARS</span>{" "}
                  delivers seamless, tech-powered services for Driver&apos;s
                  Licenses, Spare Parts, Roadside Assistance, Auto Port
                  Clearing, and more.
                </p>
                <p className="text-gray-300">
                  All with Flexible Payment Options.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  href="/register"
                  className="px-8 py-3 bg-green-400 text-black font-medium rounded-3xl shadow hover:bg-green-500 hover:text-white transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  href="/register"
                  className="px-8 py-3 border border-green-400 text-green-400 font-medium rounded-3xl hover:bg-green-400 hover:text-white transition-colors"
                >
                  Chat with an Agent
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Section - Mobile First */}

        <ServicesOverview />
        <Services />
        <PaymentOptions />
        <DocumentVerification />
        {/* Reminder Section */}
        <section className="bg-white py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-center">
                <Image
                  src="/images/reminder.png"
                  alt="iPhone reminder app"
                  width={400}
                  height={600}
                  className="mx-auto"
                />
              </div>
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">
                    Setup a free reminder
                  </h2>
                  <p className="text-gray-600">
                    We make sure you never miss a date.
                  </p>
                </div>

                <form
                  className="space-y-4"
                  action="/api/reminder"
                  method="POST"
                >
                  <div className="relative">
                    <input
                      type="email"
                      name="rEmail"
                      placeholder="Email Address"
                      required
                      className="w-full px-4 py-3 pl-4 pr-12 rounded-full border-0 shadow-md focus:ring-2 focus:ring-green-500 outline-none"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-600">
                      <i className="fa fa-envelope text-xl"></i>
                    </span>
                  </div>

                  <div className="relative">
                    <input
                      type="tel"
                      name="rPhone"
                      placeholder="Phone Number"
                      required
                      className="w-full px-4 py-3 pl-4 pr-12 rounded-full border-0 shadow-md focus:ring-2 focus:ring-green-500 outline-none"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-600">
                      <i className="fa fa-phone text-xl"></i>
                    </span>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      name="rName"
                      placeholder="Your name"
                      required
                      className="w-full px-4 py-3 pl-4 pr-12 rounded-full border-0 shadow-md focus:ring-2 focus:ring-green-500 outline-none"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-600">
                      <i className="fas fa-user text-xl"></i>
                    </span>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      name="rPlate"
                      placeholder="Vehicle Plate Number"
                      required
                      className="w-full px-4 py-3 pl-4 pr-12 rounded-full border-0 shadow-md focus:ring-2 focus:ring-green-500 outline-none"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-600">
                      <i className="fas fa-text-width text-xl"></i>
                    </span>
                  </div>

                  <div className="relative">
                    <input
                      type="date"
                      name="rDate"
                      required
                      className="w-full px-4 py-3 pl-4 pr-12 rounded-full border-0 shadow-md focus:ring-2 focus:ring-green-500 outline-none"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-600">
                      <i className="fas fa-calendar text-xl"></i>
                    </span>
                    <small className="text-sm text-gray-600 ml-4 mt-1 block">
                      Vehicle particular expiry date
                    </small>
                  </div>

                  <div className="text-right mt-6">
                    <button
                      type="submit"
                      className="px-8 py-3 text-lg rounded-full bg-white text-green-600 border-2 border-green-600 
                                 hover:bg-green-600 hover:text-white transition-colors shadow-md"
                    >
                      Remind me
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/*PAssive Income Section */}
        <EarningsDashboard />

        {/* How It Works Section */}
        <HowItWorks />

        {/* FAQ Section */}
        <Faqs />
        {/* Moving Image */}
        <ImageCarousel />
        {/* About Section */}
        <AboutUs />

  
        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 transition-colors"
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      </main>
      {/* </main> */}
    </div>
  );
}
