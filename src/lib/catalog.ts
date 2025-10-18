// src/lib/catalog.ts
import { PRODUCTS } from "@/lib/data";
import type { CatalogItem, Product, KitProduct } from "@/lib/types";

export const isKit = (p: CatalogItem): p is KitProduct => p.kind === "kit";
export const isSingle = (p: CatalogItem): p is Product => p.kind === "single";

export function getById(id: string): CatalogItem | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function resolveKit(kit: KitProduct) {
  return kit.items.map((it) => {
    const item = getById(it.productId);
    if (!item || !isSingle(item)) throw new Error(`Missing single product ${it.productId}`);
    return { product: item, quantity: it.quantity };
  });
}

// optional to keep here (fine either way)
export function kitIngredientsByProduct(kit: KitProduct) {
  return resolveKit(kit).map(({ product, quantity }) => ({
    name: product.name,
    sizeLabel: product.sizeLabel,
    quantity,
    ingredients: product.ingredients ?? [],
    howToUse: product.howToUse ?? [],
    description: product.description,
  }));
}
