"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CatalogItem, ProductBundle } from "@/lib/types";

/** Single product selections (support both single color and multi for bundles) */
export type SelectedOptions = {
  color?: string;
  colors?: string[]; // for packs (duplicates allowed)
};

/** Per-kit item selections (only for kit children that actually have colors) */
export type KitSelectedOptions = {
  [productId: string]: {
    colors?: string[]; // duplicates allowed per child
  };
};

export type CartLineSnapshot = {
  lineId: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  category: string;
  sizeLabel?: string;

  unitPrice: number;
  unitCompareAtPrice?: number;

  bundle?: ProductBundle | null;
  selectedOptions?: SelectedOptions;       // for single products
  kitSelectedOptions?: KitSelectedOptions; // for kits (per-child picks)

  qty: number;
  isKit?: boolean;
};

type CartContextType = {
  items: CartLineSnapshot[];
  count: number;
  subtotal: number;
  addItem: (
    product: CatalogItem & {
      bundle?: ProductBundle;
      selectedOptions?: SelectedOptions;
      kitSelectedOptions?: KitSelectedOptions;
    },
    qty?: number
  ) => void;
  removeItem: (lineId: string) => void;
  updateQty: (lineId: string, qty: number) => void;
  clear: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const CartContext = createContext<CartContextType | null>(null);
const LS_KEY = "organo_cart_v5";

/** Stable key for merging identical lines (pack, single colors, kit colors all included) */
function createLineId(args: {
  productId: string;
  slug: string;
  bundle?: ProductBundle | null;
  selectedOptions?: SelectedOptions;
  kitSelectedOptions?: KitSelectedOptions;
  isKit?: boolean;
}) {
  const pack = args.bundle?.quantity ?? 1;

  // Single PDP picks
  const singleColorsArr =
    args.selectedOptions?.colors ??
    (args.selectedOptions?.color ? [args.selectedOptions.color] : []);
  const singleKey = singleColorsArr.length ? singleColorsArr.join("|") : "";

  // Kit children picks (sorted by child id to keep key stable)
  const kitKey = args.kitSelectedOptions
    ? Object.entries(args.kitSelectedOptions)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([pid, val]) => {
          const arr = val?.colors ?? [];
          return `${pid}:${arr.join("|")}`;
        })
        .join("__")
    : "";

  return `${args.productId}__${args.slug}__pack-${pack}__single-${singleKey}__kit-${kitKey}__type-${
    args.isKit ? "kit" : "single"
  }`;
}

function resolveImage(image?: string) {
  if (!image) return "/images/placeholder.png";
  try {
    return encodeURI(image);
  } catch {
    return image;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLineSnapshot[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed: CartLineSnapshot[] = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = (
    product: CatalogItem & {
      bundle?: ProductBundle;
      selectedOptions?: SelectedOptions;
      kitSelectedOptions?: KitSelectedOptions;
    },
    qty = 1
  ) => {
    const isKit = product.kind === "kit";
    const bundle = product.bundle ?? null;

    // Price resolution: kits use product price; singles can be overridden by bundle price
    const unitPrice = isKit ? product.price : bundle ? bundle.price : product.price;
    const unitCompareAtPrice = isKit
      ? product.compareAtPrice
      : bundle?.compareAtPrice ?? product.compareAtPrice;

    // Normalize single selections to `colors` array
    const selectedOptions: SelectedOptions | undefined = product.selectedOptions
      ? {
          colors:
            product.selectedOptions.colors ??
            (product.selectedOptions.color
              ? [product.selectedOptions.color]
              : undefined),
          color: product.selectedOptions.color, // keep for completeness
        }
      : undefined;

    const kitSelectedOptions = product.kitSelectedOptions;

    const baseSnapshot = {
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: resolveImage((product as any).image),
      category: product.category,
      sizeLabel: (product as any).sizeLabel as string | undefined,
      unitPrice,
      unitCompareAtPrice,
      bundle,
      selectedOptions,
      kitSelectedOptions,
      isKit,
    };

    const lineId = createLineId({
      productId: baseSnapshot.productId,
      slug: baseSnapshot.slug,
      bundle,
      selectedOptions,
      kitSelectedOptions,
      isKit,
    });

    setItems((prev) => {
      const idx = prev.findIndex((l) => l.lineId === lineId);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
        return copy;
      }
      return [...prev, { lineId, ...baseSnapshot, qty: Math.max(1, qty) }];
    });

    setIsOpen(true); // open drawer on add
  };

  const removeItem = (lineId: string) => {
    setItems((prev) => prev.filter((l) => l.lineId !== lineId));
  };

  const updateQty = (lineId: string, qty: number) => {
    setItems((prev) =>
      prev.map((l) => (l.lineId === lineId ? { ...l, qty: Math.max(1, qty) } : l))
    );
  };

  const clear = () => setItems([]);

  const count = useMemo(() => items.reduce((n, l) => n + l.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((s, l) => s + l.unitPrice * l.qty, 0), [items]);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((s) => !s);

  const value: CartContextType = {
    items,
    count,
    subtotal,
    addItem,
    removeItem,
    updateQty,
    clear,
    isOpen,
    open,
    close,
    toggle,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
