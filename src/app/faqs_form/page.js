// pages/faqs.js
"use client"
import { useState } from "react";

const SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TITLE || "MySite";
const FALL_BACK = "/";
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@example.com";
const CALL_NO = process.env.NEXT_PUBLIC_CALL_NO || "1234567890";
const CHAT_NO = process.env.NEXT_PUBLIC_CHAT_NO || "1234567890";

const faqsData = [
  {
    id: 1,
    question: `What is ${SITE_TITLE.toUpperCase()}?`,
    answer: `${SITE_TITLE.toUpperCase()} is a comprehensive automotive services company that offers a range of services including genuine spare parts, vehicle documentation, driver’s license assistance, driving school Get-Now, and P2P Get-Now for our products and services.`,
  },
  {
    id: 2,
    question: `What services does ${SITE_TITLE.toUpperCase()} provide?`,
    answer: `Our services include genuine spare parts, vehicle documentation, driver’s license assistance, driving school Get-Now, spare parts Get-Now, automotive port clearing assistance and Get-Now, vehicle registration, and a P2P Get-Now program. We also offer flexible payment options and a 'Breakdown Buddy' service for roadside assistance.`,
  },
  {
    id: 3,
    question: `How can I contact ${SITE_TITLE.toUpperCase()} for inquiries?`,
    answer: (
      <div className="space-y-2">
        <p>
          You can reach us through our website contact form, email us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 underline">
            {CONTACT_EMAIL}
          </a>
          , or call our customer service line at{" "}
          <a href={`tel:+${CALL_NO}`} className="text-gray-800">
            +{CALL_NO}
          </a>
          .
        </p>
        <p>
          We are also online on WhatsApp.{" "}
          <a
            href={`https://api.whatsapp.com/send?phone=${CHAT_NO}`}
            className="text-green-700 font-bold underline flex items-center gap-1"
          >
            <i className="fab fa-whatsapp"></i> Start Chat with a Dedicated Agent
          </a>
        </p>
      </div>
    ),
  },
  {
    id: 4,
    question: `What is the P2P Get-Now Program?`,
    answer: `Our P2P Get-Now Program allows customers to finance ${SITE_TITLE.toUpperCase()} products and services through peer-to-peer lending. This program offers flexible payment options tailored to your needs.`,
  },
  {
    id: 5,
    question: `How do I apply for Get-Now`,
    answer: `To apply for Get-Now, visit our Get-Now page on the website, fill out the application form, and submit the required documents. Our team will review your application and get back to you with the next steps.`,
  },
];

export default function FAQs() {
  const [activeId, setActiveId] = useState(null);

  const toggleAccordion = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero / Breadcrumb */}
      <div className="container-xxl relative bg-white px-0">
        <div className="container absolute top-0 py-2">
          <nav aria-label="breadcrumb" className="text-sm">
            <ol className="flex space-x-2">
              <li>
                <a href={FALL_BACK} className="text-blue-600 hover:underline">
                  Home
                </a>
              </li>
              <li>/</li>
              <li className="text-gray-500">FAQs</li>
            </ol>
          </nav>
        </div>

        <div className="mt-20 pb-10">
          <div className="text-center py-10">
            <h1 className="font-serif text-4xl font-normal">Frequently Asked Questions</h1>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqsData.map((faq) => (
                <div
                  key={faq.id}
                  className="border rounded-lg overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full px-4 py-3 text-left bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    <span>{activeId === faq.id ? "-" : "+"}</span>
                  </button>
                  {activeId === faq.id && (
                    <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-blue-100 text-gray-800">
                      {typeof faq.answer === "string" ? <p>{faq.answer}</p> : faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
