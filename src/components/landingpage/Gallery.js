import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ImageCarousel() {
  // Placeholder for backend (replace with API or storage fetch)
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Simulate fetching images from backend (e.g. Cloudinary, Supabase storage, etc.)
    setTimeout(() => {
      setImages([
        "/images/vl/v1.jpg",
        "/images/vl/v2.jpg",
        "/images/vl/v3.jpg",
        "/images/vl/v4.jpg",
        "/images/vl/v5.jpg",
        "/images/vl/v6.jpg",
        "/images/vl/v7.jpg",
        "/images/vl/v8.jpg",
        "/images/vl/v9.jpg",
        "/images/vl/v10.jpg",
        "/images/vl/v11.jpg",
        "/images/vl/v12.jpg",
        "/images/vl/v13.jpg",
      ]);
    }, 500);
  }, []);

  // Split into two rows
  const half = Math.ceil(images.length / 2);
  // const carouselRow1 = images.slice(0, half);
  // const carouselRow2 = images.slice(half);
  const carouselRow1 = images;
  const carouselRow2 = images;

  return (
    <div className="w-full overflow-hidden bg-white">
      <div className="flex flex-col gap-6">
        {/* Row 1 */}
        <motion.div
          className="flex gap-4 animate-scroll-left"
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
        >
          {carouselRow1.map((img, idx) => (
            <a key={idx} href={img} className="shrink-0">
              <Image
                src={img}
                width={200}
                height={200}
                alt={`carousel-img-${idx}`}
                className="h-32 w-auto rounded-xl shadow-md hover:scale-105 transition-transform"
              />
            </a>
          ))}
        </motion.div>

        {/* Row 2 */}
        <motion.div
          className="flex gap-4 animate-scroll-right"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
        >
          {carouselRow2.map((img, idx) => (
            <a key={idx} href={img} className="shrink-0">
              <Image
                width={200}
                height={200}
                src={img}
                alt={`carousel-img-${idx}`}
                className="h-32 w-auto rounded-xl shadow-md hover:scale-105 transition-transform"
              />
            </a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
