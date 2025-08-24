"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

/**
 * Loan Dashboard - single page JS component (App Router)
 *
 * Replace the fetch URL `/api/loans/pending` with your real endpoint
 * or change the `loadLoans()` implementation to accept server-side props.
 *
 * Pagination default: 9 items per page (matches original PHP).
 */

const PAGE_SIZE = 9;

// Utility: choose progress background based on percentage (mirrors progressBg behaviour)
function progressClass(percentage) {
  if (percentage >= 75) return "bg-green-500";
  if (percentage >= 40) return "bg-yellow-400";
  return "bg-red-500";
}

export default function LoanDashboard() {
  const [loans, setLoans] = useState([]); // array of { batchId, totalPaid, totalAmount, days, disburseDate, ... }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // pagination state
  const [page, setPage] = useState(1);

  // Fetch pending loans from backend (replace endpoint)
  useEffect(() => {
    async function loadLoans() {
      try {
        setLoading(true);
        setError(null);

        // TODO: replace with your backend endpoint or server-provided JSON
        // Expected response: [{ batchId, totalPaid, totalAmount, days, disburseDate, ... }, ...]
        const res = await fetch("/api/loans/pending");
        if (!res.ok) {
          throw new Error(`Failed to load loans (${res.status})`);
        }
        const data = await res.json();

        // Defensive mapping: transform to minimal expected shape
        const normalized = (data || []).map((it) => ({
          batchId: it.batchId ?? it.batch_id ?? it.ref ?? it.vsbp_batch_id_fk,
          totalPaid: Number(it.totalPaid ?? it.total_paid ?? it[0] ?? 0),
          totalAmount: Number(it.totalAmount ?? it.total_amount ?? it[1] ?? 0),
          days: it.days ?? it.loan_duration ?? it[2] ?? null,
          disburseDate: it.disburseDate ?? it.disburse_date ?? it[3] ?? null,
          // attach other server values if needed
          raw: it,
        }));

        setLoans(normalized);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load loans");
      } finally {
        setLoading(false);
      }
    }

    loadLoans();
  }, []);

  // derived values
  const totalPages = useMemo(() => Math.max(1, Math.ceil(loans.length / PAGE_SIZE)), [loans]);
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  const pagedLoans = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return loans.slice(start, start + PAGE_SIZE);
  }, [loans, page]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-lg md:text-2xl font-semibold text-center">Manage your loans</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Nav: Current / Completed */}
        <nav className="mb-6 text-center">
          <a
            href="#current"
            className="inline-flex items-center gap-2 mr-4 text-sm font-semibold text-green-700 border-b-2 border-green-500 pb-1 hover:opacity-90"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M5 3v18h14V3H5zm2 2h10v14H7V5z" />
            </svg>
            Current
          </a>
          <Link href="/loan-history">
            <p className="inline-flex items-center gap-2 text-sm text-gray-700 pb-1 hover:underline">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M13 3a9 9 0 1 0 8 6.32V3h-8z" />
              </svg>
              Completed
            </p>
          </Link>
        </nav>

        {/* Card container */}
        <section id="current" aria-labelledby="current-loans-heading">
          <div className="mb-4">
            <h2 id="current-loans-heading" className="text-sm font-semibold text-gray-700">
              Current loans
            </h2>
          </div>

          {/* Loading / Error */}
          {loading ? (
            <div className="py-8 text-center text-sm text-gray-600">Loading loans…</div>
          ) : error ? (
            <div className="py-8 text-center text-sm text-red-600">Error: {error}</div>
          ) : loans.length === 0 ? (
            <div className="py-12 text-center text-muted">
              <div className="mb-4">
                <svg className="w-12 h-12 mx-auto text-gray-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M3 6h18v11H3z" />
                </svg>
              </div>
              <p className="text-sm text-gray-500 italic">No outstanding loans</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4">
                {pagedLoans.map((loan) => {
                  const totalPaid = Number(loan.totalPaid) || 0;
                  const totalAmount = Number(loan.totalAmount) || 0;
                  let percentagePaid = totalAmount > 0 ? Math.round((totalPaid / totalAmount) * 100) : 100;
                  if (percentagePaid > 100) percentagePaid = 100;

                  const progClass = progressClass(percentagePaid);

                  return (
                    <article
                      key={loan.batchId}
                      className="bg-white shadow-sm rounded-lg p-4 md:p-6 flex flex-col md:flex-row gap-4"
                      aria-labelledby={`loan-${loan.batchId}-title`}
                    >
                      <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-md bg-slate-50 text-slate-600">
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d="M5 12h14M12 5v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>

                      <div className="flex-1">
                        <h3 id={`loan-${loan.batchId}-title`} className="text-base font-semibold text-gray-800">
                          Loan: <span className="font-normal">{loan.batchId}</span>
                        </h3>
                        <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                          <div>
                            <div className="text-xs text-gray-500">Disbursed</div>
                            <div className="mt-1">{loan.disburseDate ? new Date(loan.disburseDate).toLocaleDateString() : "—"}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Duration (days)</div>
                            <div className="mt-1">{loan.days ?? "—"}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Paid</div>
                            <div className="mt-1">
                              <span className="text-green-600 font-medium">{formatCurrency(totalPaid)}</span>
                              <span className="text-gray-500"> / {formatCurrency(totalAmount)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <div className="text-xs text-gray-500">Repayment progress</div>
                            <div className="text-xs font-medium">{percentagePaid}%</div>
                          </div>

                          {/* Progress bar (accessible) */}
                          <div className="w-full h-3 bg-gray-200 rounded overflow-hidden" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={percentagePaid} aria-label={`Repayment progress ${percentagePaid} percent`}>
                            <div
                              className={`h-3 ${progClass}`}
                              style={{ width: `${percentagePaid}%`, transition: "width 400ms ease" }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 items-end justify-between">
                        <div className="text-sm text-right text-gray-600">{/* placeholder if extra text needed */}</div>
                        <div className="w-full md:w-auto">
                          <button
                            type="button"
                            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onClick={() => handlePayClick(loan)}
                          >
                            Proceed to pay
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Pagination controls */}
              <nav
                className="mt-6 flex items-center justify-center gap-2"
                role="navigation"
                aria-label="Pagination"
              >
                <button
                  className="px-3 py-1 rounded-md bg-white border text-sm hover:bg-gray-100 disabled:opacity-40"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </button>

                {/* page numbers simplified for readability */}
                <div className="inline-flex items-center gap-1 text-sm">
                  {Array.from({ length: Math.min(7, Math.ceil(loans.length / PAGE_SIZE)) }).map((_, idx) => {
                    // compute page index to show around current page
                    const first = Math.max(1, Math.min(page - 3, Math.max(1, totalPages - 6)));
                    const pageNumber = first + idx;
                    if (pageNumber > totalPages) return null;
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setPage(pageNumber)}
                        className={`px-3 py-1 rounded-md text-sm ${pageNumber === page ? "bg-blue-600 text-white" : "bg-white border hover:bg-gray-100"}`}
                        aria-current={pageNumber === page ? "page" : undefined}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                </div>

                <button
                  className="px-3 py-1 rounded-md bg-white border text-sm hover:bg-gray-100 disabled:opacity-40"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </nav>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

/* ------------------ Helpers ------------------ */

function formatCurrency(value) {
  // Keep it simple: format as Naira or fallback to plain number
  try {
    // Customize locale and currency as needed: "en-NG" and "NGN"
    return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(value || 0);
  } catch {
    return `₦${Number(value || 0).toLocaleString()}`;
  }
}

function handlePayClick(loan) {
  // Default behavior: navigate to payment page with query param
  // Replace with your payment flow (Paystack / Monnify / server)
  const url = `/operations?opt=pay&plate_id=${encodeURIComponent(loan.batchId)}`;
  window.location.href = url;
}
