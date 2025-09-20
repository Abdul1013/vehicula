"use client";

import { useState, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CreditCard, Calendar, Clock } from "lucide-react";
import { z } from "zod";
import Button from "@/components/ui/button"; // Reusing the Button component from DLicenseApplication

// Zod schema for installment validation
const installmentSchema = z.object({
  installmentAmount: z
    .number()
    .min(1, "Installment amount must be greater than 0")
    .max(1000000, "Installment amount is too high"), // Adjust max as needed
  reminder: z.enum(["daily", "weekly", "monthly"], {
    message: "Invalid reminder option",
  }),
});

function PaymentOptionsContent() {
  const [selected, setSelected] = useState("full");
  const [installmentAmount, setInstallmentAmount] = useState("");
  const [reminder, setReminder] = useState("weekly");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();

  // Extract query parameters
  const totalAmount = Number(params.get("price")) || 0;
  const applicationId = params.get("application_id") || "";
  const paymentRef = params.get("payment_ref") || "";
  const vsrId = params.get("vsr_id") || "";

  // Validate query parameters
  const isValidParams = useMemo(() => {
    if (!totalAmount || totalAmount <= 0) {
      setError("Invalid or missing price parameter");
      return false;
    }
    if (!applicationId || !paymentRef || !vsrId) {
      setError("Missing required payment parameters");
      return false;
    }
    return true;
  }, [totalAmount, applicationId, paymentRef, vsrId]);

  const handlePay = async () => {
    if (!isValidParams) return;

    setLoading(true);
    setError(null);

    let payload = {
      totalAmount,
      option: selected,
      applicationId,
      paymentRef,
      vsrId,
    };

    if (selected === "installment") {
      try {
        const parsed = installmentSchema.parse({
          installmentAmount: Number(installmentAmount),
          reminder,
        });
        if (parsed.installmentAmount > totalAmount) {
          setError("Installment amount cannot exceed total amount");
          setLoading(false);
          return;
        }
        payload = { ...payload, ...parsed };
      } catch (err) {
        setError(
          err instanceof z.ZodError
            ? err.errors[0].message
            : "Invalid installment details"
        );
        setLoading(false);
        return;
      }
    }

    if (selected === "paylater") {
      const upfront = totalAmount - 6000;
      if (upfront <= 0) {
        setError("Total amount is too low for pay later option");
        setLoading(false);
        return;
      }
      payload = { ...payload, upfront, balance: 6000 };
    }

    try {
      // Simulate API call to Monnify (replace with actual API integration)
      const response = await fetch(
        `/api/monnify/initialize?${new URLSearchParams(payload).toString()}`,
        { method: "GET", credentials: "include" }
      );
      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Failed to initialize payment");
      }
      const { redirectUrl } = await response.json();
      router.push(redirectUrl); // Redirect to Monnify payment page
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-32 mx-5 bg-white text-gray-900">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-xl font-bold text-center mb-6">
          Select Payment Option
        </h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded p-3 mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {/* Full Payment */}
          <div
            className={`p-5 border rounded-lg cursor-pointer transition ${
              selected === "full"
                ? "border-green-400 bg-green-50"
                : "border-gray-300"
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
            className={`p-5 border rounded-lg cursor-pointer transition ${
              selected === "installment"
                ? "border-green-400 bg-green-50"
                : "border-gray-300"
            }`}
            onClick={() => setSelected("installment")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="text-green-600" />
                <span className="font-semibold">Easy Installment</span>
              </div>
              <span className="text-gray-600">
                Total ₦{totalAmount.toLocaleString()}
              </span>
            </div>
            {selected === "installment" && (
              <div className="mt-4 space-y-3">
                <input
                  type="number"
                  placeholder="Enter installment amount"
                  value={installmentAmount}
                  onChange={(e) => setInstallmentAmount(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <div className="flex gap-4 items-center text-sm">
                  <span className="text-gray-500">Remind me:</span>
                  {["daily", "weekly", "monthly"].map((r) => (
                    <label key={r} className="flex items-center gap-1">
                      <input
                        type="radio"
                        checked={reminder === r}
                        onChange={() => setReminder(r)}
                        className="focus:ring-blue-500"
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
            className={`p-5 border rounded-lg cursor-pointer transition ${
              selected === "paylater"
                ? "border-green-400 bg-green-50"
                : "border-gray-300"
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
        <Button
          onClick={handlePay}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
          disabled={loading || !isValidParams}
        >
          {loading ? "Processing..." : "Continue to Payment"}
        </Button>
      </div>
    </div>
  );
}

export default function PaymentOptions() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen mt-32 mx-5 bg-white text-gray-900 text-center p-6">
          Loading...
        </div>
      }
    >
      <PaymentOptionsContent />
    </Suspense>
  );
}