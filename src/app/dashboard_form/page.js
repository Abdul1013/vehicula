"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Briefcase, Wrench, Coins } from "lucide-react";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import ServicesDashboard from "@/components/user_dashboard/ServicesDashboard";
import UserHeader from "@/components/user_dashboard/UserHeader";
import DashBoardPage from "@/components/user_dashboard/DashBoardTemplate";
import LoanDashboard from "@/components/user_dashboard/LoanDashboard";

// Cache duration: 5 minutes in milliseconds
const CACHE_DURATION = 5 * 60 * 1000;

export default function Dashboard() {
  const [userInfo, setUserInfo] = useState({
    id: null,
    phoneVerified: false,
    emailVerified: false,
    fullName: "",
    email: "",
    phone: "",
    address: "",
    photo: null,
    region: null,
    role: null,
    mustChangePassword: false,
  });
  const [hasServices, setHasServices] = useState(true);
  const [dashboardView, setDashboardView] = useState("default");
  const [paidOffData, setPaidOffData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUserData(force = false) {
      // Check localStorage cache
      if (!force) {
        const cachedData = localStorage.getItem("userCache");
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setUserInfo(data);
            setHasServices(true);
            setDashboardView("services");
            console.log("Using cached user data from localStorage", {
              userId: data.id,
            });
            setLoading(false);
            return;
          }
        }
      }

      try {
        setLoading(true);
        const response = await fetch("/api/user", {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!response.ok) {
          if (response.status === 401) {
            console.warn("Unauthorized access, redirecting to /login");
            router.push("/login");
            return;
          }
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        // Update cache
        localStorage.setItem(
          "userCache",
          JSON.stringify({ data, timestamp: Date.now() })
        );
        setUserInfo({
          id: data.id || null,
          phoneVerified: data.phoneVerified,
          emailVerified: data.emailVerified,
          fullName: data.fullName || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          photo: data.photo || null,
          region: data.region || null,
          role: data.role || null,
          mustChangePassword: data.mustChangePassword,
        });
        setHasServices(true);
        setDashboardView("services");
        console.log("User data fetched for dashboard", { userId: data.id });
      } catch (err) {
        setError(err.message);
        console.error("Error fetching user data", { error: err.message });
      } finally {
        setLoading(false);
      }
    }
    fetchUserData();
  }, [router]);

  // Function to force refresh user data
  const refreshUserData = () => {
    localStorage.removeItem("userCache");
    fetchUserData(true);
  };

  const renderDashboardContent = () => {
    switch (dashboardView) {
      case "services":
        return <ServicesDashboard />;
      case "loans":
        if (paidOffData) {
          return (
            <Card className='shadow-md rounded-2xl p-4'>
              <h2 className='text-lg font-semibold mb-2'>Loan History</h2>
              <p className='text-gray-600'>
                [Placeholder: loan_history_template]
              </p>
            </Card>
          );
        }
        return <LoanDashboard />;
      default:
        return <DashBoardPage />;
    }
  };

  return (
    <div className='bg-white min-h-screen py-6 px-4'>
      <UserHeader userInfo={userInfo} />
      {loading && (
        <div className='text-center text-gray-600'>Loading user data...</div>
      )}
      {error && (
        <div className='flex items-center mb-4 p-3 border border-red-400 bg-red-50 rounded-lg'>
          <AlertCircle className='text-red-600 mr-2' />
          <span className='text-red-700 text-sm'>{error}</span>
        </div>
      )}
      {!loading && !userInfo.phoneVerified && (
        <div className='flex items-center mb-4 p-3 border border-yellow-400 bg-yellow-50 rounded-lg'>
          <AlertCircle className='text-yellow-600 mr-2' />
          <span className='text-yellow-700 text-sm'>
            Your phone number is not verified.{" "}
            <a href='/verify-cred?type=1' className='underline'>
              Click here to verify
            </a>
          </span>
        </div>
      )}
      {!loading && hasServices && (
        <div className='flex gap-3 mb-5'>
          <Button
            variant={dashboardView === "default" ? "default" : "outline"}
            onClick={() => setDashboardView("default")}
          >
            <Briefcase className='w-4 h-4 mr-2' />
            Dashboard
          </Button>
          <Button
            variant={dashboardView === "services" ? "default" : "outline"}
            onClick={() => setDashboardView("services")}
          >
            <Wrench className='w-4 h-4 mr-2' />
            Services
          </Button>
          <Button
            variant={dashboardView === "loans" ? "default" : "outline"}
            onClick={() => setDashboardView("loans")}
          >
            <Coins className='w-4 h-4 mr-2' />
            Loans
          </Button>
          {/* <Button onClick={refreshUserData} variant='outline'>
            Refresh Profile
          </Button> */}
        </div>
      )}
      {!loading && hasServices
        ? renderDashboardContent()
        : !loading && (
            <Card className='shadow-md rounded-2xl p-4'>
              <h2 className='text-lg font-semibold mb-2'>Services</h2>
              <p className='text-gray-600'>[Placeholder: services_template]</p>
            </Card>
          )}
    </div>
  );
}
