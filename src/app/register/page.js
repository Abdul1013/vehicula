// // pages/register.js
"use client";
// import { useState, useEffect } from "react";
// // import { getAllRegions, getUserByRefCode } from "../lib/users";
// // import { withSsrSession } from "../lib/session";
// // import cookie from "cookie";
// // import fs from "fs";
// // import path from "path";

// export default function RegisterPage(props) {
//   // props: v (prefill), getRegions (array), lgaMap (object), lock_ref (bool)
//   const { v = {}, getRegions = [], lgaMap = {}, lock_ref = false } = props;

//   const [form, setForm] = useState({
//     phoneReg: v.phoneRe || "",
//     emailReg: v.email || "",
//     pwdReg: "",
//     pwdRegC: "",
//     nameReg: v.name || "",
//     refReg: v.ref_code || "",
//     locReg: v.location || "",
//     lgaReg: v.lga || "",
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [lgaOptions, setLgaOptions] = useState([]);

//   useEffect(() => {
//     if (form.locReg) {
//       // find region label for id
//       const region = getRegions.find((r) => String(r.reg_id) === String(form.locReg));
//       if (region && lgaMap[region.reg_label]) {
//         setLgaOptions(lgaMap[region.reg_label]);
//       } else {
//         setLgaOptions([]);
//       }
//     } else setLgaOptions([]);
//   }, [form.locReg]);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Registration failed");
//       // redirect
//       if (data.redirectTo) {
//         window.location.href = data.redirectTo;
//       } else {
//         window.location.href = "/dashboard";
//       }
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="container mx-auto py-8">
//       <div className="grid gap-6 md:grid-cols-2">
//         <div>
//           <h2 className="text-2xl text-primary mb-4">Let&apos;s get started!</h2>
//           {/* features list (kept from original) */}
//           <div className="space-y-3">
//             <Feature icon="bell" label="Instant reminders" />
//             <Feature icon="piggy-bank" label="Easy installments" />
//             <Feature icon="stopwatch" label="Shorter processing time" />
//             <Feature icon="headset" label="24/7 Customer support" />
//           </div>
//         </div>

//         <div>
//           {error && <div className="text-red-600 mb-4" dangerouslySetInnerHTML={{ __html: error }} />}
//           <form id="submitRegisterForm" onSubmit={handleSubmit} className="space-y-3">
//             <input
//               name="phoneReg"
//               type="tel"
//               placeholder="Phone Number"
//               value={form.phoneReg}
//               onChange={(e) => setForm({ ...form, phoneReg: e.target.value })}
//               required
//               className="w-full p-3 rounded-full shadow"
//             />

//             <input
//               name="emailReg"
//               type="email"
//               placeholder="Email ID"
//               value={form.emailReg}
//               onChange={(e) => setForm({ ...form, emailReg: e.target.value })}
//               required
//               className="w-full p-3 rounded-full shadow"
//             />

//             <PasswordInput id="lpwdReg" value={form.pwdReg} onChange={(v) => setForm({ ...form, pwdReg: v })} />
//             <PasswordInput id="lpwdRegC" value={form.pwdRegC} onChange={(v) => setForm({ ...form, pwdRegC: v })} />

//             <input
//               name="nameReg"
//               type="text"
//               placeholder="Full name"
//               value={form.nameReg}
//               onChange={(e) => setForm({ ...form, nameReg: e.target.value })}
//               required
//               className="w-full p-3 rounded-full shadow"
//             />

//             <select
//               name="locReg"
//               id="locReg"
//               required
//               value={form.locReg}
//               onChange={(e) => setForm({ ...form, locReg: e.target.value, lgaReg: "" })}
//               className="w-full p-3 rounded-full shadow"
//             >
//               <option value="">Select state of residence</option>
//               {getRegions !== "-1" &&
//                 getRegions.map((r) => (
//                   <option key={r.reg_id} value={r.reg_id}>
//                     {r.reg_label}
//                   </option>
//                 ))}
//             </select>

//             <select
//               name="lgaReg"
//               id="lgaReg"
//               required
//               value={form.lgaReg}
//               onChange={(e) => setForm({ ...form, lgaReg: e.target.value })}
//               className="w-full p-3 rounded-full shadow"
//             >
//               <option value="">Select LGA of residence</option>
//               {lgaOptions && lgaOptions.map((l) => <option key={l} value={l}>{l}</option>)}
//             </select>

//             <input
//               name="refReg"
//               type="text"
//               placeholder="Promo code (Optional)"
//               readOnly={lock_ref}
//               value={form.refReg}
//               onChange={(e) => setForm({ ...form, refReg: e.target.value })}
//               className="w-full p-3 rounded-full shadow"
//             />

//             <button type="submit" disabled={loading} className="w-full py-3 rounded-full bg-blue-600 text-white">
//               {loading ? "Registering..." : "Register"}
//             </button>

//             <div className="text-sm mt-2 text-center">
//               <a href="/login" className="text-primary">Already a member? Login here.</a>
//             </div>

//             <div className="text-xs mt-4 text-center">
//               When you Register, you agree to the <a href="/terms-and-conditions">Terms & Conditions</a>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// // small reusable components
// function Feature({ icon, label }) {
//   return (
//     <div className="flex items-start gap-4">
//       <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
//         <i className={`fa fa-${icon}`} />
//       </div>
//       <div className="pt-1">
//         <h6 className="font-semibold">{label}</h6>
//       </div>
//     </div>
//   );
// }

// function PasswordInput({ id, value, onChange }) {
//   const [show, setShow] = useState(false);
//   return (
//     <div className="relative">
//       <input
//         id={id}
//         type={show ? "text" : "password"}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder={id === "lpwdReg" ? "Password" : "Re-enter password"}
//         required
//         className="w-full p-3 rounded-full shadow"
//       />
//       <span
//         onClick={() => setShow(!show)}
//         className="absolute right-3 top-3 cursor-pointer text-primary"
//       >
//         <i className={`fas ${show ? "fa-eye-slash" : "fa-eye"}`} />
//       </span>
//     </div>
//   );
// }

// /**
//  * getServerSideProps:
//  * - handles ?ref=...: validates via getUserByRefCode -> if valid, sets referral cookie and redirects to /register (without query)
//  * - passes getRegions, v (prefill), lgaMap
//  */
// // export const getServerSideProps = withSsrSession(async ({ req, res, query }) => {
// //   // Read regions via users helper
// //   const getRegions = await getAllRegions(); // returns array or "-1"
// //   // Load LGA JSON from public folder
// //   const jsonPath = path.join(process.cwd(), "public", "img", "nigeria_states_lgas.json");
// //   let lgaMap = {};
// //   try {
// //     if (fs.existsSync(jsonPath)) {
// //       const jsonData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
// //       const stateLGA = {};
// //       for (const s of jsonData.states || []) {
// //         stateLGA[s.name] = s.lgas;
// //       }
// //       // produce mapping: reg_label -> lgas if region labels match state names
// //       if (getRegions !== "-1") {
// //         for (const r of getRegions) {
// //           if (stateLGA[r.reg_label]) {
// //             lgaMap[r.reg_label] = stateLGA[r.reg_label];
// //           }
// //         }
// //       }
// //     }
// //   } catch (err) {
// //     console.error("LGA JSON read error:", err);
// //   }

// //   // Handle referral query param
// //   const REF_COOKIE = process.env.REFERRAL_COOKIE_NAME || "REFERRAL_STR";
// //   if (query.ref) {
// //     const ref_code = String(query.ref).trim().toLowerCase();
// //     const refUser = await getUserByRefCode(ref_code);
// //     if (refUser !== "-1") {
// //       // check status (bk_status)
// //       const u_status = parseInt(refUser[0].bk_status || 0, 10);
// //       if (u_status === 1) {
// //         // set cookie for 7 days and redirect to /register without query
// //         const cookieHeader = cookie.serialize(REF_COOKIE, ref_code, {
// //           maxAge: 7 * 24 * 60 * 60,
// //           httpOnly: false,
// //           path: "/",
// //           secure: process.env.NODE_ENV === "production",
// //         });
// //         res.setHeader("Set-Cookie", cookieHeader);
// //         return {
// //           redirect: {
// //             permanent: false,
// //             destination: "/register",
// //           },
// //         };
// //       }
// //     }
// //   }

// //   // Pass props similar to $v in PHP
// //   const v = {
// //     detectMobile: /mobile|iphone|android/i.test(req.headers["user-agent"] || ""),
// //     phoneRe: "",
// //     name: "",
// //     email: "",
// //     ref_code: (req.cookies && req.cookies[REF_COOKIE]) || "",
// //     location: "",
// //     lga: "",
// //     lga_markup: "",
// //     error_txt: "",
// //   };

// //   const lock_ref = Boolean(req.cookies && req.cookies[REF_COOKIE]);

// //   return {
// //     props: {
// //       v,
// //       getRegions,
// //       lgaMap,
// //       lock_ref,
// //     },
// //   };
// // });

// components/RegisterForm.js
import { useState, useEffect } from "react";

const RegisterForm = ({ regions = [], defaultValues = {} }) => {
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
  const [lgaOptions, setLgaOptions] = useState([]);

  // Simulate fetching LGAs when state changes
  useEffect(() => {
    if (formData.state) {
      // replace this with your API call
      setLgaOptions([
        { id: 1, name: "LGA 1" },
        { id: 2, name: "LGA 2" },
      ]);
    } else {
      setLgaOptions([]);
    }
  }, [formData.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
    // call your API here
  };
 const features = [
    { icon: "fa-bell", text: "Instant reminders" },
    { icon: "fa-piggy-bank", text: "Easy installments" },
    { icon: "fa-stopwatch", text: "Shorter processing time" },
    { icon: "fa-headset", text: "24/7 Customer support" },
  ];
  return (
    <div className="container-xxl bg-white hero-header mt-40 mb-0 text-primary">
      <div className="container mx-auto px-4">
        <div className="lg:flex lg:items-center lg:justify-around gap-8">
          {/* Left Side Features */}
          <div className="flex flex-col items-center lg:items-start mb-10 mt-[-30px] text-center lg:text-left">
            <h2 className="text-primary text-3xl font-bold mb-6">
              Let&apos;s get started!
            </h2>
            <div className="grid gap-4">
              {features.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-600 rounded-full text-white">
                    <i className={`fa ${item.icon}`}></i>
                  </div>
                  <p className="text-gray-700 font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side Form */}
          <div className="flex items-center justify-center w-full px-4">
            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Input Field Template */}
                {[
                  { type: "number", name: "phone", placeholder: "Phone Number", icon: "fa-phone", required: true },
                  { type: "email", name: "email", placeholder: "Email ID", icon: "fa-envelope", required: true },
                  { type: showPassword ? "text" : "password", name: "password", placeholder: "Password", icon: "fa-eye", toggle: true },
                  { type: showConfirmPassword ? "text" : "password", name: "confirmPassword", placeholder: "Re-enter password", icon: "fa-eye", toggle: true, confirm: true },
                  { type: "text", name: "fullName", placeholder: "Full Name", icon: "fa-user", required: true },
                ].map((field, idx) => (
                  <div key={idx} className="relative">
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="w-full pl-4 pr-12 py-3 rounded-full shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                    />
                    <span
                      className={`absolute right-3 top-3 text-gray-600 text-lg ${
                        field.toggle ? "cursor-pointer" : "text-blue-500"
                      }`}
                      onClick={() => {
                        if (field.name === "password") setShowPassword((prev) => !prev);
                        if (field.name === "confirmPassword") setShowConfirmPassword((prev) => !prev);
                      }}
                    >
                      <i
                        className={`fas ${
                          field.toggle
                            ? formData[field.name] && (field.confirm ? (showConfirmPassword ? "fa-eye-slash" : "fa-eye") : showPassword ? "fa-eye-slash" : "fa-eye")
                            : field.icon
                        }`}
                      ></i>
                    </span>
                  </div>
                ))}

                {/* State Select */}
                <div className="relative">
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full pl-4 pr-12 py-3 rounded-full shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none appearance-none transition"
                  >
                    <option value="">Select state of residence</option>
                    {regions.map((reg) => (
                      <option key={reg.reg_id} value={reg.reg_id}>
                        {reg.reg_label}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-3 top-3 text-blue-500 text-lg">
                    <i className="fa fa-globe-africa"></i>
                  </span>
                </div>

                {/* LGA Select */}
                <div className="relative">
                  <select
                    name="lga"
                    value={formData.lga}
                    onChange={handleChange}
                    required
                    className="w-full pl-4 pr-12 py-3 rounded-full shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none appearance-none transition"
                  >
                    <option value="">Select LGA of residence</option>
                    {lgaOptions.map((lga) => (
                      <option key={lga.id} value={lga.id}>
                        {lga.name}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-3 top-3 text-blue-500 text-lg">
                    <i className="fa fa-map-pin"></i>
                  </span>
                </div>

                {/* Promo Code */}
                <div className="relative">
                  <input
                    type="text"
                    name="refCode"
                    value={formData.refCode}
                    onChange={handleChange}
                    placeholder="Promo code (Optional)"
                    className="w-full pl-4 pr-12 py-3 rounded-full shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                  />
                  <span className="absolute right-3 top-3 text-blue-500 text-lg">
                    <i className="fa fa-gift"></i>
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                >
                  Register
                </button>

                {/* Links */}
                <p className="text-center text-sm text-gray-500">
                  Already a member?{" "}
                  <a href="/login" className="text-blue-600 font-medium hover:underline">
                    Login here
                  </a>
                </p>
                <p className="text-center text-xs text-gray-400 mt-4">
                  By registering, you agree to the{" "}
                  <a href="/terms-and-conditions" className="text-blue-500 hover:underline" target="_blank">
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
