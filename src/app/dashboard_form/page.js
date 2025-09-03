"use client";
import React, { useState, useEffect } from "react";
import {
  AlertCircle,
  Briefcase,
  Wrench,
  Coins,
  CheckCircle,
} from "lucide-react"; // for icons
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import ServicesDashboard from "@/components/user_dashboard/ServicesDashboard";
import UserHeader from "@/components/user_dashboard/UserHeader";
import DashBoardPage from "@/components/user_dashboard/DashBoardTemplate";
// import ChangeOfOwnership from "@/components/user_dashboard/changeOfOwnership";
import DashboardTabs from "@/components/user_dashboard/DashboaedTabs";
import LoanDashboard from "@/components/user_dashboard/LoanDashboard";

export default function Dashboard() {
  // === Placeholder backend data (replace with API calls later) ===
  const [userInfo, setUserInfo] = useState({
    phoneVerified: false,
    emailVerified: false,
  });
  const [hasServices, setHasServices] = useState(true);
  const [dashboardView, setDashboardView] = useState("default");
  const [paidOffData, setPaidOffData] = useState(null);

  useEffect(() => {
    // Simulate backend fetch
    setUserInfo({
      phoneVerified: false,
      emailVerified: true,
    });
    setHasServices(true);
    setDashboardView("services");
  }, []);

  const renderDashboardContent = () => {
    switch (dashboardView) {
      case "services":
        return <ServicesDashboard />;
      case "loans":
        if (paidOffData) {
          return (
            <Card className="shadow-md rounded-2xl p-4">
              <h2 className="text-lg font-semibold mb-2">Loan History</h2>
              <p className="text-gray-600">
                [Placeholder: loan_history_template]
              </p>
            </Card>
          );
        }
        return (
          <LoanDashboard/>
        );
      default:
        return <DashBoardPage />;
    }
  };

  return (
    <div className="bg-white min-h-screen py-6 px-4">
      {/* === Topbar Placeholder === */}
      <UserHeader />

      {/* === Verification Alert === */}
      {!userInfo.phoneVerified && (
        <div className="flex items-center mb-4 p-3 border border-yellow-400 bg-yellow-50 rounded-lg">
          <AlertCircle className="text-yellow-600 mr-2" />
          <span className="text-yellow-700 text-sm">
            Your phone number is not verified.{" "}
            <a href="/verify-cred?type=1" className="underline">
              Click here to verify
            </a>
          </span>
        </div>
      )}

      {/* === Switch Tabs === */}
      {hasServices && (
        <div className="flex gap-3 mb-5">
          <Button
            variant={dashboardView === "default" ? "default" : "outline"}
            onClick={() => setDashboardView("default")}
          >
            <Briefcase className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
          <Button
            variant={dashboardView === "services" ? "default" : "outline"}
            onClick={() => setDashboardView("services")}
          >
            <Wrench className="w-4 h-4 mr-2" />
            Services
          </Button>
          <Button
            variant={dashboardView === "loans" ? "default" : "outline"}
            onClick={() => setDashboardView("loans")}
          >
            <Coins className="w-4 h-4 mr-2" />
            Loans
          </Button>
        </div>
      )}
    
      {/* === Main Dashboard Content === */}
      {hasServices ? (
        renderDashboardContent()
      ) : (
        <Card className="shadow-md rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-2">Services</h2>
          <p className="text-gray-600">[Placeholder: services_template]</p>
        </Card>
      )}
    </div>
  );
}
