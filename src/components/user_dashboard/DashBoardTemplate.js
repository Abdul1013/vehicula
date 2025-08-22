"use client";
import { useMemo, useState } from "react";
import Link from "next/link";

/**
 * Next.js App Router page (JavaScript, not TypeScript)
 * Converts the provided PHP snippet (credit score + service cards) into a single React page.
 * - Uses Tailwind CSS for styling
 * - No external chart libs: SVG radial progress for the score
 * - Accessible markup, mobile-first
 * - Drop-in friendly: place this as app/dashboard/page.jsx (or any route)
 * - Replace the mock `bootstrapData` with real data fetched from your API or server actions
 */

// ------- mock bootstrap data (replace with real data from your API) -------
const bootstrapData = {
  customerScore: 72, // bk_score => 0..100
  badges: [
    { label: "Bronze", color: "#D97706", startAt: 0, endAt: 25 },
    { label: "Silver", color: "#6B7280", startAt: 25, endAt: 50 },
    { label: "Gold", color: "#F59E0B", startAt: 50, endAt: 75 },
    { label: "Platinum", color: "#3B82F6", startAt: 75, endAt: 90 },
    { label: "Diamond", color: "#10B981", startAt: 90, endAt: 100 },
  ],
  // PHP shape: each section => [has_more_data_bool, items]
  // partial items used fields: [serv_req_id, count_services, dateISO, amount]
  // in_progress items: [total_paid, ?, ?, total_amount, title?]
  // completed: flexible — render history row
  serviceCardData: {
    partial: [
      true,
      {
        "BATCH-001": [123, 3, "2025-07-29", 80000],
        "BATCH-002": [124, 1, "2025-08-10", 15000],
      },
    ],
    in_progress: [
      true,
      {
        "BATCH-101": [30000, null, null, 80000, "Office Cleaning"],
        "BATCH-102": [15000, null, null, 15000, "Car Wash"],
      },
    ],
    completed: [
      false,
      {
        "BATCH-900": {
          title: "Post-Construction Cleaning",
          amount: 250000,
          date: "2025-07-18",
        },
        "BATCH-901": {
          title: "Deep Cleaning",
          amount: 120000,
          date: "2025-06-11",
        },
      },
    ],
  },
};

// ------- helpers -------
function formatAmount(naira) {
  if (naira === null || naira === undefined || isNaN(naira)) return "₦0";
  try {
    return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(
      Number(naira)
    );
  } catch {
    return `₦${naira}`;
  }
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-NG", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function pluralize(word, count) {
  return `${word}${count === 1 ? "" : "s"}`;
}

function clamp(n, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Number(n)));
}

export default function DashBoardPage() {
  // In real app: replace bootstrapData with data fetched via server actions or client fetch.
  const { customerScore, badges, serviceCardData } = bootstrapData;

  // Determine current badge based on score
  const { scoreColor, memberType } = useMemo(() => {
    let initial = badges[0] || { color: "#000", label: "Member", startAt: 0, endAt: 100 };
    let color = initial.color;
    let type = initial.label;
    const score = clamp(customerScore);
    badges.forEach((b) => {
      const start = Number(b.startAt) || 0;
      const end = Number(b.endAt) || 100;
      // emulate PHP logic: (score > start && score <= end)
      const startGate = start === 0 ? score >= 0 : score > start;
      if (startGate && score <= end) {
        color = b.color;
        type = b.label;
      }
    });
    return { scoreColor: color, memberType: type };
  }, [customerScore, badges]);

  // Toggle: credit score metrics
  const [showMetrics, setShowMetrics] = useState(true);
  // Toggle: service lists
  const [showPartial, setShowPartial] = useState(true);
  const [showInProgress, setShowInProgress] = useState(true);
  const [showCompleted, setShowCompleted] = useState(true);

  // SVG radial progress geometry
  const radius = 90; // px
  const circumference = 2 * Math.PI * radius;
  const pct = clamp(customerScore);
  const offset = circumference - (pct / 100) * circumference;

  // unpack service data safely
  const [hasMorePartial, partialMap] = serviceCardData?.partial || [false, {}];
  const [hasMoreInProg, inProgMap] = serviceCardData?.in_progress || [false, {}];
  const [hasMoreCompleted, completedMap] = serviceCardData?.completed || [false, {}];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">Your Account</h1>
            <button
              onClick={() => setShowMetrics((s) => !s)}
              className="text-sm text-blue-600 hover:underline"
              aria-expanded={showMetrics}
            >
              Toggle metrics
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        {/* Credit Score Section */}
        <section id="scoreCardContainer" className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Chart */}
          <div className={`${showMetrics ? "block" : "hidden"}`}>
            <div className="flex flex-col items-center">
              <h2 className="mb-2 text-base font-medium">Your credit score</h2>
              <div className="relative h-[200px] w-[200px]">
                <svg
                  width="200"
                  height="200"
                  viewBox="0 0 200 200"
                  className="absolute inset-0"
                  role="img"
                  aria-label={`Credit score: ${pct}%`}
                >
                  <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="transparent"
                    stroke="#E5E7EB"
                    strokeWidth="14"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="transparent"
                    stroke={scoreColor}
                    strokeWidth="14"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform="rotate(-90 100 100)"
                    className="transition-[stroke-dashoffset] duration-700 ease-out"
                  />
                </svg>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold">
                  {pct}%
                </div>
              </div>

              <div className="py-3 text-center">
                <span
                  className="me-2 inline-block h-3 w-3 rounded-full align-middle"
                  style={{ backgroundColor: scoreColor }}
                  aria-hidden
                />
                <strong>{memberType}</strong> Customer
                <div className="pt-2 text-sm text-gray-600">
                  <Link href={`/credit-score-system#${memberType.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-blue-600 underline underline-offset-4"
                  >
                    View benefits →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className={`${showMetrics ? "block" : "hidden"} lg:pt-8`}>
            <ul className="space-y-3">
              {badges.map((b, idx) => {
                const start = b.startAt === 0 ? 0 : Number(b.startAt) + 1;
                return (
                  <li key={`${b.label}-${idx}`} className="flex items-center gap-3 text-sm">
                    <span className="inline-block min-w-[60px] rounded-full px-4 py-1 text-transparent" style={{ background: b.color }}>
                      &nbsp;
                    </span>
                    <span className="text-gray-800">{b.label}</span>
                    <span className="text-gray-600">{start}% - {b.endAt}%</span>
                  </li>
                );
              })}
            </ul>
            <div className="pt-3 text-sm">
              <Link href={`/credit-score-system#${memberType.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-blue-600 underline underline-offset-4"
              >
                Learn more about credit score →
              </Link>
            </div>
          </div>
        </section>

        {/* Controls */}
        <section className="my-6 border-y py-4 text-sm">
          <div className="mb-3 font-semibold text-gray-800 lg:mb-0 lg:inline lg:me-3">
            Manage your services
          </div>

          <label className="me-4 inline-flex cursor-pointer items-center gap-2 align-middle">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={showPartial}
              onChange={(e) => setShowPartial(e.target.checked)}
            />
            <span className="text-amber-600">Partial</span>
          </label>

          <label className="me-4 inline-flex cursor-pointer items-center gap-2 align-middle">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={showInProgress}
              onChange={(e) => setShowInProgress(e.target.checked)}
            />
            <span className="text-sky-600">In progress</span>
          </label>

          <label className="inline-flex cursor-pointer items-center gap-2 align-middle">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={showCompleted}
              onChange={(e) => setShowCompleted(e.target.checked)}
            />
            <span className="text-blue-600">Delivered</span>
          </label>
        </section>

        {/* Partial */}
        {showPartial && partialMap && Object.keys(partialMap).length > 0 && (
          <section id="partialContainer" className="mb-8 border-b pb-6">
            <h3 className="mb-3 text-sm font-semibold text-gray-800">We saved it for you. Complete now!</h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(partialMap).map(([batchId, arr]) => {
                const [servReqId, count, dateISO, amount] = arr || [];
                return (
                  <article key={batchId} className="rounded-lg border bg-white shadow">
                    <div className="p-4 text-center">
                      <div className="mb-2 text-2xl" aria-hidden>✍️</div>
                      <div className="mb-2 text-sm">
                        {count} {pluralize("service", count)} @ {formatAmount(amount)}
                        <div className="mt-1 text-xs italic text-gray-500">On {formatDate(dateISO)}</div>
                      </div>
                      <div className="mb-3 text-xs text-gray-600">Batch ID: {batchId}</div>

                      <div className="flex items-center justify-center gap-2">
                        <Link href={`/service-pay-opt?batch-edit=${encodeURIComponent(batchId)}`} className="rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700">
                          💳 Pay
                        </Link>
                        <Link href={`/service-qty?serv_req=${encodeURIComponent(servReqId)}&batch_id=${encodeURIComponent(batchId)}`} className="rounded bg-amber-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-amber-600">
                          ✏️ Edit
                        </Link>
                        {/* Delete dropdown simplified to a confirm button */}
                        <button
                          onClick={() => {
                            if (confirm("Delete this item?")) {
                              // TODO: call your delete API then refresh
                              console.log("delete", batchId);
                            }
                          }}
                          className="rounded bg-rose-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-rose-700"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {hasMorePartial && (
              <div className="mt-4 text-right text-sm">
                <Link href="/service-application-status?type=partial" className="text-blue-600 underline underline-offset-4">
                  View all partial applications →
                </Link>
              </div>
            )}
          </section>
        )}

        {/* In Progress */}
        {showInProgress && inProgMap && Object.keys(inProgMap).length > 0 && (
          <section id="inProgressContainer" className="mb-8 border-b pb-6">
            <h3 className="mb-3 text-sm font-semibold text-gray-800">In progress (Payment/Delivery)</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(inProgMap).map(([batchId, arr]) => {
                const [totalPaid, , , totalAmount, title] = arr || [];
                const paid = Number(totalPaid) || 0;
                const total = Number(totalAmount) || 0;
                const pctPaid = total > 0 ? Math.min(100, Math.round((paid / total) * 100)) : 100;
                const balance = Math.max(0, total - paid);
                const complete = total > 0 && paid >= total;

                return (
                  <article key={batchId} className="rounded-lg border bg-white p-4 shadow">
                    <div className="mb-2 text-lg font-medium">{title || "Service"}</div>
                    <div className="mb-2 text-sm text-gray-700">Batch ID: {batchId}</div>

                    {/* progress bar */}
                    <div className="mb-2 h-3 w-full rounded-full bg-gray-200" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pctPaid}>
                      <div
                        className={`h-3 rounded-full ${pctPaid >= 100 ? "bg-green-500" : pctPaid >= 60 ? "bg-blue-500" : "bg-amber-500"}`}
                        style={{ width: `${pctPaid}%` }}
                      />
                    </div>
                    <div className="mb-3 text-right text-sm">
                      <span className="font-semibold text-green-600">{formatAmount(paid)}</span>
                      <span className="px-1">/</span>
                      <span className="text-gray-700">{formatAmount(total)}</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {!complete && (
                        <Link href={`/service-pay-opt?batch-edit=${encodeURIComponent(batchId)}`} className="rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700">
                          Complete payment
                        </Link>
                      )}
                      <Link href={`/service-tracking?batch_id=${encodeURIComponent(batchId)}`} className="rounded border px-3 py-1.5 text-xs font-medium text-gray-800 hover:bg-gray-50">
                        Track delivery
                      </Link>
                      <span className="rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700">Balance: {formatAmount(balance)}</span>
                    </div>
                  </article>
                );
              })}
            </div>

            {hasMoreInProg && (
              <div className="mt-4 text-right text-sm">
                <Link href="/service-application-status?type=in_progress" className="text-blue-600 underline underline-offset-4">
                  View all applications in progress →
                </Link>
              </div>
            )}
          </section>
        )}

        {/* Completed */}
        {showCompleted && completedMap && Object.keys(completedMap).length > 0 && (
          <section id="completedContainer" className="mb-8 border-b pb-6">
            <h3 className="mb-3 text-sm font-semibold text-gray-800">Services Delivered</h3>
            <div className="divide-y rounded-lg border bg-white">
              {Object.entries(completedMap).map(([batchId, row]) => (
                <div key={batchId} className="flex items-center justify-between p-4">
                  <div>
                    <div className="text-sm font-medium">{row?.title || "Service"}</div>
                    <div className="text-xs text-gray-500">Batch ID: {batchId} · {formatDate(row?.date)}</div>
                  </div>
                  <div className="text-sm font-semibold text-green-600">{formatAmount(row?.amount)}</div>
                </div>
              ))}
            </div>

            {hasMoreCompleted && (
              <div className="mt-4 text-right text-sm">
                <Link href="/service-application-status?type=completed" className="text-blue-600 underline underline-offset-4">
                  View all services delivered →
                </Link>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
