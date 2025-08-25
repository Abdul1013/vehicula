"use client";

import { useState } from "react";
import { Search, Car, Bus, Truck, Van, BusFront, CarFront } from "lucide-react";
import { useRouter } from "next/navigation";

const services = [
  { id: 1, name: "Saloon/Car", type: "Private", price: 23500, icon: CarFront },
  { id: 2, name: "Saloon/Car", type: "Commercial", price: 26500, icon: CarFront },
  { id: 3, name: "Jeep/SUV", type: "Private", price: 25000, icon: Car },
  { id: 4, name: "Space bus/Sienna", type: "Private", price: 25000, icon: Bus},
  { id: 5, name: "Space bus/Sienna", type: "Commercial", price: 29200, icon: Bus  },
  { id: 6, name: "Pick-Up/Hilux", type: "Private", price: 27000, icon: Truck },
  { id: 7, name: "Pick-Up/Hilux", type: "Commercial", price: 32000, icon: Truck },
  { id: 8, name: "18 passenger/Bus", type: "Private", price: 26000, icon: Bus },
  { id: 9, name: "18 passenger/Bus", type: "Commercial", price: 30000, icon: Bus },
  { id: 10, name: "Coaster Bus", type: "Private", price: 30000, icon: Bus },
  { id: 11, name: "Coaster Bus", type: "Commercial", price: 35000, icon: Bus },
  { id: 12, name: "Truck", type: "Commercial", price: 85000, icon: Truck },
];

function formatPrice(amount) {
  return `₦${amount.toLocaleString()}`;
}

export default function VehicleParticularsRenewal() {
  const [selectedId, setSelectedId] = useState(null);
  const [cart, setCart] = useState([]);
  const [query, setQuery] = useState("");
  const router = useRouter();

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
          const Icon = service.icon; // ✅ FIXED
          return (
            <button
              key={service.id}
              onClick={() => router.push("/service_qty_form")}
              className={`p-4 rounded-xl shadow-sm border transition ${
                isSelected
                  ? "bg-black text-white"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-50 group-hover:bg-green-100 transition-colors">
                <Icon className="w-8 h-8 text-green-600" />
              </div>
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
    </div>
  );
}
