import React from "react";

export default function ReferralSection() {
  // === Backend placeholders ===
  const SITE_TITLE = "YourSite"; // replace with backend constant
  const heroBgStyle5 = {
    backgroundImage: "url('/images/hero-bg.jpg')", // backend dynamic hero background
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "300px",
    position: "relative",
  };

  return (
    <section className="relative">
      {/* Hero Background */}
      <div style={heroBgStyle5}></div>

      <div className="container max-w-6xl mx-auto px-4 -mt-40">
        <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-10 relative z-10">
          {/* Title Overlay */}
          <h6 className="italic p-3 text-lg sm:text-2xl text-center text-white absolute top-36 left-1/2 transform -translate-x-1/2 bg-black/30 rounded-lg">
            Share Your Referral Code with friends and groups
          </h6>

          {/* Content */}
          <div className="text-center space-y-6 mt-20">
            {/* Icon */}
            <div className="text-blue-600">
              <i className="fas fa-share-alt fa-4x"></i>
            </div>

            {/* Headline */}
            <h4 className="text-blue-600 font-semibold text-xl sm:text-2xl">
              When you sign up, you get a referral code and link.
            </h4>

            {/* Description */}
            <div className="text-gray-700 space-y-3 max-w-2xl mx-auto">
              <p>
                Share your referral code with friends, family, WhatsApp groups
                and more.
              </p>
              <p>
                Whenever they make purchases, renewals or avail any services on{" "}
                <strong>{SITE_TITLE.toUpperCase()}</strong>, you earn attractive
                commissions.
              </p>
              <p>
                Withdraw earnings anytime to any bank account or wallet of your
                choice. <strong>You Earned It!</strong>
              </p>
            </div>

            {/* Bonus Section */}
            <div className="text-green-600 font-medium">
              <i className="fas fa-gifts mr-2"></i>
              Enjoy a FREE service on every 10th referral.
              <div className="pt-2 text-sm text-right">
                <a
                  href="/terms-and-conditions"
                  className="underline text-gray-500 italic"
                >
                  Terms & Conditions Apply
                </a>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <a
                href="/register"
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-md transition duration-300"
              >
                Sign Up Today
                <i className="fas fa-play-circle ml-2"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
