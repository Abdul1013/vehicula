'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [activeService, setActiveService] = useState(null);

  const services = [
    {
      id: 1,
      title: 'Vehicle Maintenance',
      description: 'Regular maintenance and servicing to keep your vehicle in top condition',
      icon: '/icons/maintenance.svg'
    },
    {
      id: 2,
      title: 'Repairs & Diagnostics',
      description: 'Expert diagnostics and repairs for all vehicle makes and models',
      icon: '/icons/repair.svg'
    },
    {
      id: 3,
      title: 'Vehicle Inspection',
      description: 'Comprehensive vehicle inspections and safety checks',
      icon: '/icons/inspection.svg'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section - Mobile First */}
      <section className="relative h-[60vh] md:h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 z-10" />
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              Expert Vehicle Care
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Professional automotive services tailored to your needs
            </p>
            <Link
              href="/book-service"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-full
                       bg-blue-600 text-white hover:bg-blue-700 transition-colors
                       shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
                       active:transform-none active:bg-blue-800"
            >
              Book a Service
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section - Card-based UI */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="group p-6 rounded-2xl bg-white shadow-sm hover:shadow-xl
                         transition-all duration-300 cursor-pointer
                         border border-gray-100 hover:border-blue-100
                         active:transform active:scale-[0.99]"
                onClick={() => setActiveService(service.id)}
              >
                <div className="w-12 h-12 mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <Image
                    src={service.icon}
                    alt={service.title}
                    width={24}
                    height={24}
                    className="text-blue-600"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-4 flex items-center text-blue-600 font-medium text-sm">
                  Learn more
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" 
                       fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - Floating Card Design */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/circuit.svg')] opacity-10" />
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us with their vehicles
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-service"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-full
                         bg-white text-blue-600 hover:bg-gray-100 transition-colors
                         active:bg-gray-200"
              >
                Book Now
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-full
                         bg-blue-700 text-white hover:bg-blue-800 transition-colors
                         ring-1 ring-white/20 hover:ring-white/10
                         active:bg-blue-900"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
