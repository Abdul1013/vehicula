// app/my-account/page.jsx
"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function ProgressBar({ value }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}

function Card({ title, subtitle, extra, actions }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 flex flex-col gap-3 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
      {extra}
      <div className="flex gap-2 mt-2">{actions}</div>
    </div>
  );
}

function EmptyState({ label }) {
  return (
    <div className="text-center text-gray-500 py-10">
      <p className="text-sm">No {label} found.</p>
    </div>
  );
}

export default function MyAccountPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTab = searchParams.get("tab") || "vehicles";

  const [tab, setTab] = useState(initialTab);
  const [vehicles, setVehicles] = useState([]);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);

  // Example backend-ready fetch
  useEffect(() => {
    async function fetchData() {
      try {
        // Replace these with your backend endpoints
        const [vehRes, prodRes, servRes] = await Promise.all([
          fetch("/api/vehicles"),
          fetch("/api/products"),
          fetch("/api/services"),
        ]);

        if (vehRes.ok) setVehicles(await vehRes.json());
        if (prodRes.ok) setProducts(await prodRes.json());
        if (servRes.ok) setServices(await servRes.json());
      } catch (err) {
        console.error("Error fetching data", err);
      }
    }
    fetchData();
  }, []);

  const handleTabChange = (newTab) => {
    setTab(newTab);
    router.push(`?tab=${newTab}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      {/* Tabs */}
      <div className="flex gap-4 border-b pb-2 mb-6">
        {["vehicles", "products", "services", "home"].map((t) => (
          <button
            key={t}
            onClick={() => handleTabChange(t)}
            className={`pb-2 capitalize font-medium ${
              tab === t
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Vehicles */}
      {tab === "vehicles" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">My Vehicles</h2>
          {vehicles.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {vehicles.map((v) => (
                <Card
                  key={v.id}
                  title={v.name}
                  subtitle={`Plate: ${v.plate}`}
                  extra={<ProgressBar value={v.completion || 0} />}
                  actions={[
                    <button
                      key="view"
                      className="px-3 py-1 rounded-lg text-sm bg-blue-100 text-blue-700 hover:bg-blue-200"
                    >
                      View
                    </button>,
                    <button
                      key="edit"
                      className="px-3 py-1 rounded-lg text-sm bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      Edit
                    </button>,
                  ]}
                />
              ))}
            </div>
          ) : (
            <EmptyState label="vehicles" />
          )}
        </div>
      )}

      {/* Products */}
      {tab === "products" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">My Products</h2>
          {products.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <Card
                  key={p.id}
                  title={p.name}
                  subtitle={`Price: ₦${p.price}`}
                  actions={[
                    <button
                      key="edit"
                      className="px-3 py-1 rounded-lg text-sm bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      Edit
                    </button>,
                    <button
                      key="delete"
                      className="px-3 py-1 rounded-lg text-sm bg-red-100 text-red-700 hover:bg-red-200"
                    >
                      Delete
                    </button>,
                  ]}
                />
              ))}
            </div>
          ) : (
            <EmptyState label="products" />
          )}
        </div>
      )}

      {/* Services */}
      {tab === "services" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">My Services</h2>
          {services.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <Card
                  key={s.id}
                  title={s.name}
                  subtitle={`Status: ${s.status}`}
                  actions={[
                    <button
                      key="edit"
                      className="px-3 py-1 rounded-lg text-sm bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      Edit
                    </button>,
                    <button
                      key="delete"
                      className="px-3 py-1 rounded-lg text-sm bg-red-100 text-red-700 hover:bg-red-200"
                    >
                      Delete
                    </button>,
                  ]}
                />
              ))}
            </div>
          ) : (
            <EmptyState label="services" />
          )}
        </div>
      )}

      {/* Home */}
      {tab === "home" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Welcome to My Account</h2>
          <p className="text-gray-600">
            Manage your vehicles, products, and services from one place.
          </p>
        </div>
      )}
    </div>
  );
}
