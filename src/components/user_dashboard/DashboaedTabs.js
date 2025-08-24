//dashboard_switch_bar 
"use client";
import Link from "next/link";
import { Briefcase, Wrench, Coins } from "lucide-react";
import { usePathname } from "next/navigation";

export default function DashboardTabs({}) {
  const pathname = usePathname();

  // Determine active tab by pathname
  const getActive = (route) =>
    pathname.includes(route)
      ? "border-b-2 border-green-500 font-semibold text-green-600"
      : "text-gray-600 hover:text-gray-900";

  return (
    <div className="w-full mb-4 text-sm">
      <div className="flex gap-6 border-b border-gray-200">
        {/* Dashboard */}
        <Link href="/dashboard" className={`pb-2 flex items-center gap-1 ${getActive("/dashboard")}`}>
          <Briefcase className="w-4 h-4" />
          Dashboard
        </Link>

        {/* Services */}
        <Link href="/customer-services" className={`pb-2 flex items-center gap-1 ${getActive("/customer-services")}`}>
          <Wrench className="w-4 h-4" />
          Services
        </Link>

        {/* Loans */}
        <Link href="/loan-dashboard" className={`pb-2 flex items-center gap-1 ${getActive("/loan-dashboard")}`}>
          <Coins className="w-4 h-4" />
          Loans
        </Link>
      </div>
    </div>
  );
}
