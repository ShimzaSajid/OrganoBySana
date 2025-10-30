"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


// Most icons come from 'fa'
import {
  FaBars,
  FaChevronDown,
  FaSearch,
  FaShoppingCart,
  FaStar,
  FaStarHalfAlt,
  FaHeart,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaArrowRight,
  FaGift,
  FaLeaf,
  FaFlag,
  FaFemale,
  FaCheck,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";

// TikTok (FA6 brand) comes from 'fa6'
import { FaTiktok } from "react-icons/fa6";


export default function HomePage() {
  const [preloading, setPreloading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const [cartCount] = useState(0); // TODO: wire to cart store later
  
useEffect(() => {
  // Hide the preloader after ~800ms regardless of load events
  const t = setTimeout(() => setPreloading(false), 800);

  // Navbar scroll class
  const navbar = document.getElementById("navbar");
  const handleNavbarScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 50) navbar.classList.add("nav-scroll");
    else navbar.classList.remove("nav-scroll");
  };
  handleNavbarScroll();
  window.addEventListener("scroll", handleNavbarScroll);

  // Intersection Observer for reveal
  const fadeElements = document.querySelectorAll(
    ".fade-in, .stagger-item, .slide-in-left, .slide-in-right"
  );
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  fadeElements.forEach((el) => observer.observe(el));

  return () => {
    clearTimeout(t);
    window.removeEventListener("scroll", handleNavbarScroll);
    observer.disconnect();
  };
}, []);


  const onSearch = () => {
    const term = prompt("What are you looking for?");
    if (term) alert("Searching for: " + term);
  };

  return (
    <main className="bg-brand-cream text-brand-brown min-h-screen">
     {/* Preloader */}
{preloading && (
  <div id="preloader" className="fixed inset-0 bg-brand-cream z-[9999] flex items-center justify-center">
    <div className="text-center">
      {/* Animated Leaf Logo */}
      <div className="relative mb-6">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <FaLeaf className="w-8 h-8 md:w-10 md:h-10 text-white animate-spin-slow" />
        </div>
        {/* Floating particles */}
        <div className="absolute -top-2 -right-2 text-2xl animate-bounce">🌿</div>
        <div className="absolute -bottom-2 -left-2 text-2xl animate-bounce delay-300">✨</div>
      </div>
      
      {/* Loading Text */}
      <h3 className="text-2xl md:text-3xl font-bold text-brand-green mb-4 animate-pulse">
        Welcome to Organo By Sana
      </h3>
      
      {/* Animated Progress Bar */}
      <div className="w-48 md:w-64 h-2 bg-gray-200 rounded-full mx-auto mb-6 overflow-hidden">
        <div className="h-full bg-brand-green rounded-full animate-progress"></div>
      </div>
      
      {/* Loading Message */}
      <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
        Preparing your natural wellness journey...
      </p>
      
      {/* Loading Dots Animation */}
      <div className="flex justify-center space-x-1 mt-4">
        <div className="w-2 h-2 bg-brand-green rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-brand-green rounded-full animate-bounce delay-100"></div>
        <div className="w-2 h-2 bg-brand-green rounded-full animate-bounce delay-200"></div>
      </div>
    </div>
  </div>
)}

      {/* Hero Section */}
      <section className="hero-section text-brand-beige pt-2 md:pt-0 pb-20 px-4 text-center">
        {/* decorative floating leaves */}
        <div className="container mx-auto max-w-4xl relative z-10">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 fade-in text-glow text-white">
        CREATED by NATURE CURATED by SANA
      </h1>
          <p className="text-xl md:text-2xl mb-10 fade-in text-white" style={{ transitionDelay: "0.2s" }}>
           Trustworthy, affordable personal care crafted with natural ingredients—empowering healthier, more confident lives.
          </p>
<div className="flex flex-col sm:flex-row gap-4 justify-center fade-in" style={{ transitionDelay: "0.4s" }}>
  <Link href="#" className="btn-primary bounce-in inline-flex items-center justify-center mx-auto sm:mx-0">
    Shop Collection <FaArrowRight className="ml-2" />
  </Link>
  <Link href="#" className="btn-outline bounce-in inline-flex items-center justify-center mx-auto sm:mx-0" style={{ transitionDelay: "0.6s" }}>
    Learn More
  </Link>
</div>
        </div>
      </section>

           {/* Why Us - MOBILE OPTIMIZED */}
      <section className="py-16 px-4 bg-white relative">
        <div className="container mx-auto">
          <h2 className="section-title text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 brand-green fade-in">
            Why Choose Organo?
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
            {/* Woman Owned */}
            <div className="feature-card p-3 sm:p-4 lg:p-6 text-center stagger-item hover-lift">
              <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-2 sm:mb-3 lg:mb-4 flex items-center justify-center rounded-full bg-brand-beige">
                <FaFemale className="text-xl sm:text-2xl lg:text-3xl brand-green" />
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-bold brand-green mb-1 sm:mb-2">Woman Owned</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-tight">Empowering women through natural beauty</p>
            </div>

            {/* Handcrafted */}
            <div className="feature-card p-3 sm:p-4 lg:p-6 text-center stagger-item hover-lift" style={{ transitionDelay: "0.1s" }}>
              <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-2 sm:mb-3 lg:mb-4 flex items-center justify-center rounded-full bg-brand-beige">
                <FaHeart className="text-xl sm:text-2xl lg:text-3xl brand-green" />
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-bold brand-green mb-1 sm:mb-2">Handcrafted</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-tight">Made with care and attention to detail</p>
            </div>

            {/* Pakistani */}
            <div className="feature-card p-3 sm:p-4 lg:p-6 text-center stagger-item hover-lift" style={{ transitionDelay: "0.2s" }}>
              <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-2 sm:mb-3 lg:mb-4 flex items-center justify-center rounded-full bg-brand-beige">
                <FaFlag className="text-xl sm:text-2xl lg:text-3xl brand-green" />
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-bold brand-green mb-1 sm:mb-2">Proudly Pakistani</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-tight">Supporting local artisans</p>
            </div>

            {/* Organic */}
            <div className="feature-card p-3 sm:p-4 lg:p-6 text-center stagger-item hover-lift" style={{ transitionDelay: "0.3s" }}>
              <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-2 sm:mb-3 lg:mb-4 flex items-center justify-center rounded-full bg-brand-beige">
                <FaLeaf className="text-xl sm:text-2xl lg:text-3xl brand-green" />
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-bold brand-green mb-1 sm:mb-2">100% Organic</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-tight">Pure, natural ingredients</p>
            </div>

            {/* New */}
            <div className="feature-card p-3 sm:p-4 lg:p-6 text-center stagger-item hover-lift" style={{ transitionDelay: "0.4s" }}>
              <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-2 sm:mb-3 lg:mb-4 flex items-center justify-center rounded-full bg-brand-beige">
                <FaGift className="text-xl sm:text-2xl lg:text-3xl brand-green" />
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-bold brand-green mb-1 sm:mb-2">Fresh Collections</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-tight">Regular new arrivals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20 px-4 bg-brand-cream">
        <div className="container mx-auto">
          <h2 className="section-title text-4xl md:text-5xl font-bold text-center mb-16 brand-green fade-in">
            Our Collections
          </h2>

          <div className="product-showcase p-8 md:p-12 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="fade-in">
                <h3 className="text-3xl font-bold brand-green mb-4">Signature Crown Curl Oil</h3>
                <p className="text-lg text-gray-700 mb-6">
                  Our premium blend of organic oils nourishes from root to tip, promoting growth and adding incredible shine.
                </p>
                <ul className="space-y-2 mb-8 text-black">
                  <li className="flex items-center"><FaCheck className="text-brand-gold mr-2" /> Strengthens hair follicles</li>
                  <li className="flex items-center"><FaCheck className="text-brand-gold mr-2" /> Reduces breakage and split ends</li>
                  <li className="flex items-center"><FaCheck className="text-brand-gold mr-2" /> Adds natural shine and softness</li>
                </ul>
            <Link href="/product/signature-crown-curl-oil" className="btn-primary inline-block">
              Discover Now
            </Link>
              </div>
              <div className="flex justify-center fade-in slide-in-right">
                <div className="relative">
                  <Image
                    src="/images/oil1.png"
                    alt="Hair Oil"
                    width={640}
                    height={640}
                    className="rounded-2xl shadow-2xl h-auto w-auto max-w-full"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-brand-gold text-white px-4 py-2 rounded-full font-bold">
                    Bestseller
                  </div>
                </div>
              </div>
            </div>
          </div>


{/* Categories */}
<h2 className="text-4xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 brand-green fade-in">
  Shop By Category
</h2>

<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 md:gap-12 place-items-center">
  {/* Hair Care */}
  <Link href="/category/hair-care" className="flex flex-col items-center stagger-item scale-on-hover">
    <div className="category-circle overflow-hidden shadow-lg mb-3 w-35 h-35 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40">
      <Image
        src="/images/7 Benefits of Amla for Hair.png"
        alt="Hair Care"
        width={180}
        height={180}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
      />
    </div>
    <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-black text-center">Hair Care</p>
    <span className="text-xs sm:text-sm text-brand-gold mt-1 hover:underline text-black">Explore →</span>
  </Link>

  {/* Health & Wellness */}
  <Link href="/category/health-wellness" className="flex flex-col items-center stagger-item scale-on-hover">
    <div className="category-circle overflow-hidden shadow-lg mb-3 w-35 h-35 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40">
      <Image
        src="/images/Making Protein Powder Silky Smooth_ The Ultimate Guide!.png"
        alt="Health & Wellness"
        width={180}
        height={180}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
      />
    </div>
    <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-black text-center">Health & Wellness</p>
    <span className="text-xs sm:text-sm text-brand-gold mt-1 hover:underline text-black">Explore →</span>
  </Link>

  {/* Skincare & Body */}
  <Link href="/category/skincare-body" className="flex flex-col items-center stagger-item scale-on-hover">
    <div className="category-circle overflow-hidden shadow-lg mb-3 w-35 h-35 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40">
      <Image
        src="/images/Organic Soaps By Organic Oasis.png"
        alt="Skincare & Body"
        width={180}
        height={180}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
      />
    </div>
    <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-black text-center">Skincare & Body</p>
    <span className="text-xs sm:text-sm text-brand-gold mt-1 hover:underline text-black">Explore →</span>
  </Link>

  {/* Accessories */}
  <Link href="/category/accessories" className="flex flex-col items-center stagger-item scale-on-hover">
    <div className="category-circle overflow-hidden shadow-lg mb-3 w-35 h-35 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40">
      <Image
        src="/images/hair-accessories1.png"
        alt="Accessories"
        width={180}
        height={180}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
      />
    </div>
    <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-black text-center">Accessories</p>
    <span className="text-xs sm:text-sm text-brand-gold mt-1 hover:underline text-black">Explore →</span>
  </Link>

  {/* Bundles */}
  <Link href="/category/bundles" className="flex flex-col items-center stagger-item scale-on-hover">
    <div className="category-circle overflow-hidden shadow-lg mb-3 w-35 h-35 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40">
      <Image
        src="/images/Bundles-icon.png"  
        alt="Bundles"
        width={180}
        height={180}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
      />
    </div>
    <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-black text-center">Bundles</p>
    <span className="text-xs sm:text-sm text-brand-gold mt-1 hover:underline text-black">Explore →</span>
  </Link>
</div>
</div>
      </section>

      {/* Reviews */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <h2 className="section-title text-4xl md:text-5xl font-bold text-center mb-16 brand-green fade-in">
            Customer Love
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="review-card p-8">
              <div className="flex items-center mb-5">
                <div className="w-14 h-14 bg-brand-green rounded-full flex items-center justify-center text-white font-bold text-xl">A</div>
                <div className="ml-4">
                  <h4 className="font-semibold text-lg text-black">Aisha Khan</h4>
                  <div className="text-yellow-500 text-sm flex">
                <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
              </div>

                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">“The hair oil has transformed my dry, damaged hair. I've never received so many compliments! My hair feels stronger and looks shinier than ever before.”</p>
            </div>

            {/* Review 2 */}
            <div className="review-card p-8">
              <div className="flex items-center mb-5">
                <div className="w-14 h-14 bg-brand-green rounded-full flex items-center justify-center text-white font-bold text-xl">F</div>
                <div className="ml-4">
                  <h4 className="font-semibold text-lg text-black">Fatima Z.</h4>
                  <div className="text-yellow-500 text-sm flex">
                    <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStarHalfAlt />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">“As someone with sensitive skin, I appreciate how gentle the organic soaps are. Will definitely repurchase! The natural fragrance is so refreshing.”</p>
            </div>

            {/* Review 3 */}
            <div className="review-card p-8">
              <div className="flex items-center mb-5">
                <div className="w-14 h-14 bg-brand-green rounded-full flex items-center justify-center text-white font-bold text-xl">S</div>
                <div className="ml-4">
                  <h4 className="font-semibold text-lg text-black">Sana Ahmed</h4>
                  <div className="text-yellow-500 text-sm flex">
                    <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">“The protein powder mixes well and doesn't have that chalky taste. Perfect for my morning smoothies! I've noticed improved energy levels since using it.”</p>
            </div>
          </div>
        </div>
      </section>


   {/* Instagram Feed */}
<section className="py-12 px-4 bg-white">
  <div className="container mx-auto">
    <h2 className="section-title text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 brand-green fade-in">
      Follow Our Journey
    </h2>
    <p className="text-center text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-8">
      See how our community is transforming their hair with Organo products. Share your results with #OrganoBySana
    </p>
    
    <div className="instagram-feed grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto">
      <div className="instagram-item">
        <a href="https://www.instagram.com/p/YOUR_POST_ID_1/" target="_blank" rel="noopener noreferrer">
          <Image 
            src="https://placehold.co/300x300/2a4d2a/ffffff.png?text=Hair+Transformation" 
            alt="Instagram post" 
            width={200}
            height={200}
            className="w-full h-auto aspect-square object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          />
        </a>
      </div>
      
      <div className="instagram-item">
        <a href="https://www.instagram.com/p/YOUR_POST_ID_2/" target="_blank" rel="noopener noreferrer">
          <Image 
            src="https://placehold.co/300x300/3a6b3a/ffffff.png?text=Natural+Ingredients" 
            alt="Instagram post" 
            width={200}
            height={200}
            className="w-full h-auto aspect-square object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          />
        </a>
      </div>
      
      <div className="instagram-item">
        <a href="https://www.instagram.com/p/YOUR_POST_ID_3/" target="_blank" rel="noopener noreferrer">
          <Image 
            src="https://placehold.co/300x300/d4af37/ffffff.png?text=Product+Showcase" 
            alt="Instagram post" 
            width={200}
            height={200}
            className="w-full h-auto aspect-square object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          />
        </a>
      </div>
      
      <div className="instagram-item">
        <a href="https://www.instagram.com/stories/highlights/18366326323147732/" target="_blank" rel="noopener noreferrer">
          <Image 
            src="https://placehold.co/300x300/2a4d2a/ffffff.png?text=Customer+Love" 
            alt="Instagram post" 
            width={200}
            height={200}
            className="w-full h-auto aspect-square object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          />
        </a>
      </div>
      
      <div className="instagram-item">
        <a href="https://www.instagram.com/p/YOUR_POST_ID_5/" target="_blank" rel="noopener noreferrer">
          <Image 
            src="https://placehold.co/300x300/3a6b3a/ffffff.png?text=Behind+The+Scenes" 
            alt="Instagram post" 
            width={200}
            height={200}
            className="w-full h-auto aspect-square object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          />
        </a>
      </div>
    </div>
    
<div className="text-center mt-8">
  <a
    href="https://www.instagram.com/organobysana/"
    target="_blank"
    rel="noopener noreferrer"
    className="btn-outline inline-flex items-center justify-center px-7 py-3 sm:px-11 sm:py-3 text-sm sm:text-base md:text-lg w-full sm:w-auto max-w-sm mx-auto"
  >
    <FaInstagram className="mr-3 text-lg sm:text-xl" /> Follow @OrganoBySana
  </a>
</div>
  </div>
</section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-brand-green text-white">
        <div className="container mx-auto max-w-4xl">
          <div className="newsletter-form text-center bg-white rounded-[15px] p-10 shadow-xl">
            <h2 className="text-3xl font-bold mb-4 text-black">Join Our Beauty Community</h2>
            <p className="text-lg mb-8 text-black">Subscribe to receive exclusive offers, haircare tips, and news about new products.</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input type="email" placeholder="Your email address" className="newsletter-input flex-grow text-black" />
              <button type="submit" className="btn-primary whitespace-nowrap">Subscribe</button>
            </form>
            <p className="text-sm mt-4 text-gray-500">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
