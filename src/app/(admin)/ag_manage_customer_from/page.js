"use client";
import { useState, useEffect } from "react";

export default function AddCustomer() {
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    location: "",
    refCode: "", // will come from backend user info
  });

  const [regions, setRegions] = useState([]); // backend placeholder
  const [defaultRegion, setDefaultRegion] = useState(null);
  const [error, setError] = useState("");

  // Fetch regions + default user info from backend placeholder
  useEffect(() => {
    async function fetchInitialData() {
      try {
        // Placeholder: Replace with real API call
        const res = await fetch("/api/customers/init"); 
        const data = await res.json();

        setRegions(data.regions || []);
        setDefaultRegion(data.defaultRegion || "");
        setFormData((prev) => ({
          ...prev,
          refCode: data.refCode || "",
        }));
      } catch (err) {
        setError("Failed to load regions");
      }
    }
    fetchInitialData();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Placeholder backend call
      const res = await fetch("/api/customers/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("Customer registered successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto p-4 text-center">
      <h5 className="text-lg font-bold mb-4">Add Customer</h5>
      {error && <div className="text-red-500 mb-2">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email ID"
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Re-enter Password"
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="border p-2 rounded w-full"
          required
        />

        {/* Locations from backend */}
        <select
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        >
          <option value="">Select location</option>
          {regions.map((reg) => (
            <option
              key={reg.reg_id}
              value={reg.reg_id}
              selected={defaultRegion === reg.reg_id}
            >
              {reg.reg_label}
            </option>
          ))}
        </select>

        <input type="hidden" name="refCode" value={formData.refCode} />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}

// $v["getRegions"] → /api/customers/init

// $u_info["bk_my_ref_code"] → backend response

// Form submission → /api/customers/register