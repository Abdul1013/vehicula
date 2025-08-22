// app/page.js (or any route in App Router)
"use client"; // needed for client-side interactivity
import { useState, useEffect } from "react";
import Image from "next/image";

// Sample service data (replace with your API data or props)
const sampleServices = [
  {
    id: 1,
    name: "Service One",
    icon: "fa-cog",
    subServices: [
      { id: 101, name: "Sub One", price: 50, icon: "fa-cog" },
      { id: 102, name: "Sub Two", price: 75, icon: "fa-cog" },
    ],
  },
  {
    id: 2,
    name: "Service Two",
    icon: "fa-wrench",
    subServices: [
      { id: 201, name: "Sub A", price: 60, icon: "fa-wrench" },
    ],
  },
];

export default function ServicesPage() {
  const [services, setServices] = useState(sampleServices);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [modalService, setModalService] = useState(null);

  // Filtered services based on search
  const filteredServices = services.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handler to add/remove selected service
  const toggleSelectService = (subService) => {
    setSelectedServices((prev) => {
      if (prev.find((s) => s.id === subService.id)) {
        return prev.filter((s) => s.id !== subService.id);
      }
      return [...prev, subService];
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Title */}
      <div className="text-center mb-6">
        <h5 className="text-xl font-semibold">Let us Get Started!</h5>
      </div>

      {/* Search Input */}
      <div className="flex justify-center mb-8">
        <input
          type="search"
          placeholder="Type here to search services"
          className="border rounded-l px-3 py-2 w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="bg-gray-100 border border-l-0 px-3 flex items-center rounded-r">
          <i className="fas fa-search text-gray-500"></i>
        </span>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <div key={service.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-lg transition">
              <div className="flex items-center mb-3">
                <i className={`fa ${service.icon} fa-3x text-blue-600`}></i>
                <div className="ml-auto text-right">
                  <p className="font-bold text-yellow-600">{service.name}</p>
                </div>
              </div>
              <div className="text-sm italic text-gray-700">
                {service.subServices.map((sub) => sub.name).join(", ")}
              </div>
              <button
                onClick={() => setModalService(service)}
                className="mt-3 text-blue-600 underline text-sm"
              >
                View Subservices
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-red-500">No matching results</p>
        )}
      </div>

      {/* Floating Selected Services Button */}
      <div className="fixed bottom-5 left-5 z-50">
        <div className="relative">
          <button className="bg-black text-white rounded-full w-14 h-14 flex items-center justify-center relative">
            <i className="fas fa-cart-arrow-down"></i>
            {selectedServices.length > 0 && (
              <span className="absolute top-0 left-0 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {selectedServices.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Modal for Subservices */}
      {modalService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 lg:w-4/5 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h6 className="font-semibold">{modalService.name}</h6>
              <button onClick={() => setModalService(null)} className="text-gray-500">
                &times;
              </button>
            </div>
            <div className="p-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
              {modalService.subServices.map((sub) => (
                <div
                  key={sub.id}
                  className="bg-gray-50 p-4 rounded hover:shadow-md cursor-pointer"
                  onClick={() => toggleSelectService(sub)}
                >
                  <div className="flex items-center">
                    <i className={`fa ${sub.icon} fa-3x text-blue-600`}></i>
                    <div className="ml-auto text-right">
                      <p className="italic text-sm">{sub.name}</p>
                      <p className="font-bold">{sub.price}$</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
