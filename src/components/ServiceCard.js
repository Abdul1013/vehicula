"use client";

import { useRouter } from "next/navigation";
import { formatPrice } from "../utils/formatPrice";

export default function ServiceCard({ service, selectedId, onSelect }) {
  const router = useRouter();
  const isSelected = selectedId === service.id;

  const handleClick = () => {
    if (onSelect) onSelect(service.id);

    setTimeout(() => {
      router.push(
        `/service_request_form?category=${service.category}&id=${service.id}&price=${service.price}`
      );
    }, 100);
  };

  const Icon = service.icon;

  return (
    <button
      onClick={handleClick}
      aria-label={`Select ${service.category} - ${service.type}`}
      className={`cursor-pointer border rounded-xl p-6 shadow hover:shadow-lg transition items-center text-center
        ${isSelected ? "bg-black text-white" : "bg-gray-100 border-green-400"}
      `}
    >
      <div className='flex flex-col items-center'>
        <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50'>
          <Icon
            className={`h-8 w-8 ${isSelected ? "text-white" : "text-green-600"}`}
          />
        </div>

        <span
          className={`font-medium ${isSelected ? "text-white" : "text-green-700"}`}
        >
          {service.name}
        </span>

        {service.type && (
          <span
            className={`text-sm ${isSelected ? "text-gray-300" : "text-black"}`}
          >
            {service.type}
          </span>
        )}

        {service.desc && (
          <span
            className={`text-sm italic ${isSelected ? "text-gray-300" : "text-gray-500"}`}
          >
            {service.desc}
          </span>
        )}

        <span
          className={`font-bold text-lg mt-2 ${isSelected ? "text-green-500" : "text-green-700"}`}
        >
          {formatPrice(service.price, "NGN")}
        </span>
      </div>
    </button>
  );
}
