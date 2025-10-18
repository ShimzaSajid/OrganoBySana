"use client";
import Image from "next/image";
import Link from "next/link";
import { FaEye, FaShoppingCart } from "react-icons/fa";
import type { CatalogItem } from "@/lib/types";        
import { useCart } from "@/lib/cart";
import { flyToCart } from "@/lib/flyToCart";
import { useRef } from "react";
import { useRouter } from "next/navigation";


export default function ProductCard({ product }: { product: CatalogItem }) {
  const { addItem, open } = useCart();
  const imgRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const needsOptions = Array.isArray((product as any).colors) && (product as any).colors.length > 0;

  const handleAdd = () => {
    if (needsOptions) {
      // Force selection on PDP when options are required
      router.push(`/product/${product.slug}`);
      return;
    }

    if (imgRef.current) {
      flyToCart(imgRef.current, product.category, open);
    }
    addItem(product, 1);
  };

  return (
    <div className="group w-full">
      <div ref={imgRef} className="relative overflow-hidden rounded-lg md:rounded-xl bg-white shadow-sm md:shadow-md transition-all duration-300">
        <Image
          src={encodeURI(product.image)}   // safer if paths have spaces
          alt={product.name}
          width={400}
          height={500}
          className="w-full h-40 sm:h-48 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg md:rounded-xl">
          <Link
            href={`/product/${product.slug}`}
            className="bg-white text-gray-900 hover:bg-brand-green hover:text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-xs md:text-sm"
          >
            <FaEye className="w-3 h-3 md:w-4 md:h-4" />
            QUICK VIEW
          </Link>
        </div>
      </div>

      <div className="mt-2 md:mt-3 px-1">
        <h4 className="font-medium text-black text-xs sm:text-sm md:text-base mb-1 md:mb-2 text-center leading-tight line-clamp-2">
          {product.name}
        </h4>
        <div className="flex items-center justify-between px-1">
          <div className="w-6" />
          <span className="font-bold text-sm sm:text-base md:text-lg text-black text-center">
            Rs {product.price.toLocaleString()}
          </span>
          <button
            onClick={handleAdd}
            className="text-black hover:text-brand-green transition-all duration-300 transform hover:scale-110"
            aria-label={needsOptions ? "Choose options" : "Add to cart"}
            title={needsOptions ? "Choose color before adding" : "Add to cart"}
          >
            <FaShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
