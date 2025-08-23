"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";
import { MdConfirmationNumber } from "react-icons/md";
import { useRouter } from "next/navigation";

const services = [
  {
    id: 1,
    category: "Private",
    type: "Saloon Car",
    desc: "(1.4–1.9L) – e.g. Golf, Corolla, Kia rio, Civic",
    price: 75000,
  },
  {
    id: 2,
    category: "Private",
    type: "Saloon Car",
    desc: "(2.0–2.6L) e.g. Camry, Benz, Accord, Lexus & Others",
    price: 76500,
  },
  {
    id: 3,
    category: "Commercial",
    type: "Saloon Car",
    desc: "(1.4–1.9L) – e.g. Golf, Corolla, Kia rio, Civic",
    price: 78000,
  },
  {
    id: 4,
    category: "Commercial",
    type: "Saloon Car",
    desc: "(2.0–2.6L) e.g. Camry, Benz, Accord, Lexus & Others",
    price: 78000,
  },
  {
    id: 5,
    category: "Private",
    type: "SUV | Jeep | Bus/Sienna | Pick-Up | Crossover",
    desc: "",
    price: 78000,
  },
  {
    id: 6,
    category: "Commercial",
    type: "SUV | Jeep | Bus | Pick-Up | Crossover",
    desc: "",
    price: 83000,
  },
  {
    id: 7,
    category: "Private",
    type: "Coaster Bus",
    desc: "",
    price: 85000,
  },
  {
    id: 8,
    category: "Commercial",
    type: "Coaster Bus",
    desc: "",
    price: 89000,
  },
  {
    id: 9,
    category: "Mini Trucks",
    type: "Trucks 15 Tons (Tippers)",
    desc: "",
    price: 180000,
  },
  {
    id: 10,
    category: "Trucks",
    type: "30 Tons (Trailers 10+ Tyres)",
    desc: "",
    price: 180000,
  },
];

function formatPrice(amount) {
  return `₦${amount.toLocaleString()}`;
}

export default function PlateNumberServices() {
  const [selectedId, setSelectedId] = useState(null);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const toggleSelect = (service) => {
    setSelectedId(service.id);
    if (!cart.find((item) => item.id === service.id)) {
      setCart([...cart, service]);
    }
  };

  const filtered = services.filter(
    (s) =>
      s.category.toLowerCase().includes(search.toLowerCase()) ||
      s.type.toLowerCase().includes(search.toLowerCase()) ||
      s.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen max-w-7xl mx-auto mt-20 bg-white px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <div
          onClick={() => history.back()}
          className="flex items-center gap-2 text-green-700 font-semibold cursor-pointer"
        >
          <FaArrowLeft size={18} />
          <span>Plate Number Issuance</span>
        </div>

        <button className="relative bg-primary text-white p-3 rounded-full shadow-lg hover:scale-105 transition">
          <MdConfirmationNumber size={22} />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="flex items-center bg-white border border-gray-300 rounded-md px-4 py-2 shadow-sm">
          <FiSearch className="text-gray-500 mr-2" size={18} />
          <input
            type="text"
            placeholder="Search Plate Number Services"
            className="w-full focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Grid of services */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((service) => {
          const isSelected = selectedId === service.id;
          return (
            <button
              key={service.id}
              onClick={() => {
                toggleSelect(service);
                router.push("/service_qty_form");
              }}
              className={`bg-gray-100 rounded-xl shadow-sm hover:shadow-md transition p-5 flex items-start gap-4 ${
                isSelected ? "bg-black text-white" : ""
              }`}
            >
              <MdConfirmationNumber
                className={`text-4xl flex-shrink-0 ${
                  isSelected ? "text-white" : "text-green-600"
                }`}
              />
              <div className="flex flex-col">
                <span
                  className={`font-medium ${
                    isSelected ? "text-white" : "text-green-700"
                  }`}
                >
                  {service.category}
                </span>
                <span
                  className={`text-sm ${
                    isSelected ? "text-gray-300" : "text-red-600"
                  }`}
                >
                  {service.type}
                </span>
                {service.desc && (
                  <span
                    className={`text-sm italic ${
                      isSelected ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {service.desc}
                  </span>
                )}
                <span
                  className={`font-bold text-lg mt-2 ${
                    isSelected ? "text-white" : "text-green-700"
                  }`}
                >
                  {formatPrice(service.price)}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* No Results */}
      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No matching services found.
        </p>
      )}
    </div>
  );
}