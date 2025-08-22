// components/EarningsSection.js
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function EarningsSection({ siteTitle = "YOUR_SITE_TITLE" }) {
  return (
    <div className="container-xxl bg-success py-5">
      <div className="container">
        <div className="row g-4">
          {/* Title */}
          <div
            className="col-12 text-center py-5 wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <span className="position-relative">
              <span className="position-absolute built_for_top text-white">
                Built for
              </span>
              <span className="fw-bolder display-1 text-white">EVERYONE!</span>
              <span className="position-absolute built_for_bottom text-white">
                Car Owner or Not.
              </span>
            </span>
          </div>

          {/* Image */}
          <div className="col-lg-6 pt-lg-2">
            <div
              className="text-center wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <Image height={400} width={400}  className="img-fluid" src="/img/earnings_new.png" alt="Earnings" />
            </div>
          </div>

          {/* Programs */}
          <div className="col-lg-6">
            <div
              className="text-center wow fadeInUp py-5"
              data-wow-delay="0.3s"
            >
              <h4 className="text-white">
                Earn{" "}
                <em className="fs-2 text-decoration-underline text-warning">
                  Passive Income
                </em>{" "}
                on <br />
                {siteTitle.toUpperCase()} in{" "}
                <span className="fs-2 text-warning">1</span> of{" "}
                <span className="fs-2 text-warning">2</span> ways.
              </h4>
              <div className="fst-italic text-white small">
                (or all 2 ways if you&apos;re feeling lucky!)
              </div>
            </div>

            <div className="row g-4">
              {/* Referral Program */}
              <div
                className="col-12 wow fadeInUp mb-lg-4"
                data-wow-delay="0.1s"
              >
                <div className="rounded position-relative shadow p-2 card">
                  <div className="card-body">
                    <Link href="/referral-program">
                      <div className="position-absolute top-0 start-0 pt-2 ps-2">
                        <i className="text-primary border border-primary rounded-pill fas fa-share-alt fa-2x p-2"></i>
                      </div>
                      <div className="text-lg-center text-end ps-5 ps-lg-0">
                        <h6 className="fs-5">
                          Share your Referral Code
                          <div className="text-muted txtSizeNormal1 text-lg-center text-end pt-1 fst-italic">
                            For Everyone
                          </div>
                        </h6>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Placeholder for Verified Agent Program (was PHP comment) */}
              {/* 
                <div className="col-12 wow fadeInUp" data-wow-delay="0.1s">
                  <div className="rounded position-relative shadow p-2 card">
                    <div className="card-body">
                      <Link href="/verified-agents">
                        <div className="position-absolute top-0 start-0 pt-2 ps-2">
                          <i className="text-primary border border-primary rounded-pill fas fa-user-tie fa-2x p-2"></i>
                        </div>
                        <div className="text-lg-center text-end ps-5 ps-lg-0">
                          <h6 className="fs-5">
                            Join our VA Program
                            <div className="text-muted txtSizeNormal1 text-lg-center text-end pt-1 fst-italic">
                              For Merchants, Vendors & Service Agents
                            </div>
                          </h6>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              */}

              {/* Peer-to-Peer Program */}
              <div
                className="col-12 wow fadeInUp mb-lg-4"
                data-wow-delay="0.1s"
              >
                <div className="rounded position-relative shadow p-2 card">
                  <div className="card-body">
                    <Link href="/peer-to-peer-program">
                      <div className="position-absolute top-0 start-0 pt-2 ps-2">
                        <i className="text-primary border border-primary rounded-pill fas fa-store-alt fa-2x p-2"></i>
                      </div>
                      <div className="text-lg-center text-end ps-5 ps-lg-0">
                        <h6 className="fs-5">
                          Join our <abbr title="Peer to Peer">P2P</abbr> Get
                          Now-Pay Later Program
                          <div className="text-muted txtSizeNormal1 text-lg-center text-end pt-1 fst-italic">
                            For Everyone
                          </div>
                        </h6>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Footer Text */}
              <div
                className="col-12 text-end text-white py-3 fs-6 fst-italic wow fadeInUp"
                data-wow-delay="0.1s"
              >
                Speak of opportunities and making money online.{" "}
                <i className="fas fa-chart-line ms-2"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
