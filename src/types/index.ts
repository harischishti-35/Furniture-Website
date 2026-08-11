// ============================================================
// Chishti Furniture Mart — TypeScript Type Definitions
// ============================================================

// ---- Product & Catalog ----

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductSize {
  label: string;
  dimensions: string;
  priceModifier: number; // 0 = no change, positive = add, negative = subtract
}

export interface ProductDimensions {
  width: number;
  height: number;
  depth: number;
  unit: 'in' | 'cm';
}

export interface ProductSpecifications {
  [key: string]: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful: number;
  images: string[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice: number;
  discount: number;
  images: ProductImage[];
  category: string;
  subcategory: string;
  colors: ProductColor[];
  sizes: ProductSize[];
  materials: string[];
  dimensions: ProductDimensions;
  weight: number;
  specifications: ProductSpecifications;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  inStock: boolean;
  stockQuantity: number;
  sku: string;
  tags: string[];
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  isTrending: boolean;
  createdAt: string;
}

// ---- Category ----

export interface Subcategory {
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  productCount: number;
  subcategories?: Subcategory[];
  gradient?: string;
  icon?: string;
}

// ---- Cart ----

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: ProductColor | null;
  selectedSize: ProductSize | null;
}

// ---- Wishlist ----

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

// ---- User & Auth ----

export interface Address {
  id: string;
  label: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  addresses: Address[];
  orders: Order[];
  createdAt: string;
  rewardPoints?: number;
  isLoggedIn?: boolean;
}

// ---- Orders ----

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'returned';

export interface OrderItem {
  product: Product;
  quantity: number;
  selectedColor: ProductColor | null;
  selectedSize: ProductSize | null;
  priceAtPurchase: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: Address;
  paymentMethod: string;
  createdAt: string;
  estimatedDelivery: string;
  trackingNumber: string;
}

// ---- Blog ----

export interface BlogAuthor {
  name: string;
  avatar: string;
  bio: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: BlogAuthor;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
}

// ---- Testimonials ----

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  location: string;
}

// ---- Coupon ----

export type CouponType = 'percentage' | 'fixed';

export interface CouponCode {
  code: string;
  discount: number;
  type: CouponType;
  minOrder: number;
  maxDiscount: number;
  validUntil: string;
}

// ---- Navigation ----

export interface NavSubLink {
  name: string;
  href: string;
}

export interface NavLink {
  name: string;
  href: string;
  children?: NavSubLink[];
}

// ---- Misc ----

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

export interface PaymentMethod {
  name: string;
  icon: string;
}

export interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface ColorFilter extends FilterOption {
  hex: string;
}

export interface PriceRange {
  label: string;
  min: number;
  max: number;
}

export interface Stat {
  label: string;
  value: string;
  suffix?: string;
}
