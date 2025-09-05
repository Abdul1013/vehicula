"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Dropzone from "react-dropzone";
import Button from "@/components/ui/button";

const schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(10, "Phone number required"),
  address: z.string().min(5, "Address required"),
  dob: z.string().optional(),
});


export default function ServiceDetailsPage() {
  const [selectedServices, setSelectedServices] = useState([]);
  const [requiredUploads, setRequiredUploads] = useState(0);
  const [files, setFiles] = useState([]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    if (files.length !== requiredUploads) {
      alert(`Please upload exactly ${requiredUploads} documents`);
      return;
    }
    // send to API
    console.log("Submitting:", data, files, selectedServices);
  };

  return (
    <div className="max-w-4xl mt-20 mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Provide Details Below</h2>

      {/* Error messages */}
      {Object.values(errors).length > 0 && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded p-3">
          <ul className="list-disc pl-5 text-sm">
            {Object.values(errors).map((err, idx) => (
              <li key={idx}>{err?.message?.toString()}</li>
            ))}
          </ul>
        </div>
      )}

      {/*Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            {...register("fullName")}
            className="w-full mt-1 border rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            {...register("phone")}
            type="tel"
            className="w-full mt-1 border rounded-lg p-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            {...register("address")}
            className="w-full mt-1 border rounded-lg p-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            {...register("dob")}
            type="date"
            className="w-full mt-1 border rounded-lg p-2 text-sm"
          />
        </div>

        {/*  Upload Section */}
        <div className="mt-6">
          <p className="font-medium text-gray-800 mb-2">
            Upload Required Documents ({files.length}/{requiredUploads})
          </p>
          <Dropzone
            accept={{ "image/*": [] }}
            maxSize={5 * 1024 * 1024}
            onDrop={(acceptedFiles) => setFiles(acceptedFiles)}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50"
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

        {/*  Selected Services Summary */}
        <div className="bg-gray-50 p-3 rounded-lg mt-6">
          <h3 className="text-sm font-semibold text-gray-700">Your Selected Services</h3>
          <ol className="list-decimal ml-5 text-sm mt-2 text-gray-600">
            {selectedServices.map((s, idx) => (
              <li key={idx}>{s.name} - {s.option}</li>
            ))}
          </ol>
        </div>

        {/* Submit */}
        <Button type="submit" className="mt-6 w-full">
          Proceed →
        </Button>
      </form>
    </div>
  );
}
