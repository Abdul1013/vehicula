// pages/terms.js
import React from "react";
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";

// Placeholder for dynamic site title (can come from backend or env variable)
const SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TITLE || "Vehiculars";

const Terms = () => {
  return (
    <>
      <TopBar />

      <div className="container-xxl bg-white py-3">
        <div className="hidden lg:block py-20"></div>
      </div>

      <div className="container-xxl">
        <div className="container bg-white p-6 rounded-lg shadow-md">
          <div className="mb-6">
            <h4 className="py-2 border-b border-gray-300 text-lg font-semibold">
              Terms and Conditions
            </h4>
          </div>

          <div className="space-y-4 text-gray-700">
            <p>
              Welcome to <span className="font-semibold">{SITE_TITLE.toUpperCase()}</span>! These terms and
              conditions outline the rules and regulations for the use of{" "}
              {SITE_TITLE.toUpperCase()}'s services. By accessing this website, you accept these terms in full.
            </p>

            <h6 className="font-semibold">1. General Terms</h6>
            <p>
              By signing up on {SITE_TITLE.toUpperCase()}, you agree to comply with these terms and conditions,
              our privacy policy, and any other policies posted on our website. {SITE_TITLE.toUpperCase()} reserves
              the right to update or modify these terms at any time without prior notice.
            </p>

            <h6 className="font-semibold">2. Eligibility</h6>
            <p>
              To use our services, you must be at least 18 years old and capable of forming a binding contract
              with {SITE_TITLE.toUpperCase()}. You must provide accurate and complete information during the sign-up
              process and update your information as necessary.
            </p>

            <h6 className="font-semibold">3. Services Offered</h6>
            <p>{SITE_TITLE.toUpperCase()} offers a variety of automotive services including, but not limited to:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Comprehensive Insurance</li>
              <li>Vehicle Particulars Renewal</li>
              <li>Spare Parts</li>
              <li>Driver's License</li>
              <li>Plate Number</li>
              <li>Change of Ownership</li>
              <li>Local Government Paper</li>
              <li>Driving School</li>
              <li>Roadside Assistance</li>
            </ul>

            <h6 className="font-semibold">4. Payment Options</h6>
            <p>{SITE_TITLE.toUpperCase()} provides several payment options:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Full Payment: Services/products delivered after full payment.</li>
              <li>Easy Installments: Services delivered upon completion of installment payments.</li>
              <li>Get Now-Pay Later: Products/services upfront, payments over time (interest may apply).</li>
            </ul>

            <h6 className="font-semibold">5. Price Lock Feature</h6>
            <p>
              Customers can lock in a price with an initial deposit, protecting from future increases. Terms apply.
            </p>

            <h6 className="font-semibold">6. Payment Transfers</h6>
            <p>Transfers are unavailable in the following scenarios:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>If you set a price lock</li>
              <li>If you opt for the Get Now-Pay Later program</li>
              <li>If admin sets the transfer status as unavailable</li>
              <li>If the job is under process</li>
              <li>If a service has been delivered</li>
              <li>If a service is completed</li>
            </ul>

            <h6 className="font-semibold">7. Credit Score System</h6>
            <p>{SITE_TITLE.toUpperCase()} uses a credit score system to determine eligibility:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Novice: 0% - 25%</li>
              <li>Competent: 26% - 50%</li>
              <li>Accomplished: 51% - 75%</li>
              <li>Distinguished: 76% - 100%</li>
            </ul>
            <p>Points awarded/deducted based on payment behavior:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>+2 points for full payment</li>
              <li>+3 points for easy installments</li>
              <li>+5 points for Get Now-Pay Later</li>
              <li>-10 points for defaulting on Get Now-Pay Later</li>
            </ul>

            <h6 className="font-semibold">8. Defaulting on Payments</h6>
            <p>
              Defaulting on Get Now-Pay Later results in -10 points. May affect eligibility for future programs.
            </p>

            <h6 className="font-semibold">9. Use of Information</h6>
            <p>
              By using {SITE_TITLE.toUpperCase()}, you consent to the collection and use of personal information as
              described in our privacy policy.
            </p>

            <h6 className="font-semibold">10. Limitation of Liability</h6>
            <p>
              {SITE_TITLE.toUpperCase()} is not liable for indirect or consequential damages. Total liability is limited
              to amount paid for the product/service.
            </p>

            <h6 className="font-semibold">11. Governing Law</h6>
            <p>These terms are governed by Nigerian law. Disputes fall under Nigerian courts.</p>

            <h6 className="font-semibold">12. Contact Information</h6>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Email: info@vehiculars.ng</li>
              <li>Website: www.vehiculars.ng</li>
            </ul>

            <h6 className="font-semibold">13. Links to Learn More</h6>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                <a href="/price-lock-feature" className="text-blue-600 hover:underline">
                  Learn More About Price Lock
                </a>
              </li>
              <li>
                <a href="/payment-transfers" className="text-blue-600 hover:underline">
                  Payment Transfer Details
                </a>
              </li>
              <li>
                <a href="/credit-score-system" className="text-blue-600 hover:underline">
                  Learn More About Credit Score System
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <BottomBar />
    </>
  );
};

export default Terms;
