"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Globe, Settings } from "lucide-react";
import { useUser } from "@/context/UserContext";

export default function UserHeader({ userInfo }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { setUser } = useUser();
  const router = useRouter();

  const firstName = userInfo?.fullName?.split(" ")[0] || "";
  const firstLetter = firstName.charAt(0).toUpperCase();
  const photo = userInfo?.photo;
  const userRegion = userInfo?.region || "";

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setUser(null);
        router.push("/");
        router.refresh(); // Refresh to update Header component
      } else {
        console.error("Logout failed:", await response.json());
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
    setIsLogoutModalOpen(false);
    setMenuOpen(false);
  };

  return (
    <div className='flex mt-20 flex-wrap items-center justify-between border-b pb-3 mb-4'>
      {/* Left: Profile + Greeting */}
      <div className='flex items-center justify-center space-x-3'>
        {photo ? (
          <Image
            src={photo}
            alt='Profile photo'
            width={40}
            height={40}
            className='rounded-full object-cover border'
          />
        ) : (
          <div className='w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-white font-bold text-xl'>
            {firstLetter}
          </div>
        )}
        <div>
          <p className='text-sm text-gray-700'>Hi, {firstName}!</p>
          <div className='flex items-center text-xs text-gray-500 space-x-2'>
            <Globe className='w-3 h-3' />
            <span>{userRegion}</span>
            <Link
              href='/profile?change_region=true'
              className='text-blue-600 hover:underline hover:text-blue-800 transition'
            >
              Change region
            </Link>
          </div>
        </div>
      </div>

      {/* Right: Settings Menu */}
      <div className='relative'>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className='p-2 rounded-full hover:bg-gray-100 focus:outline-none'
        >
          <Settings className='w-6 h-6 text-gray-600' />
        </button>

        {menuOpen && (
          <ul className='absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white ring-1 ring-gray-200 overflow-hidden z-20 text-sm'>
            <li>
              <Link
                href='/profile_form'
                className='block px-4 py-2 hover:bg-gray-50'
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                href='/password_update'
                className='block px-4 py-2 hover:bg-gray-50'
              >
                Password
              </Link>
            </li>
            <li>
              <Link
                href='/earnings_form'
                className='block px-4 py-2 hover:bg-gray-50'
              >
                Earnings
              </Link>
            </li>
            <li>
              <Link
                href='/my-account'
                className='block px-4 py-2 hover:bg-gray-50'
              >
                Switch to old dashboard
              </Link>
            </li>
            {userInfo?.role === 1 && (
              <li>
                <Link
                  href='/ag-dashboard-switch'
                  className='block px-4 py-2 hover:bg-gray-50'
                >
                  Switch Account
                </Link>
              </li>
            )}
            <li>
              <button
                onClick={() => {
                  setIsLogoutModalOpen(true);
                  setMenuOpen(false);
                }}
                className='block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50'
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className='fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg p-6 max-w-sm w-full'>
            <h2 className='text-lg font-semibold mb-4'>Confirm Logout</h2>
            <p className='text-gray-600 mb-6'>
              Are you sure you want to log out?
            </p>
            <div className='flex justify-end space-x-4'>
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className='px-4 py-2 text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200'
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className='px-4 py-2 text-white bg-red-600 rounded-full hover:bg-red-700'
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
