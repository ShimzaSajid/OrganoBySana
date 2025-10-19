"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp, FaArrowDown, FaPaperPlane, FaChevronDown, FaCheckCircle, FaQuestionCircle } from "react-icons/fa";
import Image from "next/image";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};

function useIntersectionOnce<T extends HTMLElement>(threshold = 0.1) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function FAQItem({ q, a, delay = 0 }: { q: string; a: string; delay?: number }) {
  const [open, setOpen] = useState(false);
  const { ref, visible } = useIntersectionOnce<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`feature-card p-6 faq-item transition-all duration-300 ${open ? "active" : ""} ${visible ? "visible" : "opacity-0 translate-y-5"}`}
      style={{ transitionDelay: `${delay}ms` }}
      onClick={() => setOpen((s) => !s)}
    >
      <div className="flex justify-between items-center cursor-pointer">
        <h3 className="text-xl font-bold text-brand-green flex items-center">
          <FaQuestionCircle className="text-brand-gold mr-3" />
          {q}
        </h3>
        <FaChevronDown className={`text-brand-gold transition-transform ${open ? "rotate-180" : ""}`} />
      </div>
      <div className={`faq-answer mt-4 overflow-hidden transition-[max-height] duration-500 ${open ? "max-h-[500px]" : "max-h-0"}`}>
        <p className="text-gray-600">{a}</p>
      </div>
    </div>
  );
}

export default function ContactPage() {
  // success toast
  const [showToast, setShowToast] = useState(false);
    const [faqScrollMargin, setFaqScrollMargin] = useState<number>(-180); 

  // hero bubbles
  const bubblesContainer = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const c = bubblesContainer.current;
    if (!c) return;
    const count = 15;
    for (let i = 0; i < count; i++) {
      const b = document.createElement("div");
      b.className = "bubble";
      const size = Math.random() * 60 + 20;
      b.style.width = `${size}px`;
      b.style.height = `${size}px`;
      b.style.left = `${Math.random() * 100}%`;
      b.style.animationDelay = `${Math.random() * 15}s`;
      b.style.animationDuration = `${Math.random() * 10 + 10}s`;
      c.appendChild(b);
    }
    return () => {
      c.innerHTML = "";
    };
  }, []);

  // floating labels
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const onChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((s) => ({ ...s, [key]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to backend/email later
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
    setForm({ firstName: "", lastName: "", email: "", subject: "", message: "" });
  };

  // animation helpers
  const { ref: formBlock, visible: formVisible } = useIntersectionOnce<HTMLDivElement>();
  const { ref: infoBlock, visible: infoVisible } = useIntersectionOnce<HTMLDivElement>();

  return (
    
    <main className="bg-brand-cream text-brand-brown">
      {/* Smooth scrolling globally */}
      <style jsx global>{`
        html { scroll-behavior: smooth; }
      `}</style>
      {/* Success toast */}
      <div className={`success-message fixed top-5 right-5 z-[1000] rounded-xl bg-brand-green text-white px-5 py-3 shadow-lg flex items-center gap-2 transition-transform ${showToast ? "translate-x-0" : "translate-x-[150%]"}`}>
        <FaCheckCircle /> Message sent successfully!
      </div>

      {/* Hero */}
      <section className="contact-hero text-brand-beige py-20 px-4 text-center mt-0 relative overflow-hidden">
        <div ref={bubblesContainer} className="floating-bubbles absolute inset-0" />
        {/* floating leaves */}
        <div className="floating-leaves leaf-1 text-white/60">
          <svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 10 C70 10, 90 30, 90 50 C90 70, 70 90, 50 90 C30 90, 10 70, 10 50 C10 30, 30 10, 50 10 Z" />
          </svg>
        </div>
        <div className="floating-leaves leaf-2 text-white/60">
          <svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 10 C70 10, 90 30, 90 50 C90 70, 70 90, 50 90 C30 90, 10 70, 10 50 C10 30, 30 10, 50 10 Z" />
          </svg>
        </div>
        <div className="floating-leaves leaf-3 text-white/60">
          <svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 10 C70 10, 90 30, 90 50 C90 70, 70 90, 50 90 C30 90, 10 70, 10 50 C10 30, 30 10, 50 10 Z" />
          </svg>
        </div>
        <div className="floating-leaves leaf-4 text-white/60">
          <svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 10 C70 10, 90 30, 90 50 C90 70, 70 90, 50 90 C30 90, 10 70, 10 50 C10 30, 30 10, 50 10 Z" />
          </svg>
        </div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white text-glow fade-in visible">Connect With Us</h1>
          <p className="text-xl md:text-2xl mb-10 text-white fade-in visible" style={{ transitionDelay: "0.2s" }}>
            We&apos;re here to help you on your natural wellness journey. Reach out with any questions or feedback.
          </p>
          <div className="fade-in visible" style={{ transitionDelay: "0.4s" }}>
            <a href="#contactForm" className="btn-primary inline-flex items-center gap-2 bounce-in">
              Send a Message <FaArrowDown />
            </a>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-20 px-4 bg-white relative overflow-hidden">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* form */}
            <div ref={formBlock} className={`lg:col-span-2 transition-all ${formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
              <h2 className="text-4xl font-bold mb-8 text-brand-green">Send Us a Message</h2>
              <div className="contact-form relative">
                <form id="contactForm" onSubmit={onSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-input peer"
                        placeholder=" "
                        value={form.firstName}
                        onChange={onChange("firstName")}
                        required
                      />
                      <label className="form-label peer-focus:!top-[-10px] peer-focus:!text-[0.8rem]">First Name</label>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-input peer"
                        placeholder=" "
                        value={form.lastName}
                        onChange={onChange("lastName")}
                        required
                      />
                      <label className="form-label">Last Name</label>
                    </div>
                  </div>

                  <div className="form-group mb-6">
                    <input
                      type="email"
                      className="form-input peer"
                      placeholder=" "
                      value={form.email}
                      onChange={onChange("email")}
                      required
                    />
                    <label className="form-label">Email Address</label>
                  </div>

                  <div className="form-group mb-6">
                    <input
                      type="text"
                      className="form-input peer"
                      placeholder=" "
                      value={form.subject}
                      onChange={onChange("subject")}
                      required
                    />
                    <label className="form-label">Subject</label>
                  </div>

                  <div className="form-group mb-8">
                    <textarea
                      rows={6}
                      className="form-input peer"
                      placeholder=" "
                      value={form.message}
                      onChange={onChange("message")}
                      required
                    />
                    <label className="form-label">Your Message</label>
                  </div>

                <button type="submit" className="btn-primary w-full md:w-auto inline-flex items-center justify-center gap-2">
                Send Message <FaPaperPlane />
                </button>
                </form>
              </div>
            </div>

            {/* info */}
            <div
              ref={infoBlock}
              className={`transition-all ${infoVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}`}
            >
              <h2 className="text-4xl font-bold mb-8 text-brand-green">Contact Information</h2>

<div className="grid grid-cols-2 md:grid-cols-1 gap-4 mb-10">
  <div className="contact-info-card hover-lift">
    <div className="contact-icon">
      <FaMapMarkerAlt />
    </div>
    <h3 className="text-xl font-bold mb-2 text-brand-green">Our Location</h3>
    <p className="text-gray-600">Lahore, Pakistan</p>
  </div>

  <div className="contact-info-card hover-lift">
    <div className="contact-icon">
      <FaPhone />
    </div>
    <h3 className="text-xl font-bold mb-2 text-brand-green">Phone Number</h3>
    <p className="text-gray-600">0330-1658921</p>
  </div>

  <div className="contact-info-card hover-lift">
    <div className="contact-icon">
      <FaEnvelope />
    </div>
    <h3 className="text-xl font-bold mb-2 text-brand-green">Email Address</h3>
    <p className="text-gray-600">info@organobysana.com</p>
  </div>

  <div className="contact-info-card hover-lift">
    <div className="contact-icon">
      <FaClock />
    </div>
    <h3 className="text-xl font-bold mb-2 text-brand-green">Business Hours</h3>
    <p className="text-gray-600">24/7 Customer Support</p>
    <p className="text-gray-600">We're always here to help you!</p>
  </div>
</div>

              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4 text-brand-green">Follow Our Journey</h3>
                <div className="flex space-x-4">
                  <a href="https://www.facebook.com/organobysana/"  target="_blank" 
      rel="noopener noreferrer"  className="w-12 h-12 rounded-full bg-brand-beige flex items-center justify-center text-brand-green hover:text-brand-gold transform hover:scale-110 transition duration-300 social-icon">
                    <FaFacebookF />
                  </a>
                  <a href="https://www.instagram.com/organobysana/"  target="_blank" 
      rel="noopener noreferrer"  className="w-12 h-12 rounded-full bg-brand-beige flex items-center justify-center text-brand-green hover:text-brand-gold transform hover:scale-110 transition duration-300 social-icon">
                    <FaInstagram />
                  </a>
                  <a href="https://wa.me/923301658921?text=Hello%20Organo%20By%20Sana!%20I%20have%20a%20question%20about%20your%20products."  target="_blank" 
      rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-brand-beige flex items-center justify-center text-brand-green hover:text-brand-gold transform hover:scale-110 transition duration-300 social-icon">
                    <FaWhatsapp />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
    <section
        id="faq"
        className="py-20 px-4 bg-brand-cream"
        style={{ scrollMarginTop: `${faqScrollMargin}px` }}>
        <div className="container mx-auto max-w-4xl">
          <h2 className="section-title text-4xl md:text-5xl font-bold text-center mb-16 text-brand-green">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <FAQItem q="How long does shipping take?" a="We typically process orders within 1–2 business days. Standard shipping within Pakistan takes 3–5 business days, while express shipping takes 1–2 business days." />
            <FAQItem q="Are your products truly organic?" a="Yes! All Organo By Sana products are made with 100% organic ingredients sourced from trusted local farmers. We're committed to purity and natural wellness." delay={100} />
            <FAQItem q="Do you offer international shipping?" a="Currently, we only ship within Pakistan. However, we're working on expanding our shipping options to serve our international customers soon." delay={200} />
            <FAQItem q="What is your return policy?" a="We offer a 30-day return policy for unopened and unused products. If you're not satisfied with your purchase, please contact our customer service team." delay={300} />
          </div>

          <div className="floral-divider my-12"></div>

          <div className="text-center mt-12">
            <p className="text-lg mb-6 text-black">Still have questions? We&apos;re here to help!</p>
            <a href="#contactForm" className="btn-outline">Contact Us</a>
          </div>
        </div>
      </section>
    </main>
  );
}
