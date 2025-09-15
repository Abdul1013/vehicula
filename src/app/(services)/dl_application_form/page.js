"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Dropzone from "react-dropzone";
import Button from "@/components/ui/button";
import { Suspense } from "react";
import { FaTrash } from "react-icons/fa";

// Dynamic Zod schema based on subtype
const getSchema = (serviceName) => {
  console.log("getSchema - serviceName:", serviceName); // Debug
  const baseSchema = {
    service_id: z.string().min(1, "Service ID is required"),
    service_name: z.string().optional(),
    duration: z.string().optional(),
    price: z.number().min(0, "Price must be a positive number"),
  };

  if (serviceName && serviceName.includes("Fresh")) {
    return z.object({
      ...baseSchema,
      first_name: z.string().min(1, "First name is required"),
      surname: z.string().min(1, "Surname is required"),
      other_name: z.string().optional(),
      mother_maiden_name: z.string().optional(),
      date_of_birth: z.string().min(1, "Date of birth is required"),
      facial_mark: z.string().optional(),
      blood_group: z.string().min(1, "Blood group is required"),
      any_form_of_disability: z.string().optional(),
      height: z.string().optional(),
      next_of_kin_phone_number: z.string().optional(),
      state_of_origin: z.string().min(1, "State of origin is required"),
      local_government: z.string().min(1, "Local government is required"),
      address: z.string().min(1, "Address is required"),
      phone_number: z
        .string()
        .regex(/^\d{10,15}$/, "Invalid phone number format"),
      email_address: z
        .string()
        .email("Invalid email address")
        .optional()
        .or(z.literal("")),
      nin: z.string().regex(/^\d{11}$/, "NIN must be 11 digits"),
      sex: z.enum(["Male", "Female"], { message: "Sex is required" }),
      licence_class: z.enum(["A", "B", "C", "D", "E", "F", "G", "H", "I"], {
        message: "License class is required",
      }),
    });
  }
  return z.object(baseSchema);
};

// File requirements based on subtype
const getFileRequirements = (serviceName) => {
  console.log("getFileRequirements - serviceName:", serviceName); // Debug
  if (serviceName && serviceName.includes("Fresh")) {
    return { count: 0, names: [] };
  } else if (serviceName && serviceName.includes("Renewal")) {
    return { count: 1, names: ["Previous Driver's License"] };
  } else if (serviceName && serviceName.includes("International")) {
    return {
      count: 3,
      names: [
        "Current Driver's License",
        "International Passport",
        "Passport Photo",
      ],
    };
  }
  return { count: 0, names: [], error: "Invalid service type" };
};

function DLicenseApplication() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceName = searchParams.get("name") || "";
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(
    "DLicenseApplication - searchParams:",
    Object.fromEntries(searchParams)
  ); // Debug

  const fileRequirements = useMemo(
    () => getFileRequirements(serviceName),
    [serviceName]
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(getSchema(serviceName)),
    defaultValues: {
      first_name: "",
      surname: "",
      other_name: "",
      mother_maiden_name: "",
      date_of_birth: "",
      facial_mark: "",
      blood_group: "",
      any_form_of_disability: "",
      height: "",
      next_of_kin_phone_number: "",
      state_of_origin: "",
      local_government: "",
      address: "",
      phone_number: "",
      email_address: "",
      nin: "",
      sex: "",
      licence_class: "B",
      service_id: searchParams.get("id") || "",
      service_name: serviceName,
      duration: searchParams.get("duration") || "",
      price: parseFloat(searchParams.get("price")) || 0,
    },
  });

  // Prefill form for Fresh licenses
  useEffect(() => {
    if (serviceName.includes("Fresh")) {
      async function fetchUserData() {
        try {
          const response = await fetch("/api/user", { credentials: "include" });
          if (!response.ok) throw new Error("Failed to fetch user data");
          const user = await response.json();
          setValue("email_address", user.email || "");
          setValue("phone_number", user.phone || "");
          setValue("address", user.address || "");
          setValue(
            "first_name",
            user.fullName ? user.fullName.split(" ")[0] : ""
          );
          setValue(
            "surname",
            user.fullName ? user.fullName.split(" ").slice(1).join(" ") : ""
          );
          console.info("User data fetched for form", { userId: user.id });
        } catch (err) {
          console.warn("Error fetching user data", { error: err.message });
          setError("Failed to load user data");
        }
      }
      fetchUserData();
    }
  }, [setValue, serviceName]);

  // Remove a specific file
  const removeFile = (fileName) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);

    if (fileRequirements.error) {
      setError("Invalid service type selected");
      setLoading(false);
      return;
    }

    if (fileRequirements.count > 0 && files.length !== fileRequirements.count) {
      setError(
        `Please upload exactly ${fileRequirements.count} document(s): ${fileRequirements.names.join(", ")}`
      );
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) =>
        formData.append(key, value)
      );
      files.forEach((file, index) => formData.append(`file${index}`, file));

      const response = await fetch("/api/dl_application", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error);
      }

      const { applicationId, paymentRef, vsr_id } = await response.json();
      console.info("Form submitted successfully", {
        applicationId,
        paymentRef,
        vsr_id,
      });
      router.push(
        `/payment_options?application_id=${applicationId}&payment_ref=${paymentRef}&price=${data.price}&vsr_id=${vsr_id}`
      );
    } catch (err) {
      console.warn("Error submitting form", { error: err.message });
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen mt-32 bg-white text-gray-900'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='max-w-2xl mx-auto mt-8 space-y-6'
      >
        <div className='bg-gray-50 border border-green-400 rounded p-4'>
          <h3 className='text-lg font-semibold text-gray-700'>
            {serviceName || "Unknown Service"}
          </h3>
          <p className='text-gray-800 font-medium mt-1'>
            ₦{parseFloat(searchParams.get("price") || 0).toLocaleString()}
          </p>
        </div>

        {error && (
          <div className='bg-red-50 border border-red-200 text-red-700 rounded p-3'>
            {error}
          </div>
        )}

        {Object.values(errors).length > 0 && (
          <div className='bg-red-50 border border-red-200 text-red-700 rounded p-3'>
            <ul className='list-disc pl-5 text-sm'>
              {Object.values(errors).map((err, idx) => (
                <li key={idx}>{err.message}</li>
              ))}
            </ul>
          </div>
        )}

        {serviceName && serviceName.includes("Fresh") ? (
          <div className='space-y-4'>
            <h4 className='text-lg font-medium text-gray-700'>
              Personal Information
            </h4>
            {[
              { label: "First Name*", name: "first_name", required: true },
              { label: "Surname*", name: "surname", required: true },
              { label: "Other Name", name: "other_name" },
              { label: "Mother Maiden Name", name: "mother_maiden_name" },
              {
                label: "Date of Birth*",
                name: "date_of_birth",
                type: "date",
                required: true,
              },
              { label: "Facial Mark", name: "facial_mark" },
              { label: "Blood Group*", name: "blood_group", required: true },
              {
                label: "Any Form of Disability?",
                name: "any_form_of_disability",
              },
              { label: "Height", name: "height" },
              {
                label: "Next of Kin Phone Number",
                name: "next_of_kin_phone_number",
              },
              {
                label: "State of Origin*",
                name: "state_of_origin",
                required: true,
              },
              {
                label: "Local Government*",
                name: "local_government",
                required: true,
              },
              { label: "Address*", name: "address", required: true },
              { label: "Phone Number*", name: "phone_number", required: true },
              { label: "Email Address", name: "email_address" },
              { label: "NIN*", name: "nin", type: "text", required: true },
            ].map(({ label, name, type = "text", required }) => (
              <div key={name}>
                <label
                  htmlFor={name}
                  className='block mb-1 font-medium text-gray-700'
                >
                  {label}
                </label>
                <input
                  {...register(name)}
                  type={type}
                  id={name}
                  required={required}
                  className='w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                  placeholder={`Enter ${label.replace("*", "")}`}
                />
              </div>
            ))}
            <div>
              <label
                htmlFor='sex'
                className='block mb-1 font-medium text-gray-700'
              >
                Sex*
              </label>
              <select
                {...register("sex")}
                id='sex'
                className='w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
              >
                <option value=''>Select Sex</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
              </select>
            </div>
            <div>
              <label
                htmlFor='licence_class'
                className='block mb-1 font-medium text-gray-700'
              >
                License Class*
              </label>
              <select
                {...register("licence_class")}
                id='licence_class'
                className='w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
              >
                <option value=''>Select license class</option>
                <option value='A'>A - Motorcycle</option>
                <option value='B'>
                  B - Motor vehicle of less than 3 tonnes gross weight
                </option>
                <option value='C'>
                  C - A motor vehicle of less than 3 tonnes gross weight
                </option>
                <option value='D'>
                  D - Motor vehicle other than motorcycle
                </option>
                <option value='E'>E - Motor vehicle (not articulated)</option>
                <option value='F'>
                  F - Agricultural machines and tractors
                </option>
                <option value='G'>G - Articulated vehicles</option>
                <option value='H'>H - Earth moving vehicles</option>
                <option value='I'>
                  I - Special, for physically handicapped persons
                </option>
              </select>
            </div>
          </div>
        ) : fileRequirements.count > 0 ? (
          <div className='mt-6'>
            <p className='font-medium text-gray-800 mb-2'>
              Upload Required Documents ({files.length}/{fileRequirements.count}
              )
            </p>
            <p className='text-sm text-gray-600 mb-2'>
              Required: {fileRequirements.names.join(", ")}
            </p>
            <Dropzone
              accept={{
                "image/*": [".png", ".jpg", ".jpeg"],
                "application/pdf": [".pdf"],
              }}
              maxSize={5 * 1024 * 1024}
              onDrop={(acceptedFiles) => {
                const newFiles = [...files, ...acceptedFiles].slice(
                  0,
                  fileRequirements.count
                );
                setFiles(newFiles);
              }}
              disabled={files.length >= fileRequirements.count}
            >
              {({ getRootProps, getInputProps, isDragActive }) => (
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50
                    ${files.length >= fileRequirements.count ? "bg-gray-200 cursor-not-allowed" : "border-green-400"}`}
                  aria-disabled={files.length >= fileRequirements.count}
                >
                  <input {...getInputProps()} />
                  <p className='text-sm text-gray-500'>
                    {files.length >= fileRequirements.count
                      ? `Maximum ${fileRequirements.count} file(s) reached`
                      : isDragActive
                        ? "Drop the files here"
                        : "Drag & drop files here, or click to upload"}
                  </p>
                </div>
              )}
            </Dropzone>
            {files.length > 0 && (
              <ul className='mt-4 space-y-2'>
                {files.map((file) => (
                  <li
                    key={file.name}
                    className='flex items-center justify-between text-sm text-gray-600 bg-gray-50 p-2 rounded'
                  >
                    <span>{file.name}</span>
                    <button
                      type='button'
                      onClick={() => removeFile(file.name)}
                      className='text-red-500 hover:text-red-700'
                      aria-label={`Remove ${file.name}`}
                    >
                      <FaTrash className='h-4 w-4' />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div className='bg-yellow-50 border border-yellow-200 text-yellow-700 rounded p-3'>
            Invalid or unrecognized service type. Please select a valid service.
          </div>
        )}

        <Button
          type='submit'
          className='mt-6 mb-10 hover:bg-green-700 bg-green-600 w-full text-white py-2 rounded-lg'
          disabled={loading}
        >
          {loading ? "Submitting..." : "Proceed →"}
        </Button>
      </form>
    </div>
  );
}

export default function LicenseApplication() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DLicenseApplication />
    </Suspense>
  );
}
