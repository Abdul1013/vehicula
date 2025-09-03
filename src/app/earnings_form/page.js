"use client";

import { useMemo, useState, useEffect } from "react";

/**
 * Earnings Page (single page, JavaScript, App Router-ready)
 * - Tailwind CSS for styling
 * - UI/UX improvements: clear hierarchy, strong contrast, accessible controls
 * - Copy to clipboard + Web Share API
 * - Lightweight toast feedback (no external libs)
 *
 * Usage: place this file at `app/earnings/page.jsx` in your Next.js (App Router) project.
 * Ensure Tailwind is configured. Set `NEXT_PUBLIC_BASE_URL` if you want a canonical base URL.
 */

export default function EarningsPage() {
  // --- Mocked user info (replace with server data via fetch or props) ---
  const [uInfo, setUInfo] = useState({
    bk_customer_full_name: "AbdulTheDev",
    bk_my_ref_code: "TRYBE-REF-9X3K",
  });

  // In PHP you hid withdraw when a special session existed; expose a feature flag here
  const [withdrawDisabled, setWithdrawDisabled] = useState(false);

  // Monetary values (replace with real API values)
  const [availableBalance, setAvailableBalance] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  // Simple toast system
  const [toast, setToast] = useState(null);
  const showToast = (msg) => {
    setToast(msg);
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  };

  // Currency formatter (NGN by default). Adjust as needed.
  const fmt = useMemo(
    () =>
      new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 2,
      }),
    []
  );

  // Base URL for referral link:
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (typeof window !== "undefined" ? window.location.origin + "/" : "https://example.com/");

  const referralCode = uInfo?.bk_my_ref_code || "";
  const referralLink = `${baseUrl}register?ref=${encodeURIComponent(referralCode)}`;

  // Share message
  const shareMessage = `Hi! I am inviting you to join TrybeNode — Revolutionize Your Vehicle Management with Premium, Tech-Driven Automotive Services.\nEnjoy a 5% discount when you use my promo code *${referralCode}*.\n\nClick the link below to get started.\n${referralLink}`;

  // Handlers
  const copyText = async (text, label = "Copied!") => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(label);
    } catch (e) {
      showToast("Copy failed — select and copy manually.");
    }
  };

  const shareReferral = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join TrybeNode",
          text: shareMessage,
          url: referralLink,
        });
      } catch (e) {
        // user cancelled share — ignore
      }
    } else {
      // fallback to copy
      copyText(shareMessage, "Share text copied!");
    }
  };

  const withdraw = () => {
    if (withdrawDisabled) return;
    // TODO: hook to your payout flow (e.g., open modal / route to /payout)
    showToast("Withdrawal flow coming soon.");
  };

  // Example: hydrate values from server/client store if available
  useEffect(() => {
    // If you hydrate from window.__UINFO__ or fetch('/api/me'), do it here.
    // setUInfo(window.__UINFO__)
    // setAvailableBalance(120000)
    // setTotalEarnings(450000)
  }, []);

  return (
    <div className="min-h-screen mt-30 bg-white text-gray-900">
      {/* Topbar placeholder (replace with your shared layout if needed) */}


      <main className="max-w-5xl mx-auto px-4">
        <section className="mt-6 sm:mt-10 text-center">
          <p className="text-sm text-gray-600">Hi, <span className="font-medium text-gray-900">{uInfo?.bk_customer_full_name}</span>!</p>

          {/* Referral Code Badge */}
          <div className="mt-4 inline-flex items-center gap-3 rounded-2xl bg-gray-900 text-white px-4 py-3 relative">
            <div className="text-sm">
              <div id="copyCodeVal" className="font-mono tracking-wide">{referralCode}</div>
              <div className="text-xs opacity-80">Your referral code</div>
            </div>
            <div className="flex items-center gap-2 absolute right-2 sm:right-3">
              <button
                onClick={shareReferral}
                className="p-2 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
                aria-label="Share referral code"
                title="Share"
              >
                <i className="fas fa-share-alt" aria-hidden="true" />
              </button>
              <button
                onClick={() => copyText(referralCode, "Referral code copied!")}
                className="p-2 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
                aria-label="Copy referral code"
                title="Copy"
              >
                <i className="fas fa-copy" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Balances */}
          <div className="mt-8">
            <div className="text-sm text-gray-600 mb-1">Available Balance</div>
            <div className="text-2xl sm:text-3xl font-bold text-primary-600">
              {fmt.format(availableBalance || 0)}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 italic mt-1">
              Total earnings till date <span className="text-gray-900 font-semibold">{fmt.format(totalEarnings || 0)}</span>
            </div>
            {!withdrawDisabled && (
              <button
                onClick={withdraw}
                className="mt-4 inline-flex items-center gap-2 rounded-full border-2 bordergreen-600 textgreen-700 hover:bggreen-50 px-4 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ringgreen-400"
              >
                Withdraw
              </button>
            )}
          </div>
        </section>

        {/* Links row */}
        <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <a href="#" className="justify-self-start text-green-700 hover:underline inline-flex items-center">
            <i className="fas fa-piggy-bank mr-2 text-green-600" aria-hidden="true" />
            View Earnings Summary
          </a>
          <a href="#" className="justify-self-start sm:justify-self-end text-green-700 hover:underline inline-flex items-center">
            <i className="fas fa-history mr-2 text-green-600" aria-hidden="true" />
            View withdrawal history
          </a>
        </section>

        {/* Referral link */}
        <section className="mt-8 text-center">
          <div className="text-sm">
            <span id="copyLinkVal" className="underline textgreen-700 break-all">
              {referralLink}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-center gap-3 text-gray-600">
            <button
              onClick={shareReferral}
              className="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
              aria-label="Share referral link"
              title="Share"
            >
              <i className="fas fa-share-alt" aria-hidden="true" />
            </button>
            <button
              onClick={() => copyText(referralLink, "Referral link copied!")}
              className="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
              aria-label="Copy referral link"
              title="Copy"
            >
              <i className="fas fa-copy" aria-hidden="true" />
            </button>
          </div>
          <div className="text-gray-900 mt-1 text-xs">(Your referral link)</div>
        </section>

        {/* Hidden share data (kept for parity with PHP), not actually needed */}
        <section aria-hidden className="sr-only">
          {shareMessage}
        </section>
      </main>

  

      {/* Toast */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed inset-x-0 bottom-4 flex justify-center px-4"
      >
        {toast && (
          <div className="pointer-events-auto rounded-xl shadow-lg bg-gray-900 text-white px-4 py-2 text-sm">
            {toast}
          </div>
        )}
      </div>

      {/* Styles: define a primary color ramp using Tailwind semantic names */}
      <style jsx global>{`
        :root {
          /* Adjust to match your brand; used via Tailwind's text-primary-600 class */
          --twc-primary-50: 239 246 255;
          --twc-primary-100: 219 234 254;
          --twc-primary-200: 191 219 254;
          --twc-primary-300: 147 197 253;
          --twc-primary-400: 96 165 250;
          --twc-primary-500: 59 130 246;
          --twc-primary-600: 37 99 235;
          --twc-primary-700: 29 78 216;
          --twc-primary-800: 30 64 175;
          --twc-primary-900: 30 58 138;
        }
      `}</style>
    </div>
  );
}
