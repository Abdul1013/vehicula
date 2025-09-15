// implement zod schemer 
"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "./ui/button";
import { Suspense } from "react";
 function DLicenseApplication() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState({
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
    service_id: searchParams.get("id") || "",
    service_name: searchParams.get("name") || "",
    duration: searchParams.get("duration") || "",
    price: parseFloat(searchParams.get("price")) || 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user data to prefill form
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch("/api/user");
        if (!response.ok) throw new Error("Failed to fetch user data");
        const user = await response.json();
        setForm((prev) => ({
          ...prev,
          email_address: user.email || "",
          phone_number: user.phone || "",
          address: user.address || "",
          first_name: user.fullName ? user.fullName.split(" ")[0] : "",
          surname: user.fullName
            ? user.fullName.split(" ").slice(1).join(" ")
            : "",
        }));
        console.info("User data fetched for form", { userId: user.id });
      } catch (err) {
        console.warn("Error fetching user data", { error: err.message });
        setError("Failed to load user data");
      }
    }
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    if (
      !form.first_name ||
      !form.surname ||
      !form.date_of_birth ||
      !form.blood_group ||
      !form.state_of_origin ||
      !form.local_government ||
      !form.address ||
      !form.phone_number ||
      !form.nin ||
      !form.sex ||
      !form.licence_class ||
      !form.service_id
    ) {
      return "All required fields must be filled";
    }
    if (!/^\d{11}$/.test(form.nin)) {
      return "NIN must be 11 digits";
    }
    if (!/^\d{10,15}$/.test(form.phone_number.replace(/^\+/, ""))) {
      return "Invalid phone number format";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      console.warn("Form validation failed", { error: validationError });
      return;
    }

    try {
      const response = await fetch("/api/dl_application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error);
      }

      const { applicationId, paymentRef } = await response.json();
      console.info("Form submitted successfully", { applicationId, paymentRef });
      router.push(
        `/payment_options?application_id=${applicationId}&payment_ref=${paymentRef}&price=${form.price}`
      );
    } catch (err) {
      console.warn("Error submitting form", { error: err.message });
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
              value={form[name] || ""}
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

export default function LicenseApplication () {
  return(
    <Suspense fallback={<div>Loading....</div>}>
      <DLicenseApplication/>
    </Suspense>
  )
}