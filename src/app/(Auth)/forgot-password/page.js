"use client";
import { useState, useEffect } from "react";

export default function ForgotPasswordPage() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ phone })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      alert("Code sent! Check your SMS or email.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className=" h-screen mt-32 container mx-auto bg-white text-primary py-8 px-4">
      <div >
        <div className="text-center">
          {isMobile && error && <div className="text-red-500">{error}</div>}
        </div>

        <div className="max-w-md mx-auto p-6 shadow rounded bg-white">
          <h5 className="text-lg font-semibold text-center mb-4">Forgot password?</h5>
          {!isMobile && error && <div className="text-red-500 text-center mb-3">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="relative w-full mt-3">
              <input
                className="form-control border border-gray-300 rounded-full px-4 py-2 w-full"
                name="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter Registered Phone Number"
                required
              />
              <span className="absolute top-2 right-4 text-primary text-lg">
                <i className="fa fa-phone" />
              </span>
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                type="submit"
                className="btn btn-outline-primary rounded-full px-6 py-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
              >
                Send code
              </button>
              <a href="/login" className="text-sm text-blue-500">Click here to login</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
