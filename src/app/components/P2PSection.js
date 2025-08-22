// components/P2PSection.js
import Image from "next/image";
import Link from "next/link";

export default function P2PSection({ siteTitle = "YourApp", heroBgStyle }) {
  return (
    <section className="relative">
      {/* Hero Background Placeholder */}
      <div style={heroBgStyle}></div>

      <div className="container mx-auto py-10 lg:py-20">
        <div className="flex justify-center">
          <div className="w-full bg-white shadow-xl rounded-2xl p-6 lg:p-12 -mt-40">
            {/* Overlay Header */}
            <h6 className="absolute top-40 left-1/2 transform -translate-x-1/2 bg-black/20 text-white text-lg md:text-2xl px-4 py-2 italic rounded">
              Introducing Our Peer-to-Peer Get Now-Pay Later Program
            </h6>

            <div className="grid lg:grid-cols-2 gap-8 mt-16">
              {/* Left Content */}
              <div className="text-center">
                <div className="mb-4">
                  <i className="fas fa-seedling text-primary text-5xl"></i>
                </div>
                <h4 className="text-primary font-semibold text-xl">
                  Earn Returns on Your Investment
                </h4>
                <p className="text-gray-700 mt-2">
                  Join our innovative program that connects customers with
                  investors for automotive service Get Now-Pay Later.
                </p>

                <div className="mt-6">
                  <Image
                    src="/img/p2p_mobile.png"
                    alt="Peer to peer"
                    width={500}
                    height={400}
                    className="mx-auto rounded-xl"
                  />
                </div>
              </div>

              {/* Right Content */}
              <div className="flex flex-col justify-center space-y-6">
                <div className="text-center">
                  <h5 className="text-lg font-semibold">Here’s how it works</h5>
                </div>

                {/* Step 1 */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <i className="fa fa-search-plus text-white"></i>
                  </div>
                  <div className="ml-4">
                    <h6 className="font-semibold">Browse Requests</h6>
                    <p className="text-gray-600">
                      Browse and select approved requests to finance based on
                      risk level.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <i className="fa fa-chart-line text-white"></i>
                  </div>
                  <div className="ml-4">
                    <h6 className="font-semibold">Reliable Returns</h6>
                    <p className="text-gray-600">
                      Benefit from secure transactions and reliable returns.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <i className="fa fa-user-tie text-white"></i>
                  </div>
                  <div className="ml-4">
                    <h6 className="font-semibold">Recovery Management</h6>
                    <p className="text-gray-600">
                      {siteTitle.toUpperCase()} manages recovery of investments
                      from customers.
                    </p>
                  </div>
                </div>

                {/* Outro */}
                <p className="text-gray-700">
                  {siteTitle.toUpperCase()} ensures a secure and efficient
                  process, connecting customers with investors and handling
                  recovery of investments for a seamless Get Now-Pay Later
                  experience.
                </p>

                {/* CTA */}
                <div className="text-center">
                  <Link
                    href="/approved-requests"
                    className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all"
                  >
                    Browse Approved Requests
                    <i className="fas fa-play-circle"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </section>
  );
}
