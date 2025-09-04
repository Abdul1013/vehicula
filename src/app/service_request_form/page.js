// // pages/service-form.jsx
// 'use client';

// import { useState, useEffect } from 'react';

// export default function ServiceForm({ v = {}  }) {
//   const uInfo = v.u_info || {};
//   const [formData, setFormData] = useState({
//     s_full_name: v.srv_full_name || '',
//     s_phone_number: v.srv_phone_number || '',
//     s_address: v.srv_address || '',
//     s_dob: v.srv_dob || '',
//     dropzone_img_url: v.uploads_url || '',
//   });

//   const [uploadedFiles, setUploadedFiles] = useState(
//     v.uploads_url ? v.uploads_url.split(',') : []
//   );

//   const getServicesByID = v.getServicesByID || [];
//   const urlParaArr = v.url_para || {};
//   const getParaQtys = v.get_para_qts || {};

//   const [displayOpted, setDisplayOpted] = useState([]);
//   const [totalUploads, setTotalUploads] = useState(0);

//   useEffect(() => {
//     // Generate displayOpted dynamically based on PHP logic
//     let opted = [];
//     let uploadsCount = 0;

//     getServicesByID.forEach((service) => {
//       const vss_id = service.vss_id;
//       const vs_id_fk = parseInt(service.vs_id_fk);
//       let qty = getParaQtys[vss_id] || 1;
//       let qtyMarkup = qty > 1 ? ` (Qty: ${qty})` : '';
//       let toUpload = [];
//       let thisTotal = 0;

//       const checkStr = service.vss_name.toLowerCase();

//       switch (vs_id_fk) {
//         case 1:
//           if (checkStr.includes('fresh')) {
//             toUpload = ['Custom Duty', 'Purchase Receipt'];
//             thisTotal = 2 * qty;
//           } else {
//             toUpload = ['Current Vehicle License'];
//             thisTotal = 1 * qty;
//           }
//           break;
//         case 2:
//         case 5:
//         case 6:
//           toUpload = ['Current Vehicle License'];
//           thisTotal = 1 * qty;
//           break;
//         case 3:
//           toUpload = ['Current Vehicle License', 'Sales Agreement', "New Owner's Government Issued ID"];
//           thisTotal = 3 * qty;
//           break;
//         case 8:
//           if (!checkStr.includes('fresh')) {
//             if (!checkStr.includes('renewal')) {
//               toUpload = ["Current Driver's License", 'International Passport', 'Passport photo'];
//               thisTotal = 3 * qty;
//             } else {
//               toUpload = ["Current Driver's License"];
//               thisTotal = 1 * qty;
//             }
//           }
//           break;
//         default:
//           break;
//       }

//       uploadsCount += thisTotal;

//       opted.push({
//         serviceName: service.v_s_name,
//         subServiceName: service.vss_name,
//         qtyMarkup,
//         toUpload,
//       });
//     });

//     setDisplayOpted(opted);
//     setTotalUploads(uploadsCount);
//   }, [getServicesByID, getParaQtys]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Submit logic here
//     console.log('Form submitted:', formData);
//   };

//   return (
//     <div className="container mt-50  mx-auto bg-white text-primary py-6">
//       <div className="max-w-3xl mx-auto">
//         <h5 className="text-center mb-4">Provide details below</h5>

//         {/* Error Text */}
//         {v.error_txt && <div className="mb-4 text-red-600">{v.error_txt}</div>}

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           {/* Conditional Fields */}
//           {Object.keys(urlParaArr).some((key) => ['1', '9'].includes(key)) && (
//             <>
//               <div className="relative">
//                 <input
//                   type="text"
//                   name="s_full_name"
//                   value={formData.s_full_name}
//                   onChange={handleChange}
//                   className="peer block w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
//                   placeholder="Full name"
//                   required
//                 />
//                 <label className="absolute left-3 top-3 text-gray-500 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-xs">
//                   Full name
//                 </label>
//               </div>

//               {true /* replace with is_full condition logic */ && (
//                 <>
//                   <div className="relative">
//                     <input
//                       type="tel"
//                       name="s_phone_number"
//                       value={formData.s_phone_number}
//                       onChange={handleChange}
//                       className="peer block w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
//                       placeholder="Phone number"
//                       required
//                     />
//                     <label className="absolute left-3 top-3 text-gray-500 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-xs">
//                       Phone number
//                     </label>
//                   </div>

//                   <div className="relative">
//                     <input
//                       type="text"
//                       name="s_address"
//                       value={formData.s_address}
//                       onChange={handleChange}
//                       className="peer block w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
//                       placeholder="Address"
//                       required
//                     />
//                     <label className="absolute left-3 top-3 text-gray-500 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-xs">
//                       Address
//                     </label>
//                   </div>
//                 </>
//               )}

//               {!true /* else date of birth logic */ && (
//                 <div className="relative">
//                   <input
//                     type="date"
//                     name="s_dob"
//                     value={formData.s_dob}
//                     onChange={handleChange}
//                     className="peer block w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
//                     placeholder="Date of birth"
//                     required
//                   />
//                   <label className="absolute left-3 top-3 text-gray-500 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-xs">
//                     Date of birth
//                   </label>
//                 </div>
//               )}
//             </>
//           )}

//           {/* Selected Services */}
//           <div className="bg-gray-100 p-4 rounded">
//             <div className="font-semibold text-sm mb-2">Your selected services:</div>
//             <ol className="text-sm space-y-2">
//               {displayOpted.map((item, idx) => (
//                 <li key={idx}>
//                   <span>
//                     {item.serviceName} - {item.subServiceName} {item.qtyMarkup}
//                   </span>
//                   {item.toUpload.length > 0 && (
//                     <ul className="italic pl-4 mt-1 list-disc">
//                       {item.toUpload.map((upload, i) => (
//                         <li key={i}>{upload}</li>
//                       ))}
//                     </ul>
//                   )}
//                 </li>
//               ))}
//             </ol>
//           </div>

//           {/* File Uploads */}
//           {totalUploads > 0 && (
//             <div className="mt-4">
//               <div className="text-sm mb-2">
//                 <div className="bg-green-100 p-2 rounded border border-green-400 text-green-800">
//                   <i className="fas fa-info-circle mr-2"></i>
//                   You are required to upload <strong>{totalUploads} images</strong> of not more than <strong>5MB each.</strong>
//                 </div>
//               </div>
//               <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center">
//                 <p className="text-gray-500">Drag & drop files here or click to upload</p>
//                 {/* Implement Dropzone or file input */}
//                 <input
//                   type="file"
//                   multiple
//                   className="mt-2"
//                   onChange={(e) => setUploadedFiles([...uploadedFiles, ...e.target.files])}
//                 />
//               </div>
//             </div>
//           )}

//           <input type="hidden" name="send_serv_data" value="1" />
//           <input type="hidden" name="services_selected" value={v.service_list || ''} />
//           <input type="hidden" name="services_qty" value={v.service_qty || ''} />

//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-blue-700 flex items-center justify-center space-x-2"
//           >
//             <span>Proceed</span>
//             <i className="fas fa-long-arrow-alt-right"></i>
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
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

      {/* ✅ Error messages */}
      {Object.values(errors).length > 0 && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded p-3">
          <ul className="list-disc pl-5 text-sm">
            {Object.values(errors).map((err, idx) => (
              <li key={idx}>{err?.message?.toString()}</li>
            ))}
          </ul>
        </div>
      )}

      {/* ✅ Form */}
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

        {/* ✅ Upload Section */}
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

        {/* ✅ Selected Services Summary */}
        <div className="bg-gray-50 p-3 rounded-lg mt-6">
          <h3 className="text-sm font-semibold text-gray-700">Your Selected Services</h3>
          <ol className="list-decimal ml-5 text-sm mt-2 text-gray-600">
            {selectedServices.map((s, idx) => (
              <li key={idx}>{s.name} - {s.option}</li>
            ))}
          </ol>
        </div>

        {/* ✅ Submit */}
        <Button type="submit" className="mt-6 w-full">
          Proceed →
        </Button>
      </form>
    </div>
  );
}
