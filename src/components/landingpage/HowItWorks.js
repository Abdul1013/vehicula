import Image from "next/image";

export default function HowItWorks() {
  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="text-center  text-green-600">
          <i className="fas fa-leaf text-green-600"></i>
          <h2>Earn Returns on Your Investment</h2>
          <p>
            Join our innovative program that connects customers with investors
            for automotive service Get Now-Pay Later.
          </p>
        </div>
     <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-12 px-6 md:px-12">
  {/* Phone mockup */}
  <div className="relative w-full mx-auto md:max-w-sm flex justify-center">
    <Image
      src="/images/howitworks.png"
      alt="Vehiculars App Screenshot"
      width={400}
      height={800}
      priority
      className="object-cover"
    />
  </div>

  {/* Text content */}
  <div className="flex-1 space-y-8 text-center md:text-left">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
      Here&apos;s how it works
    </h2>

    <ul className="space-y-6">
      {[
        {
          title: "Browse Requests",
          description:
            "Browse and select approved requests to finance based on risk level",
          icon: "🔍",
        },
        {
          title: "Reliable Returns",
          description:
            "Benefit from secure transactions and reliable returns",
          icon: "💰",
        },
        {
          title: "Recovery Management",
          description:
            "VEHICULARS manages recovery of investments from customers",
          icon: "👤",
        },
      ].map((item, index) => (
        <li key={index} className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-xl">
            {item.icon}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        </li>
      ))}
    </ul>

    <p className="text-gray-700 text-sm leading-relaxed">
      VEHICULARS ensures a secure and efficient process, connecting
      customers with investors and handling recovery of investments for a
      seamless Get Now-Pay Later experience.
    </p>

    <button className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full shadow-lg transition-colors">
      Browse Approved Requests
      <span className="text-lg">▶</span>
    </button>
  </div>
</div>

    </section>
  );
}
