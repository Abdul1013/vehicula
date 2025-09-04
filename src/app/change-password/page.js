// src/app/change-password/page.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    const newErrors = {};
    if (!currentPassword)
      newErrors.currentPassword = "Current password is required";
    if (!newPassword) newErrors.newPassword = "New password is required";
    else if (
      newPassword.length < 8 ||
      !/[A-Z]/.test(newPassword) ||
      !/[0-9]/.test(newPassword)
    ) {
      newErrors.newPassword =
        "Password must be 8+ characters with uppercase and numbers";
    }
    if (newPassword !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the form errors", { toastId: "form-error" });
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      console.log("Change password response:", data);

      if (!res.ok) {
        throw new Error(data.error || "Password change failed");
      }

      toast.success("Password changed successfully!", {
        toastId: "change-password-success",
      });
      console.log("Redirecting to /dashboard_form");
      router.replace("/dashboard_form");
    } catch (err) {
      console.error("Change password error:", err.message);
      toast.error(err.message, { toastId: "change-password-error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-white text-primary py-8 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md'>
        <div className='bg-white p-8 rounded-xl shadow-lg'>
          <h5 className='text-xl font-semibold text-center mb-6'>
            Change Password
          </h5>
          <form onSubmit={handleSubmit} noValidate className='space-y-4'>
            <div className='relative'>
              <label
                htmlFor='currentPassword'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Current Password <span className='text-red-500'>*</span>
              </label>
              <input
                id='currentPassword'
                name='currentPassword'
                type='password'
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, currentPassword: "" }));
                }}
                placeholder='Current Password'
                required
                disabled={isLoading}
                className={`form-control w-full px-4 py-2 rounded-full border ${
                  errors.currentPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-400"
                } focus:ring-2 focus:outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed`}
                aria-invalid={!!errors.currentPassword}
                aria-describedby={
                  errors.currentPassword ? "currentPassword-error" : undefined
                }
              />
              {errors.currentPassword && (
                <p
                  id='currentPassword-error'
                  className='mt-1 text-sm text-red-500'
                  role='alert'
                >
                  {errors.currentPassword}
                </p>
              )}
            </div>
            <div className='relative'>
              <label
                htmlFor='newPassword'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                New Password <span className='text-red-500'>*</span>
              </label>
              <input
                id='newPassword'
                name='newPassword'
                type='password'
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, newPassword: "" }));
                }}
                placeholder='New Password'
                required
                disabled={isLoading}
                className={`form-control w-full px-4 py-2 rounded-full border ${
                  errors.newPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-400"
                } focus:ring-2 focus:outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed`}
                aria-invalid={!!errors.newPassword}
                aria-describedby={
                  errors.newPassword ? "newPassword-error" : undefined
                }
              />
              {errors.newPassword && (
                <p
                  id='newPassword-error'
                  className='mt-1 text-sm text-red-500'
                  role='alert'
                >
                  {errors.newPassword}
                </p>
              )}
            </div>
            <div className='relative'>
              <label
                htmlFor='confirmPassword'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Confirm Password <span className='text-red-500'>*</span>
              </label>
              <input
                id='confirmPassword'
                name='confirmPassword'
                type='password'
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                }}
                placeholder='Confirm Password'
                required
                disabled={isLoading}
                className={`form-control w-full px-4 py-2 rounded-full border ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-400"
                } focus:ring-2 focus:outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed`}
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={
                  errors.confirmPassword ? "confirmPassword-error" : undefined
                }
              />
              {errors.confirmPassword && (
                <p
                  id='confirmPassword-error'
                  className='mt-1 text-sm text-red-500'
                  role='alert'
                >
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            <button
              type='submit'
              className='w-full px-6 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed'
              disabled={isLoading}
            >
              {isLoading ? "Changing Password..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
