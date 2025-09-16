"use client";
// import { useState } from "react";
// import ServiceHeader from "../../components/ServiceHeader";
// import ServiceSearch from "../../components/ServiceSearch";
// import ServiceCard from "../../components/ServiceCard";
// import { useCart } from "../../utils/cartUtils";

// const services = [
//   {
//     id: 1,
//     category: "All",
//     type: "vehicle types",
//     desc: "",
//     price: 12000,
//   },
//   {
//     id: 2,
//     category: "Private",
//     type: "cars",
//     desc: "e.g. Saloon, SUV, Crossover",
//     price: 15500,
//   },
//   {
//     id: 3,
//     category: "Commercial",
//     type: "buses",
//     desc: "e.g. Mini Bus, Coaster Bus",
//     price: 20000,
//   },
//   {
//     id: 4,
//     category: "Motorcycles",
//     type: "2-wheelers",
//     desc: "",
//     price: 5000,
//   },
// ];

// export default function ChangeOfOwnership() {
//   const { selectedId, cart, toggleSelect } = useCart();
//   const [filteredServices, setFilteredServices] = useState(services);

//   return (
//     <div className="min-h-screen max-w-7xl mx-auto mt-20 bg-white px-4 py-6">
//       <ServiceHeader title="Change of Ownership" cart={cart} />
//       <ServiceSearch services={services} setFilteredServices={setFilteredServices} />
//       <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredServices.map((service) => (
//           <ServiceCard
//             key={service.id}
//             service={service}
//             selectedId={selectedId}
//             toggleSelect={toggleSelect}
//           />
//         ))}
//       </div>
//       {filteredServices.length === 0 && (
//         <p className="text-center text-gray-500 mt-6">
//           No matching services found.
//         </p>
//       )}
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { Search } from "lucide-react";



const ownershipData = [
  { id: "1", icon: "fas fa-car", type: "Saloon/Car", category: "Private", price: 34000 },
  { id: "2", icon: "fas fa-car", type: "Saloon/Car", category: "Commercial", price: 37000 },
  { id: "3", icon: "fas fa-car-side", type: "SUV/Jeep", category: "Other", price: 36000 },
  { id: "4", icon: "fas fa-shuttle-van", type: "Space bus/Sienna", category: "Private", price: 35000 },
  { id: "5", icon: "fas fa-shuttle-van", type: "Space bus/Sienna", category: "Commercial", price: 38000 },
  { id: "6", icon: "fas fa-truck-pickup", type: "Pick-Up/Hilux", category: "Private", price: 36000 },
  { id: "7", icon: "fas fa-truck-pickup", type: "Pick-Up/Hilux", category: "Commercial", price: 38500 },
  { id: "8", icon: "fas fa-bus", type: "18 passenger/Bus", category: "Private", price: 35000 },
  { id: "9", icon: "fas fa-bus", type: "18 passenger/Bus", category: "Commercial", price: 38000 },
  { id: "10", icon: "fas fa-bus-alt", type: "Coaster Bus", category: "Private", price: 40000 },
  { id: "11", icon: "fas fa-bus-alt", type: "Coaster Bus", category: "Commercial", price: 42000 },
  { id: "12", icon: "fas fa-truck-moving", type: "Truck", category: "Other", price: 89580 },
];

export default function ChangeOfOwnership() {
  const [query, setQuery] = useState("");

  const filteredServices = ownershipData.filter(
    (s) =>
      s.type.toLowerCase().includes(query.toLowerCase()) ||
      s.category.toLowerCase().includes(query.toLowerCase())
  );

  const getCategoryColor = (category) => {
    if (category === "Private") return "text-red-500";
    if (category === "Commercial") return "text-blue-500";
    return "text-gray-500";
  };

  return (
    <div className="w-full min-h-screen mt-20 max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-6">
        <button className="text-gray-700 hover:text-gray-900">
          <i className="fas fa-arrow-left" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Change of Ownership</h1>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="search"
          placeholder="Search Change of Ownership Services"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
        />
      </div>

      {/* Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="p-4 bg-gray-50 rounded-xl border hover:shadow-md transition"
          >
            <div className="text-green-600 mb-3">
              <i className={`${service.icon} fa-2x`} />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-800">{service.type}</p>
              <p className={`text-xs font-medium ${getCategoryColor(service.category)}`}>
                {service.category}
              </p>
              <p className="mt-2 text-green-700 font-bold">
                ₦{service.price.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
        {filteredServices.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-12">
            <i className="fas fa-folder-open fa-2x mb-3" />
            <p className="text-sm italic">No services found</p>
          </div>
        )}
      </div>
    </div>
  );
}
