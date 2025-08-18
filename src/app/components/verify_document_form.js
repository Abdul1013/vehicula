// pages/ct-page.jsx
import Head from "next/head";
import Topbar from "../components/Topbar"; // Placeholder for topbar.php
import CTVerify from "../components/CTVerify"; // Placeholder for ct_verify.php
import CTGallery from "../components/CTGallery"; // Placeholder for ct_gallery.php
import Bottombar from "../components/Bottombar"; // Placeholder for bottombar.php

export default function CTPage() {
  const styleTop = ""; // Replace with dynamic style if needed

  return (
    <>
      <Head>
        <title>CT Page</title>
      </Head>

      <div className="min-h-screen bg-white flex flex-col">
        {/* Topbar */}
        <Topbar />

        {/* Main Content */}
        <div className={`container-xxl bg-white hero-header mb-0 px-0 relative ${styleTop}`}>
          <CTVerify />
        </div>

        {/* Gallery Section */}
        <CTGallery />

        {/* Bottom Navigation / Footer */}
        <Bottombar />
      </div>
    </>
  );
}
