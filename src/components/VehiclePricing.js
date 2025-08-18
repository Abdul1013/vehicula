'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const vehicleTypes = [
  {
    id: 'saloon',
    icon: 'fas fa-car',
    label: 'Saloon/Car',
    image: '/img/saloon.png',
    variants: [
      {
        type: 'Private',
        popular: true,
        price: 22000,
        monthlyPayment: 1834,
        features: [
          'Vehicle License',
          'Third Party Insurance',
          'Road Worthiness',
          'Computerized Inspection Paper'
        ],
        installmentOptions: [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2]
      },
      {
        type: 'Commercial',
        popular: false,
        price: 25000,
        monthlyPayment: 2084,
        features: [
          'Vehicle License',
          'Third Party Insurance',
          'Road Worthiness',
          'Computerized Inspection Paper',
          'Hackney'
        ],
        installmentOptions: [12]
      }
    ]
  },
  {
    id: 'suv',
    icon: 'fas fa-car-side',
    label: 'SUV/Jeep',
    image: '/img/suv.png',
    variants: [
      {
        type: 'Private',
        popular: true,
        price: 24000,
        monthlyPayment: 2000,
        features: [
          'Vehicle License',
          'Third Party Insurance',
          'Road Worthiness',
          'Computerized Inspection Paper'
        ],
        installmentOptions: [12]
      }
    ]
  },
  {
    id: 'spacebus',
    icon: 'fas fa-car-alt',
    label: 'Space bus/Sienna',
    image: '/img/sienna.png',
    variants: [
      {
        type: 'Private',
        popular: true,
        price: 25000,
        monthlyPayment: 2084,
        features: [
          'Vehicle License',
          'Third Party Insurance',
          'Road Worthiness',
          'Computerized Inspection Paper'
        ],
        installmentOptions: [12]
      },
      {
        type: 'Commercial',
        popular: false,
        price: 28000,
        monthlyPayment: 2334,
        features: [
          'Vehicle License',
          'Third Party Insurance',
          'Road Worthiness',
          'Computerized Inspection Paper',
          'Hackney'
        ],
        installmentOptions: [12]
      }
    ]
  },
  {
    id: 'pickup',
    icon: 'fas fa-truck-pickup',
    label: 'Pick-Up/Hilux',
    image: '/img/pickup.png',
    variants: [
      {
        type: 'Private',
        popular: true,
        price: 26000,
        monthlyPayment: 2167,
        features: [
          'Vehicle License',
          'Third Party Insurance',
          'Road Worthiness',
          'Computerized Inspection Paper'
        ],
        installmentOptions: [12]
      },
      {
        type: 'Commercial',
        popular: false,
        price: 29000,
        monthlyPayment: 2417,
        features: [
          'Vehicle License',
          'Third Party Insurance',
          'Road Worthiness',
          'Computerized Inspection Paper',
          'Hackney'
        ],
        installmentOptions: [12]
      }
    ]
  },
  {
    id: 'bus',
    icon: 'fas fa-shuttle-van',
    label: 'Bus',
    image: '/img/bus.png',
    variants: [
      {
        type: 'Commercial',
        popular: true,
        price: 32000,
        monthlyPayment: 2667,
        features: [
          'Vehicle License',
          'Third Party Insurance',
          'Road Worthiness',
          'Computerized Inspection Paper',
          'Hackney'
        ],
        installmentOptions: [12]
      }
    ]
  },
  {
    id: 'coaster',
    icon: 'fas fa-bus',
    label: 'Coaster bus',
    image: '/img/coaster.png',
    variants: [
      {
        type: 'Commercial',
        popular: true,
        price: 35000,
        monthlyPayment: 2917,
        features: [
          'Vehicle License',
          'Third Party Insurance',
          'Road Worthiness',
          'Computerized Inspection Paper',
          'Hackney'
        ],
        installmentOptions: [12]
      }
    ]
  },
  {
    id: 'truck',
    icon: 'fas fa-truck-moving',
    label: 'Truck',
    image: '/img/truck.png',
    variants: [
      {
        type: 'Commercial',
        popular: true,
        price: 38000,
        monthlyPayment: 3167,
        features: [
          'Vehicle License',
          'Third Party Insurance',
          'Road Worthiness',
          'Computerized Inspection Paper',
          'Hackney'
        ],
        installmentOptions: [12]
      }
    ]
  },
  {
    id: 'motorcycle',
    icon: 'fas fa-motorcycle',
    label: 'Motorcycle',
    image: '/img/motorcycle.png',
    variants: [
      {
        type: 'Private',
        popular: true,
        price: 15000,
        monthlyPayment: 1250,
        features: [
          'Vehicle License',
          'Third Party Insurance',
          'Road Worthiness',
          'Computerized Inspection Paper'
        ],
        installmentOptions: [12]
      },
      {
        type: 'Commercial',
        popular: false,
        price: 18000,
        monthlyPayment: 1500,
        features: [
          'Vehicle License',
          'Third Party Insurance',
          'Road Worthiness',
          'Computerized Inspection Paper',
          'Hackney'
        ],
        installmentOptions: [12]
      }
    ]
  }
];

export default function VehiclePricing() {
  const [activeType, setActiveType] = useState(vehicleTypes[0].id);
  const [selectedMonths, setSelectedMonths] = useState({});

  const calculateMonthlyPayment = (total, months) => {
    return Math.ceil(total / months);
  };

  return (
    <section className="py-16 bg-white" id="PricingAndInstallments">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Choose your vehicle type
        </h2>

        {/* Vehicle Type Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {vehicleTypes.map((vehicle) => (
            <button
              key={vehicle.id}
              onClick={() => setActiveType(vehicle.id)}
              className={`px-4 py-2 rounded-full flex items-center gap-2 transition-colors
                ${activeType === vehicle.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              <i className={vehicle.icon}></i>
              {vehicle.label}
            </button>
          ))}
        </div>

        {/* Vehicle Display and Pricing Cards */}
        {vehicleTypes.map((vehicle) => (
          <div
            key={vehicle.id}
            className={activeType === vehicle.id ? 'block' : 'hidden'}
          >
            <div className="mb-8 text-center">
              <Image
                src={vehicle.image}
                alt={vehicle.label}
                width={400}
                height={200}
                className="mx-auto"
              />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {vehicle.variants.map((variant, index) => (
                <div
                  key={`${vehicle.id}-${variant.type}`}
                  className={`rounded-lg border-2 ${
                    variant.popular ? 'border-blue-600' : 'border-gray-200'
                  }`}
                >
                  {variant.popular && (
                    <div className="bg-blue-600 text-white text-center py-2">
                      Most Popular
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4">{variant.type} {vehicle.label}</h3>
                    <ul className="mb-6 space-y-2">
                      {variant.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2">
                        Select installment period:
                      </label>
                      <select
                        className="w-full rounded-lg border-gray-300"
                        value={selectedMonths[`${vehicle.id}-${variant.type}`] || variant.installmentOptions[0]}
                        onChange={(e) => {
                          const months = parseInt(e.target.value);
                          setSelectedMonths(prev => ({
                            ...prev,
                            [`${vehicle.id}-${variant.type}`]: months
                          }));
                        }}
                      >
                        {variant.installmentOptions.map(month => (
                          <option key={month} value={month}>{month} months</option>
                        ))}
                      </select>
                    </div>

                    <div className="text-center mb-6">
                      <p className="text-sm text-gray-600">Monthly payment:</p>
                      <p className="text-3xl font-bold text-blue-600">
                        ₦{calculateMonthlyPayment(
                          variant.price,
                          selectedMonths[`${vehicle.id}-${variant.type}`] || variant.installmentOptions[0]
                        ).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        Total: ₦{variant.price.toLocaleString()}
                      </p>
                    </div>

                    <Link
                      href="/register"
                      className="block w-full text-center py-2 px-4 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <p className="text-center text-gray-600 mt-8">
          The installment plans above are mainly indicative and serve as a way to set reminders for you. 
          While in your account, you can further pay conveniently as you can afford at any given time.
        </p>
      </div>
    </section>
  );
}
