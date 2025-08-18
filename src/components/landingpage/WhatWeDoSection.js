"use client";
import { motion } from "framer-motion";

export default function WhatWeDoSection({ siteTitle = "Your Company" }) {
  return (
    <section className="bg-white w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left Image */}
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="/img/what_we_do.jpg"
            alt="What we do"
            title="What we do"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Right Content */}
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="p-6 lg:p-12">
            <h4 className="text-2xl lg:text-3xl font-semibold py-2">
              See <span className="text-primary font-bold italic">exactly</span>{" "}
              what we do.
            </h4>

            <p className="mb-4 text-gray-700 leading-relaxed">
              At <span className="uppercase font-semibold">{siteTitle}</span>, you can access a full range of automotive services from the comfort of your home. Whether you need Vehicle Registration, Licensing, Driver’s License Application, Port Clearing, Spare Parts, Plate Numbers, Driving School Assistance, Comprehensive Insurance, or Roadside Assistance,{" "}
              <span className="font-bold text-primary italic underline">we’ve got you covered</span>.
            </p>

            <p className="mb-4 text-gray-700 leading-relaxed">
              With our expertise and strategic partnerships, we ensure swift and reliable service delivery. Plus, our{" "}
              <a href="/get-now-program" className="font-bold text-primary italic underline">
                Flexible Get Now-Pay Later Options
              </a>{" "}
              and{" "}
              <a href="/easy-installments-program" className="font-bold text-primary italic underline">
                Installment Plans
              </a>{" "}
              mean you’re never left stranded or facing road safety issues.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Join our community and benefit from our extensive network and{" "}
              <a href="/peer-to-peer-program" className="font-bold text-primary italic underline">
                Peer-to-Peer (P2P)
              </a>{" "}
              support system, designed to make your vehicle management seamless and stress-free.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
