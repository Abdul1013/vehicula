"use client";

import { useRouter } from "next/navigation";
import { MdConfirmationNumber } from "react-icons/md";
import { formatPrice } from "../utils/formatPrice";

export default function ServiceCard({ service, selectedId, toggleSelect }) {
  const router = useRouter();
  const isSelected = selectedId === service.id;

  return (
    <button
      onClick={() => {
        toggleSelect(service);
        router.push("/service_qty_form");
      }}
      className={`bg-gray-100 rounded-xl shadow-sm hover:shadow-md transition p-5 flex items-start gap-4 ${
        isSelected ? "bg-black text-white" : ""
      }`}
    >
      <MdConfirmationNumber
        className={`text-4xl flex-shrink-0 ${
          isSelected ? "text-white" : "text-green-600"
        }`}
      />
      <div className="flex flex-col">
        <span
          className={`font-medium ${isSelected ? "text-white" : "text-green-700"}`}
        >
          {service.category}
        </span>
        <span
          className={`text-sm ${isSelected ? "text-gray-300" : "text-red-600"}`}
        >
          {service.type}
        </span>
        {service.desc && (
          <span
            className={`text-sm italic ${
              isSelected ? "text-gray-300" : "text-gray-500"
            }`}
          >
            {service.desc}
          </span>
        )}
        <span
          className={`font-bold text-lg mt-2 ${
            isSelected ? "text-white" : "text-green-700"
          }`}
        >
          {formatPrice(service.price)}
        </span>
      </div>
    </button>
  );
}