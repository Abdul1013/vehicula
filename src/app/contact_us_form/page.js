"use client"
import { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
// Using lucide-react icons (Apple/Google minimal style)

export default function ContactPage() {
  // ✅ Placeholders for backend (replace with API later)
  const [contact, setContact] = useState({
    address: "Loading address...",
    phone1: "0000000000",
    phone2: "0000000000",
    phone3: "0000000000",
    email: "support@example.com",
    socials: {
      twitter: "#",
      facebook: "#",
      instagram: "#",
      tiktok: "#",
    },
    whatsapp: "0000000000",
  });

  useEffect(() => {
    // Example: fetch('/api/contact') → then setContact(response)
    // For now, simulate data load
    setTimeout(() => {
      setContact({
        address: "123, Sample Street, Lagos, Nigeria",
        phone1: "+2348012345678",
        phone2: "+2348098765432",
        phone3: "+2347012345678",
        email: "hello@company.com",
        socials: {
          twitter: "https://twitter.com/company",
          facebook: "https://facebook.com/company",
          instagram: "https://instagram.com/company",
          tiktok: "https://tiktok.com/@company",
        },
        whatsapp: "2348012345678",
      });
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-2 px-6 border-b">
        <nav className="text-sm text-gray-600">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/">
                {" "}
                <p className="hover:text-blue-600">Home </p>
              </Link>
            </li>
            <li>/</li>
            <li className="font-medium text-gray-800">Contact Us</li>
          </ol>
        </nav>
      </div>

      {/* Main Section */}
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Get In Touch
        </h1>
        <p className="text-gray-600 flex items-center justify-center gap-2 mb-6">
          <MapPin className="w-5 h-5 text-blue-600" />
          {contact.address}
        </p>

        {/* Phones */}
        <div className="space-y-2 mb-6">
          {[contact.phone1, contact.phone2, contact.phone3].map(
            (phone, idx) => (
              <div key={idx}>
                <a
                  href={`tel:${phone}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {phone}
                </a>
              </div>
            )
          )}
        </div>

        {/* Email */}
        <div className="mb-8">
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <Mail className="w-4 h-4 mr-2" />
            {contact.email}
          </a>
        </div>

        {/* Socials */}
        <div className="flex justify-center space-x-4 mb-10">
          <a
            href={contact.socials.twitter}
            className="p-3 rounded-full border hover:bg-blue-50"
          >
            <Twitter className="w-6 h-6 text-blue-500" />
          </a>
          <a
            href={contact.socials.facebook}
            className="p-3 rounded-full border hover:bg-blue-50"
          >
            <Facebook className="w-6 h-6 text-blue-700" />
          </a>
          <a
            href={contact.socials.instagram}
            className="p-3 rounded-full border hover:bg-pink-50"
          >
            <Instagram className="w-6 h-6 text-pink-600" />
          </a>
          <a
            href={contact.socials.tiktok}
            className="p-3 rounded-full border hover:bg-gray-100"
          >
            <Image height={400} width={400}  src="/img/tiktok.png" alt="TikTok" className="w-6 h-6" />
          </a>
        </div>

        {/* WhatsApp Support */}
        <div className="py-8 bg-blue-50 rounded-2xl shadow-sm">
          <h2 className="text-lg font-medium mb-4">
            Our support team is online & ready to help
          </h2>
          <a
            href={`https://api.whatsapp.com/send?phone=${contact.whatsapp}`}
            className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-full shadow hover:bg-green-600 transition"
          >
            <i className="fab fa-whatsapp mr-2"></i>
            Start Chat
          </a>
        </div>
      </div>
    </div>
  );
}
