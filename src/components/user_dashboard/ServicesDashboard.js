"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import * as LucideIcons from "lucide-react";

export default function ServicesDashboard() {
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch("/api/vehicle-services?status=active");
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
    return (
      <div className='text-center py-12'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mx-auto'></div>
        <p className='mt-4 text-gray-600'>Loading services...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center py-12'>
        <p className='text-red-500'>Error: {error}</p>
        <button
          onClick={() => {
            setLoading(true);
            setError(null);
            fetchServices();
          }}
          className='mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'
        >
          Retry
        </button>
      </div>
    );
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
          const Icon = LucideIcons[service.v_s_icon] || LucideIcons.ShieldCheck; // Fallback to ShieldCheck

          return (
            <div
              key={service.v_s_id}
              onClick={() => router.push(service.v_s_path || "/services")}
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
                {service.v_s_description || "No description available"}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
