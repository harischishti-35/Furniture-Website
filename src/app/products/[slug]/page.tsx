'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingBag, Truck, Shield, RotateCcw, Share2, Plus, Minus, ArrowLeft, RefreshCw } from 'lucide-react';
import { products } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useUserStore } from '@/store/userStore';
import { useCompareStore } from '@/store/compareStore';
import ProductCard from '@/components/products/ProductCard';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = React.use(params);
  const router = useRouter();
  const product = useMemo(() => products.find((p) => p.slug === slug), [slug]);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');

  const addItem = useCartStore((s) => s.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { addItem: addToCompare, items: compareItems, removeItem: removeFromCompare } = useCompareStore();
  const addRecentlyViewed = useUserStore((s) => s.addRecentlyViewed);

  // Initialize selected color and size when product changes
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0] || null);
      setSelectedSize(product.sizes[0] || null);
      setActiveImage(0);
      setQuantity(1);
      
      // Track recently viewed
      addRecentlyViewed(product);
    }
  }, [product, addRecentlyViewed]);

  if (!product) {
    return (
      <div className="py-20 text-center min-h-screen flex flex-col items-center justify-center bg-soft-white">
        <h2 className="font-heading text-2xl font-bold text-charcoal mb-4">Product Not Found</h2>
        <p className="text-charcoal/60 mb-6">The product you are looking for does not exist or has been removed.</p>
        <Link href="/products" className="px-6 py-2.5 bg-gold text-charcoal font-semibold rounded-xl text-sm transition-colors">
          Back to Shop
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const isCompared = compareItems.some((i) => i.id === product.id);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price + (selectedSize?.priceModifier ?? 0),
      image: product.images[0]?.url,
    });
  };

  const handleToggleFavorite = () => {
    toggleItem(product);
  };

  const handleToggleCompare = () => {
    if (isCompared) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.shortDescription,
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Copy to clipboard fallback
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Find related products (same category, excluding current product)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="py-10 md:py-16 bg-soft-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation / Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-charcoal/60 hover:text-charcoal transition-colors text-sm font-medium mb-8 font-body cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-16">
          
          {/* Left Column: Image Gallery (span 7) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-cream/20 border border-cream/15 flex items-center justify-center relative shadow-sm">
              {product.images[activeImage]?.url ? (
                <img
                  src={product.images[activeImage].url}
                  alt={product.images[activeImage].alt || product.name}
                  className="w-full h-full object-cover transition-all duration-500"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-cream/30 to-gold/10 flex items-center justify-center text-charcoal/30">
                  No Image Available
                </div>
              )}
              
              {/* Product icon overlay on error fallback */}
              <svg
                className="absolute w-24 h-24 text-charcoal/[0.03] pointer-events-none"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20 8V6c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v2c-1.1 0-2 .9-2 2v6h2v2h2v-2h12v2h2v-2h2v-6c0-1.1-.9-2-2-2zM6 6h12v2H6V6zm14 10H4v-4c0-.55.45-1 1-1h1v3h12v-3h1c.55 0 1 .45 1 1v4z" />
              </svg>
            </div>

            {/* Thumbnail Carousel */}
            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
                {product.images.map((img, index) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImage(index)}
                    className={`w-24 aspect-[4/3] rounded-xl overflow-hidden bg-cream/10 border-2 transition-all flex-shrink-0 cursor-pointer ${
                      activeImage === index ? 'border-gold shadow-md scale-102' : 'border-transparent hover:border-cream'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.alt || `Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Info & Checkout Configurations (span 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs text-gold uppercase tracking-[0.2em] font-semibold">
                {product.category} &bull; {product.subcategory}
              </span>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-charcoal leading-tight">
                {product.name}
              </h1>
              
              {/* Review Count and Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-charcoal">{product.rating}</span>
                <span className="text-charcoal/30">|</span>
                <span className="text-xs text-charcoal/50 font-body">
                  ({product.reviewCount} customer reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 py-3 border-y border-cream/20">
              <span className="text-2xl md:text-3xl font-bold text-charcoal font-body">
                ${(product.price + (selectedSize?.priceModifier ?? 0)).toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-lg text-charcoal/40 line-through font-body">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Short Description */}
            <p className="text-sm text-charcoal/70 leading-relaxed font-body">
              {product.shortDescription}
            </p>

            {/* Color Swatches */}
            {product.colors.length > 0 && (
              <div className="space-y-2.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-charcoal/50">
                  Select Color: <span className="text-charcoal font-bold font-body">{selectedColor?.name}</span>
                </span>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
                        selectedColor?.name === color.name
                          ? 'border-gold scale-110 shadow-md ring-2 ring-gold/20'
                          : 'border-cream/20 hover:scale-105'
                      }`}
                      title={color.name}
                    >
                      <span className="w-5.5 h-5.5 rounded-full block" style={{ backgroundColor: color.hex }} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Swatches */}
            {product.sizes.length > 0 && (
              <div className="space-y-2.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-charcoal/50">
                  Select Size:
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {product.sizes.map((size) => (
                    <button
                      key={size.label}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2.5 border rounded-xl text-xs font-semibold font-body cursor-pointer transition-all ${
                        selectedSize?.label === size.label
                          ? 'border-gold bg-gold/5 text-charcoal shadow-sm'
                          : 'border-cream/40 text-charcoal/75 hover:border-gold'
                      }`}
                    >
                      {size.label} <span className="text-[10px] text-charcoal/40 font-normal">({size.dimensions})</span>
                      {size.priceModifier > 0 && (
                        <span className="text-[10px] text-gold font-bold ml-1">+${size.priceModifier}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Action CTAs */}
            <div className="space-y-4 pt-4 border-t border-cream/20">
              <div className="flex flex-wrap gap-4 items-center">
                
                {/* Quantity Buttons */}
                <div className="flex items-center border border-cream/40 rounded-xl bg-cream/10 p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
                    className="p-2 hover:text-gold transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-charcoal font-body">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 hover:text-gold transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add To Cart */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="flex-grow min-w-[200px] py-4 bg-gold hover:bg-gold-light text-charcoal font-semibold rounded-xl text-sm transition-colors duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-gold/15 cursor-pointer"
                >
                  <ShoppingBag className="w-4.5 h-4.5" />
                  Add to Shopping Bag
                </motion.button>
              </div>

              {/* Secondary Actions (Wishlist, Compare, Share) */}
              <div className="flex items-center justify-between py-2 text-sm border-b border-cream/20 text-charcoal/60">
                <button
                  onClick={handleToggleFavorite}
                  className={`flex items-center gap-2 hover:text-gold transition-colors cursor-pointer ${
                    isFavorited ? 'text-red-500 font-semibold' : ''
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                  {isFavorited ? 'Added to Wishlist' : 'Add to Wishlist'}
                </button>
                
                <button
                  onClick={handleToggleCompare}
                  className={`flex items-center gap-2 hover:text-gold transition-colors cursor-pointer ${
                    isCompared ? 'text-gold font-semibold' : ''
                  }`}
                >
                  <RefreshCw className="w-4 h-4" />
                  {isCompared ? 'Compared' : 'Add to Compare'}
                </button>

                <button onClick={handleShare} className="flex items-center gap-2 hover:text-gold transition-colors cursor-pointer">
                  <Share2 className="w-4 h-4" />
                  Share Product
                </button>
              </div>
            </div>

            {/* Deliveries & Guarantee Trust info */}
            <div className="space-y-3 pt-2 text-xs text-charcoal/50">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-gold flex-shrink-0" />
                <div>
                  <span className="font-semibold text-charcoal/70">Free White Glove Delivery</span>
                  <p>Delivered, assembled, and packaging removed in 7-10 business days.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gold flex-shrink-0" />
                <div>
                  <span className="font-semibold text-charcoal/70">Lifetime Frame Warranty</span>
                  <p>We guarantee frame and joinery durability for the lifetime of the piece.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-5 h-5 text-gold flex-shrink-0" />
                <div>
                  <span className="font-semibold text-charcoal/70">30-Day Free Return Policy</span>
                  <p>Not fully satisfied? Return within 30 days for a full refund or swap.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Tabs Section (Description, Specs, Reviews) */}
        <div className="mb-16 border-t border-cream/20 pt-10">
          <div className="flex border-b border-cream/20 pb-px mb-8 overflow-x-auto gap-8">
            {['description', 'specs', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-4 text-sm font-semibold uppercase tracking-wider font-body cursor-pointer relative transition-colors ${
                  activeTab === tab ? 'text-gold' : 'text-charcoal/50 hover:text-charcoal'
                }`}
              >
                {tab === 'specs' ? 'Specifications' : tab === 'reviews' ? `Reviews (${product.reviewCount})` : tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabBorder"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="min-h-[200px]">
            {activeTab === 'description' && (
              <div className="space-y-4 max-w-3xl">
                <p className="text-charcoal/80 leading-relaxed font-body">{product.description}</p>
                <div className="pt-4 space-y-2">
                  <h4 className="font-heading text-lg font-bold text-charcoal">Materials & Construction</h4>
                  <p className="text-sm text-charcoal/70 leading-relaxed font-body">
                    Crafted with premium materials: {product.materials.join(', ')}. Engineered with solid frames and dowel/tenon joinery for maximum lifetime support.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-xl border border-cream/20 rounded-2xl overflow-hidden bg-cream/5">
                <table className="w-full text-sm font-body">
                  <tbody>
                    <tr className="border-b border-cream/15">
                      <td className="px-5 py-4 font-semibold text-charcoal/55 bg-cream/10 w-40">Dimensions</td>
                      <td className="px-5 py-4 text-charcoal">
                        {product.dimensions.width}W x {product.dimensions.height}H x {product.dimensions.depth}D {product.dimensions.unit}
                      </td>
                    </tr>
                    <tr className="border-b border-cream/15">
                      <td className="px-5 py-4 font-semibold text-charcoal/55 bg-cream/10">Weight</td>
                      <td className="px-5 py-4 text-charcoal">{product.weight} lbs</td>
                    </tr>
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <tr key={key} className="border-b border-cream/15 last:border-b-0">
                        <td className="px-5 py-4 font-semibold text-charcoal/55 bg-cream/10 capitalize">{key}</td>
                        <td className="px-5 py-4 text-charcoal">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8 max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  
                  {/* Rating summary */}
                  <div className="md:col-span-4 bg-cream/5 p-6 rounded-2xl border border-cream/20 text-center">
                    <h3 className="font-heading text-5xl font-bold text-charcoal mb-2">{product.rating}</h3>
                    <div className="flex items-center justify-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-charcoal/45 font-body">Based on {product.reviewCount} reviews</span>
                  </div>

                  {/* Review list */}
                  <div className="md:col-span-8 space-y-6">
                    {product.reviews && product.reviews.length > 0 ? (
                      product.reviews.map((rev) => (
                        <div key={rev.id} className="pb-6 border-b border-cream/20 last:border-b-0 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full overflow-hidden bg-gold/10 flex items-center justify-center text-gold font-bold">
                                {rev.userAvatar ? (
                                  <img src={rev.userAvatar} alt={rev.userName} className="w-full h-full object-cover" />
                                ) : (
                                  rev.userName.slice(0, 2).toUpperCase()
                                )}
                              </div>
                              <div>
                                <h4 className="font-heading text-sm font-semibold text-charcoal">{rev.userName}</h4>
                                <span className="text-[10px] text-charcoal/40 font-body">{rev.date}</span>
                              </div>
                            </div>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3.5 h-3.5 ${
                                    i < rev.rating ? 'fill-gold text-gold' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <h5 className="font-heading text-sm font-bold text-charcoal">{rev.title}</h5>
                          <p className="text-sm text-charcoal/70 leading-relaxed font-body">{rev.comment}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-charcoal/40 font-body">No reviews yet for this product.</p>
                    )}
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-cream/20 pt-16">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal mb-8">
              Related Collections
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
