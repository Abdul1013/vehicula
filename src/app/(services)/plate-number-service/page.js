"use client";

import { useState } from "react";
import ServiceHeader from "../../components/ServiceHeader";
import ServiceSearch from "../../components/ServiceSearch";
import ServiceCard from "../../components/ServiceCard";
import { useCart } from "../../utils/cartUtils";

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

export default function PlateNumberServices() {
  const { selectedId, cart, toggleSelect } = useCart();
  const [filteredServices, setFilteredServices] = useState(services);

  return (
    <div className='min-h-screen max-w-7xl mx-auto mt-20 bg-white px-4 py-6'>
      <ServiceHeader title='Plate Number Issuance' cart={cart} />
      <ServiceSearch
        services={services}
        setFilteredServices={setFilteredServices}
      />
      <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
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
        <p className='text-center text-gray-500 mt-6'>
          No matching services found.
        </p>
      )}
    </div>
  );
}
