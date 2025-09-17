"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  Car,
  CarFront,
  MapPin,
  UserCheck,
  Key,
  RefreshCcw,
  Briefcase,
  PiggyBank,
  IdCard,
  CreditCard,
  ArrowRightLeft,
  Wrench,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";

// Map Font Awesome icons to Lucide icons
const iconMap = {
  "fa-ticket-alt": CreditCard,
  "fa-recycle": RefreshCcw,
  "fa-exchange-alt": ArrowRightLeft,
  "fa-car-crash": CarFront,
  "fa-file-invoice": FileText,
  "fa-tools": Wrench,
  "fa-id-card": IdCard,
  "fa-graduation-cap": GraduationCap,
  "fa-piggy-bank": PiggyBank,
};

// Map service names to descriptions and paths
const serviceDetails = {
  "Plate Number": {
    description: "Fresh Plate number, Truck, replacement. Change of Category.",
    path: "/plate-number-service",
  },
  "Vehicle Particulars Renewal": {
    description: "Get your car registered with ease and flexible plans.",
    path: "/vehicle_particulars_renewal",
  },
  "Change of Ownership": {
    description: "Update your vehicle particulars after purchase.",
    path: "/change-of-ownership",
  },
  "Comprehensive Insurance": {
    description: "Specialized solutions for companies with multiple vehicles.",
    path: "/services/fleet",
  },
  "Local Government Paper": {
    description: "Setup installment plans for commercial vehicle permits.",
    path: "/services/local-permit",
  },
  "Spare Parts": {
    description: "Battery, Tyre, Engine oil, KEKE, Engine Oil",
    path: "/spare_parts",
  },
  "Driver's License": {
    description: "Save in bits for your vehicle particulars renewal.",
    path: "/dl_page",
  },
  "Driving School": {
    description: "1 month duration.",
    path: "/services/inspection",
  },
  "Vehicular Goals": {
    description:
      "VG5K, VG10K, VG20K, VG30K, VG40K, VG50K, VG100K, VG200K, VG500K, VG1M",
    path: "/services/fleet",
  },
};

export default function ServicesDashboard() {
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch("/api/vehicle-services");
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  if (loading) {
    return <div className='text-center py-12'>Loading...</div>;
  }

  if (error) {
    return <div className='text-center py-12 text-red-500'>Error: {error}</div>;
  }

  return (
    <section className='container mx-auto px-6 py-12'>
      {/* Header */}
      <div className='text-center mb-6'>
        <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>
          Let&apos;s Get Started!
        </h2>
      </div>

      {/* Service Cards Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
        {services.map((service) => {
          const Icon = iconMap[service.v_s_icon] || ShieldCheck; // Fallback to ShieldCheck if no icon match
          const details = serviceDetails[service.v_s_name] || {
            description: "No description available",
            path: "/services",
          };

          return (
            <div
              key={service.v_s_id}
              onClick={() => router.push(details.path)}
              className='cursor-pointer group block rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow p-6 text-center border border-gray-100 hover:border-green-500'
            >
              {/* Icon */}
              <div className='flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-50 group-hover:bg-green-100 transition-colors'>
                <Icon className='w-8 h-8 text-green-600' />
              </div>

              {/* Title */}
              <h3 className='text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors'>
                {service.v_s_name}
              </h3>

              {/* Description */}
              <p className='mt-2 text-sm text-gray-600'>
                {details.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
