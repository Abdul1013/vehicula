// import React from "react";
// import { ShareIcon, GiftIcon, PlayCircleIcon } from "@heroicons/react/24/solid";

// export default function ReferralSection() {
//   // === Backend placeholders ===
//   const SITE_TITLE = "YourSite"; // replace with backend constant
//   const heroBgStyle5 = {
//     backgroundImage: "url('/images/hero-bg.jpg')", // backend dynamic hero background
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     height: "300px",
//     position: "relative",
//   };

//   return (
//     <section className="relative">
//       {/* Hero Background */}
//       <div style={heroBgStyle5}></div>

//       <div className="container max-w-6xl mx-auto px-4 -mt-40">
//         <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-10 relative z-10">
//           {/* Title Overlay */}
//           <h6 className="italic p-3 text-lg sm:text-2xl text-center text-white absolute top-36 left-1/2 transform -translate-x-1/2 bg-black/30 rounded-lg">
//             Share Your Referral Code with friends and groups
//           </h6>

//           {/* Content */}
//           <div className="text-center space-y-6 mt-20">
//             {/* Icon */}
//             <div className="flex justify-center text-blue-600">
//               <ShareIcon className="h-16 w-16" />
//             </div>

//             {/* Headline */}
//             <h4 className="text-blue-600 font-semibold text-xl sm:text-2xl">
//               When you sign up, you get a referral code and link.
//             </h4>

//             {/* Description */}
//             <div className="text-gray-700 space-y-3 max-w-2xl mx-auto">
//               <p>
//                 Share your referral code with friends, family, WhatsApp groups
//                 and more.
//               </p>
//               <p>
//                 Whenever they make purchases, renewals or avail any services on{" "}
//                 <strong>{SITE_TITLE.toUpperCase()}</strong>, you earn attractive
//                 commissions.
//               </p>
//               <p>
//                 Withdraw earnings anytime to any bank account or wallet of your
//                 choice. <strong>You Earned It!</strong>
//               </p>
//             </div>

//             {/* Bonus Section */}
//             <div className="text-green-600 font-medium">
//               <div className="flex items-center justify-center space-x-2">
//                 <GiftIcon className="h-6 w-6" />
//                 <span>Enjoy a FREE service on every 10th referral.</span>
//               </div>
//               <div className="pt-2 text-sm text-right">
//                 <a
//                   href="/terms-and-conditions"
//                   className="underline text-gray-500 italic"
//                 >
//                   Terms & Conditions Apply
//                 </a>
//               </div>
//             </div>

//             {/* CTA Button */}
//             <div className="pt-4">
//               <a
//                 href="/register"
//                 className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-md transition duration-300"
//               >
//                 Sign Up Today
//                 <PlayCircleIcon className="h-6 w-6 ml-2" />
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useState } from "react";

const SITE_TITLE = "YourSite"; // Replace with your site title
const chatNumber = "+1234567890"; // Replace with WhatsApp chat number

const servicesData = [
  {
    id: "VehDocsRenewalMore",
    icon: "fa fa-recycle",
    title: "Vehicle Particulars Renewal",
    description: `At ${SITE_TITLE.toUpperCase()}, we simplify the process of obtaining vehicle particulars by offering multiple payment options: full payment upfront, installment payments, or Get Now-Pay Later. This ensures you can renew your documents with ease.`,
    readMore: `
      All vehicle registrations are mandated to be renewed annually with the VIO or relevant authorized licensing departments.
      At ${SITE_TITLE.toUpperCase()}, we simplify the process of obtaining vehicle particulars by offering multiple payment options: full payment upfront, installment payments, or Get Now-Pay Later. This ensures you can renew your documents with ease.
      The following documents are required for both private and commercial vehicles in Nigeria:
      - Vehicle License
      - Road Worthiness Certificate
      - Third Party Insurance
      - Computerized Inspection Certificate
      - CMR Papers (Lagos State)
      - Police Form
      - Hackney Permit (for commercial vehicles)
      - Heavy Duty Permit (for trucks)
    `,
    ctaLink: "register",
    ctaText: "Get This",
  },
  {
    id: "VehSparePartsMore",
    icon: "fa fa-tools",
    title: "Genuine Spare Parts",
    description: `At ${SITE_TITLE.toUpperCase()}, we provide everything you need to maintain and enhance your vehicle's performance. Flexible payment options make it easy to upgrade and maintain your vehicle with top-notch spare parts.`,
    readMore: `
      Ensure your vehicle runs smoothly with our comprehensive selection of high-quality automobile spare parts. From essential components to specialized accessories.
      At ${SITE_TITLE.toUpperCase()}, we provide everything you need to maintain and enhance your vehicle's performance. Flexible payment options make it easy to upgrade and maintain your vehicle with top-notch spare parts.
    `,
    ctaLink: "register",
    ctaText: "Explore",
  },
  // Add remaining services here using the same structure
];

export default function ServicesPage() {
  const [openService, setOpenService] = useState(null);

  const toggleReadMore = (id) => {
    setOpenService(openService === id ? null : id);
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold">Services we Offer</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesData.map((service) => (
          <div key={service.id} className="bg-white shadow-lg rounded-lg p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <i className={`${service.icon} text-2xl text-blue-600`}></i>
            </div>
            <h5 className="text-lg font-semibold mb-2">{service.title}</h5>
            <p className="text-gray-700 mb-4">{service.description}</p>

            <div className="mt-auto">
              <button
                onClick={() => toggleReadMore(service.id)}
                className="text-blue-600 underline mb-2"
              >
                Read More
              </button>
              <a
                href={service.ctaLink}
                className="inline-block px-4 py-2 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition"
              >
                {service.ctaText}
              </a>
            </div>

            {openService === service.id && (
              <div className="mt-4 text-gray-600 whitespace-pre-line">{service.readMore}</div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <h4 className="text-xl mb-4">Our dedicated support team is online and ready to help</h4>
        <a
          href={`https://api.whatsapp.com/send?phone=${chatNumber}`}
          className="inline-block px-6 py-3 text-white bg-green-500 rounded-full hover:bg-green-600 transition"
        >
          <i className="fab fa-whatsapp mr-2"></i> Start chat
        </a>
      </div>
    </div>
  );
}
