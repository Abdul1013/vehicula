import Image from "next/image";
import React from "react";

// Placeholder constants for backend data
const SITE_TITLE = "AutoServices";
const FALL_BACK = "/";

const FullPaymentDashboard = () => {
  return (
    <div className="container-xxl bg-white hero-header px-0 position-relative">
      {/* Breadcrumb */}
      <div className="container position-absolute pad_breadcrumb">
        <nav aria-label="breadcrumb" className="small mt-2">
          <ol className="breadcrumb">
            <li className="breadcrumb-item small">
              <a href={FALL_BACK}>Home</a>
            </li>
            <li className="breadcrumb-item small">
              <a href="/payment-options">Payment Options</a>
            </li>
            <li className="breadcrumb-item small active" aria-current="page">
              Full Payment
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero Section */}
      <div className="pt-lg-5 mt-5 container">
        <div className="row">
          <div className="col-12 mb-3 text-center">
            <h3 className="mb-2">Full Payment Option at {SITE_TITLE}</h3>
            <h6 className="text-muted fst-italic">
              Get Immediate Access to Services and Products
            </h6>
          </div>
        </div>

        <div className="row d-flex align-items-center">
          <div className="col-lg-6 mb-4">
            <figure>
              <div className="text-center">
                <Image height={400} width={400} 
                  src="/img/hero_new.jpg"
                  className="img-fluid rounded shadow-sm"
                  alt="A customer making a full payment online."
                />
              </div>
              <figcaption className="small fst-italic">
                Make a one-time full payment and enjoy immediate access to
                services and products.
              </figcaption>
            </figure>
          </div>
          <div className="col-lg-6 mb-4 fs-5">
            <p>
              At {SITE_TITLE}, we understand that some customers prefer to
              complete their purchases with a single payment. Our Full Payment
              Option allows you to pay the entire amount upfront, ensuring
              immediate access to the services and products you need.
            </p>
            <div className="mt-4">
              <button className="btn btn-outline-primary rounded-pill px-4 py-2">
                Get Started Today
              </button>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="row mt-5">
          <div className="col-12">
            <h5>How It Works</h5>
            <p>The Full Payment Option is straightforward and simple:</p>
            <h6>Key Features:</h6>
            <ul>
              <li>
                <strong>Immediate Access: </strong>Gain instant access after
                payment.
              </li>
              <li>
                <strong>No Additional Costs: </strong>No hidden fees or extra
                charges.
              </li>
            </ul>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="row d-flex align-items-center mt-4">
          <div className="col-lg-6 mb-4">
            <h5>Benefits of Full Payment:</h5>
            <ul>
              <li>
                <strong>Instant Delivery:</strong> Receive products/services
                immediately.
              </li>
              <li>
                <strong>No Price Fluctuations:</strong> Lock in current price.
              </li>
              <li>
                <strong>Simplicity:</strong> One-time payment, no ongoing
                installments.
              </li>
            </ul>
          </div>
          <div className="col-lg-6 mb-4 text-center">
            <Image height={400} width={400} 
              src="/img/delivery3.jpg"
              className="img-fluid rounded shadow-sm"
              alt="Happy customer receiving a product."
            />
            <figcaption className="small fst-italic">
              Get the products you need today when you pay in full.
            </figcaption>
          </div>
        </div>

        {/* Application Steps */}
        <div className="row mt-5">
          <div className="col-12">
            <h5>Applying for the Full Payment Option</h5>
            <p>
              Follow these steps to complete a full payment and access services
              immediately:
            </p>
            <ul>
              <li>
                <strong>Select Product/Service:</strong> Browse available options
                at {SITE_TITLE}.
              </li>
              <li>
                <strong>Choose Full Payment:</strong> Select full payment at
                checkout.
              </li>
              <li>
                <strong>Complete Payment:</strong> Pay the full amount in one
                transaction.
              </li>
              <li>
                <strong>Receive Service/Product:</strong> Enjoy instant access
                after payment.
              </li>
            </ul>
            <div className="mt-4">
              <button className="btn btn-outline-primary rounded-pill px-4 py-2">
                Opt for Full Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPaymentDashboard;
