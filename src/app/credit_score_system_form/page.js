"use client"
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CreditScorePage() {
  //  Placeholders for backend
  const [siteTitle, setSiteTitle] = useState("MyCompany");
  const [badges, setBadges] = useState([]);
  const [scores, setScores] = useState({});

  useEffect(() => {
    // TODO: Replace with fetch('/api/credit-system')
    // Simulated data load
    setTimeout(() => {
      setSiteTitle("FinTrust");

      setBadges([
        { label: "Bronze", start: 0, end: 20, color: "#CD7F32" },
        { label: "Silver", start: 21, end: 50, color: "#C0C0C0" },
        { label: "Gold", start: 51, end: 80, color: "#FFD700" },
        { label: "Platinum", start: 81, end: 100, color: "#E5E4E2" }
      ]);

      setScores({
        1: 50, // Full Payment
        2: 30, // Installments
        3: 20, // Get-Now
        4: -40 // Defaulting
      });
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-2 px-6 border-b">
        <nav className="text-sm text-gray-600">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:text-blue-600">Home</Link>
            </li>
            <li>/</li>
            <li className="font-medium text-gray-800">Credit Score System</li>
          </ol>
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-semibold mb-4">
          Understanding the Credit Score System at {siteTitle}
        </h1>
        <p className="text-gray-700 mb-6">
          At {siteTitle}, we value our customers and aim to provide them with
          the best possible services and benefits. To ensure fairness and reward
          responsible financial behavior, we have implemented a comprehensive
          Credit Score System.
        </p>

        {/* Credit Score Levels */}
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-2">Credit Score Levels</h2>
          <p className="text-gray-700 mb-4">
            Your credit score at {siteTitle} is categorized into{" "}
            {badges.length} levels:
          </p>
          <div className="space-y-3">
            {badges.map((b, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div
                  className="w-16 h-6 rounded"
                  style={{ backgroundColor: b.color }}
                ></div>
                <span className="text-sm font-medium">{b.label}</span>
                <span className="text-sm text-gray-600">
                  {b.start}% – {b.end}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Earning Points */}
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-2">Earning Points</h2>
          <p className="text-gray-700 mb-4">
            You can earn points and improve your credit score through various
            payment options:
          </p>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>
              <strong>Full Payment:</strong>{" "}
              <span className="text-green-600">
                +{scores[1]} {scores[1] === 1 ? "point" : "points"}
              </span>
            </li>
            <li>
              <strong>Easy Installments:</strong>{" "}
              <span className="text-green-600">
                +{scores[2]} {scores[2] === 1 ? "point" : "points"}
              </span>
            </li>
            <li>
              <strong>Get-Now Plan:</strong>{" "}
              <span className="text-green-600">
                +{scores[3]} {scores[3] === 1 ? "point" : "points"}
              </span>
            </li>
          </ul>
        </div>

        {/* Losing Points */}
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-2">Losing Points</h2>
          <p className="text-gray-700 mb-4">
            Defaulting on the Get-Now plan will negatively impact your credit
            score:
          </p>
          <ul className="list-disc ml-6 text-gray-700">
            <li>
              <strong>Defaulting:</strong>{" "}
              <span className="text-red-600">
                {scores[4]} {Math.abs(scores[4]) === 1 ? "point" : "points"}
              </span>
            </li>
          </ul>
        </div>

        {/* Impact */}
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-2">Impact of Credit Score</h2>
          <p className="text-gray-700">
            Your credit score at {siteTitle} affects the types of offers and
            benefits you may receive. The offers are at the discretion of{" "}
            {siteTitle} management.
          </p>
        </div>

        {/* Benefits */}
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-2">
            Benefits of a High Credit Score
          </h2>
          <p className="text-gray-700">
            Achieving a higher credit score can unlock exclusive benefits such
            as lower interest rates, flexible payment options, and early access
            to new products.
          </p>
        </div>

        {/* Maintaining */}
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-2">
            Maintaining a Good Credit Score
          </h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>Opt for full payment when possible.</li>
            <li>Use the Easy Installments option responsibly.</li>
            <li>Avoid defaults on the Get-Now plan.</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <h2 className="text-lg font-medium mb-4">
            Join the {siteTitle} community today!
          </h2>
          <a
            href="/register"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
          >
            Get Started
            <span className="ml-2">➜</span>
          </a>
          <div className="mt-4 space-y-2 text-sm">
            <p>
              <a
                href="/payment-options"
                className="text-blue-600 hover:underline"
              >
                Learn More About Payment Options
              </a>
            </p>
            <p>
              <a
                href="/terms-and-conditions"
                className="text-blue-600 hover:underline"
              >
                View Terms and Conditions
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
