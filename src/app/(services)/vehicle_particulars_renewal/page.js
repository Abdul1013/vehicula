"use client";

import { useState } from "react";
import { Search, Car, Bus, Truck, Van, BusFront, CarFront } from "lucide-react";
import { useRouter } from "next/navigation";
import ServiceSearch from "@/components/ServiceSearch";
import ServiceHeader from "@/components/ServiceHeader";
import ServiceCard from "@/components/ServiceCard";

const services = [
  { id: 1, name: "Saloon/Car", type: "Private", price: 23500, icon: CarFront },
  {
    id: 2,
    name: "Saloon/Car",
    type: "Commercial",
    price: 26500,
    icon: CarFront,
  },
  { id: 3, name: "Jeep/SUV", type: "Private", price: 25000, icon: Car },
  { id: 4, name: "Space bus/Sienna", type: "Private", price: 25000, icon: Bus },
  {
    id: 5,
    name: "Space bus/Sienna",
    type: "Commercial",
    price: 29200,
    icon: Bus,
  },
  { id: 6, name: "Pick-Up/Hilux", type: "Private", price: 27000, icon: Truck },
  {
    id: 7,
    name: "Pick-Up/Hilux",
    type: "Commercial",
    price: 32000,
    icon: Truck,
  },
  { id: 8, name: "18 passenger/Bus", type: "Private", price: 26000, icon: Bus },
  {
    id: 9,
    name: "18 passenger/Bus",
    type: "Commercial",
    price: 30000,
    icon: Bus,
  },
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

  // const filteredServices = services.filter((s) =>
  //   s.name.toLowerCase().includes(query.toLowerCase())
  // );
 const [filteredServices, setFilteredServices] = useState([]);
  return (
    <div className="p-4 max-w-6xl mt-20 mx-auto">
      {/* Header */}
      <ServiceHeader title="Vehicle Particulars Renewal" />

      {/* Search */}
      <ServiceSearch   services={services}
        setFilteredServices={setFilteredServices}
        searchFields={["name", "category"]} // Optimized for driver's license/
        />

      {/* Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            selectedId={selectedId}
            // toggleSelect={toggleSelect}
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
