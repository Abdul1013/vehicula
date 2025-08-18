import React from 'react';
import { FaRegFileAlt, FaRecycle, FaTools } from 'react-icons/fa';

export default function Services() {
  const services = [
    {
      title: 'Local Government Permit',
      description:
        "To operate commercial vehicles (or private with company branding on them), it's mandatory for companies to obtain the necessary permits and emblems to operate. Most often, they also need to obtain advertisement permits. These documents are by local government offices nationwide.",
      icon: <FaRegFileAlt size={24} />,
      buttons: ['Read More', 'Get this'],
    },
    {
      title: 'Vehicle Particulars Renewal',
      description:
        'At VEHICULARS, we simplify the process of obtaining vehicle particulars by offering multiple payment options: full payment upfront, installment payments, or Get Now–Pay Later. This ensures you can renew your documents with ease.',
      icon: <FaRecycle size={24} />,
      buttons: ['Read More', 'Get This'],
    },
    {
      title: 'Genuine Spare Parts',
      description:
        "At VEHICULARS, we provide everything you need to maintain and enhance your vehicle's performance. Our flexible payment options, including full upfront payment, installment plans, or Get Now–Pay Later, make it easy to upgrade and maintain your vehicle with top-notch spare parts.",
      icon: <FaTools size={24} />,
      buttons: ['Read More', 'Explore'],
    },
  ];

  return (
    <section className="bg-gray-100 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Services we Offer</h2>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border">
              <div className="bg-green-600 text-white p-2 inline-flex rounded mb-4">
                {service.icon}
              </div>
              <h3 className="font-bold text-lg mb-2">{service.title}</h3>
              <p className="text-gray-700 text-sm mb-6">{service.description}</p>
              <div className="flex gap-2 flex-wrap">
                {service.buttons.map((btn, i) => (
                  <button
                    key={i}
                    className={`${
                      i === 0
                        ? 'bg-green-600 text-white'
                        : 'border border-green-600 text-green-600'
                    } px-4 py-1 rounded-full text-sm hover:opacity-90 transition`}
                  >
                    {btn} {i === 1 && <span className="inline-block ml-1">⟶</span>}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-10 space-x-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === 2 ? 'bg-green-400' : 'bg-gray-300'
              } transition`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
