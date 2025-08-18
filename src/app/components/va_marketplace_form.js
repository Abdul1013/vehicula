// pages/va-marketplace.jsx
import { useState, useEffect } from "react";
import TopBar from "@/components/TopBar";
import BottomBar from "@/components/BottomBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { FaFolderOpen, FaInfoCircle } from "react-icons/fa";

export default function VAMarketplace({ userInfo, getRegions, getServices, records, pagination }) {
  const [region, setRegion] = useState("all");
  const [service, setService] = useState("all");
  const [sort, setSort] = useState("sort");
  const [isVA, setIsVA] = useState(false);
  const [isVAApproved, setIsVAApproved] = useState(false);

  useEffect(() => {
    if (userInfo?.bk_va_agent > 0) setIsVA(true);
    if (userInfo?.bk_va_agent_approved > 0) setIsVAApproved(true);
  }, [userInfo]);

  const sortOptions = {
    1: "Price: Low to High",
    2: "Price: High to Low",
    3: "Duration: Short to Long",
    4: "Duration: Long to Short",
  };

  return (
    <div className="bg-white min-h-screen">
      <TopBar />

      {/* Breadcrumb */}
      <div className="container-xxl relative px-4 py-2">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Affiliates", href: "/affiliates" },
            { label: "Verified Agents", active: true },
          ]}
        />
      </div>

      {/* Page Header */}
      <div className="text-center py-8">
        <h4 className="text-xl font-bold">VA Marketplace</h4>
        <p className="text-gray-500 italic text-sm">Find product and service requests</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 px-4 mb-4">
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="form-select rounded shadow-sm text-sm px-2 py-1"
        >
          <option value="all">All regions</option>
          {getRegions !== "-1" &&
            getRegions.map((r) => (
              <option key={r.reg_id} value={r.reg_id}>
                {r.reg_label}
              </option>
            ))}
        </select>

        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="form-select rounded shadow-sm text-sm px-2 py-1"
        >
          <option value="all">All services</option>
          {getServices !== "-1" &&
            getServices.map((s) => s.v_s_id !== 10 && (
              <option key={s.v_s_id} value={s.v_s_id}>
                {s.v_s_name}
              </option>
            ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="form-select rounded shadow-sm text-sm px-2 py-1"
        >
          <option value="sort">Default sort</option>
          {Object.entries(sortOptions).map(([id, label]) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <hr />

      {/* Records */}
      <div className="px-4">
        {records === "-1" ? (
          <div className="py-16 text-center text-gray-400">
            <FaFolderOpen className="mx-auto mb-3 text-3xl" />
            <p className="text-sm">No available product or service requests.</p>
            <p className="text-xs italic">Try refining your search query or check back later.</p>
          </div>
        ) : (
          <>
            {/* Render your VA records here */}
            {records.map((rec, idx) => (
              <div key={idx} className="mb-4">
                {/* Example record display */}
                <div className="border rounded p-4 shadow-sm">{rec.title}</div>
              </div>
            ))}

            {/* Pagination */}
            <div className="py-4">{pagination}</div>
          </>
        )}
      </div>

      {/* VA Info Panel */}
      <div className="fixed bottom-12 right-4 bg-gray-100 border-2 p-3 rounded-md shadow-lg z-50 w-80 lg:w-96">
        <FaInfoCircle className="absolute -top-5 -left-5 text-2xl text-gray-400" />
        {isVAApproved && isVA ? (
          <div className="text-center text-sm">
            <p className="font-bold mb-2">You are signed in already.</p>
            <a href="/register" className="btn btn-primary btn-sm">
              Click here
            </a>{" "}
            to visit your VA dashboard
          </div>
        ) : isVA ? (
          <div className="text-center text-sm">
            <p className="mb-2">
              <strong>Your VA application has been received and is under review.</strong> We will contact you as soon as your application is approved.
            </p>
            <a href="/register" className="btn btn-primary btn-sm">
              Click here
            </a>{" "}
            to revoke your VA application
          </div>
        ) : userInfo ? (
          <div className="text-center text-sm">
            <p className="mb-2">
              <strong>Are you a spare part vendor or service agent?</strong> Partner with us to deliver services or products to customers
            </p>
            <a href="/register" className="btn btn-primary btn-sm">
              Click here
            </a>{" "}
            to apply for the VA program
          </div>
        ) : (
          <div className="text-center text-sm">
            <p className="mb-2">You have not signed up for the VA program</p>
            <a href="/register" className="btn btn-primary btn-sm mr-2">
              Sign Up
            </a>
            <a href="/login" className="btn btn-primary btn-sm">
              Log In
            </a>
          </div>
        )}
      </div>

      <BottomBar />
    </div>
  );
}
