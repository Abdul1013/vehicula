"use client";

import { useRouter } from "next/navigation";
import { FaIdCard } from "react-icons/fa";
import { formatPrice } from "../utils/formatPrice";

export default function ServiceCard({ service, selectedId, onSelect }) {
  const router = useRouter();
  const isSelected = selectedId === service.id;

  const getFormPath = (category) => {
    switch (category) {
      case "driver_license":
        return "/dl_application_form";
      case "vehicle_registration":
        return "/vehicle_registration_form";
      case "insurance":
        return "/insurance_form";
      default:
        return "/generic_service_form";
    }
  };

  const handleClick = () => {
    if (onSelect) onSelect(service.id);
    console.log("ServiceCard clicked:", {
      id: service.id,
      name: service.name,
      price: service.price,
      category: service.category,
    }); // Debug log
    setTimeout(() => {
      const formPath = getFormPath(service.category || "driver_license");
      const url = `${formPath}?category=${encodeURIComponent(service.category || "driver_license")}&id=${service.id}&price=${service.price}&name=${encodeURIComponent(service.name)}`;
      console.log("Navigating to:", url); // Debug log
      router.push(url);
    }, 100);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={`Select ${service.category || "Driver License"} - ${service.name}`}
      className={`cursor-pointer border rounded-xl p-6 shadow hover:shadow-lg transition items-center text-center
        ${isSelected ? "bg-gray-200 text-gray-800" : "bg-gray-100 border-green-400"}`}
    >
      <div className='flex flex-col items-center'>
        <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50'>
          <FaIdCard
            className={`h-8 w-8 ${isSelected ? "text-white" : "text-green-600"}`}
          />
        </div>
        <span
          className={`font-medium ${isSelected ? "text-white" : "text-green-700"}`}
        >
          {service.name}
        </span>
        <span
          className={`font-bold text-lg mt-2 ${isSelected ? "text-green-500" : "text-green-700"}`}
        >
          {formatPrice(service.price, "NGN")}
        </span>
      </div>
    </button>
  );
}
