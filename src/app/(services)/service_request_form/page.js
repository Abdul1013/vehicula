"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Dropzone from "react-dropzone";
import Button from "@/components/ui/button";
import { serviceConfig } from "@/config/serviceConfig";
// import LicenseApplication from "../dl_application_form/page";
import LicenseApplication from "@/components/DriverLicence";

const schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(10, "Phone number required"),
  address: z.string().min(5, "Address required"),
  dob: z.string().optional(),
});

 function ServiceDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category"); // e.g. driverLicense, plateNumber, insurance
  const id = searchParams.get("id");

  const [service, setService] = useState(null);
  const [files, setFiles] = useState([]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  // Load the selected service from config
  useEffect(() => {
    if (category && id) {
      const serviceData = serviceConfig[category]?.find((s) => String(s.id) === String(id));
      setService(serviceData);
    }
  }, [category, id]);

  const onSubmit = (data) => {
    if (service?.uploadRequired && files.length !== service.uploadRequired) {
      alert(`Please upload exactly ${service.uploadRequired} document(s).`);
      return;
    }

    console.log("Submitting:", {
      ...data,
      service,
      files,
    });
    // TODO: send to API
    setTimeout(() => {
      router.push(
        "/payment_options"
      );
    }, 100);
  };

  if (!service) {
    return (
      <div className="max-w-4xl mt-20 mx-auto px-4 py-6">
        <p className="text-center text-gray-500">Loading service details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mt-20 mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Provide Details Below
      </h2>

      {/* Service summary */}
      <div className="mb-6 bg-gray-50 border  border-green-400 rounded p-4">
        <h3 className="text-lg font-semibold text-gray-700">{service.name}</h3>
        <p className="text-gray-600 text-sm">
          {service.type || service.desc || service.duration}
        </p>
        <p className="text-gray-800 font-medium mt-1">₦{service.price}</p>
      </div>

      {/* Upload notice */}
      {service.uploadRequired && (
        <h4 className="mb-4">
          Required upload:{" "}
          <span className="font-medium">{service.docName?.join(", ")}</span>
        </h4>
      )}

      {/* Validation errors */}
      {Object.values(errors).length > 0 && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded p-3">
          <ul className="list-disc pl-5 text-sm">
            {Object.values(errors).map((err, idx) => (
              <li key={idx}>{err?.message?.toString()}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Form */}
      {(service.category === "driverLicense" && service.name === "Fresh") && <LicenseApplication/>}
      {service.name !== "Fresh" && <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            {...register("fullName")}
            className="w-full mt-1 border rounded-lg p-2 text-sm  border-green-400 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            {...register("phone")}
            type="tel"
            className=" border-green-400 w-full mt-1 border rounded-lg p-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            {...register("address")}
            className="  border-green-400 w-full mt-1 border rounded-lg p-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            {...register("dob")}
            type="date"
            className="  border-green-400 w-full mt-1 border rounded-lg p-2 text-sm"
          />
        </div>

        {/* Upload section */}
        {service.uploadRequired && (
          <div className="mt-6">
            <p className="font-medium text-gray-800 mb-2">
              Upload Required Documents ({files.length}/{service.uploadRequired})
            </p>
            <Dropzone
              accept={{ "image/*": [] }}
              maxSize={5 * 1024 * 1024}
              onDrop={(acceptedFiles) => setFiles(acceptedFiles)}
            >
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  className="border-2 border-dashed border-green-400 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50"
                >
                  <input {...getInputProps()} />
                  <p className="text-sm text-gray-500">
                    Drag & drop files here, or click to upload
                  </p>
                </div>
              )}
            </Dropzone>
            <ul className="mt-2 text-sm text-gray-600">
              {files.map((f) => (
                <li key={f.name}>{f.name}</li>
              ))}
            </ul>
          </div>
        )}

        <Button type="submit" className="mt-6 bg-green-600 w-full">
          Proceed →
        </Button>
      </form>}
    </div>
  );
}

export default function ServiceDetailsPage(){
  return(
    <Suspense fallback={<div>Loading....</div>}>
          <ServiceDetails/>
        </Suspense>
  )
}