// // src/app/login/page.jsx
// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";

// export default function LoginPage() {
//   const [phone, setPhone] = useState("");
//   const [pwd, setPwd] = useState("");
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const validateForm = () => {
//     const newErrors = {};
//     if (!phone) newErrors.phone = "Phone number is required";
//     else if (!/^\+?\d{10,15}$/.test(phone)) {
//       newErrors.phone = "Invalid phone number format";
//     }
//     if (!pwd) newErrors.pwd = "Password is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       toast.error("Please fix the form errors", { toastId: "form-error" });
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const normalizedPhone = phone.trim().replace(/^\+/, "");
//       console.log("Sending login request:", { phone: normalizedPhone, pwd });
//       const res = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phone: normalizedPhone, pwd }),
//       });

//       const data = await res.json();
//       console.log("Login response:", data);

//       if (!res.ok) {
//         throw new Error(data.error || "Login failed");
//       }

//       toast.success("Login successful!", { toastId: "login-success" });
//       router.push("/dashboard_form");
//     } catch (err) {
//       console.error("Login error:", err.message);
//       toast.error(err.message, { toastId: "login-error" });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className='min-h-screen flex items-center justify-center bg-white text-primary py-8 px-4 sm:px-6 lg:px-8'>
//       <div className='w-full max-w-md'>
//         <div className='bg-white p-8 rounded-xl shadow-lg'>
//           <h5 className='text-xl font-semibold text-center mb-6'>
//             Login to Get Started!
//           </h5>
//           <form onSubmit={handleLogin} noValidate className='space-y-4'>
//             <div className='relative'>
//               <label
//                 htmlFor='phone'
//                 className='block text-sm font-medium text-gray-700 mb-1'
//               >
//                 Phone Number <span className='text-red-500'>*</span>
//               </label>
//               <div className='relative'>
//                 <input
//                   id='phone'
//                   name='phone'
//                   type='tel'
//                   value={phone}
//                   onChange={(e) => {
//                     setPhone(e.target.value);
//                     setErrors((prev) => ({ ...prev, phone: "" }));
//                   }}
//                   placeholder='Phone Number'
//                   required
//                   disabled={isLoading}
//                   className={`form-control w-full px-4 py-2 rounded-full border ${
//                     errors.phone
//                       ? "border-red-500 focus:ring-red-500"
//                       : "border-gray-300 focus:ring-blue-400"
//                   } focus:ring-2 focus:outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                   aria-invalid={!!errors.phone}
//                   aria-describedby={errors.phone ? "phone-error" : undefined}
//                 />
//                 <span className='absolute top-3 right-4 text-primary text-lg'>
//                   <i className='fa fa-phone' />
//                 </span>
//               </div>
//               {errors.phone && (
//                 <p
//                   id='phone-error'
//                   className='mt-1 text-sm text-red-500'
//                   role='alert'
//                 >
//                   {errors.phone}
//                 </p>
//               )}
//             </div>

//             <div className='relative'>
//               <label
//                 htmlFor='pwd'
//                 className='block text-sm font-medium text-gray-700 mb-1'
//               >
//                 Password <span className='text-red-500'>*</span>
//               </label>
//               <div className='relative'>
//                 <input
//                   id='pwd'
//                   name='pwd'
//                   type={showPassword ? "text" : "password"}
//                   value={pwd}
//                   onChange={(e) => {
//                     setPwd(e.target.value);
//                     setErrors((prev) => ({ ...prev, pwd: "" }));
//                   }}
//                   placeholder='Password'
//                   required
//                   disabled={isLoading}
//                   className={`form-control w-full px-4 py-2 rounded-full border ${
//                     errors.pwd
//                       ? "border-red-500 focus:ring-red-500"
//                       : "border-gray-300 focus:ring-blue-400"
//                   } focus:ring-2 focus:outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                   aria-invalid={!!errors.pwd}
//                   aria-describedby={errors.pwd ? "pwd-error" : undefined}
//                 />
//                 <span
//                   onClick={() => setShowPassword(!showPassword)}
//                   className='absolute top-3 right-4 cursor-pointer text-primary text-lg'
//                 >
//                   <i
//                     className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
//                   />
//                 </span>
//               </div>
//               {errors.pwd && (
//                 <p
//                   id='pwd-error'
//                   className='mt-1 text-sm text-red-500'
//                   role='alert'
//                 >
//                   {errors.pwd}
//                 </p>
//               )}
//             </div>

//             <div className='flex justify-between items-center mt-6'>
//               <button
//                 type='submit'
//                 className='px-6 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed'
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Logging in..." : "Login"}
//               </button>
//               <Link
//                 href='/forgot-password'
//                 className='text-sm text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded'
//               >
//                 Forgot password?
//               </Link>
//             </div>
//           </form>
//         </div>

//         <div className='text-center text-gray-700 py-4'>
//           <p className='text-sm'>
//             Are you a new member?{" "}
//             <Link
//               href='/register'
//               className='text-blue-500 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded'
//             >
//               Click here to register.
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/app/login/page.jsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [pwd, setPwd] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    const newErrors = {};
    if (!phone) newErrors.phone = "Phone number is required";
    else if (!/^\+?\d{10,15}$/.test(phone)) {
      newErrors.phone = "Invalid phone number format";
    }
    if (!pwd) newErrors.pwd = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the form errors", { toastId: "form-error" });
      return;
    }

    setIsLoading(true);
    try {
      const normalizedPhone = phone.trim().replace(/^\+/, "");
      console.log("Sending login request:", { phone: normalizedPhone, pwd });
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: normalizedPhone, pwd }),
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      toast.success(
        "Login successful! Use default password: Default@123 if reset.",
        { toastId: "login-success" }
      );
      console.log(
        "Redirecting based on mustChangePassword:",
        data.user.mustChangePassword
      );
      if (data.user.mustChangePassword) {
        console.log("Redirecting to /change-password");
        router.push("/change-password");
      } else {
        console.log("Redirecting to /dashboard_form");
        router.push("/dashboard_form");
      }
    } catch (err) {
      console.error("Login error:", err.message);
      toast.error(
        err.message === "Invalid phone number or password"
          ? "Incorrect phone number or password"
          : err.message,
        { toastId: "login-error" }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-white text-primary py-8 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md'>
        <div className='bg-white p-8 rounded-xl shadow-lg'>
          <h5 className='text-xl font-semibold text-center mb-6'>
            Login to Get Started!
          </h5>
          <p className='text-sm text-gray-600 text-center mb-4'>
            If your password was reset, use <strong>Default@123</strong> and
            change it after login.
          </p>
          <form onSubmit={handleLogin} noValidate className='space-y-4'>
            <div className='relative'>
              <label
                htmlFor='phone'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Phone Number <span className='text-red-500'>*</span>
              </label>
              <div className='relative'>
                <input
                  id='phone'
                  name='phone'
                  type='tel'
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setErrors((prev) => ({ ...prev, phone: "" }));
                  }}
                  placeholder='Phone Number'
                  required
                  disabled={isLoading}
                  className={`form-control w-full px-4 py-2 rounded-full border ${
                    errors.phone
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-400"
                  } focus:ring-2 focus:outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed`}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
                <span className='absolute top-3 right-4 text-primary text-lg'>
                  <i className='fa fa-phone' />
                </span>
              </div>
              {errors.phone && (
                <p
                  id='phone-error'
                  className='mt-1 text-sm text-red-500'
                  role='alert'
                >
                  {errors.phone}
                </p>
              )}
            </div>

            <div className='relative'>
              <label
                htmlFor='pwd'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Password <span className='text-red-500'>*</span>
              </label>
              <div className='relative'>
                <input
                  id='pwd'
                  name='pwd'
                  type={showPassword ? "text" : "password"}
                  value={pwd}
                  onChange={(e) => {
                    setPwd(e.target.value);
                    setErrors((prev) => ({ ...prev, pwd: "" }));
                  }}
                  placeholder='Password'
                  required
                  disabled={isLoading}
                  className={`form-control w-full px-4 py-2 rounded-full border ${
                    errors.pwd
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-400"
                  } focus:ring-2 focus:outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed`}
                  aria-invalid={!!errors.pwd}
                  aria-describedby={errors.pwd ? "pwd-error" : undefined}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute top-3 right-4 cursor-pointer text-primary text-lg'
                >
                  <i
                    className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                  />
                </span>
              </div>
              {errors.pwd && (
                <p
                  id='pwd-error'
                  className='mt-1 text-sm text-red-500'
                  role='alert'
                >
                  {errors.pwd}
                </p>
              )}
            </div>

            <div className='flex justify-between items-center mt-6'>
              <button
                type='submit'
                className='px-6 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed'
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
              <Link
                href='/forgot-password'
                className='text-sm text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded'
              >
                Forgot password?
              </Link>
            </div>
          </form>
        </div>

        <div className='text-center text-gray-700 py-4'>
          <p className='text-sm'>
            Are you a new member?{" "}
            <Link
              href='/register'
              className='text-blue-500 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded'
            >
              Click here to register.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
