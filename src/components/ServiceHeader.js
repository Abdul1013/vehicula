"use client";

import { FaArrowLeft } from "react-icons/fa";
import { MdConfirmationNumber } from "react-icons/md";

export default function ServiceHeader({ title, cart }) {
  return (
    <div className="flex items-center justify-between gap-3 mb-6">
      <div
        onClick={() => history.back()}
        className="flex items-center gap-2 text-green-700 font-semibold cursor-pointer"
      >
        <FaArrowLeft size={18} />
        <span>{title}</span>
      </div>
      <button className="relative bg-primary text-white p-3 rounded-full shadow-lg hover:scale-105 transition">
        <MdConfirmationNumber size={22} />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
            {cart.length}
          </span>
        )}
      </button>
    </div>
  );
}