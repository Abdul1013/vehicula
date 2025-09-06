"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ServiceSearch from "@/components/ServiceSearch";
import ServiceHeader from "@/components/ServiceHeader";
import ServiceCard from "@/components/ServiceCard";
import { IdCard } from "lucide-react";
import { serviceConfig } from "@/config/serviceConfig";

export default function DriverLicensePage() {
  const [query, setQuery] = useState("");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  // const services = serviceConfig.driverLicense
  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch("/api/dl_services");
        if (!response.ok) throw new Error("Failed to fetch services");
        const { services } = await response.json();
        setServices(services);
        console.info("Fetched services for DriverLicensePage", {
          count: services.length,
        });
      } catch (err) {
        setError(err.message);
        console.warn("Error fetching services", { error: err.message });
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  const filtered = services.filter((s) =>
    `${s.name} ${s.duration}`.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (service) => {
    router.push(
      `/dl_application_form?id=${service.id}&name=${encodeURIComponent(
        service.name
      )}&duration=${encodeURIComponent(service.duration)}&price=${
        service.price
      }`
    );
  };
  const [selectedId, setSelectedId] = useState(null);
  const [filteredServices, setFilteredServices] = useState(services);

  return (
    <div className="bg-white min-h-screen mt-20 px-4 py-6">
      {/* Back */}
      <ServiceHeader title={"driver license"} />

      {/* Search */}
      <ServiceSearch />

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            selectedId={selectedId}
            // toggleSelect={toggleSelect}
          />
        ))}
      </div>

      {filtered.length === 0 && !loading && (
        <p className="text-center text-gray-500 mt-6">
          No matching services found.
        </p>
      )}
    </div>
  );
}
