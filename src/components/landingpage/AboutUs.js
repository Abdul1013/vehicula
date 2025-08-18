import Image from "next/image";
import React from "react";

export default function AboutUs() {
  return (
    <div className="relative bg-white">
      {/* Header */}
      <h2 className="text-black text-center pt-10 text-3xl font-bold">
        About Us
      </h2>

      {/* Image Section */}
      <div className="relative h-[700px] w-full mt-6">
        <Image
          src="/images/aboutus.jpg"
          alt="about us background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* About section*/}
      <div className="container mx-auto px-4 py-20">
        <div className="bg-white p-6 md:p-12 shadow-xl max-w-4xl mx-auto -mt-32 rounded-lg relative z-10">
          <div className="prose max-w-none">
            <p className="mb-6 text-gray-700">
              VEHICULARS is a subsidiary of Mimhel Engineering and Construction
              Ltd based in Nigeria. We leverage technology to provide vehicle
              owners with seamless access to essential services, from vehicle
              registration and driver&apos licenses to peer-to-peer auto
              financing and roadside assistance.
            </p>
            <p className="mb-8 text-gray-700">
              With flexible payment options, installments, Get Now-Pay Later
              Plans, Pay on delivery, VEHICULARS delivers tech-powered solutions
              for vehicle services such as spare parts, auto port clearing and
              more—making life easier for busy vehicle owners.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
                  <i className="fas fa-user-tie text-white"></i>
                </div>
                <div>
                  <h6 className="text-lg font-semibold mb-2">Our Mission</h6>
                  <p className="text-gray-600">
                    To provide comprehensive automotive solutions that support
                    our customers from the cradle of learning to drive through
                    to advanced vehicle care and ownership. We are dedicated to
                    offering flexible Get Now-Pay Later plans, genuine parts,
                    and exceptional service, ensuring a seamless and supportive
                    experience throughout the entire vehicle lifecycle.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
                  <i className="fas fa-chart-line text-white"></i>
                </div>
                <div>
                  <h6 className="text-lg font-semibold mb-2">Our Vision</h6>
                  <p className="text-gray-600">
                    To become the leading automotive service provider in Africa,
                    renowned for transforming vehicle ownership through
                    cutting-edge technology, unmatched customer service, and a
                    commitment to safety and efficiency. We strive to enhance
                    the driving experience and contribute to a safer, more
                    connected automotive community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
