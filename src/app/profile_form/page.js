"use client";
import Image from "next/image";
import { useState } from "react";

export default function ProfilePage() {
  // Mocked values (replace with API fetch or server data)
  const [profile, setProfile] = useState({
    id: "12345",
    name: "John Doe",
    email: "johndoe@email.com",
    phone: "+2348012345678",
    region: "",
    lga: "",
    address: "123 Sample Street, Lagos",
    photo: "/default-avatar.png",
  });

  const [regions] = useState([
    { id: "1", name: "Lagos" },
    { id: "2", name: "Abuja" },
  ]);
  const [lgas] = useState([
    { id: "1", name: "Ikeja" },
    { id: "2", name: "Surulere" },
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updating profile:", profile);
    alert("Profile updated successfully!");
  };

  return (
    <div className="bg-white mt-24  min-h-screen text-gray-800">
      {/* Topbar */}
      <header className="bg-primary text-green-500 py-4  shadow">
        <h1 className="text-center text-xl font-semibold">Profile</h1>
      </header>

      <main className="container mx-auto p-6 max-w-2xl">
        {/* Profile Photo */}
        <div className="flex flex-col items-center">
          <Image
            width={100}
            height={100}
            src={profile.photo}
            alt="Profile"
            className="w-32 h-32 rounded-full border border-green-400 shadow object-cover"
          />
          <button
            onClick={() => setShowUploadModal(true)}
            className="mt-3 px-4 py-1 text-sm bg-green-500 text-white rounded-full hover:bg-green-600 transition"
          >
           📷 Update Photo
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <input type="hidden" name="pID" value={profile.id} />

          {/* Name */}
          <div>
            <label className="block text-green-500 mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="w-full rounded-full border px-4 py-2 shadow focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block  text-green-500  mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              placeholder="Your email"
              required
              className="w-full rounded-full border px-4 py-2 shadow focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Phone (readonly) */}
          <div>
            <label className="block   text-green-500  mb-1 font-medium">Phone</label>
            <div className="w-full rounded-full border bg-gray-100 px-4 py-2 shadow text-gray-600">
              {profile.phone}
            </div>
          </div>

          {/* Region */}
          <div>
            <label className="block mb-1  text-green-500  font-medium">State of Residence</label>
            <select
              name="region"
              value={profile.region}
              onChange={handleChange}
              required
              className="w-full rounded-full border px-4 py-2 shadow focus:ring-2 focus:ring-green-500"
            >
              <option value="">-- Select State --</option>
              {regions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-600 mt-1 flex items-center justify-end">
              <i className="fas fa-info-circle mr-1"></i> Services are delivered
              within the selected state
            </p>
          </div>

          {/* LGA */}
          <div>
            <label className="block  text-green-500  mb-1 font-medium">LGA of Residence</label>
            <select
              name="lga"
              value={profile.lga}
              onChange={handleChange}
              required
              className="w-full rounded-full border px-4 py-2 shadow focus:ring-2 focus:ring-green-500"
            >
              <option value="">-- Select LGA --</option>
              {lgas.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-600 mt-1 flex items-center justify-end">
              <i className="fas fa-info-circle mr-1"></i> Services are delivered
              within the selected LGA
            </p>
          </div>

          {/* Address */}
          <div>
            <label   className="block text-green-500   mb-1 font-medium">Address</label>
            <textarea
              name="address"
              value={profile.address}
              onChange={handleChange}
              placeholder="Your address"
              required
              className="w-full rounded-2xl border px-4 py-3 shadow focus:ring-2 focus:ring-green-500"
              rows={3}
            />
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 rounded-full border border-green-600 text-green-600 hover:bg-green-600 hover:text-white shadow transition"
            >
              Update Profile
            </button>
          </div>
        </form>
      </main>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg">
            <div className="flex justify-between items-center border-b p-3">
              <h2 className="text-sm font-medium">Upload Profile Photo</h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              {/* Placeholder for Dropzone (replace with react-dropzone or upload API) */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center text-gray-500">
                Drag & drop or click to upload photo
              </div>
              <div className="mt-4 text-center">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
