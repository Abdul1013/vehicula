import React from "react";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Vehiculars?",
      answer: `Vehiculars, short for “Vehicle Particulars”, is a registered and trusted platform that allows car owners to pay for vehicle particulars in easy installments or full payment, thereby avoiding penalties and harassments from government authorities.`,
    },
    {
      question: "How does it work?",
      answer: (
        <>
          <p className="mb-4">It is simple!</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Create a free account on our website or mobile app with your phone
              number and vehicle plate number.
            </li>
            <li>Setup easy installments</li>
            <li>Get SMS and app notification reminders about due dates</li>
            <li>Pay conveniently using Card, USSD or Bank transfers</li>
            <li>
              Your documents are automatically renewed and delivered FREE of
              charge before the expiry date.
            </li>
          </ul>
        </>
      ),
    },
    {
      question:
        "Is Vehiculars a subsidiary of VIO or Federal Road Safety Corp?",
      answer: (
        <>
          <p className="mb-4">
            The answer is <strong>NO.</strong>
          </p>
          <p>
            We have no affiliation to any government agency responsible for
            registration of vehicles and issuing out particulars. Neither do we
            issue vehicle particulars. What we do is help you build up your
            registration fees in the most stress-free way possible, send
            reminders to you, and facilitate the registration and delivery
            process.
          </p>
        </>
      ),
    },
    {
      question: "Can I get a loan from Vehiculars?",
      answer: "We do not offer loans, as we are not a banking institution.",
    },
    {
      question: "Can I register multiple vehicles at once?",
      answer: (
        <>
          <p className="mb-4">Yes, you can!</p>
          <p>
            We have designed our system to carry as many vehicles as possible
            under one name or company. Simply click on the “Add another vehicle”
            button.
          </p>
        </>
      ),
    },
  ];

  return (
    <section id="FAQs" className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-600">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                className="w-full flex justify-between items-center p-4 text-left focus:outline-none hover:bg-gray-50"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-lime-600">{faq.question}</span>
                <ChevronDownIcon
                  className={`w-5 h-5 transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="p-4 bg-gray-50 text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
