import type { Claim } from "@/types/claim";
import type { Product, ZoneSlug } from "@/types/product";
import type { Receipt } from "@/types/receipt";

export const products: Product[] = [
  {
    campusHeat: ["NYU", "Stanford"],
    colors: ["Nebula", "Frost"],
    description:
      "Noise-cancelling buds that keep lectures crisp, library sessions quiet, and late-night edits less chaotic.",
    dispatchDays: 2,
    features: ["ANC", "32-hour battery", "Fast pair"],
    heatScore: 97,
    id: "tech-aurora-buds",
    images: [
      {
        alt: "Wireless earbuds in charging case",
        src: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&w=1200&q=80",
      },
      {
        alt: "Earbuds on a desk",
        src: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    inventory: 32,
    isSteal: true,
    name: "Aurora Buds",
    originalPrice: 89,
    price: 59,
    rating: 4.8,
    receiptCount: 142,
    relatedIds: ["study-focus-lamp", "fit-recovery-bottle"],
    sizes: ["One Size"],
    specs: [
      { label: "Battery", value: "32 hours" },
      { label: "Case", value: "USB-C" },
      { label: "Mic", value: "Triple array" },
    ],
    subtitle: "Lecture mode on. Chaos mode off.",
    tags: ["On Heat", "Campus Pick", "Best Seller"],
    zone: "tech",
  },
  {
    campusHeat: ["UCLA", "LUMS"],
    colors: ["Volt Lime", "Slate"],
    description:
      "A charging dock that powers your phone, watch, and earbuds without turning your desk into cable soup.",
    dispatchDays: 1,
    features: ["3-in-1", "Mag-safe ready", "Desk tidy"],
    heatScore: 88,
    id: "tech-grid-dock",
    images: [
      {
        alt: "Charging dock on desk",
        src: "https://images.unsplash.com/photo-1615526675159-e248c3021d3f?auto=format&fit=crop&w=1200&q=80",
      },
      {
        alt: "Charging dock in use",
        src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    inventory: 18,
    name: "Grid Dock",
    price: 49,
    rating: 4.6,
    receiptCount: 74,
    relatedIds: ["tech-aurora-buds", "study-note-kit"],
    sizes: ["One Size"],
    specs: [
      { label: "Output", value: "15W wireless" },
      { label: "Finish", value: "Soft-touch matte" },
      { label: "Cable", value: "Braided USB-C" },
    ],
    subtitle: "Three chargers. One calm desk.",
    tags: ["Tech Zone", "Fast Dispatch"],
    zone: "tech",
  },
  {
    campusHeat: ["Stanford", "NUST"],
    colors: ["Midnight", "Cloud"],
    description:
      "A warm-cool desk lamp with focus presets and a tiny footprint for crowded dorm setups.",
    dispatchDays: 2,
    features: ["Dimmable", "USB-C", "Focus modes"],
    heatScore: 91,
    id: "study-focus-lamp",
    images: [
      {
        alt: "Minimal desk lamp",
        src: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80",
      },
      {
        alt: "Desk lamp beside notebook",
        src: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    inventory: 21,
    isSteal: true,
    name: "Focus Lamp",
    originalPrice: 38,
    price: 24,
    rating: 4.9,
    receiptCount: 110,
    relatedIds: ["study-note-kit", "dorm-cloud-throw"],
    sizes: ["One Size"],
    specs: [
      { label: "Brightness", value: "6 levels" },
      { label: "Color temp", value: "2700K-6500K" },
      { label: "Footprint", value: "8-inch base" },
    ],
    subtitle: "Late-night grind, better lighting.",
    tags: ["Exam Mode", "Steal"],
    zone: "study",
  },
  {
    campusHeat: ["UCLA", "University of Texas"],
    colors: ["Graphite", "Lilac"],
    description:
      "A semester-ready note system with magnetic tabs, weekly sprint planners, and dead-simple study sheets.",
    dispatchDays: 1,
    features: ["80 sheets", "Weekly planner", "Mag tabs"],
    heatScore: 83,
    id: "study-note-kit",
    images: [
      {
        alt: "Notebook kit on table",
        src: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80",
      },
      {
        alt: "Study kit open on desk",
        src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    inventory: 44,
    name: "Sprint Note Kit",
    price: 18,
    rating: 4.7,
    receiptCount: 65,
    relatedIds: ["study-focus-lamp", "essentials-quiet-pack"],
    sizes: ["One Size"],
    specs: [
      { label: "Format", value: "A5" },
      { label: "Pages", value: "80 premium" },
      { label: "Add-ons", value: "4 study inserts" },
    ],
    subtitle: "Stop winging finals week.",
    tags: ["Exam Mode", "Under $20"],
    zone: "study",
  },
  {
    campusHeat: ["NYU", "LUMS"],
    colors: ["Cream", "Cedar"],
    description:
      "A weighted throw that turns a basic twin bed into an actual reset button.",
    dispatchDays: 3,
    features: ["Soft knit", "Dorm twin fit", "Machine wash"],
    heatScore: 80,
    id: "dorm-cloud-throw",
    images: [
      {
        alt: "Soft throw on bed",
        src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      },
      {
        alt: "Dorm blanket folded",
        src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    inventory: 26,
    name: "Cloud Throw",
    price: 34,
    rating: 4.5,
    receiptCount: 58,
    relatedIds: ["dorm-night-caddy", "fashion-campus-tote"],
    sizes: ["Twin", "Full"],
    specs: [
      { label: "Weight", value: "8 lb" },
      { label: "Material", value: "Cotton blend" },
      { label: "Care", value: "Machine wash" },
    ],
    subtitle: "Your dorm bed, but less tragic.",
    tags: ["Dorm Zone"],
    zone: "dorm",
  },
  {
    campusHeat: ["NUST", "University of Texas"],
    colors: ["Night", "Olive"],
    description:
      "Bedside storage for chargers, glasses, water, pens, and whatever else disappears after midnight.",
    dispatchDays: 2,
    features: ["Clamp-on", "Cable slots", "Slim profile"],
    heatScore: 76,
    id: "dorm-night-caddy",
    images: [
      {
        alt: "Bedside caddy",
        src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      },
      {
        alt: "Dorm shelf detail",
        src: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    inventory: 37,
    isSteal: true,
    name: "Night Caddy",
    originalPrice: 22,
    price: 16,
    rating: 4.4,
    receiptCount: 41,
    relatedIds: ["dorm-cloud-throw", "essentials-laundry-kit"],
    sizes: ["One Size"],
    specs: [
      { label: "Mount", value: "Clamp-on" },
      { label: "Storage", value: "3 compartments" },
      { label: "Fit", value: "Up to 2-inch rails" },
    ],
    subtitle: "Everything you lose at 1am, fixed.",
    tags: ["Under $20", "Dorm Hack"],
    zone: "dorm",
  },
  {
    campusHeat: ["Stanford", "UCLA"],
    colors: ["Heatwave", "Onyx"],
    description:
      "Double-walled bottle with a built-in hydration reminder band for marathon class days.",
    dispatchDays: 2,
    features: ["24 oz", "Cold 18h", "Carry loop"],
    heatScore: 87,
    id: "fit-recovery-bottle",
    images: [
      {
        alt: "Insulated water bottle",
        src: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=80",
      },
      {
        alt: "Bottle on gym floor",
        src: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    inventory: 60,
    name: "Recovery Bottle",
    price: 22,
    rating: 4.7,
    receiptCount: 83,
    relatedIds: ["fit-resistance-loop", "tech-aurora-buds"],
    sizes: ["24 oz"],
    specs: [
      { label: "Capacity", value: "24 oz" },
      { label: "Insulation", value: "Double wall" },
      { label: "Material", value: "Stainless steel" },
    ],
    subtitle: "Stay hydrated. Still look sharp.",
    tags: ["Fit Zone", "Campus Pick"],
    zone: "fit",
  },
  {
    campusHeat: ["NYU", "Stanford"],
    colors: ["Lime", "Smoke"],
    description:
      "Compact resistance loops for quick dorm workouts, stretch breaks, and post-class recovery.",
    dispatchDays: 2,
    features: ["3 resistance levels", "Travel pouch", "Guide cards"],
    heatScore: 73,
    id: "fit-resistance-loop",
    images: [
      {
        alt: "Resistance bands",
        src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80",
      },
      {
        alt: "Workout accessory flat lay",
        src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    inventory: 88,
    name: "Loop Pack",
    price: 14,
    rating: 4.3,
    receiptCount: 34,
    relatedIds: ["fit-recovery-bottle", "study-focus-lamp"],
    sizes: ["3-pack"],
    specs: [
      { label: "Bands", value: "3 levels" },
      { label: "Material", value: "Natural latex" },
      { label: "Bag", value: "Mesh pouch" },
    ],
    subtitle: "Quick reps between deadlines.",
    tags: ["Under $20", "Fit Zone"],
    zone: "fit",
  },
  {
    campusHeat: ["UCLA", "LUMS"],
    colors: ["Coal", "Sand"],
    description:
      "Oversized tote with laptop sleeve, water bottle pocket, and enough room for a full day on campus.",
    dispatchDays: 2,
    features: ["16-inch sleeve", "Zip top", "Waterproof base"],
    heatScore: 84,
    id: "fashion-campus-tote",
    images: [
      {
        alt: "Campus tote bag",
        src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
      },
      {
        alt: "Tote on a bench",
        src: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    inventory: 28,
    name: "Campus Tote",
    price: 42,
    rating: 4.8,
    receiptCount: 97,
    relatedIds: ["fashion-rush-hoodie", "dorm-cloud-throw"],
    sizes: ["One Size"],
    specs: [
      { label: "Laptop fit", value: "Up to 16 inch" },
      { label: "Fabric", value: "Water-resistant canvas" },
      { label: "Pockets", value: "6 total" },
    ],
    subtitle: "One bag for the whole day.",
    tags: ["Fashion Zone", "Best Seller"],
    zone: "fashion",
  },
  {
    campusHeat: ["University of Texas", "NUST"],
    colors: ["Graphite", "Cobalt"],
    description:
      "Heavyweight hoodie with a clean campus fit and zero weird shrinkage after laundry day.",
    dispatchDays: 3,
    features: ["420gsm", "Soft fleece", "Relaxed fit"],
    heatScore: 79,
    id: "fashion-rush-hoodie",
    images: [
      {
        alt: "Student in heavyweight hoodie",
        src: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
      },
      {
        alt: "Folded hoodie",
        src: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    inventory: 40,
    isSteal: true,
    name: "Rush Hoodie",
    originalPrice: 64,
    price: 48,
    rating: 4.6,
    receiptCount: 52,
    relatedIds: ["fashion-campus-tote", "essentials-quiet-pack"],
    sizes: ["S", "M", "L", "XL"],
    specs: [
      { label: "Weight", value: "420gsm" },
      { label: "Fit", value: "Relaxed" },
      { label: "Care", value: "Pre-shrunk" },
    ],
    subtitle: "Throw on, show up, still look put together.",
    tags: ["Steal", "Campus Uniform"],
    zone: "fashion",
  },
  {
    campusHeat: ["NYU", "University of Texas"],
    colors: ["Slate", "Lime"],
    description:
      "Mini kit with earplugs, sleep mask, vitamin pouch, and mint wipes for recovery after chaos.",
    dispatchDays: 1,
    features: ["Travel pouch", "Reusable mask", "Refillable"],
    heatScore: 86,
    id: "essentials-quiet-pack",
    images: [
      {
        alt: "Quiet pack essentials",
        src: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80",
      },
      {
        alt: "Travel pouch open",
        src: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    inventory: 90,
    name: "Quiet Pack",
    price: 19,
    rating: 4.7,
    receiptCount: 77,
    relatedIds: ["study-note-kit", "fashion-rush-hoodie"],
    sizes: ["One Size"],
    specs: [
      { label: "Pieces", value: "6" },
      { label: "Case", value: "Zip pouch" },
      { label: "Use", value: "Travel or recovery" },
    ],
    subtitle: "A reset button in your bag.",
    tags: ["Essentials", "Under $20"],
    zone: "essentials",
  },
  {
    campusHeat: ["LUMS", "Stanford"],
    colors: ["Sky", "Black"],
    description:
      "Laundry setup with folding hamper, detergent sheets, and a mesh wash bag for dorm life.",
    dispatchDays: 2,
    features: ["Detergent sheets", "Collapsible", "Mesh wash bag"],
    heatScore: 69,
    id: "essentials-laundry-kit",
    images: [
      {
        alt: "Laundry kit with bag and sheets",
        src: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=1200&q=80",
      },
      {
        alt: "Laundry bag folded",
        src: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    inventory: 51,
    name: "Laundry Kit",
    price: 27,
    rating: 4.2,
    receiptCount: 28,
    relatedIds: ["dorm-night-caddy", "essentials-quiet-pack"],
    sizes: ["One Size"],
    specs: [
      { label: "Hamper", value: "45 L" },
      { label: "Sheets", value: "32 loads" },
      { label: "Bag", value: "1 mesh pouch" },
    ],
    subtitle: "Because clean clothes should be easy.",
    tags: ["Essentials"],
    zone: "essentials",
  },
];

export const receipts: Receipt[] = [
  {
    author: "Maya",
    avatar: "M",
    id: "r1",
    productId: "tech-aurora-buds",
    rating: 5,
    reactions: [
      { emoji: "🔥", count: 21 },
      { emoji: "👍", count: 18 },
    ],
    text: "These saved my commute and my roommate's 2am FaceTime habit. Easy cop.",
    verified: true,
  },
  {
    author: "Jalen",
    avatar: "J",
    id: "r2",
    productId: "study-focus-lamp",
    rating: 5,
    reactions: [
      { emoji: "😍", count: 12 },
      { emoji: "💰", count: 9 },
    ],
    text: "Desk looks expensive now and finals week somehow feels less cursed.",
    verified: true,
  },
  {
    author: "Hiba",
    avatar: "H",
    id: "r3",
    productId: "fashion-campus-tote",
    rating: 4,
    reactions: [
      { emoji: "👍", count: 10 },
      { emoji: "🔥", count: 7 },
    ],
    text: "Fits laptop, bottle, hoodie, snacks, and still doesn't look bulky.",
    verified: true,
  },
];

export const claims: Claim[] = [
  {
    eta: "Apr 15",
    id: "AY-20948",
    items: 3,
    placedAt: "2026-04-11T09:00:00.000Z",
    status: "Dispatched",
    total: 101,
    tracking: [
      {
        at: "Apr 11, 9:00 AM",
        label: "Claimed",
        note: "We locked your Drop and started packing.",
      },
      {
        at: "Apr 11, 3:20 PM",
        label: "Dispatched",
        note: "Your Claim left the warehouse and is moving.",
      },
    ],
  },
  {
    eta: "Apr 18",
    id: "AY-20987",
    items: 1,
    placedAt: "2026-04-11T20:42:00.000Z",
    status: "Prepping",
    total: 48,
    tracking: [
      {
        at: "Apr 11, 8:42 PM",
        label: "Claimed",
        note: "Your Drop went through. We're getting it ready.",
      },
    ],
  },
];

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function listProductsByZone(slug: ZoneSlug) {
  return products.filter((product) => product.zone === slug);
}

export function listHeatProducts() {
  return [...products].sort((a, b) => b.heatScore - a.heatScore);
}

export function listStealProducts() {
  return products.filter((product) => product.isSteal);
}

export function listRelatedProducts(id: string) {
  const product = getProductById(id);
  if (!product) {
    return [];
  }

  return product.relatedIds
    .map((relatedId) => getProductById(relatedId))
    .filter((item): item is Product => Boolean(item));
}

export function listReceiptsForProduct(productId: string) {
  return receipts.filter((receipt) => receipt.productId === productId);
}

export function listCampusHeat(campus: string) {
  return products.filter((product) => product.campusHeat.includes(campus));
}
