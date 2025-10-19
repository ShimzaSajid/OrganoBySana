// D:\testing\organo\src\components\Footer.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaHeart,FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    console.log("🦶 Footer component MOUNTED on:", window.location.pathname);
    setIsMounted(true);
    
    // Force a re-render to ensure content displays
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 10);
    
    return () => clearTimeout(timer);
  }, []);

  // If not mounted yet, show a simple footer to force rendering
  if (!isMounted) {
    return (
      <footer 
        className="bg-[#2a4d2a] text-[#F8F4E9] py-12 px-4"
        style={{ display: 'block' }}
      >
        <div className="container mx-auto">
          <div className="text-center">
            <p>© 2025 Organo By Sana</p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer 
      className="bg-[#2a4d2a] text-[#F8F4E9] py-12 px-4"
      style={{ display: 'block' }}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/images/brand-logo.png"
                alt="Organo Logo"
                width={64}
                height={64}
                className="h-16 w-auto"
              />
            </div>
            <p className="mb-6">
              Symbol of care and purity, offering products crafted with a deep respect for nature and a commitment to overall well-being.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/share/1CPdrEJ23j/" 
                className="w-10 h-10 bg-[#3a6b3a] text-[#F8F4E9] rounded-full flex items-center justify-center transition transform hover:scale-110 hover:text-[#d4af37]" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>
              <a 
                href="https://www.instagram.com/organobysana/" 
                className="w-10 h-10 bg-[#3a6b3a] text-[#F8F4E9] rounded-full flex items-center justify-center transition transform hover:scale-110 hover:text-[#d4af37]"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
               <a href="https://wa.me/923301658921?text=Hello%20Organo%20By%20Sana!%20I%20have%20a%20question%20about%20your%20products."  target="_blank" 
                rel="noopener noreferrer"  className="w-10 h-10 bg-[#3a6b3a] text-[#F8F4E9] rounded-full flex items-center justify-center transition transform hover:scale-110 hover:text-[#d4af37]">
                   <FaWhatsapp />
                      </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="transition hover:text-[#d4af37] hover:translate-x-1 block">Hair Oil</a></li>
              <li><a href="#" className="transition hover:text-[#d4af37] hover:translate-x-1 block">Organic Soap</a></li>
              <li><a href="#" className="transition hover:text-[#d4af37] hover:translate-x-1 block">Protein Powder</a></li>
              <li><a href="#" className="transition hover:text-[#d4af37] hover:translate-x-1 block">Slim Tox</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="transition hover:text-[#d4af37] hover:translate-x-1 block">Shipping & Returns</a></li>
              <li><a href="#" className="transition hover:text-[#d4af37] hover:translate-x-1 block">Terms & Conditions</a></li>
              <li><a href="#" className="transition hover:text-[#d4af37] hover:translate-x-1 block">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-3 text-[#d4af37]" /> 
                <span>Lahore, Pakistan</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 text-[#d4af37]" /> 
                <span>0330-1658921</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-[#d4af37]" /> 
                <span>organostorebysana@gmail.com</span>
              </li>
              <li className="flex items-center">
                <FaClock className="mr-3 text-[#d4af37]" /> 
                <span>24/7 Customer service</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-10 pt-8 text-center">
          <p>
            © 2025 Organo By Sana. All rights reserved. Crafted with <FaHeart className="inline text-red-400" /> in Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
}