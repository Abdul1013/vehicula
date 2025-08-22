import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function DocumentVerification() {
  const handleVerify = (url, title) => {
    // Placeholder for backend modal or redirect
    console.log(`Verifying with: ${title} (${url})`);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
      >
        {/* Left Content */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">
            Are your documents genuine?
          </h2>
          <p className="text-gray-600 text-lg">
            It is now easy to verify your documents. A quick search should return
            your vehicle registration details if your documents are valid.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              className="shadow-md text-lg px-6 py-4 rounded-xl"
              onClick={() =>
                handleVerify(
                  "https://selfservice.fctevreg.com/renewal.php",
                  "Verify your documents for FCT"
                )
              }
            >
              <ShieldCheck className="w-5 h-5 mr-2 text-green-600" />
              Verify (FCT)
            </Button>

            <Button
              variant="outline"
              className="shadow-md text-lg px-6 py-4 rounded-xl"
              onClick={() =>
                handleVerify(
                  "https://verify.autoreg.ng/",
                  "Verify your documents for Lagos"
                )
              }
            >
              <ShieldCheck className="w-5 h-5 mr-2 text-green-600" />
              Verify (Lagos)
            </Button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <Card className="overflow-hidden shadow-xl rounded-2xl">
            <CardContent className="p-0">
              <Image height={400} width={400} 
                src="/img/person_check.jpg"
                alt="Document Verification"
                className="object-cover w-full h-full"
              />
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </section>
  );
}
