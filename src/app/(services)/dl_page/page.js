"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ServiceSearch from "@/components/ServiceSearch";
import ServiceHeader from "@/components/ServiceHeader";
import ServiceCard from "@/components/ServiceCard";

export default function DriverLicensePage() {
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch services from /api/dl_services
  useEffect(() => {
    async function fetchServices() {
      try {
        setLoading(true);
        const response = await fetch("/api/dl_services", {
          credentials: "include", // Send auth_token cookie
        });
        const data = await response.json();
        if (response.ok) {
          const mappedServices = data.services.map((service) => ({
            ...service,
            category: "driver_license", // Ensure category is set
          }));
          console.log("Fetched services:", mappedServices); // Debug
          setServices(mappedServices);
          setFilteredServices(mappedServices); // Initialize filtered services
        } else {
          setError(data.error || "Failed to fetch services");
        }
      } catch (err) {
        setError("Error fetching services");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  // Handle service selection
  const handleSelect = (id) => {
    setSelectedId(id);
    // Navigation handled by ServiceCard
  };

  return (
    <div className='bg-white max-w-7xl mx-auto min-h-screen mt-20 px-4 py-6'>
      {/* Header */}
      <ServiceHeader title='Driver License' />

      {/* Search */}
      <ServiceSearch
        services={services}
        setFilteredServices={setFilteredServices}
        searchFields={["name", "category"]} // Optimized for driver's license
      />

      {/* Services Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {loading ? (
          // Spinner Loader
          <div className='flex justify-center items-center w-full py-10 col-span-full'>
            <div className='h-10 w-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin'></div>
          </div>
        ) : error ? (
          <p className='text-center text-red-500 mt-6 col-span-full'>{error}</p>
        ) : filteredServices.length === 0 ? (
          <p className='text-center text-gray-500 mt-6 col-span-full'>
            {services.length === 0
              ? "No services available for your region."
              : "No matching services found."}
          </p>
        ) : (
          filteredServices.map((service) => (
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
