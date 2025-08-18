"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Example helpers
function returnTrendArrow(current, prev) {
  if (current > prev) return <i className="fas fa-arrow-up text-success"></i>;
  if (current < prev) return <i className="fas fa-arrow-down text-danger"></i>;
  return <i className="fas fa-minus text-muted"></i>;
}

function returnLastTransactionDuration() {
  return 30; // placeholder: plug in real logic/config
}

function returnMinimumPercentForNotification() {
  return 80; // placeholder: plug in real logic/config
}

export default function Dashboard({ v }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const activeCustomers = v?.customers_summary || [0, 0, 0];

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/ag-customer-view?opt=search&q=${encodeURIComponent(query)}`);
  };

  return (
    <>
 
      <div className="container-fluid bg-white hero-header mb-0 text-primary">
        <div className="container" style={{ marginTop: "-30px" }}>
          {/* <DashboardMenu /> */}

          <div className="row">
            <div className="col-12 px-0">
              <div className="clearfix small">
                
                {/* Referral Code */}
                <div className="mb-4 float-start">
                  <span className="small">Referral code:</span>{" "}
                  <div className="ref_code_container d-lg-inline fw-bold">
                    {v?.agent_reff}
                  </div>
                  <div className="tooltip_a">
                    <button
                      data-copy-id="myTooltip"
                      data-copy-txt={v?.agent_reff}
                      className="btnCopyClipboard btn btn-light btn-sm card-sm-font"
                      onClick={() => navigator.clipboard.writeText(v?.agent_reff)}
                    >
                      <i className="fas fa-copy me-1"></i>Copy code
                    </button>
                  </div>
                </div>

                {/* Add Customer */}
                <div className="mb-4 float-end pt-3 pt-lg-1">
                  <a
                    href="/ag-manage-customer?do=add"
                    className="fw-bold fs-6 text-decoration-underline hvr-icon-bob"
                  >
                    <i className="fas fa-user-plus me-1 hvr-icon"></i>
                    Add Customer
                  </a>
                </div>
              </div>

              {/* Error */}
              {v?.error_txt && (
                <div className="row">
                  <div className="col-12 py-4 small text-danger">
                    {v.error_txt}
                  </div>
                </div>
              )}

              {/* Search */}
              <div className="row">
                <div className="col-12 col-lg-6 offset-lg-3 mb-4">
                  <form onSubmit={handleSearch}>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        style={{ fontSize: "13px" }}
                        placeholder="Search Customer ID, Name, Phone, Email..."
                        required
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="submit"
                      >
                        <i className="fas fa-search"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="row">
                
                {/* Customers */}
                <div className="col-lg-4 offset-lg-2 mb-3">
                  <div className="card shadow">
                    <div className="card-header">Customers</div>
                    <div className="card-body py-3">
                      <h4 className="pb-0">
                        <a
                          href="/ag-customer-view?opt=today"
                          className="text-decoration-none"
                          title="Customers onboarded"
                        >
                          {activeCustomers[0].toLocaleString()}
                        </a>
                        <i className="fas fa-users fs-1 text-muted float-end"></i>
                      </h4>
                      <div className="card-sm-font mb-3">Onboarded</div>
                      <div className="row">
                        <div className="col-6 py-2 bg-light">
                          <h6 className="pb-0">
                            <a
                              href="/ag-customer-view?opt=last-week"
                              className="text-decoration-none me-2"
                            >
                              {activeCustomers[1].toLocaleString()}{" "}
                              {returnTrendArrow(activeCustomers[1], activeCustomers[2])}
                            </a>
                          </h6>
                          <div className="card-sm-font">Last week</div>
                        </div>
                        <div className="col-6 py-2 bg-light text-end">
                          <h6 className="pb-0">
                            <a
                              href="/ag-customer-view?opt=this-week"
                              className="text-decoration-none me-2"
                            >
                              {activeCustomers[2].toLocaleString()}{" "}
                              {returnTrendArrow(activeCustomers[2], activeCustomers[1])}
                            </a>
                          </h6>
                          <div className="card-sm-font">This week</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Require Attention */}
                <div className="col-lg-4 mb-3">
                  <div className="card shadow">
                    <div className="card-header text-danger">Require Attention</div>
                    <div className="card-body py-3">
                      <div className="row">
                        <div className="col-6 py-2">
                          <h6 className="pb-0">
                            <a
                              href="/ag-customer-view?opt=cover"
                              className="text-decoration-none text-danger"
                            >
                              {Number(v?.transactionsAboveMin || 0).toLocaleString()}
                            </a>
                          </h6>
                          <div className="card-sm-font">Cover note required</div>
                        </div>
                        <div className="col-6 py-2 text-end">
                          <h6 className="pb-0">
                            <a
                              href="/ag-customer-view?opt=over"
                              className="text-decoration-none text-danger"
                            >
                              {Number(v?.overMinPerc || 0).toLocaleString()}
                            </a>
                          </h6>
                          <div className="card-sm-font">
                            Over {returnMinimumPercentForNotification()}% paid
                          </div>
                        </div>
                        <div className="col-12">
                          <hr className="my-1" />
                        </div>
                        <div className="col-6 py-2">
                          <h6 className="pb-0">
                            <a
                              href="/ag-customer-view?opt=overdue"
                              className="text-decoration-none text-danger"
                            >
                              {Number(v?.aboveExpiryDate || 0).toLocaleString()}
                            </a>
                          </h6>
                          <div className="card-sm-font">Overdue loans</div>
                        </div>
                        <div className="col-6 py-2 text-end">
                          <h6 className="pb-0">
                            <a
                              href="/ag-customer-view?opt=full"
                              className="text-decoration-none text-danger"
                            >
                              {Number(v?.fullPayment || 0).toLocaleString()}
                            </a>
                          </h6>
                          <div className="card-sm-font">Full payment</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Last transaction over X days */}
                <div className="col-lg-4 mb-3">
                  <div className="card shadow">
                    <div className="card-body py-3">
                      <h4 className="pb-0">
                        <a
                          href="/ag-customer-view?opt=above-days"
                          className="text-decoration-none"
                        >
                          {Number(v?.transaction_above_x_days || 0).toLocaleString()}
                        </a>
                        <i className="fas fa-clock-o fs-1 text-muted float-end"></i>
                      </h4>
                      <div className="card-sm-font mb-3">
                        Last transaction over {returnLastTransactionDuration()} days
                      </div>
                    </div>
                  </div>
                </div>

                {/* No transactions */}
                <div className="col-lg-4 mb-3">
                  <div className="card shadow">
                    <div className="card-body py-3">
                      <h4 className="pb-0">
                        <a
                          href="/ag-customer-view?opt=no-transactions"
                          className="text-decoration-none"
                        >
                          {Number(v?.no_transactions || 0).toLocaleString()}
                        </a>
                        <i className="fas fa-folder-open fs-1 text-muted float-end"></i>
                      </h4>
                      <div className="card-sm-font mb-3">
                        No transactions since registration
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total Onboarded */}
                <div className="col-lg-4 mb-3">
                  <div className="card shadow">
                    <div className="card-body py-3">
                      <h4 className="pb-0">
                        <a
                          href="/ag-customer-view?opt=onboarded"
                          className="text-decoration-none"
                        >
                          {Number(v?.totalOnboard || 0).toLocaleString()}
                        </a>
                        <i className="fas fa-users fs-1 text-muted float-end"></i>
                      </h4>
                      <div className="card-sm-font mb-3">Total onboarded</div>
                    </div>
                  </div>
                </div>

                {/* Delivered */}
                <div className="col-lg-4 mb-3">
                  <div className="card shadow">
                    <div className="card-body py-3">
                      <h4 className="pb-0">
                        <a
                          href="/ag-customer-view?opt=delivered"
                          className="text-decoration-none"
                        >
                          {Number(v?.delivered_jobs || 0).toLocaleString()}
                        </a>
                        <i className="fas fa-check-circle fs-1 text-muted float-end"></i>
                      </h4>
                      <div className="card-sm-font mb-3">Delivered (Customers)</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
  
    </>
  );
}
