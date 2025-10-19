"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaHeart,
  FaWhatsapp,
} from "react-icons/fa";

/* -------------------- Reusable Modal -------------------- */
function PolicyModal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="policy-title"
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-[101] w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-gray-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 id="policy-title" className="text-xl md:text-2xl font-bold text-black">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="h-9 w-9 rounded-full grid place-items-center text-gray-500 hover:text-black hover:bg-gray-100 transition"
          >
            ×
          </button>
        </div>
        <div className="px-6 py-5 max-h-[70vh] overflow-y-auto text-gray-700 leading-relaxed">
          {children}
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#2a4d2a] text-white hover:opacity-95 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------- Footer -------------------- */
export default function Footer() {
  const year = new Date().getFullYear();
  const [modal, setModal] = useState<null | "shipping" | "terms" | "privacy">(null);

  const shopLinks = [
    { href: "/category/hair-care", label: "Hair Care" },
    { href: "/category/health-wellness", label: "Health & Wellness" },
    { href: "/category/skincare-body", label: "Skincare & Body" },
    { href: "/category/accessories", label: "Accessories" },
    { href: "/category/bundles", label: "Bundles" },
  ];

  const companyLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  const accountLinks = [
    { href: "/account", label: "My Account" },
    { href: "/login", label: "Login" },
    { href: "/signup", label: "Sign Up" },
    { href: "/forgot-password", label: "Forgot Password" },
    { href: "/cart", label: "Cart" },
    { href: "/checkout", label: "Checkout" },
  ];

  return (
    <>
      <footer className="bg-[#2a4d2a] text-[#F8F4E9] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Main */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-3">
                <Image
                  src="/images/brand-logo.png"
                  alt="Organo Logo"
                  width={48}
                  height={48}
                  className="h-12 w-auto"
                  priority
                />
                <span className="text-lg font-semibold tracking-wide">Organo By Sana</span>
              </div>
              <p className="mb-4 leading-relaxed text-sm">
                Symbol of care and purity—products crafted with deep respect for nature and a
                commitment to overall well-being.
              </p>
              <div className="flex gap-2">
                <a
                  href="https://www.facebook.com/share/1CPdrEJ23j/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-[#3a6b3a] text-[#F8F4E9] rounded-full grid place-items-center transition transform hover:scale-110 hover:text-[#d4af37] text-sm"
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://www.instagram.com/organobysana/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-[#3a6b3a] text-[#F8F4E9] rounded-full grid place-items-center transition transform hover:scale-110 hover:text-[#d4af37] text-sm"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://wa.me/923301658921?text=Hello%20Organo%20By%20Sana!%20I%20have%20a%20question%20about%20your%20products."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-[#3a6b3a] text-[#F8F4E9] rounded-full grid place-items-center transition transform hover:scale-110 hover:text-[#d4af37] text-sm"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp />
                </a>
              </div>
            </div>

            {/* Shop - Move RIGHT in desktop only */}
            <div className="md:ml-8">
              <h3 className="text-base font-bold mb-3">Shop</h3>
              <ul className="space-y-1.5 text-sm">
                {shopLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="block transition hover:text-[#d4af37] hover:translate-x-1">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help & Policies - Move LEFT in desktop only */}
            <div className="md:-ml-4">
              <h3 className="text-base font-bold mb-3">Help & Policies</h3>
              <ul className="space-y-1.5 text-sm">
                <li>
                  <button
                    onClick={() => setModal("shipping")}
                    className="text-left w-full transition hover:text-[#d4af37] hover:translate-x-1"
                  >
                    Shipping & Returns
                  </button>
                </li>
                <li>
              <Link
                href="/contact#faq"
                className="block transition hover:text-[#d4af37] hover:translate-x-1"
              >
                FAQ
              </Link>

                </li>
                <li>
                  <button
                    onClick={() => setModal("terms")}
                    className="text-left w-full transition hover:text-[#d4af37] hover:translate-x-1"
                  >
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setModal("privacy")}
                    className="text-left w-full transition hover:text-[#d4af37] hover:translate-x-1"
                  >
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>

            {/* Company & Account (desktop) */}
            <div className="hidden md:block">
              <div className="grid grid-cols-2 gap-8">
                {/* Company - Move LEFT in desktop only */}
                <div className="md:-ml-20">
                  <h3 className="text-base font-bold mb-3">Company</h3>
                  <ul className="space-y-1.5 text-sm">
                    {companyLinks.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className="block transition hover:text-[#d4af37] hover:translate-x-1">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Account - Move LEFT in desktop only */}
                <div className="md:-ml-4">
                  <h3 className="text-base font-bold mb-3">Account</h3>
                  <ul className="space-y-1.5 text-sm">
                    {accountLinks.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className="block transition hover:text-[#d4af37] hover:translate-x-1">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Company & Account (mobile) */}
            <div className="col-span-2 md:hidden">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-base font-bold mb-3">Company</h3>
                  <ul className="space-y-1.5 text-sm">
                    {companyLinks.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className="block transition hover:text-[#d4af37] hover:translate-x-1">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-base font-bold mb-3">Account</h3>
                  <ul className="space-y-1.5 text-sm">
                    {accountLinks.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className="block transition hover:text-[#d4af37] hover:translate-x-1">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 text-sm">
            <div className="flex items-start">
              <FaMapMarkerAlt className="mr-2 text-[#d4af37] mt-0.5 text-sm" />
              <div>
                <div className="font-semibold">Address</div>
                <div className="text-xs">Lahore, Pakistan</div>
              </div>
            </div>
            <div className="flex items-start">
              <FaPhone className="mr-2 text-[#d4af37] mt-0.5 text-sm" />
              <div>
                <div className="font-semibold">Phone</div>
                <div className="text-xs">0330-1658921</div>
              </div>
            </div>
            <div className="flex items-start">
              <FaEnvelope className="mr-2 text-[#d4af37] mt-0.5 text-sm" />
              <div>
                <div className="font-semibold">Email</div>
                <div className="text-xs">organostorebysana@gmail.com</div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/20 mt-6 pt-4 text-center text-xs">
            <p className="mb-1">
              © {year} Organo By Sana. All rights reserved. Crafted with{" "}
              <FaHeart className="inline text-red-400 mx-0.5 text-xs" /> in Pakistan.
            </p>
          </div>
        </div>
      </footer>

      {/* --- Modals --- */}
      <PolicyModal open={modal === "shipping"} title="Shipping & Returns" onClose={() => setModal(null)}>
        <h3 className="font-semibold text-black mb-2">Shipping</h3>
        <ul className="list-disc ml-6 mb-4">
          <li>Nationwide delivery across Pakistan via trusted couriers.</li>
          <li>Standard delivery time: 2–5 business days after dispatch.</li>
          <li>Free shipping on qualifying orders (if applicable during promos).</li>
        </ul>
        <h3 className="font-semibold text-black mb-2">Order Processing</h3>
        <p className="mb-4">
          Orders are processed within 24–48 hours (Mon–Sat). You'll receive a confirmation message and tracking details
          (for courier-enabled shipments).
        </p>
        <h3 className="font-semibold text-black mb-2">Returns & Exchanges</h3>
        <ul className="list-disc ml-6 mb-4">
          <li>Eligible within 7 days of delivery for unopened/unused items.</li>
          <li>For damaged or incorrect items, contact us within 48 hours with photos so we can assist quickly.</li>
          <li>Due to hygiene, some personal-care items may not be returnable once opened.</li>
        </ul>
        <p className="text-sm text-gray-600">
          Need help? Email <b>organostorebysana@gmail.com</b> or WhatsApp <b>0330-1658921</b>.
        </p>
      </PolicyModal>

      <PolicyModal open={modal === "terms"} title="Terms & Conditions" onClose={() => setModal(null)}>
        <p className="mb-3">
          By accessing or purchasing from Organo By Sana, you agree to these Terms. Please read them carefully.
        </p>
        <h3 className="font-semibold text-black mb-2">Use of Website</h3>
        <ul className="list-disc ml-6 mb-4">
          <li>Content is for personal, non-commercial use unless authorized.</li>
          <li>We may update pricing, availability, or policies at any time.</li>
        </ul>
        <h3 className="font-semibold text-black mb-2">Orders</h3>
        <ul className="list-disc ml-6 mb-4">
          <li>We reserve the right to refuse or cancel any order (e.g., suspected fraud).</li>
          <li>Cash on Delivery orders may be verified before dispatch.</li>
        </ul>
        <h3 className="font-semibold text-black mb-2">Liability</h3>
        <p className="mb-4">
          To the fullest extent permitted by law, Organo By Sana is not liable for indirect or consequential losses. All
          products should be used as directed. Patch test recommended.
        </p>
        <p className="text-sm text-gray-600">Questions? Contact <b>organostorebysana@gmail.com</b>.</p>
      </PolicyModal>

      <PolicyModal open={modal === "privacy"} title="Privacy Policy" onClose={() => setModal(null)}>
        <p className="mb-3">
          We care about your privacy. This Policy explains how we collect, use, and safeguard your information.
        </p>
        <h3 className="font-semibold text-black mb-2">What We Collect</h3>
        <ul className="list-disc ml-6 mb-4">
          <li>Contact info (name, email/phone), order and delivery details.</li>
          <li>Site usage data to improve our experience and services.</li>
        </ul>
        <h3 className="font-semibold text-black mb-2">How We Use It</h3>
        <ul className="list-disc ml-6 mb-4">
          <li>Process orders, provide support, and send important updates.</li>
          <li>Improve products, prevent fraud, and comply with legal requirements.</li>
        </ul>
        <h3 className="font-semibold text-black mb-2">Your Choices</h3>
        <ul className="list-disc ml-6 mb-4">
          <li>Request access, correction, or deletion of your data where applicable.</li>
          <li>Opt out of marketing communications anytime.</li>
        </ul>
        <p className="text-sm text-gray-600">
          Contact: <b>organostorebysana@gmail.com</b>. We may update this Policy as needed.
        </p>
      </PolicyModal>
    </>
  );
}