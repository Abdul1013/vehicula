"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// Mock pricing data (replace with API later)
const pricingData = {
  regions: {
    lagos: {
      services: {
        cleaning: {
          deep: 50000,
          regular: 30000,
        },
        laundry: {
          basic: 15000,
          premium: 25000,
        },
      },
    },
    abuja: {
      services: {
        cleaning: {
          deep: 45000,
          regular: 28000,
        },
        laundry: {
          basic: 12000,
          premium: 22000,
        },
      },
    },
  },
};

// Calculator logic
function calculatePlans(price) {
  const deposit = price * 0.3;
  const balance = price - deposit;
  return {
    full: price,
    deposit,
    balance,
    installments: [balance / 2, balance / 2], // simple 2-part installment
  };
}

export default function PricingCalculator() {
  const [region, setRegion] = useState<string | null>(null);
  const [service, setService] = useState<string | null>(null);
  const [subService, setSubService] = useState<string | null>(null);

  const price =
    region && service && subService
      ? pricingData.regions[region].services[service][subService]
      : null;

  const plans = price ? calculatePlans(price) : null;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="shadow-2xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Get Now — Pay Later Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Region */}
          <div>
            <label className="block mb-2 font-medium">Select Region</label>
            <Select onValueChange={setRegion}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose region" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(pricingData.regions).map((r) => (
                  <SelectItem key={r} value={r}>
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Step 2: Service */}
          {region && (
            <div>
              <label className="block mb-2 font-medium">Select Service</label>
              <Select onValueChange={setService}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose service" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(pricingData.regions[region].services).map((s) => (
                    <SelectItem key={s} value={s}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Step 3: Subservice */}
          {region && service && (
            <div>
              <label className="block mb-2 font-medium">Select Subservice</label>
              <Select onValueChange={setSubService}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose subservice" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(pricingData.regions[region].services[service]).map((ss) => (
                    <SelectItem key={ss} value={ss}>
                      {ss.charAt(0).toUpperCase() + ss.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Pricing Plans */}
          {plans && (
            <Tabs defaultValue="full" className="w-full">
              <TabsList className="grid grid-cols-4 gap-2">
                <TabsTrigger value="full">Full</TabsTrigger>
                <TabsTrigger value="deposit">Deposit</TabsTrigger>
                <TabsTrigger value="installment">Installments</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
              </TabsList>

              {/* Full Payment */}
              <TabsContent value="full">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4 text-center">
                    <p className="text-lg font-bold text-blue-600">
                      ₦{plans.full.toLocaleString()}
                    </p>
                    <p className="text-gray-600">Pay once, no installments.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Deposit */}
              <TabsContent value="deposit">
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4 text-center">
                    <p className="text-lg font-bold text-green-600">
                      Deposit: ₦{plans.deposit.toLocaleString()}
                    </p>
                    <p className="text-gray-600">
                      Balance: ₦{plans.balance.toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Installments */}
              <TabsContent value="installment">
                <Card className="bg-yellow-50 border-yellow-200">
                  <CardContent className="p-4 text-center">
                    {plans.installments.map((amt, i) => (
                      <p key={i} className="font-medium">
                        Installment {i + 1}: ₦{amt.toLocaleString()}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Summary */}
              <TabsContent value="summary">
                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="p-4 text-center">
                    <p>
                      Region: <strong>{region}</strong>
                    </p>
                    <p>
                      Service: <strong>{service}</strong>
                    </p>
                    <p>
                      Subservice: <strong>{subService}</strong>
                    </p>
                    <p>
                      Price: <strong>₦{plans.full.toLocaleString()}</strong>
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}

          {/* CTA */}
          {plans && (
            <div className="text-center pt-4">
              <Button className="rounded-full px-6">Proceed to Booking</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
