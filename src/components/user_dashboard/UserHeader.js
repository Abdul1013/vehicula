"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Globe, Settings } from "lucide-react";



export default function UserHeader({ user, region }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // const firstName = user.fullName.split(" ")[0];
  const photo = "/img/user.png";

  return (
    <div className="flex mt-20 flex-wrap items-center justify-between border-b pb-3 mb-4">
      {/* Left: Profile + Greeting */}
      <div className="flex items-center space-x-3">
        <Image
          src={photo}
          alt="Profile photo"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <div>
          <p className="text-sm text-gray-700">Hi, 
            {/* {firstName}! */}
            </p>
          <div className="flex items-center text-xs text-gray-500 space-x-2">
            <Globe className="w-3 h-3" />
            <span>Abuja</span>
            <Link
              href="/profile"
              className="text-blue-600 hover:underline hover:text-blue-800 transition"
            >
              Change region
            </Link>
          </div>
        </div>
      </div>

      {/* Right: Settings Menu */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
        >
          <Settings className="w-6 h-6 text-gray-600" />
        </button>

        {menuOpen && (
          <ul className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white ring-1 ring-gray-200 overflow-hidden z-20 text-sm">
            <li>
              <Link
                href="/profile"
                className="block px-4 py-2 hover:bg-gray-50"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                href="/password-update"
                className="block px-4 py-2 hover:bg-gray-50"
              >
                Password
              </Link>
            </li>
            <li>
              <Link
                href="/earnings"
                className="block px-4 py-2 hover:bg-gray-50"
              >
                Earnings
              </Link>
            </li>
            <li>
              <Link
                href="/my-account"
                className="block px-4 py-2 hover:bg-gray-50"
              >
                Switch to old dashboard
              </Link>
            </li>
            {user.role === 1 && (
              <li>
                <Link
                  href="/ag-dashboard-switch"
                  className="block px-4 py-2 hover:bg-gray-50"
                >
                  Switch Account
                </Link>
              </li>
            )}
            <li>
              <Link
                href="/logout"
                className="block px-4 py-2 text-red-600 hover:bg-red-50"
              >
                Logout
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
