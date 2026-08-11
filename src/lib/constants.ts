// ============================================================
// Chishti Furniture Mart — Brand Constants
// ============================================================

import type {
  NavLink,
  SocialLink,
  PaymentMethod,
  ShippingOption,
  FilterOption,
  ColorFilter,
  PriceRange,
  Stat,
  CouponCode,
} from '@/types';

// ---- Brand ----

export const BRAND_NAME = 'Chishti Furniture Mart';
export const BRAND_TAGLINE = 'Where Elegance Meets Comfort';
export const BRAND_DESCRIPTION =
  'Premium handcrafted furniture for the modern home. Discover timeless designs that blend artisan craftsmanship with contemporary aesthetics, transforming every room into a masterpiece.';

export const BRAND_COLORS = {
  charcoal: '#1a1a2e',
  gold: '#c9a96e',
  cream: '#f5f0e8',
  sage: '#7c9473',
  white: '#fafaf7',
  brown: '#5c3d2e',
} as const;

// ---- Contact ----

export const CONTACT_INFO = {
  email: 'hello@chishtifurniture.com',
  phone: '+1 (800) 555-0199',
  address: '245 Design District Boulevard, New York, NY 10013',
  hours: 'Mon – Sat: 9 AM – 8 PM | Sun: 10 AM – 6 PM',
};

// ---- Navigation ----

export const NAV_LINKS: NavLink[] = [
  {
    name: 'Living Room',
    href: '/category/living-room',
    children: [
      { name: 'Sofas & Couches', href: '/category/living-room/sofas' },
      { name: 'Sectionals', href: '/category/living-room/sectionals' },
      { name: 'Armchairs & Recliners', href: '/category/living-room/armchairs' },
      { name: 'Coffee Tables', href: '/category/living-room/coffee-tables' },
      { name: 'TV Stands & Media', href: '/category/living-room/tv-stands' },
      { name: 'Console Tables', href: '/category/living-room/console-tables' },
    ],
  },
  {
    name: 'Bedroom',
    href: '/category/bedroom',
    children: [
      { name: 'Beds & Headboards', href: '/category/bedroom/beds' },
      { name: 'Mattresses', href: '/category/bedroom/mattresses' },
      { name: 'Dressers & Chests', href: '/category/bedroom/dressers' },
      { name: 'Nightstands', href: '/category/bedroom/nightstands' },
      { name: 'Wardrobes', href: '/category/bedroom/wardrobes' },
      { name: 'Vanity Tables', href: '/category/bedroom/vanity-tables' },
    ],
  },
  {
    name: 'Dining Room',
    href: '/category/dining-room',
    children: [
      { name: 'Dining Tables', href: '/category/dining-room/dining-tables' },
      { name: 'Dining Chairs', href: '/category/dining-room/dining-chairs' },
      { name: 'Bar Stools', href: '/category/dining-room/bar-stools' },
      { name: 'Buffets & Sideboards', href: '/category/dining-room/buffets' },
      { name: 'Dining Sets', href: '/category/dining-room/dining-sets' },
    ],
  },
  {
    name: 'Bathroom',
    href: '/category/bathroom',
    children: [
      { name: 'Vanities', href: '/category/bathroom/vanities' },
      { name: 'Mirrors', href: '/category/bathroom/mirrors' },
      { name: 'Storage Cabinets', href: '/category/bathroom/storage' },
      { name: 'Shelving', href: '/category/bathroom/shelving' },
    ],
  },
  {
    name: 'Office',
    href: '/category/office',
    children: [
      { name: 'Desks', href: '/category/office/desks' },
      { name: 'Office Chairs', href: '/category/office/chairs' },
      { name: 'Bookcases', href: '/category/office/bookcases' },
      { name: 'Filing Cabinets', href: '/category/office/filing-cabinets' },
      { name: 'Standing Desks', href: '/category/office/standing-desks' },
    ],
  },
  {
    name: 'Kitchen',
    href: '/category/kitchen',
    children: [
      { name: 'Kitchen Islands', href: '/category/kitchen/islands' },
      { name: 'Pantry Cabinets', href: '/category/kitchen/pantry' },
      { name: 'Kitchen Carts', href: '/category/kitchen/carts' },
      { name: 'Counter Stools', href: '/category/kitchen/counter-stools' },
    ],
  },
  {
    name: 'Outdoor',
    href: '/category/outdoor',
    children: [
      { name: 'Patio Sets', href: '/category/outdoor/patio-sets' },
      { name: 'Outdoor Sofas', href: '/category/outdoor/sofas' },
      { name: 'Lounge Chairs', href: '/category/outdoor/lounge-chairs' },
      { name: 'Outdoor Dining', href: '/category/outdoor/dining' },
      { name: 'Hammocks & Swings', href: '/category/outdoor/hammocks' },
    ],
  },
  {
    name: 'Kids',
    href: '/category/kids',
    children: [
      { name: 'Kids Beds', href: '/category/kids/beds' },
      { name: 'Study Desks', href: '/category/kids/desks' },
      { name: 'Storage & Toy Boxes', href: '/category/kids/storage' },
      { name: 'Play Furniture', href: '/category/kids/play' },
    ],
  },
  {
    name: 'Storage',
    href: '/category/storage',
    children: [
      { name: 'Bookshelves', href: '/category/storage/bookshelves' },
      { name: 'Cabinets', href: '/category/storage/cabinets' },
      { name: 'Shoe Racks', href: '/category/storage/shoe-racks' },
      { name: 'Wall Shelves', href: '/category/storage/wall-shelves' },
    ],
  },
  {
    name: 'Home Decor',
    href: '/category/home-decor',
    children: [
      { name: 'Mirrors', href: '/category/home-decor/mirrors' },
      { name: 'Vases & Planters', href: '/category/home-decor/vases' },
      { name: 'Wall Art', href: '/category/home-decor/wall-art' },
      { name: 'Rugs & Carpets', href: '/category/home-decor/rugs' },
      { name: 'Candles & Holders', href: '/category/home-decor/candles' },
    ],
  },
  {
    name: 'Custom',
    href: '/category/custom',
    children: [
      { name: 'Custom Sofas', href: '/category/custom/sofas' },
      { name: 'Custom Tables', href: '/category/custom/tables' },
      { name: 'Custom Beds', href: '/category/custom/beds' },
      { name: 'Custom Storage', href: '/category/custom/storage' },
    ],
  },
  {
    name: 'Luxury',
    href: '/category/luxury',
    children: [
      { name: 'Designer Sofas', href: '/category/luxury/sofas' },
      { name: 'Luxury Beds', href: '/category/luxury/beds' },
      { name: 'Premium Dining', href: '/category/luxury/dining' },
      { name: 'Statement Pieces', href: '/category/luxury/statement' },
    ],
  },
];

// ---- Social Links ----

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'Facebook', href: 'https://facebook.com/chishtifurniture', icon: 'facebook' },
  { name: 'Instagram', href: 'https://instagram.com/chishtifurniture', icon: 'instagram' },
  { name: 'Twitter', href: 'https://twitter.com/chishtifurniture', icon: 'twitter' },
  { name: 'Pinterest', href: 'https://pinterest.com/chishtifurniture', icon: 'pinterest' },
  { name: 'YouTube', href: 'https://youtube.com/chishtifurniture', icon: 'youtube' },
];

// ---- Stats ----

export const STATS: Stat[] = [
  { label: 'Happy Customers', value: '10,000', suffix: '+' },
  { label: 'Products', value: '5,000', suffix: '+' },
  { label: 'Average Rating', value: '4.8', suffix: '★' },
  { label: 'Countries Served', value: '50', suffix: '+' },
];

// ---- Payment Methods ----

export const PAYMENT_METHODS: PaymentMethod[] = [
  { name: 'Visa', icon: 'visa' },
  { name: 'Mastercard', icon: 'mastercard' },
  { name: 'American Express', icon: 'amex' },
  { name: 'PayPal', icon: 'paypal' },
  { name: 'Apple Pay', icon: 'apple-pay' },
  { name: 'Google Pay', icon: 'google-pay' },
];

// ---- Shipping Options ----

export const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: 'standard',
    name: 'Standard Delivery',
    description: 'Delivered to your doorstep',
    price: 49,
    estimatedDays: '7–14 business days',
  },
  {
    id: 'express',
    name: 'Express Delivery',
    description: 'Faster delivery with tracking',
    price: 99,
    estimatedDays: '3–5 business days',
  },
  {
    id: 'premium',
    name: 'White Glove Delivery',
    description: 'In-room delivery, unpacking & assembly',
    price: 199,
    estimatedDays: '5–10 business days',
  },
  {
    id: 'free',
    name: 'Free Shipping',
    description: 'On orders over $999',
    price: 0,
    estimatedDays: '10–18 business days',
  },
];

// ---- Filter Options ----

export const MATERIAL_FILTERS: FilterOption[] = [
  { label: 'Solid Wood', value: 'solid-wood' },
  { label: 'Engineered Wood', value: 'engineered-wood' },
  { label: 'Metal', value: 'metal' },
  { label: 'Glass', value: 'glass' },
  { label: 'Leather', value: 'leather' },
  { label: 'Fabric', value: 'fabric' },
  { label: 'Velvet', value: 'velvet' },
  { label: 'Marble', value: 'marble' },
  { label: 'Rattan', value: 'rattan' },
  { label: 'Bamboo', value: 'bamboo' },
  { label: 'Teak', value: 'teak' },
  { label: 'Walnut', value: 'walnut' },
  { label: 'Oak', value: 'oak' },
  { label: 'Acacia', value: 'acacia' },
];

export const COLOR_FILTERS: ColorFilter[] = [
  { label: 'White', value: 'white', hex: '#FFFFFF' },
  { label: 'Black', value: 'black', hex: '#1a1a1a' },
  { label: 'Gray', value: 'gray', hex: '#808080' },
  { label: 'Beige', value: 'beige', hex: '#D4C5A9' },
  { label: 'Brown', value: 'brown', hex: '#5c3d2e' },
  { label: 'Navy', value: 'navy', hex: '#1B2A4A' },
  { label: 'Green', value: 'green', hex: '#7c9473' },
  { label: 'Walnut', value: 'walnut', hex: '#5B3A29' },
  { label: 'Oak', value: 'oak', hex: '#C8A96E' },
  { label: 'Charcoal', value: 'charcoal', hex: '#36454F' },
  { label: 'Cream', value: 'cream', hex: '#f5f0e8' },
  { label: 'Teal', value: 'teal', hex: '#008080' },
  { label: 'Burgundy', value: 'burgundy', hex: '#800020' },
  { label: 'Gold', value: 'gold', hex: '#c9a96e' },
];

export const PRICE_RANGES: PriceRange[] = [
  { label: 'Under $250', min: 0, max: 250 },
  { label: '$250 – $500', min: 250, max: 500 },
  { label: '$500 – $1,000', min: 500, max: 1000 },
  { label: '$1,000 – $2,500', min: 1000, max: 2500 },
  { label: '$2,500 – $5,000', min: 2500, max: 5000 },
  { label: 'Over $5,000', min: 5000, max: Infinity },
];

// ---- Coupons ----

export const AVAILABLE_COUPONS: CouponCode[] = [
  {
    code: 'WELCOME10',
    discount: 10,
    type: 'percentage',
    minOrder: 200,
    maxDiscount: 150,
    validUntil: '2026-12-31',
  },
  {
    code: 'SUMMER25',
    discount: 25,
    type: 'percentage',
    minOrder: 500,
    maxDiscount: 500,
    validUntil: '2026-09-30',
  },
  {
    code: 'FLAT100',
    discount: 100,
    type: 'fixed',
    minOrder: 750,
    maxDiscount: 100,
    validUntil: '2026-12-31',
  },
  {
    code: 'PREMIUM15',
    discount: 15,
    type: 'percentage',
    minOrder: 1000,
    maxDiscount: 750,
    validUntil: '2026-12-31',
  },
];

// ---- Footer Links ----

export const FOOTER_LINKS = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Story', href: '/our-story' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Blog', href: '/blog' },
  ],
  support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Shipping & Delivery', href: '/shipping' },
    { name: 'Returns & Exchanges', href: '/returns' },
    { name: 'Warranty', href: '/warranty' },
    { name: 'Assembly Guides', href: '/assembly' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Accessibility', href: '/accessibility' },
  ],
  services: [
    { name: 'Interior Design', href: '/services/interior-design' },
    { name: 'Room Planner', href: '/services/room-planner' },
    { name: 'Trade Program', href: '/services/trade' },
    { name: 'Gift Cards', href: '/gift-cards' },
    { name: 'Financing', href: '/financing' },
  ],
};
