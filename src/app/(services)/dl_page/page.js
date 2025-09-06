"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ServiceSearch from "@/components/ServiceSearch";
import ServiceHeader from "@/components/ServiceHeader";
import ServiceCard from "@/components/ServiceCard";
import { IdCard } from "lucide-react";
import { serviceConfig } from "@/config/serviceConfig";

const services = serviceConfig.driverLicense
// const services = [
//   { id: "fresh-3", name: "Fresh", type: "3 years", price: 38000, icon: IdCard },
//   { id: "fresh-5", name: "Fresh", type: "5 years", price: 45000, icon: IdCard },
//   {
//     id: "renew-3",
//     name: "Renewal",
//     type: "3 years",
//     price: 26000,
//     icon: IdCard,
//   },
//   {
//     id: "renew-5",
//     name: "Renewal",
//     type: "5 years",
//     price: 30000,
//     icon: IdCard,
//     uploadRequired: 1,
//     docName: ["current driver license"],
//     fields: [],
//   },
//   {
//     id: "intl-1",
//     name: "International (IDP)",
//     duration: "1 year",
//     price: 25000,
//     icon: IdCard,
//   },
// ];

export default function DriverLicensePage() {
  const [query, setQuery] = useState("");
  const router = useRouter();

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

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No matching services found.
        </p>
      )}
    </div>
  );
}
