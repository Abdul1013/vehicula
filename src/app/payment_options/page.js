"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CreditCard, Calendar, Clock } from "lucide-react";

// type PaymentOption = "full" | "installment" | "paylater";

export default function PaymentOptions() {
  const [selected, setSelected] = useState("full");
  const [installmentAmount, setInstallmentAmount] = useState("");
  const [reminder, setReminder] = useState("weekly");
  const router = useRouter();
  const params = useSearchParams();

  // Assume amount is passed from service form (e.g. ?amount=26000)
  const totalAmount = Number(params.get("amount")) || 26000;

  const handlePay = () => {
    let payload = {
      totalAmount,
      option: selected,
    };

    if (selected === "installment") {
      payload = { ...payload, installmentAmount, reminder };
    }
    if (selected === "paylater") {
      payload = { ...payload, upfront: totalAmount - 6000, balance: 6000 };
    }

    // Redirect to Monnify API (adjust as per integration)
    router.push(
      `/api/monnify/initialize?${new URLSearchParams(payload).toString()}`
    );
  };

  return (
    <div className="max-w-2xl mt-20 mx-auto px-4 py-8">
      <h1 className="text-xl font-bold text-center mb-6">
        Select Payment Option
      </h1>

      <div className="space-y-4">
        {/* Full Amount */}
        <div
          className={`p-5 border rounded-xl cursor-pointer transition ${
            selected === "full"
              ? "border-green-600 bg-green-50"
              : "border-gray-200"
          }`}
          onClick={() => setSelected("full")}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="text-green-600" />
              <span className="font-semibold">Full Payment</span>
            </div>
            <span className="text-green-700 font-bold">
              ₦{totalAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Easy Installment */}
        <div
          className={`p-5 border rounded-xl cursor-pointer transition ${
            selected === "installment"
              ? "border-green-600 bg-green-50"
              : "border-gray-200"
          }`}
          onClick={() => setSelected("installment")}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="text-green-600" />
              <span className="font-semibold">Easy Installment</span>
            </div>
            <span className="text-gray-600">Total ₦{totalAmount.toLocaleString()}</span>
          </div>
          {selected === "installment" && (
            <div className="mt-4 space-y-3">
              <input
                type="number"
                placeholder="Enter installment amount"
                value={installmentAmount}
                onChange={(e) => setInstallmentAmount(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              />
              <div className="flex gap-4 items-center text-sm">
                <span className="text-gray-500">Remind me:</span>
                {["daily", "weekly", "monthly"].map((r) => (
                  <label key={r} className="flex items-center gap-1">
                    <input
                      type="radio"
                      checked={reminder === r}
                      onChange={() => setReminder(r)}
                    />
                    {r}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Get Now, Pay Later */}
        <div
          className={`p-5 border rounded-xl cursor-pointer transition ${
            selected === "paylater"
              ? "border-green-600 bg-green-50"
              : "border-gray-200"
          }`}
          onClick={() => setSelected("paylater")}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="text-green-600" />
              <span className="font-semibold">Get Now, Pay Later</span>
            </div>
            <span className="text-green-700 font-bold">
              Pay ₦{(totalAmount - 6000).toLocaleString()} now
            </span>
          </div>
          {selected === "paylater" && (
            <p className="text-sm text-gray-600 mt-2">
              Balance of ₦6,000 due within 30 days.
            </p>
          )}
        </div>
      </div>

      {/* Final CTA */}
      <button
        onClick={handlePay}
        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
      >
        Continue to Payment
      </button>
    </div>
  );
}
