// pages/verify-password.jsx
"use client"
import { useState } from "react";
import Head from "next/head";

export default function VerifyPassword() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorLg, setErrorLg] = useState(""); // Placeholder for large screen errors
  const [errorSm, setErrorSm] = useState(""); // Placeholder for mobile errors

  // TODO: Replace with real backend verification
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting password:", password);
    // Example placeholder
    // const response = await fetch('/api/verify-password', { method: 'POST', body: JSON.stringify({ password }) });
    // setErrorLg(response.error);
    // setErrorSm(response.error);
  };

  return (
    <>
      <Head>
        <title>Verify Password</title>
      </Head>
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-primary px-4">
        {/* Error message for mobile */}
        <div className="block lg:hidden text-red-500 mb-4 text-center">
          {errorSm}
        </div>

        <div className="w-full max-w-md bg-gray-50 rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-semibold mb-4 text-center">Verify Your Password</h2>
          {/* Error message for large screens */}
          {errorLg && <p className="hidden lg:block text-red-500 mb-4">{errorLg}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="lpwd"
                name="pwd"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <i className="fas fa-eye-slash"></i>
                ) : (
                  <i className="fas fa-eye"></i>
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              Proceed
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
