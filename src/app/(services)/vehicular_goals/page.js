// "use client";

// import { useRouter } from "next/navigation";
// import {
//   FileText,
//   Car,
//   PiggyBank,
//   IdCard,
//   CreditCard ,
//   ArrowRightLeft,
//   Wrench,
//   CarFront,
//   GraduationCap
// } from "lucide-react";

// const services = [
//   {
//     title: "Vehicle Particulars Renewal",
//     description: "Get your car registered with ease and flexible plans.",
//     icon: Car,
//     path: "/vehicle_particulars_renewal",
//   },
//   {
//     title: "Driver License",
//     description: "Save in bits for your vehicle particulars renewal.",
//     icon:IdCard ,
//     path: "/dl_page",
//   },
//   {
//     title: "Spare Parts",
//     description: "Battery, Tyre, Engine oil, KEKE, Engine Oil",
//     icon: Wrench,
//     // path: "/payment_options",
//     path: "/sub-services/spare_parts",
//   },
//   {
//     title: "Plate Number ",
//     description: "Fresh Plate number, Truck, replacement. Change of Category.",
//     icon: CreditCard ,
//     path: "/plate-number-service",
//   },
//   {
//     title: "Change of Ownership",
//     description: "Update your vehicle particulars after purchase.",
//     icon: ArrowRightLeft,
//     path: "/change-of-ownership",
//   },
//   {
//     title: "Driving School",
//     description: "1 month duration.",
//     icon: GraduationCap,
//     path: "/services/inspection",
//   },
//   {
//     title: "Local Government Paper",
//     description: "Setup installment plans for commercial vehicle permits.",
//     icon: FileText,
//     path: "/services/local-permit",
//   },
//   {
//     title: "Comprehensive Insurance",
//     description: "Specialized solutions for companies with multiple vehicles.",
//     icon: CarFront,
//     path: "/services/fleet",
//   },
//   {
//     title: "Vehicular Goals",
//     description: "VG5K, VG10K, VG20K, VG30K, VG40K, VG50K, VG100K, VG200K, VG500K, VG1M",
//     icon: PiggyBank,
//     path: "/services/fleet",
//   },
// ];

// export default function VehicularGoals() {
//   const router = useRouter();

//   return (
//     <section className='container mx-auto  px-6 py-12'>
//       {/* Header */}
//       <div className='text-center mb-6'>
//         <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>
//           Let&apos;s Get Started!
//         </h2>
//       </div>

//       {/* Service Cards Grid */}
//       <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
//         {services.map((service, index) => {
//           const Icon = service.icon;
//           return (
//             <div
//               key={index}
//               onClick={() => router.push(service.path)}
//               className='cursor-pointer group block rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow p-6 text-center border border-gray-100 hover:border-green-500'
//             >
//               {/* Icon */}
//               <div className='flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-50 group-hover:bg-green-100 transition-colors'>
//                 <Icon className='w-8 h-8 text-green-600' />
//               </div>

//               {/* Title */}
//               <h3 className='text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors'>
//                 {service.title}
//               </h3>

//               {/* Description */}
//               <p className='mt-2 text-sm text-gray-600'>
//                 {service.description}
//               </p>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }
