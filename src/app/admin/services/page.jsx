"use client";

import { useState, useEffect } from "react";
import * as LucideIcons from "lucide-react";

export default function AdminServicesDashboard() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    priority: "",
    icon: "",
    description: "",
    path: "",
  });
  const [editService, setEditService] = useState(null);
  const [formError, setFormError] = useState(null);

  // Fetch all services (active and inactive)
  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch("/api/vehicle-services?status=all");
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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Create a new service (POST)
  const handleCreate = async (e) => {
    e.preventDefault();
    setFormError(null);
    try {
      const response = await fetch("/api/vehicle-services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create service");
      }
      const newService = await response.json();
      setServices((prev) => [...prev, newService]);
      setFormData({
        name: "",
        priority: "",
        icon: "",
        description: "",
        path: "",
      });
    } catch (err) {
      setFormError(err.message);
    }
  };

  // Open edit form
  const handleEdit = (service) => {
    setEditService(service);
    setFormData({
      name: service.v_s_name,
      priority: service.v_s_priority.toString(),
      icon: service.v_s_icon || "",
      description: service.v_s_description || "",
      path: service.v_s_path || "",
    });
  };

  // Update a service (PATCH)
  const handleUpdate = async (e) => {
    e.preventDefault();
    setFormError(null);
    try {
      const response = await fetch("/api/vehicle-services", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editService.v_s_id, ...formData }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update service");
      }
      const updatedService = await response.json();
      setServices((prev) =>
        prev.map((s) =>
          s.v_s_id === updatedService.v_s_id ? updatedService : s
        )
      );
      setEditService(null);
      setFormData({
        name: "",
        priority: "",
        icon: "",
        description: "",
        path: "",
      });
    } catch (err) {
      setFormError(err.message);
    }
  };

  // Deactivate a service (DELETE)
  const handleDeactivate = async (id) => {
    if (!confirm("Are you sure you want to deactivate this service?")) return;
    try {
      const response = await fetch(`/api/vehicle-services?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to deactivate service");
      }
      const updatedService = await response.json();
      setServices((prev) =>
        prev.map((s) => (s.v_s_id === id ? updatedService.service : s))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  // Activate a service (PATCH)
  const handleActivate = async (id) => {
    if (!confirm("Are you sure you want to activate this service?")) return;
    try {
      const response = await fetch("/api/vehicle-services", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: 1 }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to activate service");
      }
      const updatedService = await response.json();
      setServices((prev) =>
        prev.map((s) => (s.v_s_id === id ? updatedService : s))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className='text-center mt-20 mb-20 py-12'>
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
    <section className='container mt-10 mx-auto px-6 py-12'>
      {/* Header */}
      <div className='text-center mb-6'>
        <h2 className='text-2xl md:text-3xl font-bold text-gray-900'>
          Manage Vehicle Services
        </h2>
      </div>

      {/* Create/Edit Service Form */}
      <div className='mb-12 max-w-2xl mx-auto'>
        <div className='bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-100'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4 text-center'>
            {editService ? "Edit Service" : "Create New Service"}
          </h3>
          <form
            onSubmit={editService ? handleUpdate : handleCreate}
            className='space-y-4'
          >
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Service Name <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                className='block w-full rounded-2xl border-gray-700 shadow-sm focus:border-green-500 focus:ring-green-500 py-2 px-4'
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Priority (1 or 0)
              </label>
              <input
                type='number'
                name='priority'
                value={formData.priority}
                onChange={handleInputChange}
                className='block w-full rounded-2xl border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 py-2 px-4'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Icon (Lucide)
              </label>
              <input
                type='text'
                name='icon'
                value={formData.icon}
                onChange={handleInputChange}
                className='block w-full rounded-2xl border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 py-2 px-4'
                placeholder='e.g., CreditCard'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Path
              </label>
              <input
                type='text'
                name='path'
                value={formData.path}
                onChange={handleInputChange}
                className='block w-full rounded-2xl border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 py-2 px-4'
                placeholder='/example_service'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Description
              </label>
              <textarea
                name='description'
                value={formData.description}
                onChange={handleInputChange}
                className='block w-full rounded-2xl border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 py-2 px-4'
                rows='3'
              />
            </div>
            {formError && (
              <p className='text-red-500 text-sm text-center'>{formError}</p>
            )}
            <div className='flex justify-center space-x-4'>
              <button
                type='submit'
                className='px-6 py-2 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition-colors shadow-sm hover:shadow-md'
              >
                {editService ? "Update Service" : "Create Service"}
              </button>
              {editService && (
                <button
                  type='button'
                  onClick={() => {
                    setEditService(null);
                    setFormData({
                      name: "",
                      priority: "",
                      icon: "",
                      description: "",
                      path: "",
                    });
                  }}
                  className='px-6 py-2 bg-gray-300 text-gray-900 rounded-2xl hover:bg-gray-400 transition-colors'
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Service Cards Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
        {services.map((service) => {
          const Icon = LucideIcons[service.v_s_icon] || LucideIcons.ShieldCheck;

          return (
            <div
              key={service.v_s_id}
              className='block rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow p-6 text-center border border-gray-100 hover:border-green-500'
            >
              {/* Icon */}
              <div className='flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-50 hover:bg-green-100 transition-colors'>
                <Icon className='w-8 h-8 text-green-600' />
              </div>

              {/* Title */}
              <h3 className='text-lg font-semibold text-gray-900 hover:text-green-600 transition-colors'>
                {service.v_s_name}
              </h3>

              {/* Description */}
              <p className='mt-2 text-sm text-gray-600'>
                {service.v_s_description || "No description available"}
              </p>

              {/* Status */}
              <p className='mt-2 text-sm text-gray-600'>
                Status: {service.v_s_status === 1 ? "Active" : "Inactive"}
              </p>

              {/* Actions */}
              <div className='mt-4 flex justify-center space-x-4'>
                <button
                  onClick={() => handleEdit(service)}
                  className='px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    service.v_s_status === 1
                      ? handleDeactivate(service.v_s_id)
                      : handleActivate(service.v_s_id)
                  }
                  className={`px-3 py-1 text-white rounded-lg transition-colors ${
                    service.v_s_status === 1
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {service.v_s_status === 1 ? "Deactivate" : "Activate"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
