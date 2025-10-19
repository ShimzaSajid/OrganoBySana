"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaTimes, FaChevronRight } from "react-icons/fa";
import {
  FaBars, FaChevronDown, FaSearch, FaShoppingCart,
  FaFacebookF, FaInstagram
} from "react-icons/fa";

export default function Header() {
  const { count, toggle } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMenu = () => setMobileOpen(false);

  useEffect(() => {
    const navbar = document.getElementById("navbar");
    const onScroll = () => {
      if (!navbar) return;
      if (window.scrollY > 50) navbar.classList.add("nav-scroll");
      else navbar.classList.remove("nav-scroll");
    };
    onScroll();
    window.addEventListener("scroll", onScroll);

    // prevent body scroll when mobile menu is open
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  return (
    <nav
      id="navbar"
      className="bg-brand-green text-brand-beige py-6 px-6 fixed w-full top-0 z-50 transition-all duration-300"
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Left: Search & Cart */}
        <div className="flex items-center space-x-5">
          <button className="text-white hover:text-brand-gold transition duration-300 transform hover:scale-110">
            <FaSearch className="text-xl" />
          </button>

          {/* Cart Icon */}
          <button
            id="cart-icon"
            onClick={toggle}
            className="text-white hover:text-brand-gold transition duration-300 relative transform hover:scale-110"
          >
            <FaShoppingCart className="text-xl" />
            <span className="absolute -top-2 -right-2 bg-brand-gold text-brand-green text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
              {count}
            </span>
          </button>
        </div>

        {/* Centered Logo */}
        <div className="flex items-center space-x-2 absolute left-1/2 -translate-x-1/2">
          <Link href="/">
            <Image
              src="/images/brand-logo.png"
              alt="Organo Logo"
              width={80}
              height={80}
              className="h-20 w-auto transition-transform duration-300 hover:scale-105"
              priority
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10 text-lg">
          <Link href="/" className="nav-link group">
            Home <span className="nav-underline" />
          </Link>

          {/* Shop dropdown */}
          <div className="relative group dropdown">
            <button className="text-white hover:text-brand-gold transition duration-300 flex items-center relative group nav-link">
              Shop
              <FaChevronDown className="ml-1 text-sm transition-transform duration-300 group-hover:rotate-180" />
              <span className="nav-underline" />
            </button>
            <div className="dropdown-menu absolute hidden group-hover:block bg-white text-black shadow-lg rounded-md mt-2 py-2 w-52 origin-top transition-all duration-300 scale-95 group-hover:scale-100 group-hover:opacity-100">
              <Link href="/category/hair-care" className="dropdown-item">Hair Care</Link>
              <Link href="/category/health-wellness" className="dropdown-item">Health & Wellness</Link>
              <Link href="/category/skincare-body" className="dropdown-item">Skincare & Body</Link>
              <Link href="/category/accessories" className="dropdown-item">Accessories</Link>
              <Link href="/category/bundles" className="dropdown-item">Bundles</Link>
            </div>
          </div>

          <Link href="/contact" className="nav-link group">
            Contact <span className="nav-underline" />
          </Link>
          <Link href="/about" className="nav-link group">
            About Us <span className="nav-underline" />
          </Link>
          {/* NEW: Login */}
          <Link href="/login" className="nav-link group">
            Login <span className="nav-underline" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen((s) => !s)}
            className="text-white transform transition duration-300 hover:scale-110 p-2"
          >
            {mobileOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-500 ease-in-out ${
          mobileOpen ? "opacity-100 visible translate-x-0" : "opacity-0 invisible -translate-x-full"
        }`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeMenu} />

        {/* Panel */}
        <div className="relative w-80 max-w-full h-full bg-brand-green shadow-2xl overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-brand-beige/20">
            <div className="flex items-center space-x-3">
              <Image
                src="/images/brand-logo.png"
                alt="Organo Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="text-white font-semibold">Menu</span>
            </div>
            <button
              onClick={closeMenu}
              className="text-white hover:text-brand-gold transition duration-300 p-2"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Items */}
          <div className="p-6 space-y-6">
            <Link
              href="/"
              className="flex items-center justify-between text-white hover:text-brand-gold transition duration-300 py-3 text-lg font-medium border-b border-brand-beige/10"
              onClick={closeMenu}
            >
              Home <FaChevronRight className="text-sm opacity-60" />
            </Link>

            <div className="border-b border-brand-beige/10 pb-4">
              <div className="flex items-center justify-between text-white py-3 text-lg font-medium">
                <span>Shop</span>
                <FaChevronRight className="text-sm opacity-60" />
              </div>
              <div className="pl-4 space-y-3 mt-2">
                <Link href="/category/hair-care" className="flex items-center justify-between text-white/80 hover:text-brand-gold transition duration-300 py-2" onClick={closeMenu}>
                  Hair Care <FaChevronRight className="text-xs opacity-60" />
                </Link>
                <Link href="/category/health-wellness" className="flex items-center justify-between text-white/80 hover:text-brand-gold transition duration-300 py-2" onClick={closeMenu}>
                  Health & Wellness <FaChevronRight className="text-xs opacity-60" />
                </Link>
                <Link href="/category/skincare-body" className="flex items-center justify-between text-white/80 hover:text-brand-gold transition duration-300 py-2" onClick={closeMenu}>
                  Skincare & Body <FaChevronRight className="text-xs opacity-60" />
                </Link>
                <Link href="/category/accessories" className="flex items-center justify-between text-white/80 hover:text-brand-gold transition duration-300 py-2" onClick={closeMenu}>
                  Accessories <FaChevronRight className="text-xs opacity-60" />
                </Link>
                <Link href="/category/bundles" className="flex items-center justify-between text-white/80 hover:text-brand-gold transition duration-300 py-2" onClick={closeMenu}>
                  Bundles <FaChevronRight className="text-xs opacity-60" />
                </Link>
              </div>
            </div>

            <Link
              href="/contact"
              className="flex items-center justify-between text-white hover:text-brand-gold transition duration-300 py-3 text-lg font-medium border-b border-brand-beige/10"
              onClick={closeMenu}
            >
              Contact <FaChevronRight className="text-sm opacity-60" />
            </Link>

            <Link
              href="/about"
              className="flex items-center justify-between text-white hover:text-brand-gold transition duration-300 py-3 text-lg font-medium border-b border-brand-beige/10"
              onClick={closeMenu}
            >
              About Us <FaChevronRight className="text-sm opacity-60" />
            </Link>

            {/* NEW: Login */}
            <Link
              href="/login"
              className="flex items-center justify-between text-white hover:text-brand-gold transition duration-300 py-3 text-lg font-medium border-b border-brand-beige/10"
              onClick={closeMenu}
            >
              Login <FaChevronRight className="text-sm opacity-60" />
            </Link>
          </div>

          {/* Footer Social */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-brand-beige/20">
            <div className="flex justify-center space-x-6">
              <a href="https://www.facebook.com/share/1CPdrEJ23j/" className="text-white hover:text-brand-gold transition duration-300">
                <FaFacebookF className="text-xl" />
              </a>
              <a href="https://www.instagram.com/organobysana/" className="text-white hover:text-brand-gold transition duration-300">
                <FaInstagram className="text-xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
