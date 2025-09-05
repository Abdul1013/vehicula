// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Search } from "lucide-react";
// import Image from "next/image";

// const services = [
//   { id: "fresh-3", name: "Fresh", duration: "3 years", price: 38000 },
//   { id: "fresh-5", name: "Fresh", duration: "5 years", price: 45000 },
//   { id: "renew-3", name: "Renewal", duration: "3 years", price: 26000 },
//   { id: "renew-5", name: "Renewal", duration: "5 years", price: 30000 },
//   {
//     id: "intl-1",
//     name: "International (IDP)",
//     duration: "1 year",
//     price: 25000,
//   },
// ];

// export default function DriverLicensePage() {
//   const [query, setQuery] = useState("");
//   const router = useRouter();

//   const filtered = services.filter((s) =>
//     `${s.name} ${s.duration}`.toLowerCase().includes(query.toLowerCase())
//   );

//   const handleSelect = (service) => {
//     router.push(
//       `/dl_application_form?id=${service.id}&name=${encodeURIComponent(
//         service.name
//       )}&duration=${encodeURIComponent(service.duration)}&price=${
//         service.price
//       }`
//     );
//   };

//   return (
//     <div className="bg-white min-h-screen mt-20 px-4 py-6">
//       {/* Back */}
//       <a
//         href="/dashboard_form"
//         className="flex items-center gap-2 text-blue-600 hover:underline mb-6"
//       >
//         ← Driver’s License
//       </a>

//       {/* Search */}
//       <div className="relative max-w-lg mx-auto mb-8">
//         <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
//         <input
//           type="text"
//           placeholder="Search Driver's License Services"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           className="w-full border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       {/* Services Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {filtered.map((service) => (
//           <div
//             key={service.id}
//             onClick={() => handleSelect(service)}
//             className="cursor-pointer bg-gray-50 border rounded-xl p-6 shadow hover:shadow-lg transition flex flex-col items-center text-center"
//           >
//             <Image src={"/icons/dl.png"} width={50} height={50} alt="id_card"/>
//             <h3 className="font-semibold text-lg">{service.name}</h3>
//             <p className="text-sm text-gray-500">{service.duration}</p>
//             <p className="text-xl font-bold text-green-700 mt-3">
//               ₦{service.price.toLocaleString()}
//             </p>
//           </div>
//         ))}
//       </div>

//       {filtered.length === 0 && (
//         <p className="text-center text-gray-500 mt-6">
//           No matching services found.
//         </p>
//       )}
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import Image from "next/image";

export default function DriverLicensePage() {
  const [query, setQuery] = useState("");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

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

  return (
    <div className='bg-white min-h-screen mt-20 px-4 py-6'>
      <a
        href='/dashboard_form'
        className='flex items-center gap-2 text-blue-600 hover:underline mb-6'
      >
        ← Driver’s License
      </a>

      <div className='relative max-w-lg mx-auto mb-8'>
        <Search className='absolute left-3 top-3 text-gray-400 w-5 h-5' />
        <input
          type='text'
          placeholder="Search Driver's License Services"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='w-full border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      {loading && <p className='text-center'>Loading services...</p>}
      {error && <p className='text-center text-red-500'>{error}</p>}

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {filtered.map((service) => (
          <div
            key={service.id}
            onClick={() => handleSelect(service)}
            className='cursor-pointer bg-gray-50 border rounded-xl p-6 shadow hover:shadow-lg transition flex flex-col items-center text-center'
          >
            <Image src='/icons/dl.png' width={50} height={50} alt='id_card' />
            <h3 className='font-semibold text-lg'>{service.name}</h3>
            <p className='text-sm text-gray-500'>{service.duration}</p>
            <p className='text-xl font-bold text-green-700 mt-3'>
              ₦{service.price.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {filtered.length === 0 && !loading && (
        <p className='text-center text-gray-500 mt-6'>
          No matching services found.
        </p>
      )}
    </div>
  );
}
