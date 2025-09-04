// src/components/RegisterForm.jsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const RegisterForm = ({ defaultValues = {} }) => {
  const [formData, setFormData] = useState({
    phone: defaultValues.phone || "",
    email: defaultValues.email || "",
    password: "",
    confirmPassword: "",
    fullName: defaultValues.name || "",
    state: defaultValues.location || "",
    lga: "",
    refCode: defaultValues.ref_code || "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [regions, setRegions] = useState([]);
  const [lgaOptions, setLgaOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  // Fetch regions on mount
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        console.log("Fetching regions from /api/regions");
        const response = await fetch("/api/regions");
        if (!response.ok) {
          throw new Error(`Failed to fetch regions: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Regions fetched:", data);
        setRegions(data);
      } catch (error) {
        console.error("Regions fetch error:", error);
        toast.error("Failed to load regions. Please try again.", {
          toastId: "regions-error",
        });
      }
    };
    fetchRegions();
  }, []);

  // Fetch LGAs when state changes
  useEffect(() => {
    if (formData.state) {
      const fetchLgas = async () => {
        try {
          console.log(`Fetching LGAs for region: ${formData.state}`);
          const response = await fetch(
            `/api/lgas?region=${encodeURIComponent(formData.state)}`
          );
          if (!response.ok) {
            throw new Error(`Failed to fetch LGAs: ${response.statusText}`);
          }
          const data = await response.json();
          console.log("LGAs fetched:", data);
          setLgaOptions(data);
        } catch (error) {
          console.error("LGAs fetch error:", error);
          toast.error("Failed to load LGAs. Please try again.", {
            toastId: "lgas-error",
          });
        }
      };
      fetchLgas();
    } else {
      setLgaOptions([]);
    }
  }, [formData.state]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (!/^\+?\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number format";
    }
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords must match";
    }
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.lga) newErrors.lga = "LGA is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the form errors", { toastId: "form-error" });
      return;
    }

    setIsLoading(true);
    try {
      console.log("Submitting registration:", formData);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }
      toast.success("Registration successful!", {
        toastId: "register-success",
      });
      setFormData({
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        state: "",
        lga: "",
        refCode: "",
      });
      console.log("Registration successful:", data);
      router.push("/dashboard_form");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.message, { toastId: "register-error" });
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    { icon: "fa-bell", text: "Instant reminders" },
    { icon: "fa-piggy-bank", text: "Easy installments" },
    { icon: "fa-stopwatch", text: "Shorter processing time" },
    { icon: "fa-headset", text: "24/7 Customer support" },
  ];

  return (
    <div className="container-xxl bg-white hero-header mt-30 mb-20 text-primary">
      <div className="container mx-auto px-4">
        <div className="lg:flex lg:items-center lg:justify-center gap-16">
          {/* Left Side Features */}
          <div className="flex flex-col items-center lg:items-start mb-10 mt-[-30px] text-center lg:text-left max-w-sm">
            <h2 className="text-primary w-full text-3xl font-bold whitespace-nowrap mb-6">
              Let&apos;s get started!
            </h2>
            <div className="grid gap-4">
              {features.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-600 rounded-full text-white">
                    <i className={`fa ${item.icon}`} />
                  </div>
                  <p className="text-gray-700 font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side Form */}
          <div className="flex items-center justify-center w-full px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {[
                  {
                    type: "tel",
                    name: "phone",
                    placeholder: "Phone Number",
                    icon: "fa-phone",
                    required: true,
                  },
                  {
                    type: "email",
                    name: "email",
                    placeholder: "Email ID",
                    icon: "fa-envelope",
                    required: true,
                  },
                  {
                    type: showPassword ? "text" : "password",
                    name: "password",
                    placeholder: "Password",
                    icon: "fa-eye",
                    toggle: true,
                  },
                  {
                    type: showConfirmPassword ? "text" : "password",
                    name: "confirmPassword",
                    placeholder: "Re-enter password",
                    icon: "fa-eye",
                    toggle: true,
                    confirm: true,
                  },
                  {
                    type: "text",
                    name: "fullName",
                    placeholder: "Full Name",
                    icon: "fa-user",
                    required: true,
                  },
                ].map((field, idx) => (
                  <div key={idx} className="relative">
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required={field.required}
                      className={`w-full pl-4 pr-12 py-3 rounded-full shadow-sm border ${
                        errors[field.name]
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-400"
                      } focus:ring-2 focus:outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed`}
                      disabled={isLoading}
                      aria-invalid={!!errors[field.name]}
                      aria-describedby={
                        errors[field.name] ? `${field.name}-error` : undefined
                      }
                    />
                    <span
                      className={`absolute right-3 top-3 text-gray-600 text-lg ${
                        field.toggle ? "cursor-pointer" : "text-blue-500"
                      }`}
                      onClick={() => {
                        if (field.name === "password")
                          setShowPassword(!showPassword);
                        if (field.name === "confirmPassword")
                          setShowConfirmPassword(!showConfirmPassword);
                      }}
                    >
                      <i
                        className={`fas ${
                          field.toggle
                            ? formData[field.name] &&
                              (field.confirm
                                ? showConfirmPassword
                                  ? "fa-eye-slash"
                                  : "fa-eye"
                                : showPassword
                                  ? "fa-eye-slash"
                                  : "fa-eye")
                            : field.icon
                        }`}
                      />
                    </span>
                    {errors[field.name] && (
                      <p
                        id={`${field.name}-error`}
                        className="mt-1 text-sm text-red-500"
                        role="alert"
                      >
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                ))}

                {/* State Select */}
                <div className="relative">
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className={`w-full pl-4 pr-12 py-3 rounded-full shadow-sm border ${
                      errors.state
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-400"
                    } focus:ring-2 focus:outline-none appearance-none transition disabled:bg-gray-100 disabled:cursor-not-allowed`}
                    disabled={isLoading}
                    aria-invalid={!!errors.state}
                    aria-describedby={errors.state ? "state-error" : undefined}
                  >
                    <option value="">Select state of residence</option>
                    {regions.map((reg) => (
                      <option key={reg.reg_id} value={reg.reg_label}>
                        {reg.reg_label}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-3 top-3 text-blue-500 text-lg">
                    <i className="fa fa-globe-africa" />
                  </span>
                  {errors.state && (
                    <p
                      id="state-error"
                      className="mt-1 text-sm text-red-500"
                      role="alert"
                    >
                      {errors.state}
                    </p>
                  )}
                </div>

                {/* LGA Select */}
                <div className="relative">
                  <select
                    name="lga"
                    value={formData.lga}
                    onChange={handleChange}
                    required
                    className={`w-full pl-4 pr-12 py-3 rounded-full shadow-sm border ${
                      errors.lga
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-400"
                    } focus:ring-2 focus:outline-none appearance-none transition disabled:bg-gray-100 disabled:cursor-not-allowed`}
                    disabled={isLoading || !formData.state}
                    aria-invalid={!!errors.lga}
                    aria-describedby={errors.lga ? "lga-error" : undefined}
                  >
                    <option value="">Select LGA of residence</option>
                    {lgaOptions.map((lga) => (
                      <option key={lga.id} value={lga.name}>
                        {lga.name}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-3 top-3 text-blue-500 text-lg">
                    <i className="fa fa-map-pin" />
                  </span>
                  {errors.lga && (
                    <p
                      id="lga-error"
                      className="mt-1 text-sm text-red-500"
                      role="alert"
                    >
                      {errors.lga}
                    </p>
                  )}
                </div>

                {/* Promo Code */}
                <div className="relative">
                  <input
                    type="text"
                    name="refCode"
                    value={formData.refCode}
                    onChange={handleChange}
                    placeholder="Promo code (Optional)"
                    className="w-full pl-4 pr-12 py-3 rounded-full shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  />
                  <span className="absolute right-3 top-3 text-blue-500 text-lg">
                    <i className="fa fa-gift" />
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? "Registering..." : "Register"}
                </button>

                {/* Links */}
                <p className="text-center text-sm text-gray-500">
                  Already a member?{" "}
                  <a
                    href="/login"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Login here
                  </a>
                </p>
                <p className="text-center text-xs text-gray-400 mt-4">
                  By registering, you agree to the{" "}
                  <a
                    href="/terms-and-conditions"
                    className="text-blue-500 hover:underline"
                    target="_blank"
                  >
                    Terms & Conditions
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;





// // src/app/register/page.jsx
// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";

// export default function RegisterForm() {
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [password, setPassword] = useState("");
//   const [state, setState] = useState("");
//   const [lga, setLga] = useState("");
//   const [states, setStates] = useState([]);
//   const [lgas, setLgas] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     async function fetchStatesAndLgas() {
//       try {
//         const res = await fetch("/api/states-lgas");
//         const data = await res.json();
//         if (res.ok) {
//           setStates(data.states);
//         } else {
//           console.error("Failed to fetch states and LGAs:", data.error);
//         }
//       } catch (error) {
//         console.error("Error fetching states and LGAs:", error);
//       }
//     }
//     fetchStatesAndLgas();
//   }, []);

//   useEffect(() => {
//     if (state) {
//       const selectedState = states.find(s => s.state === state);
//       setLgas(selectedState ? selectedState.lgas : []);
//       setLga(""); // Reset LGA when state changes
//     } else {
//       setLgas([]);
//       setLga("");
//     }
//   }, [state, states]);

//   const validateForm = () => {
//     const newErrors = {};
//     if (!phone) newErrors.phone = "Phone number is required";
//     else if (!/^\+?\d{10,15}$/.test(phone)) newErrors.phone = "Invalid phone number format";
//     if (!email) newErrors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format";
//     if (!fullName) newErrors.fullName = "Full name is required";
//     if (!password) newErrors.password = "Password is required";
//     else if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
//       newErrors.password = "Password must be 8+ characters with uppercase and numbers";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       toast.error("Please fix the form errors", { toastId: "form-error" });
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const normalizedPhone = phone.trim().replace(/^\+/, "");
//       console.log("Sending register request:", { phone: normalizedPhone, email, fullName, state, lga });
//       const res = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phone: normalizedPhone, email, fullName, password, state, lga }),
//       });

//       const data = await res.json();
//       console.log("Register response:", data);

//       if (!res.ok) {
//         throw new Error(data.error || "Registration failed");
//       }

//       toast.success("Registration successful!", { toastId: "register-success" });
//       console.log("Redirecting to /dashboard_form");
//       router.replace("/dashboard_form");
//     } catch (err) {
//       console.error("Register error:", err.message);
//       toast.error(
//         err.message === "Phone number or email already registered"
//           ? "Phone number or email already registered"
//           : err.message,
//         { toastId: "register-error" }
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white text-primary py-8 px-4 sm:px-6 lg:px-8">
//       <div className="w-full max-w-md">
//         <div className="bg-white p-8 rounded-xl shadow-lg">
//           <h5 className="text-xl font-semibold text-center mb-6">Register</h5>
//           <form onSubmit={handleSubmit} noValidate className="space-y-4">
//             <div className="relative">
//               <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
//                 Phone Number <span className="text-red-500">*</span>
//               </label>
//               <input
//                 id="phone"
//                 name="phone"
//                 type="tel"
//                 value={phone}
//                 onChange={(e) => {
//                   setPhone(e.target.value);
//                   setErrors((prev) => ({ ...prev, phone: "" }));
//                 }}
//                 placeholder="Phone Number"
//                 required
//                 disabled={isLoading}
//                 className={`form-control w-full px-4 py-2 rounded-full border ${
//                   errors.phone ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-400"
//                 } focus:ring-2 focus:outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                 aria-invalid={!!errors.phone}
//                 aria-describedby={errors.phone ? "phone-error" : undefined}
//               />
//               {errors.phone && (
//                 <p id="phone-error" className="mt-1 text-sm text-red-500" role="alert">
//                   {errors.phone}
//                 </p>
//               )}
//             </div>
//             <div className="relative">
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                 Email <span className="text-red-500">*</span>
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => {
//                   setEmail(e.target.value);
//                   setErrors((prev) => ({ ...prev, email: "" }));
//                 }}
//                 placeholder="Email"
//                 required
//                 disabled={isLoading}
//                 className={`form-control w-full px-4 py-2 rounded-full border ${
//                   errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-400"
//                 } focus:ring-2 focus:outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                 aria-invalid={!!errors.email}
//                 aria-describedby={errors.email ? "email-error" : undefined}
//               />
//               {errors.email && (
//                 <p id="email-error" className="mt-1 text-sm text-red-500" role="alert">
//                   {errors.email}
//                 </p>
//               )}
//             </div>
//             <div className="relative">
//               <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
//                 Full Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 id="fullName"
//                 name="fullName"
//                 type="text"
//                 value={fullName}
//                 onChange={(e) => {
//                   setFullName(e.target.value);
//                   setErrors((prev) => ({ ...prev, fullName: "" }));
//                 }}
//                 placeholder="Full Name"
//                 required
//                 disabled={isLoading}
//                 className={`form-control w-full px-4 py-2 rounded-full border ${
//                   errors.fullName ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-400"
//                 } focus:ring-2 focus:outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                 aria-invalid={!!errors.fullName}
//                 aria-describedby={errors.fullName ? "fullName-error" : undefined}
//               />
//               {errors.fullName && (
//                 <p id="fullName-error" className="mt-1 text-sm text-red-500" role="alert">
//                   {errors.fullName}
//                 </p>
//               )}
//             </div>
//             <div className="relative">
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                 Password <span className="text-red-500">*</span>
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => {
//                   setPassword(e.target.value);
//                   setErrors((prev) => ({ ...prev, password: "" }));
//                 }}
//                 placeholder="Password"
//                 required
//                 disabled={isLoading}
//                 className={`form-control w-full px-4 py-2 rounded-full border ${
//                   errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-400"
//                 } focus:ring-2 focus:outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                 aria-invalid={!!errors.password}
//                 aria-describedby={errors.password ? "password-error" : undefined}
//               />
//               {errors.password && (
//                 <p id="password-error" className="mt-1 text-sm text-red-500" role="alert">
//                   {errors.password}
//                 </p>
//               )}
//             </div>
//             <div className="relative">
//               <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
//                 State
//               </label>
//               <select
//                 id="state"
//                 name="state"
//                 value={state}
//                 onChange={(e) => {
//                   setState(e.target.value);
//                   setErrors((prev) => ({ ...prev, state: "" }));
//                 }}
//                 disabled={isLoading}
//                 className={`form-control w-full px-4 py-2 rounded-full border ${
//                   errors.state ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-400"
//                 } focus:ring-2 focus:outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                 aria-invalid={!!errors.state}
//                 aria-describedby={errors.state ? "state-error" : undefined}
//               >
//                 <option value="">Select State</option>
//                 {states.map((s) => (
//                   <option key={s.state} value={s.state}>
//                     {s.state}
//                   </option>
//                 ))}
//               </select>
//               {errors.state && (
//                 <p id="state-error" className="mt-1 text-sm text-red-500" role="alert">
//                   {errors.state}
//                 </p>
//               )}
//             </div>
//             <div className="relative">
//               <label htmlFor="lga" className="block text-sm font-medium text-gray-700 mb-1">
//                 LGA
//               </label>
//               <select
//                 id="lga"
//                 name="lga"
//                 value={lga}
//                 onChange={(e) => {
//                   setLga(e.target.value);
//                   setErrors((prev) => ({ ...prev, lga: "" }));
//                 }}
//                 disabled={isLoading || !state}
//                 className={`form-control w-full px-4 py-2 rounded-full border ${
//                   errors.lga ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-400"
//                 } focus:ring-2 focus:outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                 aria-invalid={!!errors.lga}
//                 aria-describedby={errors.lga ? "lga-error" : undefined}
//               >
//                 <option value="">Select LGA</option>
//                 {lgas.map((l) => (
//                   <option key={l} value={l}>
//                     {l}
//                   </option>
//                 ))}
//               </select>
//               {errors.lga && (
//                 <p id="lga-error" className="mt-1 text-sm text-red-500" role="alert">
//                   {errors.lga}
//                 </p>
//               )}
//             </div>
//             <button
//               type="submit"
//               className="w-full px-6 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
//               disabled={isLoading}
//             >
//               {isLoading ? "Registering..." : "Register"}
//             </button>
//           </form>
//         </div>
//         <div className="text-center text-gray-700 py-4">
//           <p className="text-sm">
//             Already have an account?{" "}
//             <a href="/login" className="text-blue-500 font-medium hover:underline">
//               Login here
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }