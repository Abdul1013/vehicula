"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Topbar from "@/components/Topbar";
import Bottombar from "@/components/Bottombar";

// Example helpers (replace with your real logic)
function returnStatusBadge(status) {
  switch (status) {
    case "active": return <span className="badge bg-success">Active</span>;
    case "inactive": return <span className="badge bg-secondary">Inactive</span>;
    default: return <span className="badge bg-warning">Unknown</span>;
  }
}

function returnDateStr(dateStr) {
  return new Date(dateStr).toLocaleDateString();
}

export default function CustomerView({ v }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/ag-customer-view?opt=search&q=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <div className="container-fluid bg-white hero-header mb-0 text-primary">
        <div className="container" style={{ marginTop: "-30px" }}>
          <div className="row">
            
            {/* Caption */}
            <div className="col-12 px-0 text-center mb-3">
              <h5>{v?.customer_view_caption}</h5>
            </div>

            {/* Error */}
            <div className="col-12 px-0">
              {v?.error_txt && <div className="text-danger">{v.error_txt}</div>}
            </div>

            {/* Search */}
            <div className="col-12 col-lg-6 offset-lg-3 mb-4 px-0">
              <form onSubmit={handleSearch}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    style={{ fontSize: "13px" }}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search Customer ID, Name, Phone, Email..."
                    required
                  />
                  <button className="btn btn-outline-secondary" type="submit">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </form>
            </div>

            {/* Table */}
            <div className="col-12 px-0 py-2 table-responsive">
              <table className="table table-bordered table-hover table-striped">
                <thead>
                  <tr>
                    <th><i className="fas fa-person-booth px-2"></i></th>
                    <th>UID</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Join date</th>
                  </tr>
                </thead>
                <tbody>
                  {v?.records_to_return?.length > 0 ? (
                    v.records_to_return.map((record) => (
                      <tr key={record.bk_uid}>
                        <td>
                          <a
                            title="View customer account"
                            href={`/ag-switch-customer?id=${record.bk_uid}`}
                            className="px-2"
                          >
                            <i className="fas fa-person-booth"></i>
                          </a>
                        </td>
                        <td>{record.bk_uid}</td>
                        <td>{record.bk_customer_full_name}</td>
                        <td>{record.bk_phone_number}</td>
                        <td>{record.bk_email}</td>
                        <td>{returnStatusBadge(record.bk_status)}</td>
                        <td>{returnDateStr(record.bk_entry_date)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">No records found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="my-3 col-12 px-0">
              {v?.pagination ? (
                <div dangerouslySetInnerHTML={{ __html: v.pagination }} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
