"use client"
import { useState } from "react";

export default function ServiceCard({
  pCodeDetails,       // [total_paid, total_amount, installments]
  productsArray,      // mapping product codes to names
  showDLFormArray,    // array of codes that need DL forms
  getUserDLInfo,      // function to get user license info
  returnAmount,       // function to format amount
  progressBg,         // function to get progress bar color class
  currentUserId,      // session user id
}) {
  const [showDelete, setShowDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [totalPaid, totalAmount, installments] = pCodeDetails;
  const productName = productsArray?.[pCodeDetails?.[3]] || "Unknown Product"; // Assuming pCode is passed as index 3
  let percentagePaid = 0;

  if (totalAmount > 0) {
    if (totalPaid > 0) {
      percentagePaid = Math.round((totalPaid / totalAmount) * 100);
      percentagePaid = Math.min(percentagePaid, 100);
    }
  } else {
    percentagePaid = 100;
  }

  const progressClass = progressBg(percentagePaid);
  const hasDLForm = showDLFormArray.includes(pCodeDetails[3]);
  const dlInfo = hasDLForm ? getUserDLInfo(currentUserId) : null;
  const applicationTitle = dlInfo !== "-1" ? "View application" : "Fill application";

  return (
    <div className="col-lg-4 mb-3">
      <div className="card shadow position-relative">
        <div className="card-body py-3">
          <div className="text-center">
            <i className="fas fa-id-card fs-1"></i>
          </div>

          <h5 className="text-center border-bottom py-2">
            {productName}
            {totalAmount > 0 && (
              <a
                className="d-block card-sm-font py-1"
                href={`operations?opt=add-service&id=${pCodeDetails[3]}&edit=true`}
              >
                <i className="fas fa-edit me-1"></i>Edit details
              </a>
            )}
          </h5>

          <div className="row py-2">
            <div className="col-12 pt-2">
              <div className="progress" style={{ height: "30px" }}>
                <div
                  className={`progress-bar ${progressClass} progress-bar-striped progress-bar-animated`}
                  role="progressbar"
                  style={{ width: `${percentagePaid}%` }}
                  aria-valuenow={percentagePaid}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {percentagePaid}%
                </div>
              </div>

              {hasDLForm && (
                <div className="row">
                  <div className="col-5 pt-2">
                    <a
                      href="dl-application-form"
                      className="card-sm-font text-danger text-decoration-none"
                    >
                      <i className="fas fa-edit me-1"></i>
                      {applicationTitle}
                    </a>
                  </div>
                  <div className="col-7 text-end">
                    <span className="fs-4 text-success">{returnAmount(totalPaid)}</span>
                    <span className="fs-4">/</span>
                    <span className="fs-6">{returnAmount(totalAmount)}</span>
                  </div>
                </div>
              )}

              {!hasDLForm && (
                <div className="text-end">
                  <span className="fs-4 text-success">{returnAmount(totalPaid)}</span>
                  <span className="fs-4">/</span>
                  <span className="fs-6">{returnAmount(totalAmount)}</span>
                </div>
              )}
            </div>
          </div>

          {totalAmount > 0 ? (
            <div className="row py-2 bg-success bg-opacity-75 text-white text-center fs-5">
              <div className="col-12">Installments: {installments}</div>
            </div>
          ) : (
            <div className="row py-2 txtSizeNormal text-center text-danger">
              You have not yet set a budget! <br />
              <a
                className="text-primary text-decoration-none"
                href={`operations?opt=add-service&product_code=${pCodeDetails[3]}`}
              >
                Click here to set a budget
              </a>
            </div>
          )}

          <div className="row py-2 bg-light txtSizeNormal">
            <div className="col-6">
              <a href={`operations?opt=service-pay&product_type=${pCodeDetails[3]}`}>
                <i className="fas fa-plus me-1"></i>Add Payment
              </a>
            </div>
            <div className="col-6 text-end">
              <a
                href={`my-account?view=services&product_code=${pCodeDetails[3]}&opt=receipt`}
              >
                <i className="fas fa-history me-1"></i>Payment History
              </a>
            </div>
          </div>
        </div>

        <button
          className="text-danger position-absolute del_icon_margin fs-4 top-0 end-0 border-0 bg-transparent"
          onClick={() => setShowDelete(true)}
        >
          <i className="fas fa-times-circle"></i>
        </button>

        {showDelete && (
          <div className="py-2">
            <div className="txtSizeNormal">
              Are you sure you want to delete service <em>{productName}</em>?
            </div>
            <div className="alert alert-danger txtSizeNormal">
              <strong>Heads up:</strong> Delete would fail if there are payments associated to this service.
            </div>
            <div>
              <button
                className="btn btn-danger btn-sm me-2 txtSizeNormal"
                onClick={() => setIsDeleting(true)}
              >
                Delete record
              </button>
              <button
                className="btn btn-secondary btn-sm txtSizeNormal"
                onClick={() => setShowDelete(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
