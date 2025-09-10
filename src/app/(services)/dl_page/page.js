"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ServiceSearch from "@/components/ServiceSearch";
import ServiceHeader from "@/components/ServiceHeader";
import ServiceCard from "@/components/ServiceCard";
import { serviceConfig } from "@/config/serviceConfig";

export default function DriverLicensePage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // get services from service config
  const services = serviceConfig.driverLicense;

  // filter
  const filtered = services.filter((s) =>
    `${s.name} ${s.type || s.duration}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen mt-20 px-4 py-6">
      {/* Back / Header */}
      <ServiceHeader title="driver license" />

      {/* Search */}
      <ServiceSearch value={query} onChange={setQuery} />

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            selectedId={selectedId}
            onSelect={setSelectedId} // updates selection
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No matching services found.
        </p>
      )}
    </div>
  );
}
