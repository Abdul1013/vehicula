import Image from "next/image";

const paymentOptions = [
  {
    id: 1,
    title: "Full Payment",
    description: "Pay the total amount upfront for any of our services.",
    icon: "💳", 
  },
  {
    id: 2,
    title: "Easy Installments",
    description: "Spread the cost over manageable installments.",
    icon: "🐷", 
  },
  {
    id: 3,
    title: "Get Now–Pay Later Plan",
    description: "Access services immediately and pay at a later date.",
    icon: "💰", 
  },
];

export default function PaymentOptions() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Heading Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Enjoy Flexible Payment Options.
          </h2>
          <p className="text-gray-600 mt-4">
            Managing vehicle-related expenses has never been easier. Our flexible payment
            solutions are designed to help you access our services and products without
            financial strain.
          </p>
        </div>

        {/* Content Section */}
        <div className="flex flex-col md:flex-row md:space-x-6 items-center">
          {/* Payment Options Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            {paymentOptions.map((option) => (
              <div
                key={option.id}
                className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 border border-gray-100"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full border border-green-500 text-green-500 font-bold">
                  {option.id}
                </div>
                <div>
                  <h3 className="flex items-center gap-2 font-semibold text-lg text-gray-800">
                    <span>{option.icon}</span> {option.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Image Section */}
          <div className="flex-1 mt-10 md:mt-0 relative h-72 md:h-[400px] w-full">
            <Image
              src="/images/paymentoptions.png" 
              alt="Happy customer celebrating flexible payment"
              fill
              className="object-cover rounded-lg shadow-md"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
