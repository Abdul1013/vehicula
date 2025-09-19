"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    region: "",
    lga: "",
    address: "",
    photo: "/default-avatar.png",
  });
  const [isFetching, setIsFetching] = useState(true);
  const [regions, setRegions] = useState([]);
  const [lgas, setLgas] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [photoFile, setPhotoFile] = useState(null);

   // Fetch user profile and regions on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [profileRes, regionsRes] = await Promise.all([
          fetch("/api/profile"),
          fetch("/api/regions"),
        ]);

        if (profileRes.status === 401) {
          router.push("/login");
          return;
        }
        if (!profileRes.ok) throw new Error("Failed to fetch profile");
        if (!regionsRes.ok) throw new Error("Failed to fetch regions");

        const profileData = await profileRes.json();
        const regionsData = await regionsRes.json();

        setProfile(profileData.user);
        setRegions(regionsData);
      } catch (error) {
        toast.error(error.message || "Failed to load data", {
          toastId: "load-error",
        });
      } finally {
        setIsFetching(false);
      }
    };

    loadData();
  }, [router]);

  // Fetch LGAs when region changes
  useEffect(() => {
    if (profile?.region) {
      const fetchLgas = async () => {
        try {
          const response = await fetch(
            `/api/lgas?region=${encodeURIComponent(profile.region)}`
          );
          if (!response.ok) throw new Error("Failed to fetch LGAs");
          const data = await response.json();
          setLgas(data);
        } catch (error) {
          toast.error("Failed to load LGAs", { toastId: "lgas-error" });
        }
      };
      fetchLgas();
    } else {
      setLgas([]);
    }
  }, [profile?.region]);

  // Show loader until fetching done
  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  const validateForm = () => {
    const newErrors = {};
    if (!profile.name) newErrors.name = "Name is required";
    if (!profile.region) newErrors.region = "State is required";
    if (!profile.lga) newErrors.lga = "LGA is required";
    if (!profile.address) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setProfile((prev) => ({ ...prev, photo: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the form errors", { toastId: "form-error" });
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("pID", profile.id);
      formData.append("name", profile.name);
      formData.append("region", profile.region);
      formData.append("lga", profile.lga);
      formData.append("address", profile.address);
      if (photoFile) {
        formData.append("photo", photoFile);
      }

      const response = await fetch("/api/profile", {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        if (response.status === 401) {
          router.push("/login"); // Redirect to login if unauthorized
          return;
        }
        throw new Error(data.error || "Failed to update profile");
      }

      setProfile(data.user); // Update local state with new data
      setPhotoFile(null); // Clear photo file
      if (localStorage.getItem("userCache")) {
        console.log("Clearing userCache after profile update");
        localStorage.removeItem("userCache");
      }
      toast.success("Profile updated successfully!", {
        toastId: "profile-success",
      });
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(error.message, { toastId: "profile-error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-white mt-24 min-h-screen text-gray-800'>
      {/* Topbar */}
      <header className='bg-primary text-green-500 py-1'>
        <h1 className='text-center text-xl font-semibold'>Profile</h1>
      </header>

      <main className='container mx-auto p-6 max-w-2xl'>
        {/* Profile Photo */}
        <div className='flex flex-col items-center'>
          <Image
            width={100}
            height={100}
            src={profile.photo}
            alt='Profile'
            className='w-32 h-32 rounded-full border border-green-400 shadow object-cover'
          />
          <button
            onClick={() => setShowUploadModal(true)}
            className='mt-3 px-4 py-1 text-sm bg-green-500 text-white rounded-full hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed'
            disabled={isLoading}
          >
            📷 Update Photo
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='mt-6 space-y-6' noValidate>
          <input type='hidden' name='pID' value={profile.id} />

          {/* Name */}
          <div>
            <label className='block text-green-500 mb-1 font-medium'>
              Name
            </label>
            <input
              type='text'
              name='name'
              value={profile.name}
              onChange={handleChange}
              placeholder='Your name'
              required
              className={`w-full rounded-full border px-4 py-2 shadow focus:ring-2 focus:ring-green-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isLoading}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p id='name-error' className='mt-1 text-sm text-red-500'>
                {errors.name}
              </p>
            )}
          </div>

          {/* Email (readonly) */}
          <div>
            <label className='block text-green-500 mb-1 font-medium'>
              Email
            </label>
            <div className='w-full rounded-full border bg-gray-100 px-4 py-2 shadow text-gray-600'>
              {profile.email}
            </div>
          </div>

          {/* Phone (readonly) */}
          <div>
            <label className='block text-green-500 mb-1 font-medium'>
              Phone
            </label>
            <div className='w-full rounded-full border bg-gray-100 px-4 py-2 shadow text-gray-600'>
              {profile.phone}
            </div>
          </div>

          {/* Region */}
          <div>
            <label className='block text-green-500 mb-1 font-medium'>
              State of Residence
            </label>
            <select
              name='region'
              value={profile.region}
              onChange={handleChange}
              required
              className={`w-full rounded-full border px-4 py-2 shadow focus:ring-2 focus:ring-green-500 ${
                errors.region ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isLoading}
              aria-invalid={!!errors.region}
              aria-describedby={errors.region ? "region-error" : undefined}
            >
              <option value=''>-- Select State --</option>
              {regions.map((r) => (
                <option key={r.reg_id} value={r.reg_label}>
                  {r.reg_label}
                </option>
              ))}
            </select>
            {errors.region && (
              <p id='region-error' className='mt-1 text-sm text-red-500'>
                {errors.region}
              </p>
            )}
            <p className='text-sm text-gray-600 mt-1 flex items-center justify-end'>
              <i className='fas fa-info-circle mr-1'></i> Services are delivered
              within the selected state
            </p>
          </div>

          {/* LGA */}
          <div>
            <label className='block text-green-500 mb-1 font-medium'>
              LGA of Residence
            </label>
            <select
              name='lga'
              value={profile.lga}
              onChange={handleChange}
              required
              className={`w-full rounded-full border px-4 py-2 shadow focus:ring-2 focus:ring-green-500 ${
                errors.lga ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isLoading || !profile.region}
              aria-invalid={!!errors.lga}
              aria-describedby={errors.lga ? "lga-error" : undefined}
            >
              <option value=''>-- Select LGA --</option>
              {lgas.map((l) => (
                <option key={l.id} value={l.name}>
                  {l.name}
                </option>
              ))}
            </select>
            {errors.lga && (
              <p id='lga-error' className='mt-1 text-sm text-red-500'>
                {errors.lga}
              </p>
            )}
            <p className='text-sm text-gray-600 mt-1 flex items-center justify-end'>
              <i className='fas fa-info-circle mr-1'></i> Services are delivered
              within the selected LGA
            </p>
          </div>

          {/* Address */}
          <div>
            <label className='block text-green-500 mb-1 font-medium'>
              Address
            </label>
            <textarea
              name='address'
              value={profile.address}
              onChange={handleChange}
              placeholder='Your address'
              required
              className={`w-full rounded-2xl border px-4 py-3 shadow focus:ring-2 focus:ring-green-500 ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              rows={3}
              disabled={isLoading}
              aria-invalid={!!errors.address}
              aria-describedby={errors.address ? "address-error" : undefined}
            />
            {errors.address && (
              <p id='address-error' className='mt-1 text-sm text-red-500'>
                {errors.address}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className='text-center'>
            <button
              type='submit'
              className='px-6 py-2 rounded-full border border-green-600 text-green-600 hover:bg-green-600 hover:text-white shadow transition disabled:bg-gray-400 disabled:cursor-not-allowed'
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </main>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className='fixed inset-0 bg-black/25 bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-xl shadow-lg w-full max-w-lg'>
            <div className='flex justify-between items-center border-b p-3'>
              <h2 className='text-sm font-medium'>Upload Profile Photo</h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className='text-gray-500 hover:text-gray-700'
              >
                ✕
              </button>
            </div>
            <div className='p-6'>
              <input
                type='file'
                accept='image/jpeg,image/png'
                onChange={handlePhotoChange}
                className='w-full border-2 border-dashed border-gray-300 rounded-lg p-10 text-center text-gray-500'
                disabled={isLoading}
              />
              <div className='mt-4 text-center'>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className='px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed'
                  disabled={isLoading}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
