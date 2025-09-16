"use client";

import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

export default function ServiceSearch({
  services,
  setFilteredServices,
  searchFields = ["category", "name", "type", "desc"],
}) {
  const [search, setSearch] = useState("");

  // Update filtered services whenever search or services change
  useEffect(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      setFilteredServices(services); // Reset to all services if search is empty
      return;
    }

    const filtered = services.filter((service) =>
      searchFields.some((field) => {
        const value = service[field];
        return (
          value &&
          typeof value === "string" &&
          value.toLowerCase().includes(query)
        );
      })
    );
    console.log("ServiceSearch - Filtering:", {
      query,
      filteredCount: filtered.length,
      servicesCount: services.length,
    }); // Debug
    setFilteredServices(filtered);
  }, [search, services, setFilteredServices, searchFields]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className='max-w-2xl mx-auto mb-6'>
      <div className='flex items-center bg-white border border-gray-300 rounded-md px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500'>
        <FiSearch className='text-gray-500 mr-2' size={18} aria-hidden='true' />
        <input
          type='text'
          placeholder='Search Services'
          className='w-full focus:outline-none text-gray-700'
          value={search}
          onChange={handleSearch}
          aria-label='Search services'
        />
      </div>
    </div>
  );
}
