import { useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function ServiceSearch({ services, setFilteredServices }) {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);
    const filtered = services.filter(
      (s) =>
        s.category.toLowerCase().includes(query.toLowerCase()) ||
        s.type.toLowerCase().includes(query.toLowerCase()) ||
        s.desc.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredServices(filtered);
  };

  return (
    <div className="max-w-2xl mx-auto mb-6">
      <div className="flex items-center bg-white border border-gray-300 rounded-md px-4 py-2 shadow-sm">
        <FiSearch className="text-gray-500 mr-2" size={18} />
        <input
          type="text"
          placeholder="Search Services"
          className="w-full focus:outline-none"
          value={search}
          onChange={handleSearch}
        />
      </div>
    </div>
  );
}