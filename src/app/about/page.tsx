"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaTag,
  FaList,
  FaUsers,
  FaBullseye,
  FaEye,
  FaQuoteRight,
  FaLeaf,
  FaHeart,
  FaShieldAlt,
  FaRocket,
  FaArrowDown,
} from "react-icons/fa";

export default function AboutPage() {
  // Effects: intersection animations, bubbles, counters
  useEffect(() => {
    // Intersection animations
    const fadeElements = document.querySelectorAll<HTMLElement>(
      ".fade-in, .stagger-item, .slide-in-left, .slide-in-right"
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    fadeElements.forEach((el) => io.observe(el));

    // Bubbles in hero
    const bubblesContainer = document.getElementById("bubblesContainer");
    if (bubblesContainer && bubblesContainer.childElementCount === 0) {
      const bubbleCount = 15;
      for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement("div");
        bubble.classList.add("bubble");
        const size = Math.random() * 60 + 20;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationDelay = `${Math.random() * 15}s`;
        bubble.style.animationDuration = `${Math.random() * 10 + 10}s`;
        bubblesContainer.appendChild(bubble);
      }
    }

    // Counters
    const counters = document.querySelectorAll<HTMLElement>(".counter-number");
    counters.forEach((counter) => {
      const targetAttr = counter.getAttribute("data-count");
      if (!targetAttr) return;
      const target = parseInt(targetAttr, 10);
      const duration = 2000; // ms
      const steps = Math.max(1, Math.floor(duration / 16));
      const increment = target / steps;
      let current = 0;

      const animate = () => {
        current += increment;
        if (current < target) {
          counter.textContent = String(Math.floor(current));
          requestAnimationFrame(animate);
        } else {
          counter.textContent = String(target);
        }
      };

      const counterIO = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate();
            counterIO.unobserve(counter);
          }
        });
      });
      counterIO.observe(counter);
    });

    // Navbar scroll effect
    const handleNavbarScroll = () => {
      const navbar = document.getElementById("navbar");
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add("nav-scroll");
        } else {
          navbar.classList.remove("nav-scroll");
        }
      }
    };

    // Hero staged reveal
    const t = setTimeout(() => {
      document.querySelector(".hero-section h1")?.classList.add("visible");
      document.querySelector(".hero-section p")?.classList.add("visible");
      document
        .querySelector(".hero-section .btn-primary")
        ?.classList.add("visible");
    }, 300);

    window.addEventListener("scroll", handleNavbarScroll);
    handleNavbarScroll(); // Initial check

    return () => {
      io.disconnect();
      clearTimeout(t);
      window.removeEventListener("scroll", handleNavbarScroll);
    };
  }, []);

  return (
    <div className="bg-brand-cream text-brand-brown">
      <main className="bg-brand-cream text-brand-brown">
        {/* HERO */}
        <section
          className="hero-section text-brand-beige py-20 px-4 text-center mt-0 relative overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(rgba(42,77,42,0.7), rgba(42,77,42,0.7))), url('https://images.unsplash.com/photo-1556760544-74068565f05c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "70vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* dotted overlay */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23d4af37' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E\")",
            }}
          />

          {/* floating leaves (SVGs) */}
          <div className="floating-leaves leaf-1">
            <svg viewBox="0 0 100 100" fill="none">
              <path d="M50 10 C70 10, 90 30, 90 50 C90 70, 70 90, 50 90 C30 90, 10 70, 10 50 C10 30, 30 10, 50 10 Z" fill="currentColor" />
            </svg>
          </div>
          <div className="floating-leaves leaf-2">
            <svg viewBox="0 0 100 100" fill="none">
              <path d="M50 10 C70 10, 90 30, 90 50 C90 70, 70 90, 50 90 C30 90, 10 70, 10 50 C10 30, 30 10, 50 10 Z" fill="currentColor" />
            </svg>
          </div>
          <div className="floating-leaves leaf-3">
            <svg viewBox="0 0 100 100" fill="none">
              <path d="M50 10 C70 10, 90 30, 90 50 C90 70, 70 90, 50 90 C30 90, 10 70, 10 50 C10 30, 30 10, 50 10 Z" fill="currentColor" />
            </svg>
          </div>
          <div className="floating-leaves leaf-4">
            <svg viewBox="0 0 100 100" fill="none">
              <path d="M50 10 C70 10, 90 30, 90 50 C90 70, 70 90, 50 90 C30 90, 10 70, 10 50 C10 30, 30 10, 50 10 Z" fill="currentColor" />
            </svg>
          </div>

          {/* bubbles */}
          <div id="bubblesContainer" className="floating-bubbles" />

          <div className="container mx-auto max-w-4xl relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 fade-in text-glow text-white">Our Story</h1>
            <p className="text-xl md:text-2xl mb-10 fade-in text-white" style={{ transitionDelay: "0.2s" }}>
              A journey of passion, purpose, and pure natural wellness
            </p>
            <div className="fade-in" style={{ transitionDelay: "0.4s" }}>
              <a href="#our-story" className="btn-primary inline-block bounce-in">
                Discover Our Journey <FaArrowDown className="inline ml-2 align-[-2px]" aria-hidden />
              </a>
            </div>
          </div>
        </section>

        {/* OUR STORY */}
        <section id="our-story" className="story-section py-20 px-4">
          <div className="container mx-auto">
            <h2 className="section-title text-4xl md:text-5xl font-bold text-center mb-16 brand-green fade-in">Our Story</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="fade-in slide-in-left">
                <h3 className="text-3xl font-bold brand-green mb-6">A Journey of Passion and Purpose</h3>
                <p className="text-lg text-gray-700 mb-6">
                  ORGANO BY SANA is a proudly Pakistani organic wellness brand committed to delivering safe, effective, and natural solutions for personal care.
                  Our purpose is to empower individuals to embrace healthier choices by replacing chemical-based routines with clean and trustworthy organic alternatives.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Founded by a passionate solo entrepreneur who transformed personal struggles into a mission, Organo by Sana is built on research, authenticity, and customer trust.
                  Since its inception in June 2023, the brand has steadily grown into a name associated with quality, results, and reliability.
                </p>
                <p className="text-lg text-gray-700">
                  Alhamdulillah, today Organo by Sana stands as a symbol of care and purity, offering products crafted with a deep respect for nature and a commitment to overall well-being.
                </p>
              </div>

              <div className="fade-in slide-in-right">
                <div className="founder-image">
                  <Image
                    src="https://placehold.co/600x700/2a4d2a/ffffff?text=Organo+Products"
                    alt="Organo Products"
                    width={600}
                    height={700}
                    className="w-full h-auto rounded-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Brand details */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mt-16 max-w-6xl mx-auto">
              <div className="brand-detail-card fade-in">
                <div className="value-icon mx-auto mb-4">
                  <FaTag aria-hidden />
                </div>
                <h3 className="text-xl font-bold brand-green mb-2 text-center">Brand Name</h3>
                <p className="text-gray-700 text-center">Organo by Sana</p>
              </div>

              <div className="brand-detail-card fade-in" style={{ transitionDelay: "0.1s" }}>
                <div className="value-icon mx-auto mb-4">
                  <FaList aria-hidden />
                </div>
                <h3 className="text-xl font-bold brand-green mb-2 text-center">Category</h3>
                <p className="text-gray-700 text-center">Organic Personal Care &amp; Wellness Products</p>
              </div>

              <div className="brand-detail-card fade-in col-span-2 md:col-span-1" style={{ transitionDelay: "0.2s" }}>
                <div className="value-icon mx-auto mb-4">
                  <FaUsers aria-hidden />
                </div>
                <h3 className="text-xl font-bold brand-green mb-2 text-center">Target Audience</h3>
                <p className="text-gray-700 text-center">Health-conscious individuals seeking natural, safe, and effective organic alternatives</p>
              </div>
            </div>
          </div>
        </section>

        {/* MISSION / VISION */}
        <section className="py-14 md:py-20 px-4 bg-white">
          <div className="container mx-auto">
           <h2 className="section-title text-3xl md:text-5xl font-bold text-center mb-10 md:mb-16 brand-green fade-in">Our Purpose</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
               <div className="mission-card p-4 md:p-8 fade-in">
                <div className="value-icon mb-6">
                  <FaBullseye aria-hidden />
                </div>
                <h3 className="text-xl md:text-2xl font-bold brand-green mb-3 md:mb-4 text-center">Our Mission</h3>
                <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6 text-center">
                  To provide trustworthy and affordable personal care solutions crafted with natural, organic ingredients and packaged with care — empowering individuals to live healthier, more confident lives.
                </p>
                <div className="text-center">
                  <FaQuoteRight className="text-brand-gold text-2xl opacity-50 inline-block" aria-hidden />
                </div>
              </div>

              <div className="mission-card p-8 fade-in" style={{ transitionDelay: "0.2s" }}>
                <div className="value-icon mb-6">
                  <FaEye aria-hidden />
                </div>
                <h3 className="text-2xl font-bold brand-green mb-4 text-center">Our Vision</h3>
                <p className="text-lg text-gray-700 mb-6 text-center">
                  To become the leading Pakistani organic wellness brand, inspiring a movement towards natural self-care and making clean, effective personal care accessible to everyone.
                </p>
                <div className="text-center">
                  <FaQuoteRight className="text-brand-gold text-2xl opacity-50 inline-block" aria-hidden />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="py-14 md:py-20 px-4 bg-brand-cream">
          <div className="container mx-auto">
          <h2 className="section-title text-3xl md:text-5xl font-bold text-center mb-10 md:mb-16 brand-green fade-in">Our Values</h2>

            <div className="values-grid">
              <div className="value-card p-4 md:p-8 fade-in">
                <div className="value-icon">
                  <FaLeaf aria-hidden />
                </div>
                <h3 className="text-lg md:text-xl font-bold brand-green mb-3 md:mb-4">Purity</h3>
                <p className="text-gray-700">We use only 100% natural, organic ingredients with no harmful chemicals or additives.</p>
              </div>

              <div className="value-card fade-in" style={{ transitionDelay: "0.1s" }}>
                <div className="value-icon">
                  <FaHeart aria-hidden />
                </div>
                <h3 className="text-xl font-bold brand-green mb-4">Care</h3>
                <p className="text-gray-700">Every product is crafted with love and attention to detail, ensuring the highest quality.</p>
              </div>

              <div className="value-card fade-in" style={{ transitionDelay: "0.2s" }}>
                <div className="value-icon">
                  <FaShieldAlt aria-hidden />
                </div>
                <h3 className="text-xl font-bold brand-green mb-4">Trust</h3>
                <p className="text-gray-700">We build lasting relationships with our customers through transparency and reliability.</p>
              </div>

              <div className="value-card fade-in" style={{ transitionDelay: "0.3s" }}>
                <div className="value-icon">
                  <FaRocket aria-hidden />
                </div>
                <h3 className="text-xl font-bold brand-green mb-4">Innovation</h3>
                <p className="text-gray-700">We continuously research and develop new formulations to meet evolving wellness needs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FOUNDER */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto">
            <h2 className="section-title text-4xl md:text-5xl font-bold text-center mb-16 brand-green fade-in">Our Founder&apos;s Journey</h2>

            <div className="founder-section p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="fade-in slide-in-left">
                  <div className="founder-image">
                    <Image
                      src="https://placehold.co/500x600/2a4d2a/ffffff?text=Sana%2C+Founder"
                      alt="Sana, Founder of Organo"
                      width={500}
                      height={600}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                <div className="fade-in slide-in-right">
                  <h3 className="text-3xl font-bold brand-green mb-6">From Personal Struggle to Mission</h3>
                  <p className="text-lg text-gray-700 mb-6">
                    Organo by Sana was founded by a passionate solo entrepreneur who transformed personal struggles into a meaningful mission.
                    Drawing from firsthand experience with the limitations of conventional personal care products, our founder embarked on a journey to create something better.
                  </p>
                  <p className="text-lg text-gray-700 mb-6">
                    Through dedicated research and a deep commitment to authenticity, what began as a personal quest evolved into Organo by Sana - a brand built on the principles of purity, effectiveness, and customer trust.
                  </p>
                  <div className="founder-quote mb-8">
                    <p className="text-xl italic text-gray-700">
                      &quot;My vision was simple: create personal care products that are truly safe, effective, and natural.
                      Products I would confidently use myself and recommend to my loved ones.&quot;
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-brand-beige rounded-lg px-4 py-2">
                      <p className="text-sm text-brand-green font-bold">Woman-Owned Business</p>
                    </div>
                    <div className="bg-brand-beige rounded-lg px-4 py-2">
                      <p className="text-sm text-brand-green font-bold">Proudly Pakistani</p>
                    </div>
                    <div className="bg-brand-beige rounded-lg px-4 py-2">
                      <p className="text-sm text-brand-green font-bold">Research-Based Formulations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-brand-green text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 fade-in">Join Our Natural Wellness Journey</h2>
            <p className="text-xl mb-10 fade-in" style={{ transitionDelay: "0.2s" }}>
              Experience the difference that pure, natural ingredients can make in your self-care routine.
            </p>
<div
  className="fade-in flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
  style={{ transitionDelay: "0.4s" }}
>
  <Link href="/shop" className="btn-primary">Shop Our Products</Link>
  <Link href="/contact" className="btn-outline">Contact Us</Link>
</div>


          </div>
        </section>
      </main>
    </div>
  );
}
