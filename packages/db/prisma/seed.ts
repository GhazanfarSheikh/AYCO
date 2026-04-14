import {
  HeatTier,
  MediaType,
  PrismaClient,
  ProductStatus,
  Role,
  ThemeMode,
} from "@prisma/client";

const prisma = new PrismaClient();

const campuses = [
  { code: "NYU", name: "New York University", slug: "nyu" },
  {
    code: "UCLA",
    name: "University of California, Los Angeles",
    slug: "ucla",
  },
  { code: "STAN", name: "Stanford University", slug: "stanford" },
  { code: "UTX", name: "University of Texas", slug: "university-of-texas" },
  { code: "LUMS", name: "Lahore University of Management Sciences", slug: "lums" },
  { code: "NUST", name: "National University of Sciences and Technology", slug: "nust" },
] as const;

const zones = [
  {
    accent: "from-violet-500/35 via-fuchsia-500/10 to-transparent",
    description: "Desk glow-ups, sleep fixes, and tiny-space wins.",
    iconKey: "BedDouble",
    imageUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    name: "Dorm",
    slug: "dorm",
    sortOrder: 1,
  },
  {
    accent: "from-cyan-400/35 via-sky-500/10 to-transparent",
    description: "Gadgets that keep group projects from becoming group pain.",
    iconKey: "Laptop2",
    imageUrl:
      "https://images.unsplash.com/photo-1615526675159-e248c3021d3f?auto=format&fit=crop&w=1200&q=80",
    name: "Tech",
    slug: "tech",
    sortOrder: 2,
  },
  {
    accent: "from-lime-400/30 via-emerald-500/10 to-transparent",
    description: "Note-taking, focus, finals survival, and better habits.",
    iconKey: "BookOpenText",
    imageUrl:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
    name: "Study",
    slug: "study",
    sortOrder: 3,
  },
  {
    accent: "from-amber-400/30 via-orange-500/10 to-transparent",
    description: "Move better, recover faster, still make the 8am.",
    iconKey: "Dumbbell",
    imageUrl:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=80",
    name: "Fit",
    slug: "fit",
    sortOrder: 4,
  },
  {
    accent: "from-rose-500/30 via-pink-500/10 to-transparent",
    description: "Campus-ready outfits with main-character energy.",
    iconKey: "Shirt",
    imageUrl:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
    name: "Fashion",
    slug: "fashion",
    sortOrder: 5,
  },
  {
    accent: "from-cyan-300/20 via-slate-500/10 to-transparent",
    description: "The basics you always need 10 minutes before class.",
    iconKey: "PackageOpen",
    imageUrl:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80",
    name: "Essentials",
    slug: "essentials",
    sortOrder: 6,
  },
] as const;

type ProductSeed = {
  campusHeat: string[];
  colors: string[];
  description: string;
  dispatchDays: number;
  features: string[];
  heatScore: number;
  heatTier: HeatTier;
  images: Array<{ alt: string; url: string }>;
  isExamRelevant?: boolean;
  isFeatured?: boolean;
  originalPrice?: number;
  isSteal?: boolean;
  price: number;
  ratingAverage: number;
  ratingCount: number;
  receiptCount: number;
  searchKeywords: string[];
  sizes: string[];
  slug: string;
  specs: Array<{ label: string; value: string }>;
  stealBadgeText?: string;
  stealPrice?: number;
  subtitle: string;
  tags: string[];
  title: string;
  zoneSlug: (typeof zones)[number]["slug"];
};

const products: ProductSeed[] = [
  {
    campusHeat: ["nyu", "stanford"],
    colors: ["Nebula", "Frost"],
    description:
      "Noise-cancelling buds that keep lectures crisp, library sessions quiet, and late-night edits less chaotic.",
    dispatchDays: 2,
    features: ["ANC", "32-hour battery", "Fast pair"],
    heatScore: 97,
    heatTier: HeatTier.blazing,
    images: [
      {
        alt: "Wireless earbuds in charging case",
        url: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&w=1200&q=80",
      },
      {
        alt: "Earbuds on a desk",
        url: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    isFeatured: true,
    isSteal: true,
    originalPrice: 89,
    price: 59,
    ratingAverage: 4.8,
    ratingCount: 142,
    receiptCount: 142,
    searchKeywords: ["earbuds", "audio", "noise cancelling", "campus commute"],
    sizes: ["One Size"],
    slug: "tech-aurora-buds",
    specs: [
      { label: "Battery", value: "32 hours" },
      { label: "Case", value: "USB-C" },
      { label: "Mic", value: "Triple array" },
    ],
    stealBadgeText: "Steal Of The Day",
    stealPrice: 59,
    subtitle: "Lecture mode on. Chaos mode off.",
    tags: ["On Heat", "Campus Pick", "Best Seller"],
    title: "Aurora Buds",
    zoneSlug: "tech",
  },
  {
    campusHeat: ["ucla", "lums"],
    colors: ["Volt Lime", "Slate"],
    description:
      "A charging dock that powers your phone, watch, and earbuds without turning your desk into cable soup.",
    dispatchDays: 1,
    features: ["3-in-1", "Mag-safe ready", "Desk tidy"],
    heatScore: 88,
    heatTier: HeatTier.heating,
    images: [
      {
        alt: "Charging dock on desk",
        url: "https://images.unsplash.com/photo-1615526675159-e248c3021d3f?auto=format&fit=crop&w=1200&q=80",
      },
      {
        alt: "Charging dock in use",
        url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    price: 49,
    ratingAverage: 4.6,
    ratingCount: 74,
    receiptCount: 74,
    searchKeywords: ["charging dock", "desk setup", "mag safe", "wireless charger"],
    sizes: ["One Size"],
    slug: "tech-grid-dock",
    specs: [
      { label: "Output", value: "15W wireless" },
      { label: "Finish", value: "Soft-touch matte" },
      { label: "Cable", value: "Braided USB-C" },
    ],
    subtitle: "Three chargers. One calm desk.",
    tags: ["Tech Zone", "Fast Dispatch"],
    title: "Grid Dock",
    zoneSlug: "tech",
  },
  {
    campusHeat: ["stanford", "nust"],
    colors: ["Midnight", "Cloud"],
    description:
      "A warm-cool desk lamp with focus presets and a tiny footprint for crowded dorm setups.",
    dispatchDays: 2,
    features: ["Dimmable", "USB-C", "Focus modes"],
    heatScore: 91,
    heatTier: HeatTier.blazing,
    images: [
      {
        alt: "Minimal desk lamp",
        url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80",
      },
      {
        alt: "Desk lamp beside notebook",
        url: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    isExamRelevant: true,
    isFeatured: true,
    isSteal: true,
    originalPrice: 38,
    price: 24,
    ratingAverage: 4.9,
    ratingCount: 110,
    receiptCount: 110,
    searchKeywords: ["lamp", "desk lighting", "finals", "study setup"],
    sizes: ["One Size"],
    slug: "study-focus-lamp",
    specs: [
      { label: "Brightness", value: "6 levels" },
      { label: "Color temp", value: "2700K-6500K" },
      { label: "Footprint", value: "8-inch base" },
    ],
    stealBadgeText: "Steal",
    stealPrice: 24,
    subtitle: "Late-night grind, better lighting.",
    tags: ["Exam Mode", "Steal"],
    title: "Focus Lamp",
    zoneSlug: "study",
  },
  {
    campusHeat: ["ucla", "university-of-texas"],
    colors: ["Graphite", "Lilac"],
    description:
      "A semester-ready note system with magnetic tabs, weekly sprint planners, and dead-simple study sheets.",
    dispatchDays: 1,
    features: ["80 sheets", "Weekly planner", "Mag tabs"],
    heatScore: 83,
    heatTier: HeatTier.heating,
    images: [
      {
        alt: "Notebook kit on table",
        url: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80",
      },
      {
        alt: "Study kit open on desk",
        url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    isExamRelevant: true,
    price: 18,
    ratingAverage: 4.7,
    ratingCount: 65,
    receiptCount: 65,
    searchKeywords: ["notes", "stationery", "study kit", "planner"],
    sizes: ["One Size"],
    slug: "study-note-kit",
    specs: [
      { label: "Format", value: "A5" },
      { label: "Pages", value: "80 premium" },
      { label: "Add-ons", value: "4 study inserts" },
    ],
    subtitle: "Stop winging finals week.",
    tags: ["Exam Mode", "Under $20"],
    title: "Sprint Note Kit",
    zoneSlug: "study",
  },
  {
    campusHeat: ["nyu", "lums"],
    colors: ["Cream", "Cedar"],
    description:
      "A weighted throw that turns a basic twin bed into an actual reset button.",
    dispatchDays: 3,
    features: ["Soft knit", "Dorm twin fit", "Machine wash"],
    heatScore: 80,
    heatTier: HeatTier.heating,
    images: [
      {
        alt: "Soft throw on bed",
        url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      },
      {
        alt: "Dorm blanket folded",
        url: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    price: 34,
    ratingAverage: 4.5,
    ratingCount: 58,
    receiptCount: 58,
    searchKeywords: ["weighted blanket", "dorm comfort", "sleep"],
    sizes: ["Twin", "Full"],
    slug: "dorm-cloud-throw",
    specs: [
      { label: "Weight", value: "8 lb" },
      { label: "Material", value: "Cotton blend" },
      { label: "Care", value: "Machine wash" },
    ],
    subtitle: "Your dorm bed, but less tragic.",
    tags: ["Dorm Zone"],
    title: "Cloud Throw",
    zoneSlug: "dorm",
  },
  {
    campusHeat: ["nust", "university-of-texas"],
    colors: ["Night", "Olive"],
    description:
      "Bedside storage for chargers, glasses, water, pens, and whatever else disappears after midnight.",
    dispatchDays: 2,
    features: ["Clamp-on", "Cable slots", "Slim profile"],
    heatScore: 76,
    heatTier: HeatTier.heating,
    images: [
      {
        alt: "Bedside caddy",
        url: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
      },
      {
        alt: "Dorm shelf detail",
        url: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    isSteal: true,
    originalPrice: 22,
    price: 16,
    ratingAverage: 4.4,
    ratingCount: 41,
    receiptCount: 41,
    searchKeywords: ["bedside organizer", "dorm caddy", "storage"],
    sizes: ["One Size"],
    slug: "dorm-night-caddy",
    specs: [
      { label: "Mount", value: "Clamp-on" },
      { label: "Storage", value: "3 compartments" },
      { label: "Fit", value: "Up to 2-inch rails" },
    ],
    stealBadgeText: "Dorm Hack",
    stealPrice: 16,
    subtitle: "Everything you lose at 1am, fixed.",
    tags: ["Under $20", "Dorm Hack"],
    title: "Night Caddy",
    zoneSlug: "dorm",
  },
  {
    campusHeat: ["stanford", "ucla"],
    colors: ["Heatwave", "Onyx"],
    description:
      "Double-walled bottle with a built-in hydration reminder band for marathon class days.",
    dispatchDays: 2,
    features: ["24 oz", "Cold 18h", "Carry loop"],
    heatScore: 87,
    heatTier: HeatTier.heating,
    images: [
      {
        alt: "Insulated water bottle",
        url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=80",
      },
      {
        alt: "Bottle on gym floor",
        url: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    price: 22,
    ratingAverage: 4.7,
    ratingCount: 83,
    receiptCount: 83,
    searchKeywords: ["water bottle", "hydration", "gym", "campus"],
    sizes: ["24 oz"],
    slug: "fit-recovery-bottle",
    specs: [
      { label: "Capacity", value: "24 oz" },
      { label: "Insulation", value: "Double wall" },
      { label: "Material", value: "Stainless steel" },
    ],
    subtitle: "Stay hydrated. Still look sharp.",
    tags: ["Fit Zone", "Campus Pick"],
    title: "Recovery Bottle",
    zoneSlug: "fit",
  },
  {
    campusHeat: ["nyu", "stanford"],
    colors: ["Lime", "Smoke"],
    description:
      "Compact resistance loops for quick dorm workouts, stretch breaks, and post-class recovery.",
    dispatchDays: 2,
    features: ["3 resistance levels", "Travel pouch", "Guide cards"],
    heatScore: 73,
    heatTier: HeatTier.warming,
    images: [
      {
        alt: "Resistance bands",
        url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80",
      },
      {
        alt: "Workout accessory flat lay",
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    price: 14,
    ratingAverage: 4.3,
    ratingCount: 34,
    receiptCount: 34,
    searchKeywords: ["resistance bands", "fitness", "stretch"],
    sizes: ["3-pack"],
    slug: "fit-resistance-loop",
    specs: [
      { label: "Bands", value: "3 levels" },
      { label: "Material", value: "Natural latex" },
      { label: "Bag", value: "Mesh pouch" },
    ],
    subtitle: "Quick reps between deadlines.",
    tags: ["Under $20", "Fit Zone"],
    title: "Loop Pack",
    zoneSlug: "fit",
  },
  {
    campusHeat: ["ucla", "lums"],
    colors: ["Coal", "Sand"],
    description:
      "Oversized tote with laptop sleeve, water bottle pocket, and enough room for a full day on campus.",
    dispatchDays: 2,
    features: ["16-inch sleeve", "Zip top", "Waterproof base"],
    heatScore: 84,
    heatTier: HeatTier.heating,
    images: [
      {
        alt: "Campus tote bag",
        url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
      },
      {
        alt: "Tote on a bench",
        url: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    price: 42,
    ratingAverage: 4.8,
    ratingCount: 97,
    receiptCount: 97,
    searchKeywords: ["tote", "bag", "campus fashion", "laptop bag"],
    sizes: ["One Size"],
    slug: "fashion-campus-tote",
    specs: [
      { label: "Laptop fit", value: "Up to 16 inch" },
      { label: "Fabric", value: "Water-resistant canvas" },
      { label: "Pockets", value: "6 total" },
    ],
    subtitle: "One bag for the whole day.",
    tags: ["Fashion Zone", "Best Seller"],
    title: "Campus Tote",
    zoneSlug: "fashion",
  },
  {
    campusHeat: ["university-of-texas", "nust"],
    colors: ["Graphite", "Cobalt"],
    description:
      "Heavyweight hoodie with a clean campus fit and zero weird shrinkage after laundry day.",
    dispatchDays: 3,
    features: ["420gsm", "Soft fleece", "Relaxed fit"],
    heatScore: 79,
    heatTier: HeatTier.heating,
    images: [
      {
        alt: "Student in heavyweight hoodie",
        url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
      },
      {
        alt: "Folded hoodie",
        url: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    isSteal: true,
    originalPrice: 64,
    price: 48,
    ratingAverage: 4.6,
    ratingCount: 52,
    receiptCount: 52,
    searchKeywords: ["hoodie", "fashion", "campus fit", "streetwear"],
    sizes: ["S", "M", "L", "XL"],
    slug: "fashion-rush-hoodie",
    specs: [
      { label: "Weight", value: "420gsm" },
      { label: "Fit", value: "Relaxed" },
      { label: "Care", value: "Pre-shrunk" },
    ],
    stealBadgeText: "Campus Uniform",
    stealPrice: 48,
    subtitle: "Throw on, show up, still look put together.",
    tags: ["Steal", "Campus Uniform"],
    title: "Rush Hoodie",
    zoneSlug: "fashion",
  },
  {
    campusHeat: ["nyu", "university-of-texas"],
    colors: ["Slate", "Lime"],
    description:
      "Mini kit with earplugs, sleep mask, vitamin pouch, and mint wipes for recovery after chaos.",
    dispatchDays: 1,
    features: ["Travel pouch", "Reusable mask", "Refillable"],
    heatScore: 86,
    heatTier: HeatTier.heating,
    images: [
      {
        alt: "Quiet pack essentials",
        url: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80",
      },
      {
        alt: "Travel pouch open",
        url: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    price: 19,
    ratingAverage: 4.7,
    ratingCount: 77,
    receiptCount: 77,
    searchKeywords: ["sleep mask", "recovery", "travel kit", "essentials"],
    sizes: ["One Size"],
    slug: "essentials-quiet-pack",
    specs: [
      { label: "Pieces", value: "6" },
      { label: "Case", value: "Zip pouch" },
      { label: "Use", value: "Travel or recovery" },
    ],
    subtitle: "A reset button in your bag.",
    tags: ["Essentials", "Under $20"],
    title: "Quiet Pack",
    zoneSlug: "essentials",
  },
  {
    campusHeat: ["lums", "stanford"],
    colors: ["Sky", "Black"],
    description:
      "Laundry setup with folding hamper, detergent sheets, and a mesh wash bag for dorm life.",
    dispatchDays: 2,
    features: ["Detergent sheets", "Collapsible", "Mesh wash bag"],
    heatScore: 69,
    heatTier: HeatTier.warming,
    images: [
      {
        alt: "Laundry kit with bag and sheets",
        url: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=1200&q=80",
      },
      {
        alt: "Laundry bag folded",
        url: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    price: 27,
    ratingAverage: 4.2,
    ratingCount: 28,
    receiptCount: 28,
    searchKeywords: ["laundry", "dorm", "hamper", "detergent"],
    sizes: ["One Size"],
    slug: "essentials-laundry-kit",
    specs: [
      { label: "Hamper", value: "45 L" },
      { label: "Sheets", value: "32 loads" },
      { label: "Bag", value: "1 mesh pouch" },
    ],
    subtitle: "Because clean clothes should be easy.",
    tags: ["Essentials"],
    title: "Laundry Kit",
    zoneSlug: "essentials",
  },
];

function toTier(score: number): HeatTier {
  if (score >= 90) {
    return HeatTier.blazing;
  }
  if (score >= 75) {
    return HeatTier.heating;
  }
  if (score >= 50) {
    return HeatTier.warming;
  }
  return HeatTier.cold;
}

async function seedCatalog() {
  const campusMap = new Map<string, { id: string; slug: string; name: string }>();
  for (const campus of campuses) {
    const record = await prisma.campus.upsert({
      create: campus,
      update: campus,
      where: { slug: campus.slug },
    });
    campusMap.set(campus.slug, {
      id: record.id,
      name: record.name,
      slug: record.slug,
    });
  }

  const zoneMap = new Map<string, { id: string; name: string; slug: string }>();
  for (const zone of zones) {
    const record = await prisma.zone.upsert({
      create: zone,
      update: zone,
      where: { slug: zone.slug },
    });
    zoneMap.set(zone.slug, { id: record.id, name: record.name, slug: record.slug });
  }

  const now = new Date();
  const stealStartsAt = new Date(now.getTime() - 1000 * 60 * 60 * 6);
  const stealEndsAt = new Date(now.getTime() + 1000 * 60 * 60 * 18);
  const productIdBySlug = new Map<string, string>();

  for (const [index, seed] of products.entries()) {
    const primaryZone = zoneMap.get(seed.zoneSlug);
    const product = await prisma.product.upsert({
      create: {
        description: seed.description,
        dispatchDays: seed.dispatchDays,
        features: seed.features,
        heatScore: seed.heatScore,
        heatTier: seed.heatTier,
        isExamRelevant: seed.isExamRelevant ?? false,
        isFeatured: seed.isFeatured ?? index < 4,
        primaryZoneId: primaryZone?.id,
        ratingAverage: seed.ratingAverage,
        ratingCount: seed.ratingCount,
        receiptCount: seed.receiptCount,
        searchKeywords: seed.searchKeywords,
        slug: seed.slug,
        specs: seed.specs,
        status: ProductStatus.active,
        subtitle: seed.subtitle,
        title: seed.title,
      },
      update: {
        description: seed.description,
        dispatchDays: seed.dispatchDays,
        features: seed.features,
        heatScore: seed.heatScore,
        heatTier: seed.heatTier,
        isExamRelevant: seed.isExamRelevant ?? false,
        isFeatured: seed.isFeatured ?? index < 4,
        primaryZoneId: primaryZone?.id,
        ratingAverage: seed.ratingAverage,
        ratingCount: seed.ratingCount,
        receiptCount: seed.receiptCount,
        searchKeywords: seed.searchKeywords,
        specs: seed.specs,
        status: ProductStatus.active,
        subtitle: seed.subtitle,
        title: seed.title,
      },
      where: { slug: seed.slug },
    });

    productIdBySlug.set(seed.slug, product.id);

    await prisma.productMedia.deleteMany({ where: { productId: product.id } });
    await prisma.productTag.deleteMany({ where: { productId: product.id } });
    await prisma.productZoneMap.deleteMany({ where: { productId: product.id } });
    await prisma.productHeatSnapshot.deleteMany({ where: { productId: product.id } });
    await prisma.productVariant.deleteMany({ where: { productId: product.id } });
    await prisma.steal.deleteMany({ where: { productId: product.id } });

    await prisma.productMedia.createMany({
      data: seed.images.map((image, mediaIndex) => ({
        alt: image.alt,
        productId: product.id,
        sortOrder: mediaIndex,
        type: MediaType.image,
        url: image.url,
      })),
    });

    await prisma.productTag.createMany({
      data: [...seed.tags, ...seed.searchKeywords].map((label) => ({
        label,
        productId: product.id,
      })),
    });

    if (primaryZone) {
      await prisma.productZoneMap.create({
        data: {
          productId: product.id,
          sortOrder: index + 1,
          zoneId: primaryZone.id,
        },
      });
    }

    for (const campusSlug of seed.campusHeat) {
      const campus = campusMap.get(campusSlug);
      await prisma.productHeatSnapshot.create({
        data: {
          campusId: campus?.id,
          capturedAt: now,
          productId: product.id,
          score: seed.heatScore,
          tier: toTier(seed.heatScore),
        },
      });
    }

    await prisma.productHeatSnapshot.create({
      data: {
        capturedAt: now,
        productId: product.id,
        score: seed.heatScore,
        tier: toTier(seed.heatScore),
      },
    });

    const colorChoices = seed.colors.length ? seed.colors : ["One"];
    const sizeChoices = seed.sizes.length ? seed.sizes : ["One Size"];
    let variantIndex = 0;

    for (const color of colorChoices) {
      for (const size of sizeChoices) {
        const variant = await prisma.productVariant.create({
          data: {
            color,
            isDefault: variantIndex === 0,
            name: `${seed.title} ${color} ${size}`.trim(),
            productId: product.id,
            size,
            sku: `${seed.slug}-${color}-${size}`.toLowerCase().replaceAll(" ", "-"),
          },
        });

        await prisma.inventory.create({
          data: {
            productVariantId: variant.id,
            quantityOnHand: 20 + index * 3 + variantIndex,
          },
        });

        await prisma.productPrice.create({
          data: {
            amount: seed.price,
            compareAtAmount: seed.originalPrice ?? null,
            currency: "USD",
            isActive: true,
            productVariantId: variant.id,
          },
        });

        variantIndex += 1;
      }
    }

    if (seed.isSteal && seed.stealPrice) {
      await prisma.steal.create({
        data: {
          badgeText: seed.stealBadgeText ?? "Today's Steal",
          endsAt: stealEndsAt,
          isActive: true,
          priority: 100 - index,
          productId: product.id,
          startsAt: stealStartsAt,
          stealPrice: seed.stealPrice,
        },
      });
    }
  }

  const semesterPickSeeds = [
    { productSlug: "study-focus-lamp", rank: 1, semesterKey: "spring-2026" },
    { productSlug: "study-note-kit", rank: 2, semesterKey: "spring-2026" },
    { productSlug: "tech-aurora-buds", rank: 3, semesterKey: "spring-2026" },
    { productSlug: "essentials-quiet-pack", rank: 4, semesterKey: "spring-2026" },
  ];

  await prisma.semesterPick.deleteMany({});

  for (const pick of semesterPickSeeds) {
    const campus = campusMap.get("nyu");
    const productId = productIdBySlug.get(pick.productSlug);
    if (!productId) {
      continue;
    }

    await prisma.semesterPick.create({
      data: {
        campusId: campus?.id,
        isActive: true,
        label: "Picks for Spring 2026",
        productId,
        rank: pick.rank,
        semesterKey: pick.semesterKey,
      },
    });
  }
}

async function seedUser() {
  const user = await prisma.user.upsert({
    create: {
      email: "ari@ayco.store",
      firstName: "Ari",
      passwordHash: "replace-with-argon2-hash",
      role: Role.student,
    },
    update: {
      firstName: "Ari",
    },
    where: { email: "ari@ayco.store" },
  });

  const campus = await prisma.campus.findUnique({ where: { slug: "nyu" } });

  await prisma.userPreference.upsert({
    create: {
      campusId: campus?.id,
      theme: ThemeMode.system,
      userId: user.id,
    },
    update: {
      campusId: campus?.id,
      theme: ThemeMode.system,
    },
    where: { userId: user.id },
  });
}

async function main() {
  await seedCatalog();
  await seedUser();
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
