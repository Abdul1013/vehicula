import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function EarningsDashboard() {
  return (
    <div className="bg-green-600 min-h-screen flex flex-col items-center p-4">
      {/* Dummy Header */}
      <header className="text-white text-2xl font-bold my-6 text-center">
        Built for EVERYONE! Car Owner or Not
      </header>

      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-6">
        {/* Left Card */}
        <div className="bg-white rounded-3xl p-6 flex flex-col items-center shadow-lg">
          <Image
            src="/images/earnings_new.png"
            alt="earnings dashboard"
            width={400}
            height={600}
            className="mx-auto"
          />
        </div>

        {/* Right Section */}
        <div className="flex flex-col justify-center gap-4">
          <h3>Earn Passive Income on VEHICULARS in 1 of 2 ways.</h3>
          <p>(or all 2 ways if you&apos;re feeling lucky!)</p>
          <div className="bg-white p-4 rounded-lg flex items-center shadow hover:shadow-md transition">
            <div className="bg-green-100 p-3 rounded-full mr-4">🔗</div>
            <div>
              <h4 className="font-bold">Share your Referral Code</h4>
              <p className="text-sm text-gray-500">For Everyone</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg flex items-center shadow hover:shadow-md transition">
            <div className="bg-green-100 p-3 rounded-full mr-4">🏪</div>
            <div>
              <h4 className="font-bold">
                Join our P2P Get Now–Pay Later Program
              </h4>
              <p className="text-sm text-gray-500">For Everyone</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-white text-sm mt-8">
        Speak of opportunities and making money online.
      </footer>
    </div>
  );
}
