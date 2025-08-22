"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Wrench, Store, PlayCircle } from "lucide-react";
import Image from "next/image";

export default function ServiceProviderSection({ siteTitle = "TRYBENODE" }) {
  return (
    <div className="bg-white w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left Content */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6 px-4 lg:px-8">
          <div className="text-center lg:text-left">
            <h4 className="text-xl md:text-2xl italic font-medium">
              Are you a spare part vendor, merchant or service agent?
            </h4>
            <p className="mt-3 text-gray-600">
              Much like Uber or Bolt that you know, at{" "}
              <span className="text-primary font-bold underline">
                {siteTitle.toUpperCase()}
              </span>
              , we display product and service requests from customers{" "}
              <em className="text-primary font-semibold underline">
                who have already paid.
              </em>
            </p>
          </div>

          {/* Service Provider Card */}
          <Card className="relative shadow rounded-2xl">
            <CardContent className="p-6">
              <div className="absolute top-4 left-4 text-primary border border-primary rounded-full p-2">
                <Wrench size={28} />
              </div>
              <div className="pt-2 pl-12">
                <h6 className="text-lg font-semibold mb-3">
                  As a service provider
                </h6>
                <p className="text-gray-600">
                  See customers who are looking for your service, be it a driving
                  school instructor, insurance provider, vehicle inspection officer,
                  vehicle documentation expert, towing van, and more.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Vendor Card */}
          <Card className="relative shadow rounded-2xl">
            <CardContent className="p-6">
              <div className="absolute top-4 left-4 text-primary border border-primary rounded-full p-2">
                <Store size={28} />
              </div>
              <div className="pt-2 pl-12">
                <h6 className="text-lg font-semibold mb-3">
                  As a spare part vendor or merchant
                </h6>
                <p className="text-gray-600">
                  See customers who need spare parts like tyres, batteries,
                  engine oil and more.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer Note */}
          <div className="pt-4">
            <h6 className="text-success font-medium">
              Simply deliver to these customers at their satisfaction and withdraw
              earnings directly on your dashboard.
            </h6>
          </div>

          {/* CTA Button */}
          <div>
            <Link href="/va-marketplace">
              <Button
                variant="outline"
                className="rounded-full border-2 px-6 py-3 text-base flex items-center gap-2"
              >
                Browse product or service requests
                <PlayCircle size={20} />
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="col-span-12 lg:col-span-4 flex justify-center lg:justify-end">
          <Image height={400} width={400} 
            src="/img/va.jpg"
            alt="Payment options"
            title="Payment options"
            className="rounded-xl shadow-lg max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
