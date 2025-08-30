"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const handleLogin = async (e) => {
  e.preventDefault();

  // try {
  //   const res = await fetch('/api/login', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ phone, pwd }),
  //   });

  //   const data = await res.json();

  //   if (!res.ok) throw new Error(data.message);

  //   // Handle session via cookie or Supabase, or redirect
  //   window.location.href = data.redirect;
  // } catch (err) {
  //   setError(err.message);
  // }
};


  return (
    <div className=" w-3/6  items-center mx-auto  h-screen justify-center text-primary mt-32 py-8 px-4">
      <div>
        {isMobile && error && (
          <div className="text-red-500 text-center">{error}</div>
        )}

        <div className=" mx-auto p-6 shadow rounded bg-white">
          <h5 className="text-lg font-semibold text-center mb-4">
            Login to get started!
          </h5>
          {!isMobile && error && (
            <div className="text-red-500 text-center">{error}</div>
          )}

          <form onSubmit={handleLogin}>
            <div className="relative w-full mt-3">
              <input
                className="form-control border border-gray-300 rounded-full px-4 py-2 w-full"
                name="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                required
              />
              <span className="absolute top-2 right-4 text-primary text-lg">
                <i className="fa fa-phone" />
              </span>
            </div>

            <div className="relative w-full mt-4">
              <input
                id="lpwd"
                name="pwd"
                type={showPassword ? "text" : "password"}
                className="form-control border border-gray-300 rounded-full px-4 py-2 w-full"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                placeholder="Password"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2 right-4 cursor-pointer text-primary text-lg"
              >
                <i
                  className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                />
              </span>
            </div>

            <div className="flex justify-between items-center mt-4">


              <button
              onClick={() => router.push("/dashboard_form")}
              type="submit"
              className="btn btn-outline-primary rounded-full px-6 py-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
              >
                Login
              </button>
          
         
              <a href="/forgot-password" className="text-sm text-blue-500">
                Forgot password?
              </a>
            </div>
          </form>
        </div>

        <div className="text-center text-dark py-3">
          <small>
            Are you a new member? <br />
            <a href="/register" className="text-blue-500">
              Click here to register.
            </a>
          </small>
        </div>
      </div>
    </div>
  );
}
