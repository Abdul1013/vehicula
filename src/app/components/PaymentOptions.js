"use client";
import Link from "next/link";
import Image from "next/image";

export default function PaymentOptions() {
  // 🔹 Placeholder for backend-driven theme (was `$mobile_light` in PHP)
  const cardTheme = "bg-white dark:bg-neutral-900";

  return (
    <section className="w-full bg-white dark:bg-neutral-950">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center px-6 lg:px-12 py-12">

        {/* TEXT & OPTIONS */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="text-center lg:text-left space-y-4">
            <h4 className="text-2xl lg:text-3xl font-semibold">
              Enjoy Flexible Payment Options
            </h4>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
              Managing vehicle-related expenses has never been easier. Our flexible 
              payment solutions are designed to help you access our services and products 
              without financial strain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Payment */}
            <Link href="/full-payment-option" className={`relative rounded-2xl shadow-md p-6 transition hover:shadow-lg ${cardTheme}`}>
              <div className="absolute top-4 left-4">
                <span className="text-primary border border-primary rounded-full px-3 py-1 text-lg font-medium">
                  1
                </span>
              </div>
              <div className="text-center space-y-3">
                <i className="fas fa-credit-card text-primary text-3xl" />
                <h6 className="text-lg font-semibold">Full Payment</h6>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Pay the total amount upfront for any of our services.
                </p>
              </div>
            </Link>

            {/* Easy Installments */}
            <Link href="/easy-installments-program" className={`relative rounded-2xl shadow-md p-6 transition hover:shadow-lg ${cardTheme}`}>
              <div className="absolute top-4 left-4">
                <span className="text-primary border border-primary rounded-full px-3 py-1 text-lg font-medium">
                  2
                </span>
              </div>
              <div className="text-center space-y-3">
                <i className="fas fa-piggy-bank text-primary text-3xl" />
                <h6 className="text-lg font-semibold">Easy Installments</h6>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Spread the cost over manageable installments.
                </p>
              </div>
            </Link>
          </div>

          {/* Get Now-Pay Later */}
          <Link href="/get-now-program" className={`relative rounded-2xl shadow-md p-6 transition hover:shadow-lg ${cardTheme}`}>
            <div className="absolute top-4 left-4">
              <span className="text-primary border border-primary rounded-full px-3 py-1 text-lg font-medium">
                3
              </span>
            </div>
            <div className="text-center space-y-3">
              <i className="fas fa-coins text-primary text-3xl" />
              <h6 className="text-lg font-semibold">Get Now-Pay Later Plan</h6>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Tailored Get Now-Pay Later plans with competitive interest rates and 
                easy repayment terms for individuals and businesses.
              </p>
            </div>
          </Link>
        </div>

        {/* IMAGE */}
        <div className="lg:col-span-4 flex justify-center lg:justify-end">
          <Image
            src="/img/happy_customer_sm.jpg"
            alt="Payment options"
            width={400}
            height={400}
            className="rounded-lg object-cover shadow-md"
            priority
          />
        </div>
      </div>
    </section>
  );
}
