// "use client";
// import { useState } from "react";
// import { Search } from "lucide-react";
// import ServiceHeader from "@/components/ServiceHeader";
// import ServiceSearch from "@/components/ServiceSearch";
// import ServiceCard from "@/components/ServiceCard";


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
//   // const { selectedId, cart, toggleSelect } = useCart();
//   const [filteredServices, setFilteredServices] = useState(services);

//   return (
//     <div className="min-h-screen max-w-7xl mx-auto mt-20 bg-white px-4 py-6">
//       <ServiceHeader title="Change of Ownership"  />
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
import ServiceHeader from "@/components/ServiceHeader";
import ServiceSearch from "@/components/ServiceSearch";
import ServiceCard from "@/components/ServiceCard";
import { useRouter } from "next/navigation";

const services = [
  {
    id: "1",
    icon: "fas fa-car",
    type: "Saloon/Car",
    category: "Private",
    price: 34000,
  },
  {
    id: "2",
    icon: "fas fa-car",
    type: "Saloon/Car",
    category: "Commercial",
    price: 37000,
  },
  {
    id: "3",
    icon: "fas fa-car-side",
    type: "SUV/Jeep",
    category: "Other",
    price: 36000,
  },
  {
    id: "4",
    icon: "fas fa-shuttle-van",
    type: "Space bus/Sienna",
    category: "Private",
    price: 35000,
  },
  {
    id: "5",
    icon: "fas fa-shuttle-van",
    type: "Space bus/Sienna",
    category: "Commercial",
    price: 38000,
  },
  {
    id: "6",
    icon: "fas fa-truck-pickup",
    type: "Pick-Up/Hilux",
    category: "Private",
    price: 36000,
  },
  {
    id: "7",
    icon: "fas fa-truck-pickup",
    type: "Pick-Up/Hilux",
    category: "Commercial",
    price: 38500,
  },
  {
    id: "8",
    icon: "fas fa-bus",
    type: "18 passenger/Bus",
    category: "Private",
    price: 35000,
  },
  {
    id: "9",
    icon: "fas fa-bus",
    type: "18 passenger/Bus",
    category: "Commercial",
    price: 38000,
  },
  {
    id: "10",
    icon: "fas fa-bus-alt",
    type: "Coaster Bus",
    category: "Private",
    price: 40000,
  },
  {
    id: "11",
    icon: "fas fa-bus-alt",
    type: "Coaster Bus",
    category: "Commercial",
    price: 42000,
  },
  {
    id: "12",
    icon: "fas fa-truck-moving",
    type: "Truck",
    category: "Other",
    price: 89580,
  },
];

export default function ChangeOfOwnership() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  
  const router = useRouter();

  const [filteredServices, setFilteredServices] = useState([]);


  const getCategoryColor = (category) => {
    if (category === "Private") return "text-red-500";
    if (category === "Commercial") return "text-blue-500";
    return "text-gray-500";
  };

  return (
    <div className="w-full min-h-screen mt-20 max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <ServiceHeader title={"Change of Ownership"} />

      {/* Search */}
      <ServiceSearch
        services={services}
        setFilteredServices={setFilteredServices}
        searchFields={["name", "category"]}
      />
      {/* Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            selectedId={selectedId}
          />
        ))}
      </div>
      {filteredServices.length === 0 && (
        <div className="col-span-full text-center text-gray-500 py-12">
          <i className="fas fa-folder-open fa-2x mb-3" />
          <p className="text-sm italic">No services found</p>
        </div>
      )}
    </div>
  );
}
