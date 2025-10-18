"use client";

import { CATEGORIES, PRODUCTS } from "@/lib/data";
import type { CategorySlug } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { FaArrowLeft, FaLeaf, FaStar } from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

export default function CategoryPage() {
  const params = useParams() as { slug?: string };
  const slug = (params.slug ?? "") as CategorySlug;

  const category = CATEGORIES[slug as CategorySlug];
  const [isLoading, setIsLoading] = useState(true);
  const [sort, setSort] = useState<
    "featured" | "price-asc" | "price-desc" | "newest" | "best-rated"
  >("featured");

  if (!category) return <div className="p-4 md:p-10">Category not found.</div>;

  // products in this category
  const items = PRODUCTS.filter((p) => p.category === slug);

  // apply sorting
  const itemsSorted = useMemo(() => {
    const copy = [...items];
    const num = (v: unknown) => (typeof v === "number" ? v : 0);

    switch (sort) {
      case "price-asc":
        return copy.sort((a, b) => num(a.price) - num(b.price));
      case "price-desc":
        return copy.sort((a, b) => num(b.price) - num(a.price));
      case "newest":
        return copy.sort(
          (a: any, b: any) => num(b.createdAt) - num(a.createdAt)
        );
      case "best-rated":
        return copy.sort((a: any, b: any) => num(b.rating) - num(a.rating));
      default:
        return copy; // featured = original order
    }
  }, [items, sort]);

  const categoryConfig: Record<
    CategorySlug,
    { gradient: string; accent: string; badge: string; image: string }
  > = {
    "hair-care": {
      gradient: "from-purple-100 to-brand-cream",
      accent: "text-purple-700",
      badge: "bg-purple-100 text-purple-700",
      image: encodeURI("/images/hair-banner.png"),
    },
    "health-wellness": {
      gradient: "from-green-100 to-brand-cream",
      accent: "text-green-700",
      badge: "bg-green-100 text-green-700",
      image: encodeURI("/images/protein-banner.png"),
    },
    "skincare-body": {
      gradient: "from-blue-100 to-brand-cream",
      accent: "text-blue-700",
      badge: "bg-blue-100 text-blue-700",
      image: encodeURI("/images/soap-banner.png"),
    },
    accessories: {
      gradient: "from-amber-100 to-brand-cream",
      accent: "text-amber-700",
      badge: "bg-amber-100 text-amber-700",
      image: encodeURI("/images/accessories-banner.png"),
    },
    bundles: {
      gradient: "from-rose-100 to-brand-cream",
      accent: "text-rose-700",
      badge: "bg-rose-100 text-rose-700",
      image: encodeURI("/images/bundle-banner.png"),
    },
  };

  const config = categoryConfig[slug as CategorySlug];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center p-4">
        {/* loading UI unchanged */}
        <div className="text-center">
          <div className="relative mb-6">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <FaLeaf className="w-8 h-8 md:w-10 md:h-10 text-white animate-spin-slow" />
            </div>
            <div className="absolute -top-2 -right-2 text-2xl animate-bounce">🌿</div>
            <div className="absolute -bottom-2 -left-2 text-2xl animate-bounce delay-300">✨</div>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-brand-green mb-4 animate-pulse">
            Loading {category.title}
          </h3>
          <div className="w-48 md:w-64 h-2 bg-gray-200 rounded-full mx-auto mb-6 overflow-hidden">
            <div className="h-full bg-brand-green rounded-full animate-progress" />
          </div>
          <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
            Preparing our handpicked natural {category.title.toLowerCase()} collection for you...
          </p>
          <div className="flex justify-center space-x-1 mt-4">
            <div className="w-2 h-2 bg-brand-green rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-brand-green rounded-full animate-bounce delay-100" />
            <div className="w-2 h-2 bg-brand-green rounded-full animate-bounce delay-200" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-brand-cream overflow-x-hidden">
      {/* Header */}
      <section
        className="py-12 md:py-20 px-4 relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${config.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 backdrop-blur-[1px]" />
        <div className="container mx-auto relative z-10 max-w-7xl px-4 sm:px-6">
          <div className="flex flex-row items-center justify-between mb-8 animate-slide-in-down">
            <Link
              href="/"
              className="flex items-center text-white hover:text-brand-gold transition-all duration-500 group font-medium bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-black/40 whitespace-nowrap"
            >
              <FaArrowLeft className="mr-2 group-hover:-translate-x-2 transition-transform duration-300" />
              Back to Home
            </Link>
            <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg border border-white/20 hover:scale-105 transition-transform duration-300 whitespace-nowrap">
              <FaLeaf className="text-brand-green animate-pulse text-sm" />
              <span className="text-sm font-medium text-brand-green">100% Organic</span>
            </div>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6 animate-fade-in-up">
              {category.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-8 md:mb-10 leading-relaxed font-light animate-fade-in-up delay-200 px-2">
              {category.blurb}
            </p>

            {/* Stats */}
            <div className="flex flex-row justify-center items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 text-center animate-fade-in-up delay-400">
              <div className="bg-white/90 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl shadow-2xl border border-white/20 hover:scale-105 transition-transform duration-300 min-w-[100px] sm:min-w-[120px]">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-900 animate-count-up">
                  {itemsSorted.length}
                </div>
                <div className="text-xs text-black font-medium">Premium Products</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl shadow-2xl border border-white/20 hover:scale-105 transition-transform duration-300 min-w-[100px] sm:min-w-[120px]">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-900 flex items-center justify-center">
                  <FaStar className="text-yellow-400 mr-1 sm:mr-2 animate-spin-slow text-sm sm:text-base" />
                  4.9
                </div>
                <div className="text-xs text-black font-medium">Customer Rating</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl shadow-2xl border border-white/20 hover:scale-105 transition-transform duration-300 min-w-[100px] sm:min-w-[120px]">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-900">100%</div>
                <div className="text-xs text-black font-medium">Natural Ingredients</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-12 md:py-20 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 md:mb-12 p-4 md:p-6 bg-brand-cream rounded-xl md:rounded-2xl shadow-lg border border-amber-200 transition-all duration-500 animate-fade-in-up">
            <div className="text-center md:text-left">
              <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-brand-green mb-1">
                Our {category.title} Collection
              </h2>
              <p className="text-gray-700 text-xs sm:text-sm">Handpicked natural products</p>
            </div>

            <div className="flex items-center gap-2 mt-2 md:mt-0">
              <span className="text-black font-medium text-xs sm:text-sm whitespace-nowrap">Sort by:</span>
              <div className="relative w-32 sm:w-40">
                <select
                  value={sort}
                  onChange={(e) =>
                    setSort(
                      e.target.value as
                        | "featured"
                        | "price-asc"
                        | "price-desc"
                        | "newest"
                        | "best-rated"
                    )
                  }
                  className="border border-gray-300 rounded-lg px-2 py-1 sm:px-3 sm:py-2 w-full focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold bg-white text-gray-800 text-xs sm:text-sm transition-all duration-300 appearance-none"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                  <option value="best-rated">Best Rated</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-gray-700">
                  <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid (uses itemsSorted) */}
          {itemsSorted.length > 0 ? (
            <div className="grid grid-cols-2 min-[480px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
              {itemsSorted.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 md:py-20 bg-brand-cream rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl border border-amber-200 animate-bounce-in px-4">
              <div className="text-5xl md:text-6xl lg:text-8xl mb-4 md:mb-6 animate-pulse">✨</div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-brand-green mb-4">
                Exciting Products Coming Soon!
              </h3>
              <p className="text-gray-700 mb-6 md:mb-8 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                We're carefully preparing amazing {category.title.toLowerCase()} products that will exceed your expectations.
              </p>
              <Link
                href="/"
                className="btn-primary inline-flex items-center px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 text-sm md:text-base lg:text-lg font-medium hover:scale-105 transition-transform duration-300"
              >
                Explore Other Categories
              </Link>
            </div>
          )}

          {/* CTA */}
          <div className="text-center mt-12 md:mt-20 p-4 md:p-6 lg:p-12 bg-brand-cream rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl border border-amber-200 hover:shadow-2xl md:hover:shadow-3xl transition-all duration-500 animate-fade-in-up delay-500">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900 animate-pulse">
              Need Personalized Advice?
            </h3>
            <p className="text-gray-700 mb-6 md:mb-8 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
              Our natural care experts are here to help you choose the perfect products for your unique needs and lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-brand-green text-white hover:bg-green-700 font-bold py-2 px-4 md:py-3 md:px-6 lg:py-4 lg:px-8 rounded-xl md:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-200 animate-bounce hover:animate-none text-sm md:text-base lg:text-lg w-full sm:w-auto text-center"
              >
                Consult Our Experts
              </Link>
              <Link
                href="/"
                className="bg-brand-cream border-2 border-gray-900 text-green-900 hover:bg-gray-900 hover:text-black font-bold py-2 px-4 md:py-3 md:px-6 lg:py-4 lg:px-8 rounded-xl md:rounded-2xl transition-all duration-300 transform hover:scale-105 animate-pulse-slow text-sm md:text-base lg:text-lg w-full sm:w-auto text-center"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
