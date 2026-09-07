export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  wasPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  isNew?: boolean;
  blurb?: string;
};

export const currency = (n: number) =>
  `€${n.toLocaleString("en-IE", { minimumFractionDigits: 0 })}`;

export const discountPct = (p: Product) =>
  p.wasPrice ? Math.round((1 - p.price / p.wasPrice) * 100) : 0;

/* ── Announcement bar ─────────────────────────────────────────────── */
export const promos = [
  "Free shipping over €120 — and free returns, always",
  "Winter Field Sale — up to 30% off shells, fleece and carry",
  "Order by Thursday noon for delivery before the weekend",
];

/* ── Navigation ───────────────────────────────────────────────────── */
export const navLinks: { label: string; href: string; spy?: string }[] = [
  { label: "Shop", href: "#categories" },
  { label: "New arrivals", href: "#new-arrivals", spy: "new-arrivals" },
  { label: "Best sellers", href: "#best-sellers", spy: "best-sellers" },
  { label: "Categories", href: "#categories", spy: "categories" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/* ── Hero callouts — each one points at something actually visible
      in the photograph, which is the whole point of the annotation. ── */
export const callouts = [
  {
    id: "sun",
    name: "Aperture Sun",
    category: "Eyewear",
    price: 120,
    /* node = the point on the photograph the leader line lands on;
       card = where its card floats. Both in % of the (square) frame. */
    node: { x: 66.7, y: 36 },
    card: { x: 70, y: 6 },
  },
  {
    id: "coat",
    name: "Nightline Overcoat",
    category: "Outerwear",
    price: 420,
    node: { x: 57, y: 64 },
    card: { x: 74, y: 62 },
  },
  {
    id: "glove",
    name: "Opera Leather Glove",
    category: "Accessories",
    price: 95,
    node: { x: 19.4, y: 56.2 },
    card: { x: 3, y: 76 },
  },
];

/* ── Trust ────────────────────────────────────────────────────────── */
export const trust = [
  { icon: "truck", title: "Free shipping over €120", note: "2–4 days, tracked" },
  { icon: "lock", title: "Encrypted checkout", note: "Card, iDEAL, Apple Pay" },
  { icon: "return", title: "60-day returns", note: "Prepaid label included" },
  { icon: "support", title: "Repair desk", note: "Mon–Sat, real humans" },
];

/* ── Categories ───────────────────────────────────────────────────── */
export const categories = [
  { slug: "outerwear", name: "Outerwear", count: 24, image: "/img/cat-outerwear.jpg" },
  { slug: "footwear", name: "Footwear", count: 18, image: "/img/cat-footwear.jpg" },
  { slug: "carry", name: "Carry", count: 15, image: "/img/cat-carry.jpg" },
  { slug: "eyewear", name: "Eyewear", count: 11, image: "/img/cat-eyewear.jpg" },
  { slug: "audio", name: "Audio", count: 9, image: "/img/cat-audio.jpg" },
  { slug: "watches", name: "Watches", count: 7, image: "/img/cat-watches.jpg" },
];

/* ── New arrivals ─────────────────────────────────────────────────── */
export const newArrivals: Product[] = [
  { id: "crew", name: "Bergen Crew Sweat", category: "Outerwear", price: 98, rating: 4.7, reviews: 86, image: "/img/p-crew.jpg", isNew: true },
  { id: "runner", name: "Meridian Runner", category: "Footwear", price: 140, wasPrice: 175, rating: 4.8, reviews: 241, image: "/img/p-runner.jpg" },
  { id: "pack22", name: "Transit 22L Pack", category: "Carry", price: 165, rating: 4.9, reviews: 152, image: "/img/p-pack22.jpg", isNew: true },
  { id: "optical", name: "Aperture Optical", category: "Eyewear", price: 120, rating: 4.6, reviews: 74, image: "/img/p-optical.jpg", isNew: true },
  { id: "wired", name: "Studio 02 Wired", category: "Audio", price: 89, wasPrice: 110, rating: 4.5, reviews: 198, image: "/img/p-wired.jpg" },
  { id: "trucker", name: "Sherpa Trucker", category: "Outerwear", price: 210, rating: 4.8, reviews: 63, image: "/img/p-trucker.jpg", isNew: true },
  { id: "carryall", name: "Carryall Mini", category: "Carry", price: 185, wasPrice: 230, rating: 4.7, reviews: 117, image: "/img/p-carryall.jpg" },
  { id: "datum", name: "Datum Automatic", category: "Watches", price: 395, rating: 4.9, reviews: 58, image: "/img/p-datum.jpg", isNew: true },
];

/* ── Best sellers ─────────────────────────────────────────────────── */
export const bestSellers: Product[] = [
  {
    id: "monitor",
    name: "Field Monitor Wireless",
    category: "Audio",
    price: 249,
    rating: 4.9,
    reviews: 312,
    image: "/img/b-monitor.jpg",
    blurb: "Forty hours on a charge, and a headband you can replace yourself.",
  },
  {
    id: "fleece",
    name: "Contour Heavy Fleece",
    category: "Outerwear",
    price: 130,
    rating: 4.8,
    reviews: 204,
    image: "/img/b-fleece.jpg",
    blurb: "480gsm loopback cotton, brushed once. Holds its shape through the wash.",
  },
  {
    id: "pack30",
    name: "Transit 30L, Rose Clay",
    category: "Carry",
    price: 190,
    rating: 4.9,
    reviews: 176,
    image: "/img/b-pack30.jpg",
    blurb: "Fits a 16-inch laptop, a helmet and a week of gym kit, in that order.",
  },
];

/* ── Footer reassurance strip ─────────────────────────────────────── */
export const reassurance = [
  { title: "Made in Portugal and Japan", note: "Named factories, listed on every product page" },
  { title: "Carbon-neutral delivery", note: "Shipped in paper, never plastic" },
  { title: "Checkout in three fields", note: "No account required to buy" },
  { title: "Keep it a year or send it back", note: "Full refund, no questions" },
];

export const footerNav = [
  {
    heading: "Shop",
    links: ["New arrivals", "Best sellers", "Outerwear", "Footwear", "Carry", "Gift cards"],
  },
  {
    heading: "Support",
    links: ["Track an order", "Returns and exchanges", "Repair desk", "Size guide", "Contact"],
  },
  {
    heading: "Company",
    links: ["About Novatrend", "Our factories", "Materials", "Careers", "Press"],
  },
];
