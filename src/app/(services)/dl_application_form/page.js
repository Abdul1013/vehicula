// implement zod schemer 
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
export default function LicenseApplication() {
  const router = useRouter();
  const [form, setForm] = useState({
    uid: "12345",
    first_name: "",
    surname: "",
    other_name: "",
    mother_maiden_name: "",
    date_of_birth: "",
    facial_mark: "",
    blood_group: "",
    any_form_of_disability: "",
    height: "",
    sex: "",
    licence_class: "B",
    next_of_kin_phone_number: "",
    state_of_origin: "",
    local_government: "",
    address: "",
    phone_number: "",
    email_address: "",
    nin: "",
    last_update: "2025-08-01",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    router.push("/payment_options");
    // TODO: Hook into API call
  };

  return (
    <div className="min-h-screen  bg-white text-gray-900">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto mt-8 space-y-6"
      >
        {/* Input Field */}
        {[
          { label: "First Name*", name: "first_name", required: true },
          { label: "Surname*", name: "surname", required: true },
          { label: "Other Name", name: "other_name" },
          { label: "Mother Maiden Name", name: "mother_maiden_name" },
          {
            label: "Date of Birth*",
            name: "date_of_birth",
            type: "date",
            required: true,
          },
          { label: "Facial Mark", name: "facial_mark" },
          { label: "Blood Group*", name: "blood_group", required: true },
          {
            label: "Any Form Of Disability?",
            name: "any_form_of_disability",
          },
          { label: "Height", name: "height" },
          {
            label: "Next of Kin Phone Number",
            name: "next_of_kin_phone_number",
          },
          {
            label: "State of Origin*",
            name: "state_of_origin",
            required: true,
          },
          {
            label: "Local Government*",
            name: "local_government",
            required: true,
          },
          { label: "Address*", name: "address", required: true },
          { label: "Phone Number*", name: "phone_number", required: true },
          { label: "Email Address", name: "email_address" },
          { label: "NIN*", name: "nin", type: "number", required: true },
        ].map(({ label, name, type = "text", required }) => (
          <div key={name}>
            <label htmlFor={name} className="block mb-1 font-medium">
              {label}
            </label>
            <input
              type={type}
              id={name}
              name={name}
              value={form}
              onChange={handleChange}
              required={required}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder={`Enter ${label.replace("*", "")}`}
            />
          </div>
        ))}

        {/* Sex */}
        <div>
          <label htmlFor="sex" className="block mb-1 font-medium">
            Sex*
          </label>
          <select
            id="sex"
            name="sex"
            value={form.sex}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select Sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* License Class */}
        <div>
          <label htmlFor="licence_class" className="block mb-1 font-medium">
            License Class*
          </label>
          <select
            id="licence_class"
            name="licence_class"
            value={form.licence_class}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select license class</option>
            <option value="A">A - Motor cycle</option>
            <option value="B">
              B - Motor vehicle of less than 3 tonnes gross weight
            </option>
            <option value="C">
              C - A motor vehicle of less than 3 tonnes gross weight
            </option>
            <option value="D">D - Motor vehicle other than motor cycle</option>
            <option value="E">E - Motor vehicle (not articulated)</option>
            <option value="F">F - Agricultural machines and tractors</option>
            <option value="G">G - Articulated vehicles</option>
            <option value="H">H - Earth moving vehicles</option>
            <option value="I">
              I - Special, for physically handicapped persons
            </option>
          </select>
        </div>

        <Button type="submit" className="mt-6 bg-green-600 w-full">
          Proceed →
        </Button>
      </form>
    </div>
  );
}
