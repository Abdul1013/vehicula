// pages/verified-agents.jsx
import Head from "next/head";
import Topbar from "../components/Topbar"; // Placeholder for topbar.php
import CTVerifiedAgents from "../components/CTVerifiedAgents"; // Placeholder for ct_va.php
import CTGallery from "../components/CTGallery"; // Placeholder for ct_gallery.php
import Bottombar from "../components/Bottombar"; // Placeholder for bottombar.php
import Link from "next/link";

export default function VerifiedAgentsPage() {
  const styleTop = ""; // dynamic style if needed
  const FALL_BACK = "/"; // Replace with actual fallback URL

  return (
    <>
      <Head>
        <title>Verified Agents</title>
      </Head>

      <div className="min-h-screen bg-white flex flex-col">
        {/* Topbar */}
        <Topbar />

        {/* Hero & Breadcrumb */}
        <div className={`container-xxl bg-white hero-header mb-0 px-0 relative ${styleTop}`}>
          <div className="container absolute pad_breadcrumb">
            <nav aria-label="breadcrumb" className="small mt-2">
              <ol className="breadcrumb">
                <li className="breadcrumb-item small">
                  <Link href={FALL_BACK}>Home</Link>
                </li>
                <li className="breadcrumb-item small">
                  <Link href="/affiliates">Affiliates</Link>
                </li>
                <li className="breadcrumb-item small active" aria-current="page">
                  Verified Agents
                </li>
              </ol>
            </nav>
          </div>

          <div className="pt-20 mt-20">
            <CTVerifiedAgents />
          </div>
        </div>

        {/* Gallery Section */}
        <CTGallery />

        {/* Bottom Navigation / Footer */}
        <Bottombar />
      </div>
    </>
  );
}
