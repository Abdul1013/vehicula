import Link from "next/link";
import Topbar from "@/components/Topbar";
import AffiliatesContent from "@/components/AffiliatesContent";
import Gallery from "@/components/Gallery";
import Bottombar from "@/components/Bottombar";

export default function AffiliatesPage() {
  return (
    <>

      <div className="container-xxl bg-white hero-header mb-0 px-0 relative">
        {/* Breadcrumb */}
        <div className="container absolute pad_breadcrumb">
          <nav aria-label="breadcrumb" className="small mt-2">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Affiliates
              </li>
            </ol>
          </nav>
        </div>

        {/* Affiliates Section */}
        <div className="pt-lg-5 mt-5">
          <AffiliatesContent />
        </div>
      </div>

      <Gallery />
    </>
  );
}
