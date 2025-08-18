// components/ServiceCard.js
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard, faEdit, faPlus, faHistory, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export default function ServiceCard({ productCode, productDetails, productsArray, showDLForm, getUserDLInfo, returnAmount }) {
  const [showDelete, setShowDelete] = useState(false);

  const totalAmount = productDetails[1];
  const totalPaid = productDetails[0];
  const installments = productDetails[2];

  let percentagePaid = 0;
  if (totalAmount > 0 && totalPaid > 0) {
    percentagePaid = Math.min(Math.round((totalPaid / totalAmount) * 100), 100);
  } else if (totalAmount <= 0) {
    percentagePaid = 100;
  }

  const progressBg = percentagePaid > 50 ? "bg-success" : "bg-warning"; // Example mapping

  const hasDL = showDLForm.includes(productCode);
  const thisProductName = productsArray[productCode];

  const uid = "currentUserId"; // Replace with your auth context/session
  const userDLInfo = hasDL ? getUserDLInfo(uid) : null;
  const applicationTitle = userDLInfo ? "View application" : "Fill application";

  return (
    <div className="col-lg-4 mb-3">
      <div className="card shadow position-relative">
        <div className="card-body py-3">
          <div className="text-center">
            <FontAwesomeIcon icon={faIdCard} size="2x" />
          </div>
          <h5 className="text-center border-bottom py-2">
            {thisProductName}
            {totalAmount > 0 && (
              <a
                className="d-block card-sm-font py-1"
                href={`/operations?opt=add-service&id=${productCode}&edit=true`}
              >
                <FontAwesomeIcon icon={faEdit} className="me-1" />
                Edit details
              </a>
            )}
          </h5>

          {totalAmount > 0 ? (
            <>
              <div className="row py-2">
                <div className="col-12 pt-2">
                  <div className="progress" style={{ height: "30px" }}>
                    <div
                      className={`progress-bar ${progressBg} progress-bar-striped progress-bar-animated`}
                      role="progressbar"
                      style={{ width: `${percentagePaid}%` }}
                      aria-valuenow={percentagePaid}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {percentagePaid}%
                    </div>
                  </div>

                  {hasDL && (
                    <div className="row">
                      <div className="col-5 pt-2">
                        <a
                          href="/dl-application-form"
                          className="card-sm-font text-danger text-decoration-none"
                        >
                          <FontAwesomeIcon icon={faEdit} className="me-1" />
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

                  {!hasDL && (
                    <div className="text-end">
                      <span className="fs-4 text-success">{returnAmount(totalPaid)}</span>
                      <span className="fs-4">/</span>
                      <span className="fs-6">{returnAmount(totalAmount)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className={`row py-2 bg-success bg-opacity-75 text-white`}>
                <div className="col-12 fs-5 text-center">
                  Installments: {installments}
                </div>
              </div>
            </>
          ) : (
            <div className="row py-2 txtSizeNormal">
              <div className="col-12 mb-2">
                <div className="progress" style={{ height: "30px" }}>
                  <div
                    className={`progress-bar ${progressBg} progress-bar-striped progress-bar-animated`}
                    role="progressbar"
                    style={{ width: `${percentagePaid}%` }}
                  >
                    {percentagePaid}%
                  </div>
                </div>
                {totalPaid > 0 && (
                  <div className="text-end py-3">
                    <span className="fs-4 text-success">{returnAmount(totalPaid)}</span>
                    <span className="fs-4">/</span>
                    <span className="fs-6">{returnAmount(totalPaid)}</span>
                  </div>
                )}
              </div>
              <div className="col-12 text-center text-danger">
                You have not yet set a budget! <br />
                <a
                  className="text-primary text-decoration-none"
                  href={`/operations?opt=add-service&product_code=${productCode}`}
                >
                  Click here to set a budget
                </a>
              </div>
            </div>
          )}

          <div className="row py-2 bg-light txtSizeNormal">
            <div className="col-6">
              <a href={`/operations?opt=service-pay&product_type=${productCode}`}>
                <FontAwesomeIcon icon={faPlus} className="me-1" />
                Add Payment
              </a>
            </div>
            <div className="col-6 text-end">
              <a href={`/my-account?view=services&product_code=${productCode}&opt=receipt`}>
                <FontAwesomeIcon icon={faHistory} className="me-1" />
                Payment History
              </a>
            </div>
          </div>
        </div>

        {/* Delete Section */}
        <a
          href="#"
          className="text-danger position-absolute del_icon_margin fs-4 top-0 end-0"
          onClick={() => setShowDelete(!showDelete)}
        >
          <FontAwesomeIcon icon={faTimesCircle} />
        </a>

        {showDelete && (
          <div className="py-2">
            <form method="POST">
              <input type="hidden" name="txtProductIDDelete" value={productCode} />
              <div className="txtSizeNormal py-2">
                Are you sure you want to delete service <em>{thisProductName}</em>?
              </div>
              <div className="alert alert-danger txtSizeNormal">
                <strong>Heads up:</strong> Delete would fail if there are payments associated with this service.
              </div>
              <button type="submit" className="btn btn-danger btn-sm me-2 txtSizeNormal">
                Delete record
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm cancelBtnModal txtSizeNormal"
                onClick={() => setShowDelete(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
