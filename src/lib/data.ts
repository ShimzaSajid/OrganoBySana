import type { CategorySlug, CatalogItem } from "./types";

// Categories map
export const CATEGORIES: Record<
  CategorySlug,
  { title: string; blurb: string }
> = {
  "hair-care": { title: "Hair Care", blurb: "Nourish your hair naturally." },
  "health-wellness": { title: "Health & Wellness", blurb: "Feel your best, every day." },
  "skincare-body": { title: "Skincare & Body", blurb: "Glow with gentle skincare." },
  "accessories": { title: "Accessories", blurb: "Complete your routine." },
  "bundles": { title: "Bundles", blurb: "Curated value sets." },
};

// Example products (put your real data here)
export const PRODUCTS: CatalogItem[] = [
  // ==================== HAIR CARE ====================
  {
    kind: "single",
    id: "hc1",
    slug: "signature-crown-curl-oil",
    name: "Signature Hair Oil",
    sizeLabel: "120 ml",
    price: 1499,
    compareAtPrice: 1999,
    category: "hair-care",
    image: "/images/oil1.png",
    gallery: [
      { src: "/images/oil1.png", alt: "Signature Hair Oil bottle" },
      { src: "/images/oil.png", alt: "Signature Hair Oil bottle" },
      { src: "/images/oil 2.jpg", alt: "Amla benefits" },
      { src: "/images/oil 3.jpg", alt: "Lifestyle image" },
      { src: "/images/OIL4.jpg", alt: "Bottle angled" },
    ],
    benefits: [
      "Promotes growth and reduces hair fall",
      "Nourishes scalp & strengthens follicles",
      "Adds natural shine and softness",
      "Reduces dandruff and irritation",
      "Helps prevent split ends and breakage",
    ],
    bundles: [
      { quantity: 1, price: 1499, compareAtPrice: 1999, savings: "25% OFF" },
      { quantity: 2, price: 2699, compareAtPrice: 3998, badge: "Most Popular", savings: "33% OFF" },
      { quantity: 3, price: 3599, compareAtPrice: 5997, badge: "Best Value", savings: "40% OFF" },
    ],
    rating: 4.8,
    reviewsCount: 128,
    badges: ["Bestseller"],
    description: "Premium blend of organic oils carefully crafted to transform hair health—deep nourishment, growth, and shine.",
    keyFeatures: [
      "100% organic and natural ingredients",
      "Suitable for all hair types",
      "Free from harmful chemicals and parabens",
      "Clinically tested for safety",
      "Made in Pakistan with love"
    ],
    idealFor: [
      "Hair growth and thickness",
      "Dry and damaged hair",
      "Dandruff and scalp issues",
      "Hair fall prevention",
      "Adding natural shine and softness"
    ],
    howToUse: [
      { title: "Application", text: "Massage into scalp 5–10 minutes in circular motions." },
      { title: "Distribution", text: "Work through lengths; comb to distribute evenly." },
      { title: "Duration", text: "Leave 2+ hours or overnight; 2–3× per week." },
      { title: "Wash", text: "Use mild, sulfate-free shampoo; rinse twice if needed." },
    ],
    ingredients: [
      "Coconut Oil","Argan Oil","Jojoba Oil","Almond Oil","Castor Oil",
      "Rosemary Extract","Aloe Vera","Amla","Brahmi","Vitamin E"
    ],
    faqs: [
      { question: "How soon will I see results with the Signature Hair Oil?", answer: "Most users notice improvements in hair texture and reduced hair fall within 2-3 weeks. For significant growth and thickness, consistent use for 2-3 months is recommended." },
      { question: "Can this oil be used on colored or chemically treated hair?", answer: "Yes, our Signature Hair Oil is completely safe for colored and chemically treated hair. It's free from harsh chemicals and actually helps repair damage from chemical treatments." },
      { question: "How often should I use the hair oil?", answer: "For best results, use 2-3 times per week. Apply before bedtime and wash out in the morning, or leave for at least 2 hours before washing." },
      { question: "Is this suitable for all hair types?", answer: "Yes, it's formulated for all hair types including dry, oily, normal, curly, and straight hair. The lightweight formula doesn't weigh hair down." },
      { question: "Can men use this hair oil?", answer: "Absolutely! The formula works equally well for both men and women experiencing hair fall, thinning, or seeking improved hair health." }
    ],
    stock: 19,
  },

  // ==================== SKINCARE & BODY ====================
  {
    kind: "single",
    id: "sb1",
    slug: "Loofah-organic-soap",
    name: "Loofah Organic Soap",
    sizeLabel: "100 g",
    price: 599,
    compareAtPrice: 799,
    category: "skincare-body",
    image: "/images/Lofa soap pic 1.png",
    gallery: [
      // fixed path here:
      { src: "/images/Lofa soap pic 1.png", alt: "Lavender ingredients" },
      { src: "/images/Lofa soap pic 2.png", alt: "Lavender soap bar" },
      { src: "/images/Lofa soap pic 3.png", alt: "Rich lather" },
      { src: "/images/Lofa soap pic 4.png", alt: "Lavender ingredients" },
      { src: "/images/Lofa soap pic 5.png", alt: "Lavender ingredients" },
    ],
    benefits: [
      "Calms and relaxes senses",
      "Gentle enough for sensitive skin",
      "Moisturizes without clogging pores",
      "Natural antibacterial properties",
      "Eco-friendly and biodegradable",
    ],
    bundles: [
      { quantity: 1, price: 599, compareAtPrice: 799, savings: "25% OFF" },
      { quantity: 3, price: 1599, compareAtPrice: 2397, badge: "Most Popular", savings: "33% OFF" },
      { quantity: 5, price: 2499, compareAtPrice: 3995, badge: "Best Value", savings: "38% OFF" },
    ],
    rating: 4.9,
    reviewsCount: 203,
    badges: ["Bestseller", "Eco-Friendly"],
    description: "Handcrafted cold-process soap with pure lavender essential oil and organic oils for a luxurious, calming bathing experience.",
    keyFeatures: [
      "Handcrafted cold-process method",
      "Pure lavender essential oil",
      "Organic and natural ingredients",
      "Eco-friendly and biodegradable",
      "No synthetic fragrances"
    ],
    idealFor: [
      "Sensitive and delicate skin",
      "Evening relaxation and calm",
      "Dry skin moisturization",
      "Aromatherapy benefits",
      "Eco-conscious consumers"
    ],
    howToUse: [
      { title: "Wet & Lather", text: "Wet soap and hands, work into rich lather." },
      { title: "Cleanse", text: "Massage over body in circular motions." },
      { title: "Rinse", text: "Rinse thoroughly with warm water." },
      { title: "Storage", text: "Keep in dry soap dish between uses." },
    ],
    ingredients: [
      "Organic Olive Oil","Coconut Oil","Shea Butter","Castor Oil",
      "Lavender Essential Oil","Dried Lavender Buds","French Pink Clay"
    ],
    faqs: [
      { question: "Is this soap suitable for sensitive skin?", answer: "Yes, it's specially formulated with gentle, natural ingredients that are perfect for sensitive skin types. Free from harsh chemicals and synthetic fragrances." },
      { question: "How long does one bar typically last?", answer: "With daily use, one 100g bar lasts approximately 3-4 weeks. Keeping it in a dry soap dish between uses extends its life." },
      { question: "Can this soap be used on the face?", answer: "Yes, it's gentle enough for facial use. The natural ingredients help balance skin without stripping natural oils." },
      { question: "Is the lavender scent natural?", answer: "Absolutely! We use only pure lavender essential oil for fragrance, no synthetic perfumes or artificial scents." }
    ],
    stock: 120,
  },

  {
    kind: "single",
    id: "sb2",
    slug: "Neem-soap",
    name: "Neem Soap",
    sizeLabel: "100 g",
    price: 649,
    compareAtPrice: 849,
    category: "skincare-body",
    image: "/images/Neem soap pic 2.png",
    gallery: [
       { src: "/images/Neem soap pic 2.png", alt: "Neem soap bar" },
      { src: "/images/Neem Soap pic 1.png", alt: "Neem soap bar" },
      { src: "/images/Neem soap pic 3.jpg", alt: "Neem lather" },
      { src: "/images/Neem soap pic 4.jpg", alt: "Purified skin results" },
    ],
    benefits: [
      "Draws out impurities and toxins",
      "Perfect for oily and acne-prone skin",
      "Reduces appearance of pores",
      "Balances skin oil production",
      "Exfoliates dead skin cells gently",
    ],
    bundles: [
      { 
        quantity: 1, 
        price: 649, 
        compareAtPrice: 849,
        savings: "24% OFF"
      },
      { 
        quantity: 2, 
        price: 1199, 
        compareAtPrice: 1698,
        badge: "Most Popular",
        savings: "29% OFF"
      },
      { 
        quantity: 4, 
        price: 2199, 
        compareAtPrice: 3396,
        badge: "Best Value", 
        savings: "35% OFF"
      },
    ],
    rating: 4.7,
    reviewsCount: 178,
    badges: ["Detox", "Acne Care"],
    description: "Activated charcoal soap that acts like a magnet to draw out deep-seated impurities, perfect for urban living and polluted environments.",
    keyFeatures: [
      "Activated charcoal formula",
      "Deep pore cleansing",
      "Natural exfoliation",
      "Oil-balancing properties",
      "Suitable for acne-prone skin"
    ],
    idealFor: [
      "Oily and combination skin",
      "Acne and breakout prone skin",
      "Urban pollution protection",
      "Blackhead and pore reduction",
      "Weekly deep cleansing"
    ],
    howToUse: [
      { title: "Daily Use", text: "Use morning and evening for oily skin." },
      { title: "Target Areas", text: "Focus on T-zone and problem areas." },
      { title: "Massage", text: "Massage for 30 seconds to activate charcoal." },
      { title: "Follow-up", text: "Use moisturizer as charcoal can be drying." },
    ],
    ingredients: [
      "Activated Charcoal", 
      "Bentonite Clay", 
      "Tea Tree Oil", 
      "Peppermint Oil", 
      "Grapeseed Oil", 
      "Hemp Seed Oil", 
      "Jojoba Oil"
    ],
    faqs: [
      {
        question: "Is this soap suitable for daily use?",
        answer: "For oily skin, yes. For normal to dry skin, we recommend using it 2-3 times per week as a deep cleanser."
      },
      {
        question: "Will it stain my skin or towels?",
        answer: "No, the activated charcoal is finely milled and rinses clean without staining when used properly."
      },
      {
        question: "Can it help with body acne?",
        answer: "Yes, it's excellent for body acne, backne, and chest breakouts due to its purifying properties."
      }
    ],
    stock: 85,
  },

  {
    kind: "single",
    id: "sb3",
    slug: "honey-oatmeal-soap",
    name: "Honey & Oatmeal Comfort Soap",
    sizeLabel: "100 g",
    price: 549,
    compareAtPrice: 699,
    category: "skincare-body",
    image: "/images/honey-oatmeal-soap.jpg",
    gallery: [
      { src: "/images/honey-oatmeal-soap.jpg", alt: "Honey oatmeal soap" },
      { src: "/images/oatmeal-closeup.jpg", alt: "Oatmeal texture" },
      { src: "/images/sensitive-skin-care.jpg", alt: "Gentle care" },
    ],
    benefits: [
      "Soothes irritated and sensitive skin",
      "Natural exfoliation without abrasion",
      "Calms eczema and psoriasis",
      "Provides instant relief from itching",
      "Maintains skin's natural moisture barrier",
    ],
    bundles: [
      { 
        quantity: 1, 
        price: 549, 
        compareAtPrice: 699,
        savings: "21% OFF"
      },
      { 
        quantity: 3, 
        price: 1399, 
        compareAtPrice: 2097,
        badge: "Most Popular",
        savings: "33% OFF"
      },
    ],
    rating: 4.8,
    reviewsCount: 142,
    badges: ["Sensitive Skin", "Hypoallergenic"],
    description: "Ultra-gentle soap with colloidal oatmeal and raw honey, specially formulated for sensitive, irritated, and reactive skin types.",
    keyFeatures: [
      "Colloidal oatmeal formula",
      "Raw honey infusion",
      "Hypoallergenic composition",
      "Gentle exfoliation",
      "pH balanced for skin"
    ],
    idealFor: [
      "Sensitive and reactive skin",
      "Eczema and psoriasis",
      "Dry and itchy skin",
      "Baby and children's skin",
      "Post-treatment skin care"
    ],
    howToUse: [
      { title: "For Sensitive Skin", text: "Use once daily or as needed." },
      { title: "For Eczema", text: "Apply to affected areas and leave for 1 minute." },
      { title: "Rinsing", text: "Rinse with cool water to soothe inflammation." },
      { title: "Frequency", text: "Can be used multiple times daily for relief." },
    ],
    ingredients: [
      "Colloidal Oatmeal", 
      "Raw Honey", 
      "Chamomile Extract", 
      "Calendula Oil", 
      "Sweet Almond Oil", 
      "Avocado Oil", 
      "Cocoa Butter"
    ],
    faqs: [
      {
        question: "Is this soap safe for babies?",
        answer: "Yes, it's gentle enough for babies and children with sensitive skin. Always do a patch test first."
      },
      {
        question: "Can it help with eczema flare-ups?",
        answer: "Yes, the colloidal oatmeal and honey provide immediate relief from itching and inflammation associated with eczema."
      }
    ],
    stock: 95,
  },

  // ==================== HEALTH & WELLNESS ====================
  {
    kind: "single",
    id: "hw1",
    slug: "Trim-tox-powder",
    name: "Trim Tox",
    sizeLabel: "100 g",
    price: 3499,
    compareAtPrice: 4499,
    category: "health-wellness",
    image: "/images/trim pic 3.png",
    gallery: [
      { src: "/images/trim pic 1.png", alt: "trim powder pouch" },
      { src: "/images/trim pic 2.png", alt: "trim powder pouch" },
      { src: "/images/trim pic 3.png", alt: "trim scoop" },
      { src: "/images/trim pic 4.png", alt: "trim tea" },
    ],
    benefits: [
      "100g complete protein per serving",
      "Easy digestion - no bloating",
      "Supports muscle recovery",
      "Promotes satiety and weight management",
      "100% plant-based and vegan",
    ],
    bundles: [
      { 
        quantity: 1, 
        price: 3499, 
        compareAtPrice: 4499,
        savings: "22% OFF"
      },
      { 
        quantity: 2, 
        price: 6499, 
        compareAtPrice: 8998,
        badge: "Most Popular",
        savings: "28% OFF"
      },
      { 
        quantity: 3, 
        price: 8999, 
        compareAtPrice: 13497,
        badge: "Best Value", 
        savings: "33% OFF"
      },
    ],
    rating: 4.6,
    reviewsCount: 312,
    badges: ["Bestseller", "Vegan"],
    description: "Premium plant-based protein blend with complete amino acid profile, perfect for post-workout recovery and daily nutrition.",
    keyFeatures: [
      "100g complete protein per serving",
      "100% plant-based ingredients",
      "Easy digestibility",
      "Complete amino acid profile",
      "No artificial sweeteners"
    ],
    idealFor: [
      "Post-workout recovery",
      "Muscle building and maintenance",
      "Weight management",
      "Vegan and vegetarian diets",
      "Meal replacement shakes"
    ],
    howToUse: [
      { title: "Post-Workout", text: "Mix 1 scoop with water or milk within 30 minutes of exercise." },
      { title: "Meal Replacement", text: "Blend with fruits and vegetables for complete meal." },
      { title: "Daily Nutrition", text: "Add to oatmeal or baking for protein boost." },
      { title: "Mixing", text: "Shake vigorously or blend for smooth consistency." },
    ],
    ingredients: [
      "Pea Protein Isolate", 
      "Brown Rice Protein", 
      "Hemp Protein", 
      "Pumpkin Seed Protein", 
      "Organic Stevia", 
      "Sunflower Lecithin", 
      "Digestive Enzymes"
    ],
    faqs: [
      {
        question: "Is this protein powder easy to digest?",
        answer: "Yes, our blend is specifically formulated for easy digestion. We've included digestive enzymes to prevent bloating and discomfort common with other protein powders."
      },
      {
        question: "Can I use this for weight loss?",
        answer: "Absolutely! It's excellent for weight management as it promotes satiety while providing essential nutrients. Use as a meal replacement or snack."
      },
      {
        question: "How does it compare to whey protein?",
        answer: "Our plant-based protein provides complete amino acids like whey, but is easier to digest, dairy-free, and suitable for vegans and those with lactose intolerance."
      },
      {
        question: "What's the best way to mix it?",
        answer: "For smoothest results, use a shaker bottle or blender. Mix with water, milk, or plant-based alternatives. It also works well in smoothies and baking."
      }
    ],
    stock: 45,
  },

  {
    kind: "single",
    id: "hw2",
    slug: "moringa-superfood-powder",
    name: "Moringa Leaf Superfood Powder",
    sizeLabel: "100 g",
    price: 799,
    compareAtPrice: 999,
    category: "health-wellness",
    image: "/images/moringa-powder.jpg",
    gallery: [
      { src: "/images/moringa-powder.jpg", alt: "Moringa powder" },
      { src: "/images/moringa-plant.jpg", alt: "Moringa plant" },
      { src: "/images/moringa-smoothie.jpg", alt: "Moringa in smoothie" },
    ],
    benefits: [
      "92+ verified nutrients",
      "7x more vitamin C than oranges",
      "Natural energy without caffeine",
      "Supports immune system",
      "Rich in antioxidants and iron",
    ],
    bundles: [
      { 
        quantity: 1, 
        price: 799, 
        compareAtPrice: 999,
        savings: "20% OFF"
      },
      { 
        quantity: 2, 
        price: 1499, 
        compareAtPrice: 1998,
        badge: "Most Popular",
        savings: "25% OFF"
      },
      { 
        quantity: 4, 
        price: 2799, 
        compareAtPrice: 3996,
        badge: "Best Value", 
        savings: "30% OFF"
      },
    ],
    rating: 4.7,
    reviewsCount: 189,
    badges: ["Superfood", "Nutrient Dense"],
    description: "Pure moringa oleifera leaf powder, shade-dried and cold-processed to preserve vital nutrients - nature's multivitamin.",
    keyFeatures: [
      "92+ essential nutrients",
      "Shade-dried processing",
      "Cold-processed preservation",
      "Rich in antioxidants",
      "Natural energy booster"
    ],
    idealFor: [
      "Daily nutrition boost",
      "Immune system support",
      "Natural energy enhancement",
      "Detox and cleansing",
      "Overall wellness maintenance"
    ],
    howToUse: [
      { title: "Daily Boost", text: "Mix 1 tsp in water, juice, or smoothie." },
      { title: "Cooking", text: "Add to soups, sauces, or baked goods." },
      { title: "Timing", text: "Take in morning for energy or evening for nutrients." },
      { title: "Dosage", text: "Start with 1/2 tsp and gradually increase." },
    ],
    ingredients: [
      "100% Pure Moringa Oleifera Leaf Powder"
    ],
    faqs: [
      {
        question: "What does moringa taste like?",
        answer: "Moringa has a mild, slightly earthy flavor similar to green tea or matcha. It blends well with smoothies, juices, and foods."
      },
      {
        question: "Can I take moringa while pregnant?",
        answer: "While moringa is nutritious, we recommend consulting your healthcare provider before using any supplements during pregnancy."
      }
    ],
    stock: 60,
  },

  // ==================== ACCESSORIES ====================
    {
    kind: "single",
    id: "ac1",
    slug: "silk-scrunchies-set",
    name: "Pure Silk Scrunchies",
    sizeLabel: "Normal size",
    colors: ["Black", "Beige", "Blush","White","Grey"],
    allowDuplicateColors: true,  
    price: 899,
    compareAtPrice: 1199,
    category: "accessories",
    image: "/images/scrunchy pic 1.png",
    gallery: [
       { src: "/images/scrunchy pic 1.png", alt: "Silk scrunchies set" },
      { src: "/images/scrunchy pic 2.png", alt: "Silk scrunchies set" },
      { src: "/images/scrunchy pic 3.png", alt: "Scrunchies being worn" },
      { src: "/images/scrunchy pic 4.png", alt: "Silk material closeup" },
      { src: "/images/scrunchy pic 5.png", alt: "Silk material closeup" },
      { src: "/images/scrunchy pic 6.png", alt: "Silk material closeup" },
      { src: "/images/scrunchy pic 7.png", alt: "Silk material closeup" },
      { src: "/images/scrunchy pic 8.png", alt: "Silk material closeup" },
      { src: "/images/scrunchy pic 9.png", alt: "Silk material closeup" },
      { src: "/images/scrunchy pic 10.png", alt: "Silk material closeup" },
    ],
    benefits: [
      "Prevents hair breakage and split ends",
      "Reduces frizz and static",
      "Maintains hair moisture balance",
      "Gentle on hair strands",
      "No crease or dent marks",
    ],
    bundles: [
      { 
        quantity: 1, 
        price: 899, 
        compareAtPrice: 1199,
        savings: "25% OFF"
      },
      { 
        quantity: 2, 
        price: 1599, 
        compareAtPrice: 2398,
        badge: "Most Popular",
        savings: "33% OFF"
      },
      { 
        quantity: 3, 
        price: 2199, 
        compareAtPrice: 3597,
        badge: "Best Value", 
        savings: "39% OFF"
      },
    ],
    rating: 4.8,
    reviewsCount: 156,
    badges: ["Hair-Safe", "Luxury"],
    description: "Luxury 100% mulberry silk scrunchies that treat your hair with care while adding elegant style to any look.",
    keyFeatures: [
      "100% mulberry silk",
      "Luxury 19 momme weight",
      "Hair-safe elastic core",
      "Three-piece set",
      "Multiple color options"
    ],
    idealFor: [
      "Preventing hair breakage",
      "Reducing frizz and static",
      "Overnight hair protection",
      "Gentle styling options",
      "Luxury hair accessories"
    ],
    howToUse: [
      { title: "Ponytail", text: "Wrap loosely to avoid tension on hair." },
      { title: "Bun", text: "Use for secure yet gentle hold." },
      { title: "Wrist Wear", text: "Wear on wrist when not in use." },
      { title: "Care", text: "Hand wash cold, air dry flat." },
    ],
    ingredients: [
      "100% Mulberry Silk", 
      "Hair-Safe Elastic Core"
    ],
    faqs: [
      {
        question: "How should I clean my silk scrunchies?",
        answer: "Hand wash in cold water with mild detergent, then air dry flat. Do not machine wash or tumble dry."
      },
      {
        question: "Do they come in different colors?",
        answer: "Yes, each set includes three complementary colors that work with various hair colors and styles."
      }
    ],
    stock: 15,
  },
  {
    kind: "single",
    id: "ac2",
    slug: "neem-wooden-comb",
    name: "Neem Wood Wide-Tooth Comb",
    sizeLabel: "One Size",
    price: 449,
    compareAtPrice: 599,
    category: "accessories",
    image: "/images/wooden-comb-main.jpg",
    gallery: [
      { src: "/images/wooden-comb-main.jpg", alt: "Neem wooden comb" },
      { src: "/images/wooden-comb-teeth.jpg", alt: "Comb teeth detail" },
      { src: "/images/comb-using.jpg", alt: "Comb in use" },
    ],
    benefits: [
      "Prevents static and frizz",
      "Stimulates scalp circulation",
      "Distributes natural oils evenly",
      "Gentle detangling without breakage",
      "Antibacterial neem wood properties",
    ],
    bundles: [
      { 
        quantity: 1, 
        price: 449, 
        compareAtPrice: 599,
        savings: "25% OFF"
      },
      { 
        quantity: 2, 
        price: 799, 
        compareAtPrice: 1198,
        badge: "Most Popular",
        savings: "33% OFF"
      },
    ],
    rating: 4.9,
    reviewsCount: 89,
    badges: ["Anti-static", "Scalp Health"],
    description: "Handcrafted wide-tooth comb from sustainable neem wood, designed for gentle detangling and promoting scalp health.",
    keyFeatures: [
      "Sustainable neem wood",
      "Wide-tooth design",
      "Antibacterial properties",
      "Handcrafted quality",
      "Eco-friendly material"
    ],
    idealFor: [
      "Gentle hair detangling",
      "Scalp massage and circulation",
      "Reducing hair breakage",
      "Distributing natural oils",
      "Sustainable hair care"
    ],
    howToUse: [
      { title: "Detangling", text: "Start from ends and work upward to roots." },
      { title: "Scalp Massage", text: "Use comb to gently massage scalp in circular motions." },
      { title: "Oil Distribution", text: "Comb through after oil application." },
      { title: "Cleaning", text: "Wipe with damp cloth, air dry completely." },
    ],
    ingredients: [
      "100% Sustainable Neem Wood"
    ],
    faqs: [
      {
        question: "How do I clean the wooden comb?",
        answer: "Simply wipe with a damp cloth and let air dry completely. Avoid soaking in water as it may damage the wood."
      },
      {
        question: "Will the comb last long?",
        answer: "With proper care, your neem wood comb can last for years. The natural antibacterial properties of neem wood help maintain its quality."
      }
    ],
    stock: 75,
  },



  {
    kind: "kit",
    id: "kit-growth-duo",
    slug: "growth-duo-oil-comb",
    name: "Growth Duo: Hair Oil + Neem Comb",
    category: "bundles",
    image: "/images/hair-oil.png",
    gallery: [
    { src: "/images/bundles/growth-duo-main.jpg", alt: "Growth Duo bundle" },
    { src: "/images/hair-oil.png", alt: "Signature Hair Oil" },
    { src: "/images/wooden-comb-main.jpg", alt: "Neem Wood Comb" },
  ],
    description: "Nourish + detangle: bestseller oil paired with anti-static neem comb.",
    price: 1799,
    compareAtPrice: 1999,
    items: [
      { productId: "hc1", quantity: 1 },
      { productId: "ac1", quantity: 1 },
    ],
  },
  {
  kind: "kit",
  id: "kit-hair-care-essentials",
  slug: "hair-care-essentials-bundle",
  name: "Hair Care Essentials Bundle",
  category: "bundles",
  image: "/images/bundles/hair-care-essentials-main.jpg",
  gallery: [
    { src: "/images/bundles/hair-care-essentials-main.jpg", alt: "Hair Care Essentials Bundle" },
    { src: "/images/hair-oil.png", alt: "Signature Hair Oil" },
    { src: "/images/silk-scrunchies.jpg", alt: "Pure Silk Scrunchies" },
    { src: "/images/wooden-comb-main.jpg", alt: "Neem Wood Comb" },
    { src: "/images/bundles/hair-care-lifestyle.jpg", alt: "Hair care routine lifestyle" },
  ],
  badges: ["Ultimate Value", "Complete Routine", "Customer Favorite"],
  rating: 4.9,
  reviewsCount: 87,
  description: "The complete hair care trifecta: Nourish with our bestselling oil, detangle with the antibacterial neem comb, and protect your style with luxurious silk scrunchies. Everything you need for healthy, beautiful hair from root to tip.",
  price: 2299,
  compareAtPrice: 3297, 
  items: [
    { productId: "hc1", quantity: 1 }, // Signature Hair Oil
    { productId: "ac2", quantity: 2 }, // Pure Silk Scrunchies
    { productId: "ac1", quantity: 1 }, // Neem Wood Comb
  ],
},
];