// pages/verify-phone.jsx
"use client"
import { useState, useEffect } from "react";
import Head from "next/head";

export default function VerifyPhone() {
  const [verificationCode, setVerificationCode] = useState("");
  const [errorText, setErrorText] = useState(""); // Placeholder for errors
  const [inputDisabled, setInputDisabled] = useState(false); // Replace with backend flag
  const [resendCountdown, setResendCountdown] = useState(30);
  const [showResend, setShowResend] = useState(false);
  const phone = "+234********"; // Replace with masked phone from backend

  // Countdown logic
  useEffect(() => {
    let timer;
    if (resendCountdown > 0) {
      timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
    } else {
      setShowResend(true);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting OTP:", verificationCode);
    // TODO: Replace with real API call
    // const response = await fetch('/api/verify-phone', { method: 'POST', body: JSON.stringify({ verificationCode }) });
    // setErrorText(response.error);
  };

  const handleResend = (type) => {
    console.log("Resend type:", type);
    setResendCountdown(30);
    setShowResend(false);
    // TODO: Call backend API for resending OTP (voice or text)
  };

  return (
    <>
      <Head>
        <title>Verify Phone Number</title>
      </Head>

      <div className="min-h-screen bg-white flex flex-col items-center px-4 py-8 text-primary">
        {/* Profile nav placeholder */}
        <div className="w-full max-w-md mb-6">
          {/* TODO: Include ProfileNav component */}
        </div>

        <div className="w-full max-w-md bg-gray-50 rounded-xl shadow-lg p-8">
          {errorText && <p className="text-red-500 text-center mb-4">{errorText}</p>}
          <h2 className="text-xl font-semibold text-center mb-6">Verify Phone Number</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-gray-600">OTP sent on {phone}</label>
              <div className="relative">
                <input
                  type="number"
                  name="verificationCode"
                  placeholder="Enter verification code"
                  required
                  disabled={inputDisabled}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
                <span className="absolute right-3 top-2.5 text-blue-600 text-lg">
                  <i className="fa fa-unlock"></i>
                </span>
              </div>
            </div>

            <div className="text-center text-sm text-gray-500">
              {!showResend ? (
                <p>
                  Didn&apos;t get OTP? Resend in <span>{resendCountdown}</span> seconds
                </p>
              ) : (
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => handleResend(1)}
                    className="text-blue-600 hover:underline"
                  >
                    Voice OTP
                  </button>
                  <button
                    type="button"
                    onClick={() => handleResend(2)}
                    className="text-blue-600 hover:underline"
                  >
                    Resend OTP
                  </button>
                </div>
              )}
            </div>

            <div className="text-center">
              {inputDisabled ? (
                <a
                  href="/profile"
                  className="inline-block px-6 py-2 border border-blue-600 text-blue-600 rounded-full shadow hover:bg-blue-50"
                >
                  View Profile
                </a>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition-colors shadow"
                >
                  Verify Phone Number
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
