"use client";

import { useState } from "react";
import { Search, ShoppingCart } from "lucide-react";
import Router from "next/router";
import { useRouter } from "next/navigation";
const services = [
  { id: 1, name: "Saloon/Car", type: "Private", price: 23500, icon: "🚗" },
  { id: 2, name: "Saloon/Car", type: "Commercial", price: 26500, icon: "🚗" },
  { id: 3, name: "Jeep/SUV", type: "Private", price: 25000, icon: "🚙" },
  {
    id: 4,
    name: "Space bus/Sienna",
    type: "Private",
    price: 25000,
    icon: "🚐",
  },
  {
    id: 5,
    name: "Space bus/Sienna",
    type: "Commercial",
    price: 29200,
    icon: "🚐",
  },
  { id: 6, name: "Pick-Up/Hilux", type: "Private", price: 27000, icon: "🛻" },
  {
    id: 7,
    name: "Pick-Up/Hilux",
    type: "Commercial",
    price: 32000,
    icon: "🛻",
  },
  {
    id: 8,
    name: "18 passenger/Bus",
    type: "Private",
    price: 26000,
    icon: "🚌",
  },
  {
    id: 9,
    name: "18 passenger/Bus",
    type: "Commercial",
    price: 30000,
    icon: "🚌",
  },
  { id: 10, name: "Coaster Bus", type: "Private", price: 30000, icon: "🚌" },
  { id: 11, name: "Coaster Bus", type: "Commercial", price: 35000, icon: "🚌" },
  { id: 12, name: "Truck", type: "Commercial", price: 85000, icon: "🚛" },
];

function formatPrice(amount) {
  return `₦${amount.toLocaleString()}`;
}

export default function VehicleParticularsRenewal() {
  const [selectedId, setSelectedId] = useState(null);
  const [cart, setCart] = useState([]);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const toggleSelect = (service) => {
    setSelectedId(service.id);
    if (!cart.find((item) => item.id === service.id)) {
      setCart([...cart, service]);
    }
  };

  const filteredServices = services.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4 max-w-6xl mt-20 mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => history.back()}
          className="text-primary font-medium hover:underline"
        >
          ← Vehicle Particulars Renewal
        </button>

        <button className="relative bg-primary text-white p-3 rounded-full shadow-lg hover:scale-105 transition">
          <ShoppingCart size={22} />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search Vehicle Particulars Renewal Services"
          className="w-full border rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredServices.map((service) => {
          const isSelected = selectedId === service.id;
          return (
            <button
              key={service.id}
              onClick={() => router.push('/service_qty_form')}
              className={`p-4 rounded-xl shadow-sm border transition ${
                isSelected
                  ? "bg-black text-white"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <div className="text-4xl mb-3">{service.icon}</div>
              <div className="font-medium text-green-500">{service.name}</div>
              <div
                className={`text-sm ${
                  isSelected ? "text-gray-300" : "text-red-600"
                }`}
              >
                {service.type}
              </div>
              <div className="mt-2 text-green-500 font-bold">
                {formatPrice(service.price)}
              </div>
            </button>
          );
        })}
      </div>

      {/* Cart Floating Icon */}
    </div>
  );
}
