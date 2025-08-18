// pages/login-switch.js
import Link from "next/link";
import { User, UserCheck } from "lucide-react";

export default function LoginSwitch() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-sm w-full">
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h2 className="text-lg font-semibold mb-6 text-gray-700">
            Log me in as:
          </h2>
          <Link href="/ag-dashboard-switch?type=1" legacyBehavior>
            <button className="w-full mb-3 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all">
              <UserCheck className="w-5 h-5" />
              Agent
            </button>
          </Link>

          <Link href="/dashboard" legacyBehavior>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all">
              <User className="w-5 h-5" />
              Customer
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
