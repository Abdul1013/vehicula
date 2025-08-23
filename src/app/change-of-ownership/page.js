"use client";
import { useState } from "react";
import ServiceHeader from "../../components/ServiceHeader";
import ServiceSearch from "../../components/ServiceSearch";
import ServiceCard from "../../components/ServiceCard";
import { useCart } from "../../utils/cartUtils";

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

export default function ChangeOfOwnership() {
  const { selectedId, cart, toggleSelect } = useCart();
  const [filteredServices, setFilteredServices] = useState(services);

  return (
    <div className="min-h-screen max-w-7xl mx-auto mt-20 bg-white px-4 py-6">
      <ServiceHeader title="Change of Ownership" cart={cart} />
      <ServiceSearch services={services} setFilteredServices={setFilteredServices} />
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            selectedId={selectedId}
            toggleSelect={toggleSelect}
          />
        ))}
      </div>
      {filteredServices.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No matching services found.
        </p>
      )}
    </div>
  );
}