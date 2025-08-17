"use client";
import { useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import Link from "next/link";

// -------------------- Dummy Data --------------------
const dummyBadges = [
  { label: "Bronze", color: "#cd7f32", startAt: 0, endAt: 40 },
  { label: "Silver", color: "#c0c0c0", startAt: 41, endAt: 70 },
  { label: "Gold", color: "#ffd700", startAt: 71, endAt: 90 },
  { label: "Platinum", color: "#e5e4e2", startAt: 91, endAt: 100 },
];

const services = {
  partial: [
    { id: 1, title: "House Cleaning", price: "₦5,000", date: "Aug 10, 2025" },
    { id: 2, title: "Laundry Service", price: "₦3,000", date: "Aug 14, 2025" },
  ],
  progress: [
    { id: 3, title: "Office Fumigation", price: "₦15,000", date: "Aug 15, 2025" },
  ],
  completed: [
    { id: 4, title: "Post Construction Cleaning", price: "₦25,000", date: "Aug 01, 2025" },
  ],
};

// -------------------- Dashboard Page --------------------
export default function DashboardState() {
  const score = 68;
  const activeBadge =
    dummyBadges.find((b) => score > b.startAt && score <= b.endAt) || dummyBadges[0];

  const [filters, setFilters] = useState({
    partial: true,
    progress: true,
    completed: true,
  });

  const chartData = [
    { name: "Score", value: score },
    { name: "Remaining", value: 100 - score },
  ];

  const toggleFilter = (key) =>
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="p-6 space-y-8">
      {/* -------- CREDIT SCORE -------- */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h5 className="font-semibold mb-4">Your Credit Score</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Chart */}
          <div className="flex flex-col items-center">
            <div className="relative w-[200px] h-[200px]">
              <PieChart width={200} height={200}>
                <Pie
                  data={chartData}
                  innerRadius={70}
                  outerRadius={100}
                  dataKey="value"
                >
                  <Cell fill={activeBadge.color} />
                  <Cell fill="#e5e7eb" />
                </Pie>
              </PieChart>
              <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
                {score}%
              </div>
            </div>
            <p className="mt-3 text-gray-700">
              <span
                className="inline-block w-3 h-3 rounded-full mr-2"
                style={{ background: activeBadge.color }}
              />
              <strong>{activeBadge.label}</strong> Customer
            </p>
            <Link
              href={`/credit-score-system#${activeBadge.label.toLowerCase()}`}
              className="text-sm text-blue-600 underline mt-2"
            >
              View benefits →
            </Link>
          </div>

          {/* Legend */}
          <div>
            {dummyBadges.map((b, i) => (
              <div key={i} className="flex items-center mb-2 text-sm">
                <span
                  className="w-12 h-4 mr-3 rounded"
                  style={{ background: b.color }}
                />
                <span className="mr-2">{b.label}</span>
                <span>
                  {b.startAt}% - {b.endAt}%
                </span>
              </div>
            ))}
            <Link
              href="/credit-score-system"
              className="text-sm text-blue-600 underline mt-3 block"
            >
              Learn more →
            </Link>
          </div>
        </div>
      </div>

      {/* -------- SERVICE FILTERS -------- */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h5 className="font-semibold mb-4">Your Services</h5>
        <div className="flex space-x-6 mb-6">
          {["partial", "progress", "completed"].map((key) => (
            <label key={key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters[key]}
                onChange={() => toggleFilter(key)}
              />
              <span className="capitalize">{key}</span>
            </label>
          ))}
        </div>

        {/* -------- SERVICE CARDS -------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filters.partial &&
            services.partial.map((s) => (
              <ServiceCard key={s.id} {...s} status="Partial" />
            ))}

          {filters.progress &&
            services.progress.map((s) => (
              <ServiceCard key={s.id} {...s} status="In Progress" />
            ))}

          {filters.completed &&
            services.completed.map((s) => (
              <ServiceCard key={s.id} {...s} status="Completed" />
            ))}
        </div>
      </div>
    </div>
  );
}

// -------------------- Subcomponent --------------------
function ServiceCard({ title, price, date, status }) {
  const statusColors = {
    Partial: "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
  };

  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <h4 className="font-semibold text-gray-800">{title}</h4>
      <p className="text-gray-600">{price}</p>
      <p className="text-sm text-gray-500">📅 {date}</p>
      <span
        className={`inline-block mt-3 px-3 py-1 text-xs rounded-full ${statusColors[status]}`}
      >
        {status}
      </span>
    </div>
  );
}
