// app/services/page.js (Next.js App Router)
"use client"; // client-side interactivity
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Dummy data (replace with API data)
const serviceData = [
  { id: 1, title: "Cleaning", description: "Home and office cleaning", image: "/images/service1.jpg" },
  { id: 2, title: "Plumbing", description: "Expert plumbing services", image: "/images/service2.jpg" },
  { id: 3, title: "Electrical", description: "Electrical installations and repairs", image: "/images/service3.jpg" },
];

export default function ServicesPage() {
  const [services] = useState(serviceData);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <div className="relative bg-white hero-header mb-0 px-0">
        {/* Breadcrumb */}
        <div className="container mx-auto absolute top-2 left-0 right-0 px-4">
          <nav aria-label="breadcrumb" className="text-sm mt-2">
            <ol className="flex space-x-2">
              <li>
                <Link href="/" className="text-blue-600 hover:underline">Home</Link>
              </li>
              <li className="text-gray-500">/</li>
              <li className="text-gray-500" aria-current="page">Services</li>
            </ol>
          </nav>
        </div>

        {/* Service Carousel */}
        <div className="container mx-auto pt-20 lg:pt-32">
          <div className="flex overflow-x-auto space-x-4 py-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex-shrink-0 w-64 bg-gray-50 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
              >
                <div className="relative h-40 w-full">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{service.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


    </div>
  );
}



