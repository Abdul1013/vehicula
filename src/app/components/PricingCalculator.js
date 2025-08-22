import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PricingCalculator() {
  const [regions, setRegions] = useState([]);
  const [services, setServices] = useState([]);
  const [subServices, setSubServices] = useState([]);

  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedSubService, setSelectedSubService] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Placeholder pricing data
  const [depositRate] = useState(30);
  const [installments] = useState(12);

  // 🚀 Replace with real API calls to your PHP backend
  useEffect(() => {
    async function fetchData() {
      // Example placeholders
      setRegions([
        { id: 1, label: "Lagos" },
        { id: 2, label: "Abuja" },
        { id: 3, label: "Port Harcourt" },
      ]);

      setServices([
        { id: 1, name: "Home Repair" },
        { id: 2, name: "Car Service" },
      ]);

      setSubServices([
        { id: "1_1", name: "Plumbing", amount: 50000, financeAmount: 60000 },
        { id: "1_2", name: "Electrical", amount: 70000, financeAmount: 80000 },
      ]);
    }
    fetchData();
  }, []);

  // Derived pricing values
  const currentSubService = subServices.find((s) => s.id === selectedSubService);
  const subAmount = currentSubService?.amount || 0;
  const financeAmount = currentSubService?.financeAmount || subAmount;

  const depositAsLow = Math.ceil((depositRate / 100) * financeAmount);
  const depositBalance = financeAmount - depositAsLow;
  const installmentAmount = Math.ceil(subAmount / installments);

  return (
    <div className="bg-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6">
          Transparent Prices! <span className="text-primary italic">See for yourself</span>
        </h2>

        {/* Region Selector */}
        <div className="text-center mb-6">
          <label className="text-gray-700 font-medium">
            I live in
            <select
              className="ml-2 border-b-2 border-black bg-transparent focus:outline-none"
              onChange={(e) => setSelectedRegion(e.target.value)}
              value={selectedRegion || ""}
            >
              <option value="">Select Region</option>
              {regions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Service Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 mb-2">I am interested in</label>
            <select
              className="w-full border rounded-lg p-2"
              onChange={(e) => setSelectedService(e.target.value)}
              value={selectedService || ""}
            >
              <option value="">Select Service</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">For</label>
            <select
              className="w-full border rounded-lg p-2"
              onChange={(e) => setSelectedSubService(e.target.value)}
              value={selectedSubService || ""}
            >
              <option value="">Select Sub Service</option>
              {subServices.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quantity */}
        <div className="text-center mb-10">
          <label className="text-gray-700">
            Quantity
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="mx-2 w-16 text-center border-b-2 border-black bg-transparent"
            />
            , You Pay:
          </label>
        </div>

        {/* Payment Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Get Now-Pay Later */}
          <Card className="p-4 border-2 border-green-500">
            <h3 className="text-primary text-lg font-semibold text-center mb-4">
              Get Now-Pay Later Plan
            </h3>
            <p className="text-sm text-red-500">Deposit as low as</p>
            <div className="text-center text-2xl font-bold text-green-600">
              ₦{depositAsLow.toLocaleString()}
            </div>
            <p className="text-gray-600 text-sm italic">
              Balance ₦{depositBalance.toLocaleString()} over 90 days
            </p>
            <Button className="w-full mt-4">Get Started</Button>
          </Card>

          {/* Easy Installments */}
          <Card className="p-4 border-2 border-green-500">
            <h3 className="text-primary text-lg font-semibold text-center mb-4">
              Easy Installments
            </h3>
            <p className="text-sm text-red-500">Start with as low as</p>
            <div className="text-center text-2xl font-bold text-green-600">
              ₦{installmentAmount.toLocaleString()}
            </div>
            <p className="text-gray-600 text-sm italic">
              Flexible {installments} months plan
            </p>
            <Button className="w-full mt-4">Get Started</Button>
          </Card>

          {/* Full Payment */}
          <Card className="p-4 border-2 border-green-500">
            <h3 className="text-primary text-lg font-semibold text-center mb-4">
              Full Payment
            </h3>
            <p className="text-sm text-red-500">Pay full amount of</p>
            <div className="text-center text-2xl font-bold text-green-600">
              ₦{subAmount.toLocaleString()}
            </div>
            <Button className="w-full mt-4">Get Started</Button>
          </Card>
        </div>

        <p className="text-xs text-gray-500 text-right mt-4">
          * Terms & Conditions Apply
        </p>
      </div>
    </div>
  );
}
