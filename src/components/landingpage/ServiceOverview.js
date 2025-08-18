import Image from "next/image";

export default function ServicesOverview() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 py-12 md:py-20 bg-white">
      {/* Left: Image */}
      <div className="w-full md:w-1/2 mb-8 md:mb-0">
        <Image
          src="/images/hero_new.jpg"
          alt="Customer support"
          className="rounded-lg w-full h-auto object-cover"
          width={800}
          height={800}
        />
      </div>

      {/* Right: Text Content */}
      <div className="w-full md:w-1/2 md:pl-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          See{" "}
          <span className="text-green-600 italic font-semibold">exactly</span>{" "}
          what we do.
        </h2>

        <p className="text-gray-700 mb-4 leading-relaxed">
          At VEHICULARS, you can access a full range of automotive services from
          the comfort of your home. Whether you need Vehicle Registration,
          Vehicle Licensing, Driver&apos;s License Application, Port Clearing
          Services, Spare Parts, Plate Number, Driving School Assistance,
          Comprehensive Insurance, or Roadside Assistance,{" "}
          <span className="text-green-600 font-semibold italic underline">
            we’ve got you covered
          </span>
          .
        </p>

        <p className="text-gray-700 mb-4 leading-relaxed">
          With our expertise and strategic partnerships, we ensure swift and
          reliable service delivery. Plus, our{" "}
          <span className="text-green-600 font-bold italic underline">
            Flexible Get Now–Pay Later Options
          </span>{" "}
          and{" "}
          <span className="text-green-600 font-bold italic underline">
            Installment Plans
          </span>{" "}
          mean you’re never left stranded or facing road safety issues.
        </p>

        <p className="text-gray-700 leading-relaxed">
          Join our community and benefit from our extensive network and{" "}
          <span className="text-green-600 font-bold italic underline">
            Peer-to-Peer (P2P)
          </span>{" "}
          support system, designed to make your vehicle management seamless and
          stress-free.
        </p>
      </div>
    </section>
  );
}
