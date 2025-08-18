import Image from "next/image";
import Link from "next/link";

export default function DocumentVerification() {
  return (
    <section className="py-16 md:py-24 bg-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center max-w-5xl mx-auto">
          {/* Text Section */}
          <div className="w-full md:w-2/3">
            <h2 className="text-green-500 text-4xl md:text-5xl font-bold mb-4">
              Are your documents genuine?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              It is now easy to verify your documents. A quick search
              should return your vehicle registration details, if your
              documents are valid.
            </p>
            <div className="flex space-x-3">
              <Link
                href="/verify"
                className="inline-flex px-8 py-3 text-lg font-medium rounded-full 
                  border-2 border-green-600 text-green-600 
                  hover:bg-green-600 hover:text-white 
                  transition-colors shadow-md"
              >
                Verify Lagos
              </Link>
              <Link
                href="/verify"
                className="inline-flex px-8 py-3 text-lg font-medium rounded-full 
                  border-2 border-green-600 text-green-600 
                  hover:bg-green-600 hover:text-white 
                  transition-colors shadow-md"
              >
                Verify Abuja
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative w-full md:w-1/3  md:h-[500px] mt-10 md:mt-0">
            <Image
              src="/images/person_check.jpg"
              alt="person check"
              fill
              className="object-contain rounded-lg shadow-md"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
