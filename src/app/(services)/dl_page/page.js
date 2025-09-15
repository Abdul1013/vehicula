"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ServiceSearch from "@/components/ServiceSearch";
import ServiceHeader from "@/components/ServiceHeader";
import ServiceCard from "@/components/ServiceCard";

export default function DriverLicensePage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);

  // Fetch services from /api/dl_services
  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch("/api/dl_services", {
          credentials: "include", // Send auth_token cookie
        });
        const data = await response.json();
        if (response.ok) {
          setServices(data.services); // Use API response directly
        } else {
          setError(data.error || "Failed to fetch services");
        }
      } catch (err) {
        setError("Error fetching services");
        console.error(err);
      }
    }
    fetchServices();
  }, []);

  // Filter services based on search query
  const filtered = services.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  // Handle service selection (passed to ServiceCard)
  const handleSelect = (id) => {
    setSelectedId(id);
    // Navigation handled by ServiceCard
  };

  return (
    <div className="bg-white min-h-screen mt-20 px-4 py-6">
      {/* Back / Header */}
      <ServiceHeader title="Driver License" />

      {/* Search */}
      <ServiceSearch value={query} onChange={setQuery} />

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {error ? (
          <p className="text-center text-red-500 mt-6">{error}</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-500 mt-6">
            {services.length === 0
              ? "No services available for your region."
              : "No matching services found."}
          </p>
        ) : (
          filtered.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              selectedId={selectedId}
              onSelect={handleSelect}
            />
          ))
        )}
      </div>
    </div>
  );
}