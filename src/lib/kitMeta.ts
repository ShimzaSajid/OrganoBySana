// src/lib/kitMeta.ts
import { isKit, resolveKit } from "@/lib/catalog";
import type { KitProduct, Product as Single } from "@/lib/types";

const uniq = <T,>(arr: T[]) => Array.from(new Set(arr));

export type KitMeta = {
  items: { product: Single; quantity: number }[];
  sumParts: number;
  benefits: string[];
  keyFeatures: string[];
  ingredients: string[];
  howTo: { title: string; text: string }[];
  contentsSnippet: string;
  stock: number;
  containsAllergens: boolean;
  badges: string[];
};

/** Derive presentation-ready data for a kit/bundle */
export function getKitMeta(kit: KitProduct): KitMeta {
  if (!isKit(kit)) throw new Error("getKitMeta: expected a kit");

  const items = resolveKit(kit); // [{ product, quantity }]
  const sumParts = items.reduce(
    (acc, { product: p, quantity }) => acc + (p.compareAtPrice ?? p.price) * quantity,
    0
  );

  const benefits = uniq(items.flatMap(({ product: p }) => p.benefits ?? [])).slice(0, 6);
  const keyFeatures = uniq(items.flatMap(({ product: p }) => p.keyFeatures ?? [])).slice(0, 8);
  const ingredients = uniq(items.flatMap(({ product: p }) => p.ingredients ?? [])).slice(0, 40);
  const badges = uniq(items.flatMap(({ product: p }) => p.badges ?? [])).slice(0, 6);

  const howTo = items
    .map(({ product: p }, i) => ({
      title: p.name,
      text:
        (p.howToUse?.[0]?.text ?? p.howToUse?.[0] ?? "Use as directed.") +
        (i < items.length - 1 ? " Then continue to the next step." : ""),
    }))
    .slice(0, 4);

  const contentsSnippet = items
    .map(
      ({ product: p, quantity }) =>
        `${quantity > 1 ? `x${quantity} ` : ""}${p.name}${p.sizeLabel ? ` (${p.sizeLabel})` : ""}`
    )
    .slice(0, 3)
    .join(" · ");

  // derived stock: min(stock_i / qty_i)
  const stock = Math.min(
    ...items.map(({ product: p, quantity }) => Math.floor((p as Single).stock / quantity))
  );

  // simple allergen flag example (tune list as needed)
  const allergenWords = ["Almond", "Peanut", "Walnut", "Hazelnut"];
  const containsAllergens = ingredients.some((ing) =>
    allergenWords.some((a) => ing.toLowerCase().includes(a.toLowerCase()))
  );

  return {
    items,
    sumParts,
    benefits,
    keyFeatures,
    ingredients,
    howTo,
    contentsSnippet,
    stock,
    containsAllergens,
    badges,
  };
}
