"use client";

import { useState } from "react";
import { Search } from "lucide-react";


const partsData = [
  { id: "1", icon: "fas fa-car-battery", name: "Battery", brand: "Runhall", spec: "40amps", price: 45000 },
  { id: "2", icon: "fas fa-car-battery", name: "Battery", brand: "Runhall", spec: "75amps", price: 65000 },
  { id: "3", icon: "fas fa-truck-monster", name: "Tyre", brand: "Austone", spec: "205/55 R16", price: 65000 },
  { id: "4", icon: "fas fa-oil-can", name: "Engine Oil", brand: "Total SAE", spec: "20W-50", price: 35000 },
  { id: "5", icon: "fas fa-tools", name: "KEKE Tyre", brand: "Kampala", spec: "", price: 24000 },
  { id: "6", icon: "fas fa-truck-monster", name: "Tyre", brand: "Austone", spec: "205/60 R16", price: 56500 },
  { id: "7", icon: "fas fa-oil-can", name: "Engine Oil", brand: "Total Quartz", spec: "20W-50 4 Litre", price: 19500 },
];

export default function SpareParts() {
  const [query, setQuery] = useState("");

  const filteredParts = partsData.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.brand.toLowerCase().includes(query.toLowerCase()) ||
      p.spec.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen mt-20  max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-6">
        <button className="text-gray-700 hover:text-gray-900">
          <i className="fas fa-arrow-left" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Spare Parts</h1>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="search"
          placeholder="Search Spare Parts Services"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
        />
      </div>

      {/* Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredParts.map((part) => (
          <div
            key={part.id}
            className="p-4 bg-gray-50 rounded-xl border hover:shadow-md transition"
          >
            <div className="text-green-600 mb-3">
              <i className={`${part.icon} fa-2x`} />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-800">{part.name}</p>
              <p className="text-xs text-red-500 font-medium">{part.brand}</p>
              {part.spec && (
                <p className="text-xs text-gray-500">{part.spec}</p>
              )}
              <p className="mt-2 text-green-700 font-bold">
                ₦{part.price.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
        {filteredParts.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-12">
            <i className="fas fa-folder-open fa-2x mb-3" />
            <p className="text-sm italic">No spare parts found</p>
          </div>
        )}
      </div>
    </div>
  );
}
