"use client";

import { useState } from "react";
import { Search, ShoppingCart, ArrowLeft, Car } from "lucide-react";
import { useRouter } from "next/navigation";

const services = [
  {
    id: 1,
    category: "All",
    type: "vehicle types",
    desc: "",
    price: 12000,
  },
  {
    id: 2,
    category: "Private",
    type: "cars",
    desc: "e.g. Saloon, SUV, Crossover",
    price: 15500,
  },
  {
    id: 3,
    category: "Commercial",
    type: "buses",
    desc: "e.g. Mini Bus, Coaster Bus",
    price: 20000,
  },
  {
    id: 4,
    category: "Motorcycles",
    type: "2-wheelers",
    desc: "",
    price: 5000,
  },
];

function formatPrice(amount) {
  return `₦${amount.toLocaleString()}`;
}

export default function ChangeOfOwnership() {
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

  const filteredServices = services.filter(
    (s) =>
      s.category.toLowerCase().includes(search.toLowerCase()) ||
      s.type.toLowerCase().includes(search.toLowerCase()) ||
      s.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='min-h-screen max-w-7xl mx-auto mt-20 bg-white px-4 py-6'>
      {/* Header */}
      <div className='flex items-center justify-between gap-3 mb-6'>
        <div
          onClick={() => history.back()}
          className='flex items-center gap-2 text-green-700 font-semibold cursor-pointer'
        >
          <ArrowLeft size={18} />
          <span>Change of Ownership</span>
        </div>

        {/* <button className='relative bg-primary text-white p-3 rounded-full shadow-lg hover:scale-105 transition'>
          <ShoppingCart size={22} />
          {cart.length > 0 && (
            <span className='absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5'>
              {cart.length}
            </span>
          )}
        </button> */}
      </div>

      {/* Search */}
      <div className='max-w-2xl mx-auto mb-6'>
        <div className='flex items-center bg-white border border-gray-300 rounded-md px-4 py-2 shadow-sm'>
          <Search className='text-gray-500 mr-2' size={18} />
          <input
            type='text'
            placeholder='Search Change of Ownership Services'
            className='w-full focus:outline-none'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filteredServices.map((service) => {
          const isSelected = selectedId === service.id;
          return (
            <button
              key={service.id}
              onClick={() => {
                toggleSelect(service);
                router.push("/service_qty_form");
              }}
              className={`rounded-xl shadow-sm transition p-5 flex items-start gap-4 ${
                isSelected
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:shadow-md"
              }`}
            >
              <Car
                className={`text-4xl flex-shrink-0 ${
                  isSelected ? "text-white" : "text-green-600"
                }`}
              />
              <div className='flex flex-col'>
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

      {/* No results */}
      {filteredServices.length === 0 && (
        <p className='text-center text-gray-500 mt-6'>
          No matching services found.
        </p>
      )}
    </div>
  );
}
