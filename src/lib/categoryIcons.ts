// src/lib/categoryIcons.ts
// Using your custom PNG icons

const iconPath = "/images/";

export const CATEGORY_ICON: Record<
  "hair-care" | "skincare-body" | "health-wellness" | "accessories",
  string
> = {
  "hair-care": `${iconPath}oil-icon.png`,
  "skincare-body": `${iconPath}soap-icon.png`, 
  "health-wellness": `${iconPath}pouch-icon.png `,
  "accessories": `${iconPath}comb-icon.png`,
};