import React from "react";
import { motion } from "framer-motion";
import PaymentOptions from "./PaymentOptions";
import Gallery from "./Gallery";

export default function DashboardPage({
  siteTitle = "Your Brand",
  chatNo = "2348012345678",
  styleTop = "",
  lineBr = <br />,
}) {
  return (
    <div className="bg-white">

      {/* Hero Section */}
      <div
        className={`container-xxl hero-header mb-0 ${styleTop}`}
        style={{
          background: "url('img/custom_bg_animation.gif') no-repeat center center",
          backgroundSize: "cover",
        }}
      >
        <div className="row mx-auto">
          <div className="col-12 text-center mb-5 mt-3">
            <motion.h1
              className="text-4xl font-bold text-orange-600 leading-snug"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Now at last!! You Can now get your drivers licence without any
              Stress or delay. Guaranteed!!
            </motion.h1>

            {/* Subtext */}
            <div className="col-12 col-lg-10 offset-lg-1 py-3 space-y-3 text-lg">
              <p className="font-semibold">
                If you are a car owner/driver in Abuja or Lagos and you don't
                want to go through any stress...
              </p>
              <p className="font-semibold">Then this is good news for you.</p>
              <p className="font-semibold">
                My friend, Obtaining a drivers licence can be complex and
                time-consuming.
              </p>
              <p className="font-semibold">
                You have to visit government offices and stand in long queues...
              </p>
              <p className="font-semibold">
                Sometimes, you even get stranded at these offices due to unclear
                instructions.
              </p>
              <p className="font-semibold">
                It's time to say goodbye to all these stress because{" "}
                {siteTitle.toUpperCase()} is here for you.
              </p>

              <p className="text-gray-700">
                We have helped 12,000+ car owners & drivers obtain their
                licence. <span className="text-orange-600">We want to help you too.</span>
              </p>
            </div>

            {/* Call to Action */}
            <div className="mt-6 flex flex-col lg:flex-row items-center justify-center gap-4">
              <a
                href={`https://api.whatsapp.com/send?phone=${chatNo}`}
                className="btn btn-primary rounded-full px-6 py-3 font-bold flex items-center gap-2"
              >
                <i className="fab fa-whatsapp fa-lg"></i> Chat with us
              </a>
              <span className="text-lg font-semibold">OR</span>
              <a
                href="register"
                className="btn btn-outline-primary rounded-full px-6 py-3 font-semibold flex items-center gap-2"
              >
                Get started online <i className="fas fa-play-circle"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* What we do */}
      <div className="container-xxl bg-white px-0">
        <div className="row d-flex">
          <div className="col-12 col-lg-6">
            <img
              src="img/what_we_do.jpg"
              alt="What we do"
              className="img-fluid"
            />
          </div>
          <div className="col-12 col-lg-6 d-flex items-center p-6">
            <div>
              <h4 className="text-2xl font-bold mb-3">
                What you need to know about Drivers Licence
              </h4>
              <p className="mb-3">
                It is mandatory for every driver to have an original drivers
                licence to drive on Nigerian roads.
              </p>
              <p className="mb-3">
                At {siteTitle.toUpperCase()}, we assist you with the process...
              </p>
              <p className="mb-3">
                Even if you don't have full payment, we offer flexible options...
              </p>
              <p className="font-bold text-green-600">
                This opportunity is also for companies with fleets.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Options */}
      <PaymentOptions lineBr={lineBr} />

      {/* FAQ Section */}
      <div className="container-xxl py-10">
        <h2 className="text-center text-3xl font-semibold mb-6">
          Drivers Licence Frequently Asked Questions
        </h2>
        {/* Placeholder for FAQ accordion */}
        <div className="accordion">
          {/* map FAQ items here */}
        </div>
        <div className="text-end mt-6">
          <a href="faqs" className="font-semibold text-dark underline">
            <i className="fas fa-question-circle text-green-600"></i> Need more
            help?
          </a>
        </div>
      </div>

      {/* Gallery */}
      <Gallery />


    </div>
  );
}
