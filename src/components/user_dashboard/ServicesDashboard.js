"use client";

import { useRouter } from "next/navigation";
import {
  FileText,
  Car,
  ShieldCheck,
  MapPin,
  UserCheck,
  Key,
  RefreshCcw,
  Briefcase,
} from "lucide-react";

const services = [
  {
    title: "Vehicle Particulars Renewal",
    description: "Get your car registered with ease and flexible plans.",
    icon: Car,
    path: "/vehicle_particulars_renewal",
  },
  {
    title: "Driver License",
    description: "Save in bits for your vehicle particulars renewal.",
    icon: FileText,
    path: "/dl_application_form",
  },
  {
    title: "Comprehensive Insurance",
    description: "Affordable insurance plans with trusted providers.",
    icon: ShieldCheck,
    path: "/services/comprehensive-insurance",
  },
  {
    title: "Local Gov’t Permit / AMAC",
    description: "Setup installment plans for commercial vehicle permits.",
    icon: MapPin,
    path: "/services/local-permit",
  },
  {
    title: "Change of Ownership",
    description: "Update your vehicle particulars after purchase.",
    icon: UserCheck,
    path: "/change-of-ownership",
  },
  {
    title: "Plate Number Issuance",
    description: "Get new or replacement plate numbers quickly.",
    icon: Key,
    path: "/plate-number-service",
  },
  {
    title: "Vehicle Inspection",
    description: "Schedule computerized inspections hassle-free.",
    icon: RefreshCcw,
    path: "/services/inspection",
  },
  {
    title: "Corporate Fleet Services",
    description: "Specialized solutions for companies with multiple vehicles.",
    icon: Briefcase,
    path: "/services/fleet",
  },
];

export default function ServicesDashboard() {
  const router = useRouter();

  return (
    <section className='container mx-auto  px-6 py-12'>
      {/* Header */}
      <div className='text-center mb-6'>
        <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>
          Let&apos;s Get Started!
        </h2>
      </div>

      {/* Service Cards Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div
              key={index}
              onClick={() => router.push(service.path)}
              className='cursor-pointer group block rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow p-6 text-center border border-gray-100 hover:border-green-500'
            >
              {/* Icon */}
              <div className='flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-50 group-hover:bg-green-100 transition-colors'>
                <Icon className='w-8 h-8 text-green-600' />
              </div>

              {/* Title */}
              <h3 className='text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors'>
                {service.title}
              </h3>

              {/* Description */}
              <p className='mt-2 text-sm text-gray-600'>
                {service.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
