// app/page.js (or any route you choose in the App Router)
import Image from 'next/image';

export default function UpdateContentPage() {
  const dumpContent = "Your dynamic content here"; // Replace with your actual dynamic value or fetch from API

  return (
    <div className="bg-white min-h-screen">
      {/* Top spacing */}
      <div className="py-3"></div>
      <div className="hidden lg:block py-20"></div>

      {/* Main container */}
      <div className="container mx-auto px-4">
        <div className="bg-white">
          <div className="text-center">
            <h4 className="py-2 border-b text-xl font-semibold">{dumpContent}</h4>

            <div className="py-5">
              {/* Loading / updating content section */}
              <div className="flex items-center justify-center mb-3 space-x-2">
                <Image
                  src="/img/loading.gif"
                  alt="Loading"
                  width={24}
                  height={24}
                  className="inline-block"
                />
                <span className="text-gray-700">Updating content...</span>
              </div>
              <p className="text-sm text-gray-500">
                This may take a couple of minutes, hours, or days. We will notify you as soon as content is available.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Optional bottom spacing */}
      <div className="py-10"></div>
    </div>
  );
}
