"use client"
import React, { useState, useEffect } from "react";
import { AlertCircle, CheckCircle } from "lucide-react"; // for icons
import Card from "@/components/ui/card"
import Button  from "@/components/ui/button";
import ServicesDashboard from "@/components/user_dashboard/ServicesDashboard";

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
        return (
         <ServicesDashboard/>
        );
      case "loans":
        if (paidOffData) {
          return (
            <Card className="shadow-md rounded-2xl p-4">
              
                <h2 className="text-lg font-semibold mb-2">Loan History</h2>
                <p className="text-gray-600">[Placeholder: loan_history_template]</p>
           
            </Card>
          );
        }
        return (
          <Card className="shadow-md rounded-2xl p-4">
            
              <h2 className="text-lg font-semibold mb-2">Loan Dashboard</h2>
              <p className="text-gray-600">[Placeholder: loan_dashboard_template]</p>
         
          </Card>
        );
      default:
        return (
          <Card className="shadow-md rounded-2xl p-4">
            
              <h2 className="text-lg font-semibold mb-2">Overview</h2>
              <p className="text-gray-600">[Placeholder: dashboard_template]</p>
            
          </Card>
        );
    }
  };

  return (
    <div className="bg-white min-h-screen py-6 px-4">
      {/* === Topbar Placeholder === */}
      <header className="border-b mb-6 pb-3">
        <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
      </header>

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
            variant={dashboardView === "services" ? "default" : "outline"}
            onClick={() => setDashboardView("services")}
          >
            Services
          </Button>
          <Button
            variant={dashboardView === "loans" ? "default" : "outline"}
            onClick={() => setDashboardView("loans")}
          >
            Loans
          </Button>
          <Button
            variant={dashboardView === "default" ? "default" : "outline"}
            onClick={() => setDashboardView("default")}
          >
            Overview
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

      {/* === Bottombar Placeholder === */}
      <footer className="mt-10 border-t pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} — Footer Placeholder
      </footer>
    </div>
  );
}
