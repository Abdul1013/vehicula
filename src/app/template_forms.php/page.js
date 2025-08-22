// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";

// export default function AddVehicle({ formFields = {}, errorTxt = "", backLink = "" }) {
//   const [plate, setPlate] = useState(formFields.plate || "");
//   const [plate1, setPlate1] = useState(formFields.plate1 || "");
//   const [category, setCategory] = useState(formFields.category || "");
//   const [type, setType] = useState(formFields.type || "");
//   const [vehicleTypes, setVehicleTypes] = useState([]);
//   const [vehicleCategories, setVehicleCategories] = useState([]);

// //    const [type, setType] = useState("document"); // default page type
//   const [formData, setFormData] = useState({
//     plate: "",
//     documentType: "",
//     paymentAmount: "",
//     file: null,
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: files ? files[0] : value,
//     }));
//   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     console.log("Form submitted:", formData);
// //     alert("Form submitted successfully!");
// //   };

//   const addRecordId = formFields.id || "";

//   const formCaption = addRecordId
//     ? "Update vehicle details"
//     : formFields.added
//     ? "Add another vehicle"
//     : "Add vehicle details";

//   useEffect(() => {
//     async function fetchData() {
//       const types = await getVehicleTypes();
//       const categories = await getVehicleCategories();
//       setVehicleTypes(types);
//       setVehicleCategories(categories);
//     }
//     fetchData();
//   }, []);

//   function handleSubmit(e) {
//     e.preventDefault();
//     console.log({ plate, plate1, category, type, addRecordId });
//     // Replace with your API call
//   }

//   return (
//     <div className="container-xxl bg-white text-primary px-3 py-4">
//       {errorTxt && <div className="text-center text-red-600 font-medium mb-4">{errorTxt}</div>}

//       <div className="flex justify-center mb-4">
//         <Link href={`/my-account${backLink}`} className="flex items-center text-blue-600 hover:underline">
//           <i className="fas fa-long-arrow-alt-left mr-2"></i> Back
//         </Link>
//       </div>

//       <div className="max-w-lg mx-auto">
//         <div className="bg-white border rounded shadow p-6">
//           <h2 className="text-center text-xl font-semibold mb-4">{formCaption}</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label htmlFor="txtPlateNumber" className="block font-medium mb-1">
//                 Vehicle Plate Number
//               </label>
//               <input
//                 type="password"
//                 id="txtPlateNumber"
//                 name="txtPlateNumber"
//                 placeholder="Enter Vehicle Plate Number"
//                 value={plate}
//                 onChange={(e) => setPlate(e.target.value)}
//                 required
//                 className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label htmlFor="txtPlateNumber1" className="block font-medium mb-1">
//                 Re-enter Plate Number
//               </label>
//               <input
//                 type="text"
//                 id="txtPlateNumber1"
//                 name="txtPlateNumber1"
//                 placeholder="Re-enter Vehicle Plate Number"
//                 value={plate1}
//                 onChange={(e) => setPlate1(e.target.value)}
//                 required
//                 className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label htmlFor="txtVehicleCategory" className="block font-medium mb-1">
//                 Vehicle Category
//               </label>
//               <select
//                 id="txtVehicleCategory"
//                 name="txtVehicleCategory"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 required
//                 className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select vehicle category</option>
//                 {vehicleCategories.map((cat) => (
//                   <option key={cat.v_cat_id} value={cat.v_cat_id}>
//                     {cat.v_cat_name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label htmlFor="txtVehicleType" className="block font-medium mb-1">
//                 Vehicle Type
//               </label>
//               <select
//                 id="txtVehicleType"
//                 name="txtVehicleType"
//                 value={type}
//                 onChange={(e) => setType(e.target.value)}
//                 required
//                 className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select vehicle type</option>
//                 {vehicleTypes.map((vt) => (
//                   <option key={vt.v_type_id} value={vt.v_type_id}>
//                     {vt.v_type_name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="text-center">
//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 transition"
//               >
//                 {formCaption}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
//         <h1 className="text-2xl font-semibold mb-6 text-center">Vehicle Portal</h1>

//         {/* Navigation Tabs */}
//         <div className="flex justify-center space-x-4 mb-6">
//           {["document", "pay", "product-pay", "service-pay", "callback"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setType(tab)}
//               className={`px-4 py-2 rounded-full font-medium transition ${
//                 type === tab
//                   ? "bg-blue-600 text-white shadow"
//                   : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//               }`}
//             >
//               {tab.replace("-", " ").toUpperCase()}
//             </button>
//           ))}
//         </div>

//         {/* Conditional Forms */}
//         {type === "document" && (
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <label className="block">
//               <span className="text-gray-700">Plate Number</span>
//               <input
//                 type="text"
//                 name="plate"
//                 value={formData.plate}
//                 onChange={handleChange}
//                 placeholder="Enter plate number"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                 required
//               />
//             </label>

//             <label className="block">
//               <span className="text-gray-700">Document Type</span>
//               <select
//                 name="documentType"
//                 value={formData.documentType}
//                 onChange={handleChange}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                 required
//               >
//                 <option value="">Select document</option>
//                 <option value="insurance">Insurance</option>
//                 <option value="license">License</option>
//                 <option value="registration">Registration</option>
//               </select>
//             </label>

//             <label className="block">
//               <span className="text-gray-700">Upload Document</span>
//               <input
//                 type="file"
//                 name="file"
//                 onChange={handleChange}
//                 className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                 required
//               />
//             </label>

//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
//             >
//               Submit Document
//             </button>
//           </form>
//         )}

//         {type === "pay" && (
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <p className="text-gray-700 mb-2">Plate Number: <span className="font-medium">{formData.plate || "N/A"}</span></p>
//             <p className="text-gray-700 mb-2">Outstanding Balance: <span className="font-medium text-red-600">₦50,000</span></p>

//             <label className="block">
//               <span className="text-gray-700">Payment Amount</span>
//               <input
//                 type="number"
//                 name="paymentAmount"
//                 value={formData.paymentAmount}
//                 onChange={handleChange}
//                 placeholder="Enter amount"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                 required
//               />
//             </label>

//             <button
//               type="submit"
//               className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
//             >
//               Make Payment
//             </button>
//           </form>
//         )}

//         {(type === "product-pay" || type === "service-pay") && (
//           <div className="text-center text-gray-700">
//             <p className="mb-4 font-medium">Feature for {type.replace("-", " ")}</p>
//             <p className="text-gray-500">Form and payment details will appear here.</p>
//           </div>
//         )}

//         {type === "callback" && (
//           <div className="text-center py-10">
//             <div className="inline-block bg-green-100 p-6 rounded-full mb-4">
//               <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//               </svg>
//             </div>
//             <h2 className="text-xl font-semibold mb-2">Payment Successful!</h2>
//             <p className="text-gray-600 mb-4">Thank you for your payment.</p>
//             <Link href="/" className="text-blue-600 hover:underline">
//               Go Back Home
//             </Link>
//           </div>
//         )}
//       </div>
// // Dummy API functions
// async function getVehicleTypes() {
//   return [
//     { v_type_id: "1", v_type_name: "Sedan" },
//     { v_type_id: "2", v_type_name: "SUV" },
//   ];
// }

// async function getVehicleCategories() {
//   return [
//     { v_cat_id: "1", v_cat_name: "Private" },
//     { v_cat_id: "2", v_cat_name: "Commercial" },
//   ];
// }
"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function AccountPage() {
  const searchParams = useSearchParams();
  const opt = searchParams.get("opt");

  // Shared state for forms
  const [vehicleForm, setVehicleForm] = useState({
    plate: "",
    plate1: "",
    category: "",
    type: "",
    id: "",
  });

  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
  });

  const [serviceForm, setServiceForm] = useState({
    name: "",
    description: "",
    price: "",
  });

  const [documentForm, setDocumentForm] = useState({
    name: "",
    file: null,
  });

  const handleChange = (formSetter) => (e) => {
    const { name, value, files } = e.target;
    formSetter((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (formName) => (e) => {
    e.preventDefault();
    console.log(formName);
    alert(`Submitting ${formName}...`);
  };

  // Options for dropdowns
  const vehicleTypes = [
    { id: "1", name: "Car" },
    { id: "2", name: "Truck" },
  ];
  const vehicleCategories = [
    { id: "A", name: "Private" },
    { id: "B", name: "Commercial" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      {/* Top Bar */}
      <header className="bg-white shadow py-4 px-6">
        <h1 className="text-xl font-semibold text-center">Account Dashboard</h1>
      </header>

      <main className="container mx-auto p-4">
        {/* Back Button */}
        <div className="mb-4">
          <a href="/account" className="text-blue-600 hover:underline flex items-center gap-2">
            <i className="fas fa-long-arrow-alt-left"></i> Back
          </a>
        </div>

        {/* Conditional Sections */}
        {opt === "add-vehicle" && (
          <div className="bg-white shadow rounded-lg p-6 max-w-xl mx-auto">
            <h2 className="text-center text-xl font-semibold mb-6">Add Vehicle</h2>
            <form onSubmit={handleSubmit("vehicle")} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Vehicle Plate Number</label>
                <input
                  type="text"
                  name="plate"
                  value={vehicleForm.plate}
                  onChange={handleChange(setVehicleForm)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Re-enter Plate Number</label>
                <input
                  type="text"
                  name="plate1"
                  value={vehicleForm.plate1}
                  onChange={handleChange(setVehicleForm)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Vehicle Category</label>
                <select
                  name="category"
                  value={vehicleForm.category}
                  onChange={handleChange(setVehicleForm)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select category</option>
                  {vehicleCategories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Vehicle Type</label>
                <select
                  name="type"
                  value={vehicleForm.type}
                  onChange={handleChange(setVehicleForm)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select type</option>
                  {vehicleTypes.map((t) => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>
              <div className="text-center">
                <button className="bg-blue-600 text-white rounded px-6 py-2 hover:bg-blue-700 transition">
                  Add Vehicle
                </button>
              </div>
            </form>
          </div>
        )}

        {opt === "add-product" && (
          <div className="bg-white shadow rounded-lg p-6 max-w-xl mx-auto">
            <h2 className="text-center text-xl font-semibold mb-6">Add Product</h2>
            <form onSubmit={handleSubmit("product")} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={productForm.name}
                  onChange={handleChange(setProductForm)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Description</label>
                <textarea
                  name="description"
                  value={productForm.description}
                  onChange={handleChange(setProductForm)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Price</label>
                <input
                  type="number"
                  name="price"
                  value={productForm.price}
                  onChange={handleChange(setProductForm)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="text-center">
                <button className="bg-green-600 text-white rounded px-6 py-2 hover:bg-green-700 transition">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        )}

        {opt === "add-service" && (
          <div className="bg-white shadow rounded-lg p-6 max-w-xl mx-auto">
            <h2 className="text-center text-xl font-semibold mb-6">Add Service</h2>
            <form onSubmit={handleSubmit("service")} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Service Name</label>
                <input
                  type="text"
                  name="name"
                  value={serviceForm.name}
                  onChange={handleChange(setServiceForm)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Description</label>
                <textarea
                  name="description"
                  value={serviceForm.description}
                  onChange={handleChange(setServiceForm)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Price</label>
                <input
                  type="number"
                  name="price"
                  value={serviceForm.price}
                  onChange={handleChange(setServiceForm)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div className="text-center">
                <button className="bg-purple-600 text-white rounded px-6 py-2 hover:bg-purple-700 transition">
                  Add Service
                </button>
              </div>
            </form>
          </div>
        )}

        {opt === "add-document" && (
          <div className="bg-white shadow rounded-lg p-6 max-w-xl mx-auto">
            <h2 className="text-center text-xl font-semibold mb-6">Upload Document</h2>
            <form onSubmit={handleSubmit("document")} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Document Name</label>
                <input
                  type="text"
                  name="name"
                  value={documentForm.name}
                  onChange={handleChange(setDocumentForm)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Select File</label>
                <input
                  type="file"
                  name="file"
                  onChange={handleChange(setDocumentForm)}
                  className="w-full"
                  required
                />
              </div>
              <div className="text-center">
                <button className="bg-yellow-500 text-white rounded px-6 py-2 hover:bg-yellow-600 transition">
                  Upload Document
                </button>
              </div>
            </form>
          </div>
        )}

        {(opt === "pay" || opt === "product-pay" || opt === "service-pay") && (
          <div className="bg-white shadow rounded-lg p-6 max-w-md mx-auto text-center">
            <h2 className="text-xl font-semibold mb-4">Payment</h2>
            <p className="mb-4">
              {opt === "pay"
                ? "Pay for Vehicle"
                : opt === "product-pay"
                ? "Pay for Product"
                : "Pay for Service"}
            </p>
            <button className="bg-blue-600 text-white rounded px-6 py-2 hover:bg-blue-700 transition">
              Proceed to Pay
            </button>
          </div>
        )}

        {opt === "callback" && (
          <div className="bg-green-50 border border-green-400 text-green-700 p-4 max-w-md mx-auto text-center rounded">
            <h2 className="text-lg font-semibold mb-2">Callback Received</h2>
            <p>Thank you! Your transaction has been processed successfully.</p>
          </div>
        )}
      </main>
    </div>
  );
}
