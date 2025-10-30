"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PRODUCTS } from "@/lib/data";
import type { CatalogItem, ProductBundle } from "@/lib/types";
import { isSingle, isKit, resolveKit, kitIngredientsByProduct } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { useMemo, useRef, useState, useEffect } from "react";
import { flyToCart } from "@/lib/flyToCart";
import {
  FaStar, FaStarHalfAlt, FaCheck, FaSeedling, FaLeaf, FaSpa, FaShieldAlt, FaHeart,
  FaChevronLeft, FaChevronRight, FaExpand, FaTruck, FaLock, FaExclamationTriangle, FaTimes
} from "react-icons/fa";

/* ---------- small helpers ---------- */
function pctOff(price: number, compareAt?: number) {
  if (!compareAt || compareAt <= price) return null;
  return Math.round(((compareAt - price) / compareAt) * 100);
}

/* ---------- PARENT: handles loading + not found (NO conditional hooks) ---------- */
export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();

  // Loading gate – this hook is ALWAYS called in this component
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(t);
  }, [slug]);

  // Find product – memoized (always called)
  const product = useMemo(
    () => PRODUCTS.find((p) => p.slug === slug) as CatalogItem | undefined,
    [slug]
  );

  // Render THREE stable branches (no hooks below this line)
  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <FaLeaf className="w-8 h-8 md:w-10 md:h-10 text-white animate-spin-slow" />
            </div>
            <div className="absolute -top-2 -right-2 text-2xl animate-bounce">🌿</div>
            <div className="absolute -bottom-2 -left-2 text-2xl animate-bounce delay-300">✨</div>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-brand-green mb-4 animate-pulse">
            {product?.name ? `Loading ${product.name}` : "Loading product"}
          </h3>
          <div className="w-48 md:w-64 h-2 bg-gray-200 rounded-full mx-auto mb-6 overflow-hidden">
            <div className="h-full bg-brand-green rounded-full animate-progress" />
          </div>
          <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
            Preparing all the details for you…
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

  if (!product) {
    return (
      <main className="container mx-auto p-6">
        <p className="text-red-600 font-semibold">Product not found.</p>
        <Link href="/" className="text-black hover:text-brand-gold transition mt-4 inline-block">
          Go Home
        </Link>
      </main>
    );
  }

  // All heavy hooks/UI live in the child; parent’s hooks never change order.
  return <ProductDetails product={product} />;
}

/* ---------- CHILD: all product UI + hooks (NO early returns) ---------- */
function ProductDetails({ product }: { product: CatalogItem }) {
  const { addItem, open } = useCart();
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => { setIsVisible(true); }, []);

  const single = isSingle(product);

  type Normalized = {
    gallery: { src: string; alt: string }[];
    benefits: string[];
    bundles: ProductBundle[];
    rating: number;
    reviewsCount: number;
    badges: string[];
    description: string;
    keyFeatures: string[];
    idealFor: string[];
    howToUse: { title: string; text: string }[];
    ingredients: string[];
    category: string;
    price: number;
    compareAtPrice?: number;
    name: string;
    faqs: { question: string; answer: string }[];
    sizeLabel?: string;
    colors: string[];
    allowDuplicateColors?: boolean;
  };

  const {
    gallery, benefits, bundles, rating, reviewsCount, badges,
    description, keyFeatures, idealFor, howToUse, ingredients,
    category, price, compareAtPrice, name, faqs, sizeLabel, colors, allowDuplicateColors
  } = useMemo<Normalized>(() => {
    const baseGallery =
      (product?.gallery?.length ? product.gallery : [{ src: (product as any).image, alt: product!.name }])
        .map(m => ({ src: encodeURI(m.src), alt: m.alt ?? product!.name }));

    if (isSingle(product)) {
      return {
        gallery: baseGallery,
        benefits: product.benefits ?? [],
        bundles: product.bundles ?? [],
        rating: product.rating ?? 4.8,
        reviewsCount: product.reviewsCount ?? 0,
        badges: product.badges ?? [],
        description: product.description ?? "",
        keyFeatures: product.keyFeatures ?? [],
        idealFor: product.idealFor ?? [],
        howToUse: product.howToUse ?? [],
        ingredients: product.ingredients ?? [],
        category: product.category ?? "singles",
        price: product.price ?? 0,
        compareAtPrice: product.compareAtPrice,
        name: product.name ?? "Product",
        faqs: product.faqs ?? [],
        sizeLabel: product.sizeLabel,
        colors: product.colors ?? [],
        allowDuplicateColors: (product as any).allowDuplicateColors ?? false,
      };
    }

    return {
      gallery: baseGallery,
      benefits: [],
      bundles: [],
      rating: (product as any)?.rating ?? 4.8,
      reviewsCount: (product as any)?.reviewsCount ?? 0,
      badges: ((product as any)?.badges ?? []) as string[],
      description: product?.description ?? "",
      keyFeatures: [],
      idealFor: [],
      howToUse: [],
      ingredients: [],
      category: product?.category ?? "bundles",
      price: (product as any)?.price ?? 0,
      compareAtPrice: (product as any)?.compareAtPrice,
      name: product?.name ?? "Bundle",
      faqs: [],
      sizeLabel: undefined,
      colors: [],
      allowDuplicateColors: false,
    };
  }, [product]);

  const kitMeta = useMemo(() => {
    if (!isKit(product)) return null;
    const items = resolveKit(product);
    const uniq = <T,>(arr: T[]) => Array.from(new Set(arr));

    const sumParts = items.reduce(
      (acc, { product: p, quantity }) => acc + (p.compareAtPrice ?? p.price) * quantity,
      0
    );

    const mergedBenefits = uniq(items.flatMap(({ product: p }) => p.benefits ?? [])).slice(0, 6);
    const mergedFeatures = uniq(items.flatMap(({ product: p }) => p.keyFeatures ?? [])).slice(0, 8);
    const mergedIngredients = uniq(items.flatMap(({ product: p }) => p.ingredients ?? [])).slice(0, 40);
    const mergedHowTo = items.map(({ product: p }, i) => ({
      title: p.name,
      text:
        (p.howToUse?.[0]?.text ?? p.howToUse?.[0] ?? "Use as directed.") +
        (i < items.length - 1 ? " Then continue to the next step." : ""),
    }));

    const contentsSnippet = items
      .map(({ product: p, quantity }) => `${quantity > 1 ? `x${quantity} ` : ""}${p.name}${p.sizeLabel ? ` (${p.sizeLabel})` : ""}`)
      .slice(0, 3)
      .join(" · ");

    return { items, sumParts, mergedBenefits, mergedFeatures, mergedIngredients, mergedHowTo, contentsSnippet };
  }, [product]);

  const displayBenefits = isKit(product) && kitMeta ? kitMeta.mergedBenefits : benefits;
  const displayKeyFeatures = isKit(product) && kitMeta ? kitMeta.mergedFeatures : keyFeatures;
  const displayIngredients = isKit(product) && kitMeta ? kitMeta.mergedIngredients : ingredients;
  const displayHowTo = isKit(product) && kitMeta ? kitMeta.mergedHowTo : howToUse;

  const stock = useMemo(() => {
    if (isSingle(product)) return product.stock;
    if (isKit(product)) {
      try {
        const items = resolveKit(product);
        return Math.min(...items.map(({ product: p, quantity }) => Math.floor(p.stock / quantity)));
      } catch {
        return 0;
      }
    }
    return 0;
  }, [product]);

  const perProductIngredients = useMemo(() => {
    if (!isKit(product)) return null;
    return kitIngredientsByProduct(product);
  }, [product]);

  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] =
    useState<"description" | "how" | "ingredients" | "reviews" | "faqs">("description");
  const [activeBundle, setActiveBundle] = useState<ProductBundle | null>(bundles[0] ?? null);

  // SINGLE: multi-select colors
  const colorRequired = isSingle(product) && colors.length > 0;
  const requiredCount = colorRequired ? (activeBundle?.quantity ?? 1) : 0;
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [colorError, setColorError] = useState<string | null>(null);

  useEffect(() => {
    if (!colorRequired) return;
    setSelectedColors((prev) => prev.slice(0, requiredCount));
  }, [requiredCount, colorRequired]);

  const addColor = (c: string) => {
    setColorError(null);
    if (!colorRequired) return;

    if (allowDuplicateColors) {
      if (selectedColors.length < requiredCount) {
        setSelectedColors((prev) => [...prev, c]);
      } else {
        setSelectedColors((prev) => [...prev.slice(0, requiredCount - 1), c]);
      }
    } else {
      setSelectedColors((prev) => {
        if (prev.includes(c)) return prev.filter((x) => x !== c);
        if (prev.length < requiredCount) return [...prev, c];
        return [...prev.slice(0, requiredCount - 1), c];
      });
    }
  };

  const removeColorAt = (idx: number) => {
    setSelectedColors((prev) => prev.filter((_, i) => i !== idx));
    setColorError(null);
  };

  const groupedSelections = useMemo(() => {
    const m = new Map<string, number>();
    selectedColors.forEach((c) => m.set(c, (m.get(c) ?? 0) + 1));
    return Array.from(m.entries());
  }, [selectedColors]);

  // KIT: per-item color selections
  const [kitColorChoices, setKitColorChoices] = useState<Record<string, string[]>>({});
  const [kitColorErrors, setKitColorErrors] = useState<Record<string, boolean>>({});
  function setKitColors(productId: string, next: string[]) {
    setKitColorChoices((prev) => ({ ...prev, [productId]: next }));
    setKitColorErrors((prev) => ({ ...prev, [productId]: false }));
  }

  // Pricing
  const currentPrice = activeBundle ? activeBundle.price : price;
  const currentCompareAtPrice = activeBundle ? activeBundle.compareAtPrice : compareAtPrice;
  const discount = pctOff(currentPrice, currentCompareAtPrice);

  const handleAdd = () => {
    if (colorRequired && selectedColors.length < requiredCount) {
      const remaining = requiredCount - selectedColors.length;
      setColorError(`Please select ${remaining} more color${remaining > 1 ? "s" : ""} to add to cart.`);
      return;
    }

    if (isKit(product) && kitMeta) {
      const nextErrors: Record<string, boolean> = {};
      let hasError = false;
      for (const { product: p, quantity } of kitMeta.items) {
        const hasColors =
          ("colors" in p) && Array.isArray((p as any).colors) && (p as any).colors.length > 0;
        if (!hasColors) continue;
        const picked = kitColorChoices[p.id] ?? [];
        if (picked.length !== quantity) {
          nextErrors[p.id] = true;
          hasError = true;
        }
      }
      if (hasError) {
        setKitColorErrors(nextErrors);
        return;
      }
    }

    if (imgWrapRef.current) {
      flyToCart(imgWrapRef.current, product.category, open);
    }

    const productToAdd: any = {
      ...product,
      bundle: activeBundle
        ? {
            quantity: activeBundle.quantity,
            price: activeBundle.price,
            compareAtPrice: activeBundle.compareAtPrice,
            badge: activeBundle.badge,
          }
        : undefined,
    };

    if (colorRequired) {
      productToAdd.selectedOptions = { colors: selectedColors };
    }

    if (isKit(product) && Object.keys(kitColorChoices).length) {
      productToAdd.kitSelectedOptions = Object.fromEntries(
        Object.entries(kitColorChoices).map(([pid, colors]) => [pid, { colors }])
      );
    }

    addItem(productToAdd, qty);
  };

  const benefitIcons = [FaSeedling, FaLeaf, FaSpa, FaShieldAlt, FaHeart];

  const nextImage = () => setActiveImg((prev) => (prev + 1) % gallery.length);
  const prevImage = () => setActiveImg((prev) => (prev - 1 + gallery.length) % gallery.length);

  useEffect(() => {
    if (gallery.length > 1) {
      const interval = setInterval(nextImage, 5000);
      return () => clearInterval(interval);
    }
  }, [gallery.length]);

  return (
    <main className="bg-brand-cream min-h-screen">
      {/* HERO */}
      <section className="pt-7 pb-10 px-4 bg-gradient-to-b from-white to-brand-cream relative overflow-hidden">
        <div className="container mx-auto">
          {/* Breadcrumb */}
          <div className={`mb-6 text-black transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <Link href="/" className="text-black hover:text-brand-gold transition duration-300">Home</Link>
            <span className="mx-2 text-brand-gold">/</span>
            <Link href={`/category/${category}`} className="text-black hover:text-brand-gold transition duration-300 capitalize">
              {category.replace(/-/g, " ")}
            </Link>
            <span className="mx-2 text-brand-gold">/</span>
            <span className="text-brand-gold font-semibold">{name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Gallery */}
            <div className="space-y-6">
              {/* Main slider */}
              <div
                ref={imgWrapRef}
                className={`relative transition-all duration-700 overflow-hidden group ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
              >
                {badges[0] && (
                  <div className="absolute top-4 right-4 bg-brand-gold text-white px-4 py-2 rounded-full text-sm font-bold z-20 animate-pulse shadow-lg">
                    {badges[0]}
                  </div>
                )}

                {/* Nav arrows */}
                {gallery.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white text-brand-green rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 z-10 shadow-xl hover:scale-110 border border-gray-100"
                      aria-label="Previous image"
                    >
                      <FaChevronLeft className="react-icons" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white text-brand-green rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 z-10 shadow-xl hover:scale-110 border border-gray-100"
                      aria-label="Next image"
                    >
                      <FaChevronRight className="react-icons" />
                    </button>
                  </>
                )}

                {/* Zoom */}
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="absolute top-4 left-4 w-12 h-12 bg-white/90 hover:bg-white text-brand-green rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 z-10 shadow-xl hover:scale-110 border border-gray-100"
                  aria-label="Zoom image"
                >
                  <FaExpand className="react-icons text-sm" />
                </button>

                {/* Counter */}
                {gallery.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm z-10 backdrop-blur-sm">
                    {activeImg + 1} / {gallery.length}
                  </div>
                )}

                {/* Main image */}
                <div className="relative overflow-hidden">
                  <Image
                    src={gallery[activeImg].src}
                    alt={gallery[activeImg].alt ?? name}
                    width={900}
                    height={900}
                    className={`w-full h-[500px] object-contain transition-all duration-500 cursor-zoom-in ${imageLoaded ? "scale-100 opacity-100" : "scale-105 opacity-0"} ${isZoomed ? "scale-150" : ""}`}
                    priority
                    onLoad={() => setImageLoaded(true)}
                    onClick={() => setIsZoomed(!isZoomed)}
                  />
                </div>

                {/* Progress bar */}
                {gallery.length > 1 && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200/30">
                    <div
                      className="h-full bg-gradient-to-r from-brand-green to-brand-gold transition-all duration-100"
                      style={{ width: `${((activeImg + 1) / gallery.length) * 100}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Thumbs */}
              {gallery.length > 1 && (
                <div className="relative">
                  {gallery.length > 4 && (
                    <>
                      <button
                        onClick={() => {
                          const container = document.getElementById("thumbnail-container");
                          if (container) container.scrollLeft -= 120;
                        }}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white text-brand-green rounded-full flex items-center justify-center transition-all duration-300 z-10 shadow-lg hover:scale-110 -ml-4 border border-gray-200"
                        aria-label="Scroll thumbnails left"
                      >
                        <FaChevronLeft className="react-icons text-xs" />
                      </button>
                      <button
                        onClick={() => {
                          const container = document.getElementById("thumbnail-container");
                          if (container) container.scrollLeft += 120;
                        }}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white text-brand-green rounded-full flex items-center justify-center transition-all duration-300 z-10 shadow-lg hover:scale-110 -mr-4 border border-gray-200"
                        aria-label="Scroll thumbnails right"
                      >
                        <FaChevronRight className="react-icons text-xs" />
                      </button>
                    </>
                  )}

                  <div
                    id="thumbnail-container"
                    className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory py-2"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  >
                    {gallery.map((m, i) => (
                      <button
                        key={m.src + i}
                        onClick={() => setActiveImg(i)}
                        className={`relative overflow-hidden transition-all duration-300 transform hover:scale-105 snap-start flex-shrink-0 group ${i === activeImg ? "scale-105 shadow-lg ring-2 ring-brand-gold" : "hover:shadow-md"}`}
                        aria-pressed={i === activeImg}
                      >
                        <Image
                          src={m.src}
                          alt={m.alt ?? `${name} thumbnail ${i + 1}`}
                          width={100}
                          height={100}
                          className="w-20 h-20 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Dots */}
              {gallery.length > 1 && (
                <div className="flex justify-center gap-2">
                  {gallery.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeImg ? "bg-brand-gold scale-125" : "bg-gray-300 hover:bg-gray-400"}`}
                      aria-label={`Go to image ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className={`space-y-6 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              <header>
                <h1 className="text-4xl md:text-5xl font-bold text-brand-green animate-fade-in-up">
                  {name}
                  {sizeLabel && <span className="ml-3 align-middle text-base font-normal text-gray-600">({sizeLabel})</span>}
                </h1>

                {isKit(product) && kitMeta && (
                  <p className="mt-2 text-sm text-gray-700">
                    In this bundle: <span className="font-medium">{kitMeta.contentsSnippet}</span>
                  </p>
                )}

                <div className="flex items-center mt-4 gap-3 flex-wrap animate-fade-in-up delay-300">
                  <div className="text-yellow-800 flex gap-1">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
                  </div>
                  {reviewsCount > 0 && <span className="text-black">({reviewsCount} reviews)</span>}
                  {stock > 0 ? (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">In Stock</span>
                  ) : (
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm">Out of Stock</span>
                  )}
                  {badges.slice(1).map(b => (
                    <span key={b} className="bg-brand-beige text-black px-2 py-1 rounded-full text-xs border border-brand-gold/20">
                      {b}
                    </span>
                  ))}
                </div>
              </header>

              {/* Price */}
              <div className="text-3xl font-bold text-brand-green animate-fade-in-up delay-400">
                Rs. {currentPrice.toLocaleString()}
                {currentCompareAtPrice && currentCompareAtPrice > currentPrice && (
                  <>
                    <span className="text-lg text-gray-500 line-through ml-2">
                      Rs. {currentCompareAtPrice.toLocaleString()}
                    </span>
                    {typeof discount === "number" && (
                      <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded ml-2">
                        {discount}% OFF
                      </span>
                    )}
                  </>
                )}
              </div>

              {sizeLabel && <div className="mt-1 text-sm text-gray-600">Size: {sizeLabel}</div>}

              {/* Guarantees */}
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center gap-2 text-sm text-green-600"><FaShieldAlt /> <span>30-Day Money Back</span></div>
                <div className="flex items-center gap-2 text-sm text-blue-600"><FaTruck /> <span>Free Shipping Over Rs. 2000</span></div>
                <div className="flex items-center gap-2 text-sm text-purple-600"><FaLock /> <span>Secure SSL Checkout</span></div>
                <div className="flex items-center gap-2 text-sm text-black"><FaCheck /> <span>100% Natural Ingredients</span></div>
              </div>

              {/* Benefits */}
              {displayBenefits.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-brand-green">Key Benefits:</h3>
                  <ul className="space-y-3">
                    {displayBenefits.map((b, i) => {
                      const IconComponent = benefitIcons[i] || FaCheck;
                      return (
                        <li key={i} className="flex items-center p-3 rounded-lg">
                          <div className="w-10 h-10 bg-brand-gold text-white rounded-full grid place-items-center mr-3">
                            <IconComponent className="text-sm react-icons" />
                          </div>
                          <span className="text-black">{b}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* SINGLE: Color options (ONLY if this product has colors) */}
              {colorRequired && (
                <div className="mt-2">
                  <div className="text-sm font-semibold mb-2 flex items-center gap-2">
                    Choose Colors <span className="text-red-600">*</span>
                    <span className="text-xs text-gray-600">
                      ({selectedColors.length}/{requiredCount}{allowDuplicateColors ? ", duplicates allowed" : ""})
                    </span>
                  </div>

                  <div className="flex gap-2 flex-wrap mb-3">
                    {colors.map((c) => {
                      const isActive = selectedColors.includes(c);
                      return (
                        <button
                          key={c}
                          type="button"
                          onClick={() => addColor(c)}
                          aria-pressed={isActive}
                          className={`px-3 py-1 rounded-full text-sm border transition ${
                            isActive
                              ? "border-brand-gold bg-brand-gold text-white"
                              : "border-gray-300 bg-white text-black hover:border-brand-gold"
                          }`}
                          title={c}
                        >
                          {c}
                        </button>
                      );
                    })}
                  </div>

                  {selectedColors.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {groupedSelections.map(([c, count], idx) => (
                        <span
                          key={c + idx}
                          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-brand-beige border border-brand-gold/30 text-black"
                        >
                          {c} {count > 1 ? `×${count}` : ""}
                          <button
                            type="button"
                            aria-label={`Remove ${c}`}
                            className="ml-1 text-gray-600 hover:text-black"
                            onClick={() => {
                              if (allowDuplicateColors) {
                                const index = selectedColors.findIndex((x) => x === c);
                                if (index >= 0) removeColorAt(index);
                              } else {
                                setSelectedColors((prev) => prev.filter((x) => x !== c));
                              }
                            }}
                          >
                            <FaTimes className="text-xs" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  {colorRequired && selectedColors.length < requiredCount && (
                    <div className="text-xs text-gray-600">
                      Select {requiredCount - selectedColors.length} more color{(requiredCount - selectedColors.length) > 1 ? "s" : ""}.
                    </div>
                  )}
                  {colorError && <div className="mt-2 text-sm text-red-600">{colorError}</div>}
                </div>
              )}

              {/* KIT: per-item color selection (ONLY for items that have colors) */}
              {isKit(product) && kitMeta && (
                <div className="space-y-5">
                  {kitMeta.items.map(({ product: p, quantity }) => {
                    const pAny = p as any;
                    const hasColors = Array.isArray(pAny.colors) && pAny.colors.length > 0;
                    if (!hasColors) return null; // e.g., Wooden Comb -> no color UI

                    const allowDup = Boolean(pAny.allowDuplicateColors);
                    const picked = kitColorChoices[p.id] ?? [];
                    const remaining = Math.max(0, quantity - picked.length);

                    return (
                      <div key={p.id} className="border rounded-lg p-3 bg-brand-beige/20">
                        <div className="text-sm font-semibold text-brand-green mb-2">
                          {p.name}: choose {quantity} {quantity === 1 ? "color" : "colors"} {allowDup ? "(duplicates allowed)" : ""}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {pAny.colors.map((c: string) => (
                            <button
                              key={c}
                              type="button"
                              className="px-3 py-1 rounded-full text-sm border border-gray-300 bg-white text-black hover:border-brand-gold"
                              onClick={() => {
                                if (picked.length >= quantity) return;
                                setKitColors(p.id, [...picked, c]); // push one (duplicates OK)
                              }}
                              title={`Add ${c}`}
                            >
                              + {c}
                            </button>
                          ))}
                        </div>

                        {picked.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {picked.map((c, idx) => (
                              <span
                                key={`${c}-${idx}`}
                                className="px-3 py-1 rounded-full text-sm border bg-brand-gold text-white inline-flex items-center gap-2"
                              >
                                {c} ×1
                                <button
                                  type="button"
                                  className="opacity-90 hover:opacity-100"
                                  onClick={() => {
                                    const copy = [...picked];
                                    copy.splice(idx, 1);
                                    setKitColors(p.id, copy);
                                  }}
                                  aria-label={`Remove ${c}`}
                                >
                                  <FaTimes className="text-xs" />
                                </button>
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="mt-1 text-xs text-gray-700">
                          {remaining > 0
                            ? `${remaining} more ${remaining === 1 ? "selection" : "selections"} needed`
                            : "All selections made"}
                        </div>

                        {kitColorErrors[p.id] && (
                          <div className="mt-1 text-sm text-red-600">
                            Please select {quantity} colors for {p.name}.
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

             {/* Bundles (singles only) */}
{bundles.length > 0 && (
  <div className="space-y-4">
    <h3 className="text-xl font-bold text-brand-green">Choose Your Bundle:</h3>

    <div className="grid grid-cols-3 gap-2">
      {bundles.map((bundle, index) => {
        const active = activeBundle?.quantity === bundle.quantity;
        return (
          <button
            key={index}
            onClick={() => { setActiveBundle(bundle); setColorError(null); }}
            className={`relative min-w-0 w-full border-2 rounded-lg p-3 sm:p-4 text-left leading-tight
              ${active ? "border-brand-gold bg-brand-gold text-white shadow-md"
                       : "border-gray-200 bg-white text-black"}`}
          >
            {/* BADGE: force one line, make wider */}
            {bundle.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2
                              px-3 py-1 rounded-full text-[11px] font-bold text-white bg-green-800
                              whitespace-nowrap min-w-[98px] text-center">
                {bundle.badge}
              </div>
            )}

            <div className="font-semibold text-sm sm:text-base mb-1 text-center truncate">
              {bundle.quantity} {bundle.quantity === 1 ? "Pack" : "Packs"}
            </div>

            <div className="space-y-0.5 text-center">
              {/* PRICE: decreased size */}
              <div className={`font-bold text-base sm:text-xl ${active ? "text-white" : "text-brand-green"}`}>
                Rs. {bundle.price.toLocaleString()}
              </div>

              {bundle.compareAtPrice && bundle.compareAtPrice > bundle.price && (
                <div className={`line-through text-[10px] sm:text-xs ${active ? "text-white/80" : "text-gray-500"}`}>
                  Rs. {bundle.compareAtPrice.toLocaleString()}
                </div>
              )}

              {bundle.savings && (
                <div className="text-[11px] sm:text-sm font-semibold text-red-600">
                  {bundle.savings}
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  </div>
)}

              {/* Low stock alert */}
              {stock > 0 && stock < 20 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                  <div className="flex items-center gap-3 text-red-700">
                    <FaExclamationTriangle className="react-icons" />
                    <div>
                      <div className="font-semibold">Low Stock Alert!</div>
                      <div className="text-sm">Only {stock} left - Selling fast!</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: `${Math.min(100, (stock / 50) * 100)}%` }} />
                  </div>
                </div>
              )}

              {/* Qty + CTA */}
<div className="pt-2">
  <div className="flex items-center gap-3 flex-nowrap w-full">
    {/* Counter (fixed width; never wraps) */}
    <div className="flex items-center gap-2 shrink-0">
      <button
        className="w-9 h-9 border-2 border-black bg-white text-black rounded-lg"
        onClick={() => setQty((q) => Math.max(1, q - 1))}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <input
        className="w-12 h-9 border-2 border-black text-center font-bold rounded-lg text-black"
        value={qty}
        onChange={(e) => {
          const v = parseInt(e.target.value || "1", 10);
          setQty(Number.isNaN(v) ? 1 : Math.max(1, v));
        }}
      />
      <button
        className="w-9 h-9 border-2 border-black bg-white text-black rounded-lg"
        onClick={() => setQty((q) => q + 1)}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>

    {/* Add to Cart (fills remaining space, stays on the same row) */}
<button
  onClick={handleAdd}
  disabled={stock <= 0}
  className="
    btn-primary inline-flex items-center justify-center
    flex-none w-auto           /* don't stretch on mobile */
    max-w-[200px]              /* cap width so it can't exceed */
    sm:flex-1 sm:max-w-none    /* allow growth on ≥sm if desired */
    px-4 py-3 text-sm sm:text-base
    whitespace-nowrap rounded-xl disabled:opacity-60
  "
>
  <span className="mr-2">🛒</span>
  Add to Cart
</button>

  </div>

  <div className="mt-6">
    <Link href={`/category/${category}`} className="text-black hover:text-brand-gold transition inline-flex items-center gap-2">
      ← <span className="underline-offset-2 hover:underline">Back to category</span>
    </Link>
  </div>
</div>

            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-14 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            <button
              className={`border-2 border-brand-beige px-6 py-4 rounded-lg font-semibold ${activeTab === "description" ? "bg-brand-green text-white border-brand-green" : "bg-white text-black"}`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            {displayHowTo.length > 0 && (
              <button
                className={`border-2 border-brand-beige px-6 py-4 rounded-lg font-semibold ${activeTab === "how" ? "bg-brand-green text-white border-brand-green" : "bg-white text-black"}`}
                onClick={() => setActiveTab("how")}
              >
                How to Use
              </button>
            )}
            {displayIngredients.length > 0 && (
              <button
                className={`border-2 border-brand-beige px-6 py-4 rounded-lg font-semibold ${activeTab === "ingredients" ? "bg-brand-green text-white border-brand-green" : "bg-white text-black"}`}
                onClick={() => setActiveTab("ingredients")}
              >
                Ingredients
              </button>
            )}
            <button
              className={`border-2 border-brand-beige px-6 py-4 rounded-lg font-semibold ${activeTab === "reviews" ? "bg-brand-green text-white border-brand-green" : "bg-white text-black"}`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </button>
            <button
              className={`border-2 border-brand-beige px-6 py-4 rounded-lg font-semibold ${activeTab === "faqs" ? "bg-brand-green text-white border-brand-green" : "bg-white text-black"}`}
              onClick={() => setActiveTab("faqs")}
            >
              FAQs
            </button>
          </div>

          <div className="feature-card p-6 md:p-10">
            {/* Description */}
            {activeTab === "description" && (
              <div>
                <h3 className="text-2xl font-bold text-brand-green mb-4">Product Description</h3>
                <p className="text-black leading-relaxed mb-8">{description}</p>

                {/* Key Features */}
                {displayKeyFeatures.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-brand-green mb-4">Key Features:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {displayKeyFeatures.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-5 h-5 bg-brand-green rounded-full grid place-items-center mt-0.5">
                            <FaCheck className="text-white text-[10px]" />
                          </div>
                          <span className="text-black">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ideal For */}
                {idealFor.length > 0 && (
                  <div>
                    <h4 className="text-xl font-bold text-brand-green mb-4">Ideal For:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {idealFor.map((useCase, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-5 h-5 bg-brand-gold rounded-full grid place-items-center mt-0.5">
                            <span className="text-white text-[10px]">✓</span>
                          </div>
                          <span className="text-black">{useCase}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* How to Use */}
            {activeTab === "how" && displayHowTo.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-brand-green mb-6">How to Use for Best Results</h3>
                <ol className="space-y-6">
                  {displayHowTo.map((s, i) => (
                    <li key={s.title + i} className="flex items-start gap-3 p-4 rounded-lg bg-brand-beige/20">
                      <div className={`w-10 h-10 rounded-full grid place-items-center font-bold mr-2 ${i === 0 ? "bg-brand-gold text-white" : "bg-brand-beige text-black"}`}>{i + 1}</div>
                      <div>
                        <h4 className="font-bold text-lg text-brand-green">{s.title}</h4>
                        <p className="text-black">{s.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Ingredients */}
            {activeTab === "ingredients" && (
              <div>
                <h3 className="text-2xl font-bold text-brand-green mb-6">Ingredients</h3>

                {perProductIngredients ? (
                  <div className="space-y-6">
                    {perProductIngredients.map((p, i) => (
                      <div key={p.name + i} className="bg-brand-beige/30 rounded-xl p-6">
                        <div className="flex items-baseline gap-2 mb-2">
                          <h4 className="text-lg font-semibold text-brand-green">
                            {p.name}{p.sizeLabel ? ` (${p.sizeLabel})` : ""}
                          </h4>
                          {p.quantity > 1 && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-brand-gold text-white">x{p.quantity}</span>
                          )}
                        </div>

                        {p.ingredients && p.ingredients.length > 0 ? (
                          <ul className="list-disc pl-6 text-black leading-relaxed">
                            {p.ingredients.map((ing, idx) => (
                              <li key={ing + idx}>{ing}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-black/70">No ingredients listed for this item.</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  displayIngredients.length > 0 && (
                    <div className="bg-brand-beige/30 rounded-xl p-6">
                      <p className="text-black leading-relaxed text-lg">
                        {displayIngredients.join(", ")}
                      </p>
                    </div>
                  )
                )}
              </div>
            )}

            {/* Reviews */}
            {activeTab === "reviews" && (
              <div>
                <h3 className="text-2xl font-bold text-brand-green mb-6">Customer Reviews</h3>
                <div className="flex items-end justify-between mb-6 flex-wrap gap-4">
                  <div>
                    <div className="text-4xl font-bold text-brand-green">{rating.toFixed(1)}</div>
                    <div className="text-brand-gold flex gap-1">
                      <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
                    </div>
                    <div className="text-black">Based on {reviewsCount} reviews</div>
                  </div>
                  <button className="btn-outline">
                    <span className="mr-2">✍️</span>Write a Review
                  </button>
                </div>

                <div className="review-card p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-brand-green rounded-full text-white grid place-items-center font-bold">A</div>
                      <div>
                        <div className="font-bold text-black">A customer</div>
                        <div className="text-brand-gold text-sm flex gap-1">
                          <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">recently</span>
                  </div>
                  <p className="text-black">Great quality and results. Will buy again.</p>
                </div>
              </div>
            )}

            {/* FAQs */}
            {activeTab === "faqs" && (
              <div>
                <h3 className="text-2xl font-bold text-brand-green mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {faqs && faqs.length > 0 ? (
                    faqs.map((faq, index) => (
                      <details key={index} className="border-b border-brand-beige py-4 px-4 rounded-lg">
                        <summary className="font-semibold text-brand-green cursor-pointer text-lg flex justify-between items-center">
                          {faq.question}
                          <span className="text-brand-gold ml-2">+</span>
                        </summary>
                        <p className="mt-3 text-black leading-relaxed bg-brand-beige/30 p-4 rounded-lg">
                          {faq.answer}
                        </p>
                      </details>
                    ))
                  ) : (
                    <>
                      {[
                        ["How soon will I see results?", "Most users notice improvements within 2–3 weeks; best results in 2–3 months."],
                        ["Is it suitable for all types?", "Yes. If you have a specific condition, consult a dermatologist."],
                        ["How often should I use it?", "2–3 times per week is recommended."],
                        ["Is this product cruelty-free?", "Yes, all our products are cruelty-free and never tested on animals."],
                        ["What is your return policy?", "We offer 30-day returns for unused products in original packaging."],
                      ].map(([q, a], index) => (
                        <details key={index} className="border-b border-brand-beige py-4 px-4 rounded-lg">
                          <summary className="font-semibold text-brand-green cursor-pointer text-lg flex justify-between items-center">
                            {q}
                            <span className="text-brand-gold ml-2">+</span>
                          </summary>
                          <p className="mt-3 text-black leading-relaxed bg-brand-beige/30 p-4 rounded-lg">{a}</p>
                        </details>
                      ))}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related products */}
      <section className="py-14 px-4 bg-brand-cream">
        <div className="container mx-auto">
          <h2 className="section-title text-3xl md:text-4xl font-bold text-center text-brand-green mb-10">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 3).map((p, index) => (
              <Link
                key={p.slug}
                href={`/product/${p.slug}`}
                className="feature-card transition"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="p-4">
                  <Image
                    src={encodeURI(p.image)}
                    alt={p.name}
                    width={500}
                    height={400}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-brand-green mb-2">
                    {p.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-brand-green">Rs. {p.price.toLocaleString()}</span>
                    <span className="bg-brand-gold text-white px-3 py-1 rounded-full text-sm">
                      View
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
