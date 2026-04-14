import type { Zone } from "@/types/product";

export const NAV_LINKS = [
  { href: "/", label: "Base" },
  { href: "/zones", label: "Zones" },
  { href: "/heat", label: "Heat" },
  { href: "/steals", label: "Steals" },
  { href: "/locker", label: "Locker" },
] as const;

export const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price ↑", value: "price-asc" },
  { label: "Price ↓", value: "price-desc" },
  { label: "Most Grabbed", value: "grabbed" },
  { label: "Highest Heat", value: "heat" },
] as const;

export const ZONES: Zone[] = [
  {
    accent: "from-violet-500/35 via-fuchsia-500/10 to-transparent",
    description: "Desk glow-ups, sleep fixes, and tiny-space wins.",
    icon: "BedDouble",
    name: "Dorm",
    slug: "dorm",
  },
  {
    accent: "from-cyan-400/35 via-sky-500/10 to-transparent",
    description: "Gadgets that keep group projects from becoming group pain.",
    icon: "Laptop2",
    name: "Tech",
    slug: "tech",
  },
  {
    accent: "from-lime-400/30 via-emerald-500/10 to-transparent",
    description: "Note-taking, focus, finals survival, and better habits.",
    icon: "BookOpenText",
    name: "Study",
    slug: "study",
  },
  {
    accent: "from-amber-400/30 via-orange-500/10 to-transparent",
    description: "Move better, recover faster, still make the 8am.",
    icon: "Dumbbell",
    name: "Fit",
    slug: "fit",
  },
  {
    accent: "from-rose-500/30 via-pink-500/10 to-transparent",
    description: "Campus-ready outfits with main-character energy.",
    icon: "Shirt",
    name: "Fashion",
    slug: "fashion",
  },
  {
    accent: "from-cyan-300/20 via-slate-500/10 to-transparent",
    description: "The basics you always need 10 minutes before class.",
    icon: "PackageOpen",
    name: "Essentials",
    slug: "essentials",
  },
];

export const CAMPUSES = [
  "NYU",
  "UCLA",
  "University of Texas",
  "LUMS",
  "NUST",
  "Stanford",
];

export const LOADING_LINES = [
  "Scouting the best deals for you 👀",
  "Loading your Stash...",
  "Grabbing the latest Heat...",
  "Dialing in your picks...",
  "Almost there...",
  "Checking what's On Heat...",
  "Pulling up your Claims...",
  "Unlocking your Vault...",
  "Rewinding your history...",
  "Finding your steals...",
];

export const CLAIM_STATUSES = [
  "Prepping",
  "Dispatched",
  "En Route",
  "Landed",
  "Bounced",
  "Pulled",
] as const;

export const CLOUT_TIERS = [
  { label: "Bronze", threshold: 0 },
  { label: "Silver", threshold: 501 },
  { label: "Gold", threshold: 2001 },
] as const;
