'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star, RefreshCw, Eye } from 'lucide-react';
import type { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCompareStore } from '@/store/compareStore';
import { useQuickViewStore } from '@/store/quickViewStore';

interface ProductCardProps {
  product: Product;
  gradient?: string;
}

const cardGradients = [
  'linear-gradient(135deg, #f5f0e8 0%, #e0d5c0 40%, #c9a96e 100%)',
  'linear-gradient(135deg, #e8ede6 0%, #c5d0bc 40%, #7c9473 100%)',
  'linear-gradient(135deg, #f0ebe4 0%, #ddd0c0 40%, #b09070 100%)',
  'linear-gradient(135deg, #eae8e5 0%, #d8d0c5 40%, #a89880 100%)',
];

export default function ProductCard({ product, gradient }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { addItem: addToCompare, items: compareItems, removeItem: removeFromCompare } = useCompareStore();
  const openQuickView = useQuickViewStore((s) => s.open);

  const isFavorited = isInWishlist(product.id);
  const isCompared = compareItems.some((i) => i.id === product.id);

  const cardGradient = gradient || cardGradients[product.name.length % cardGradients.length];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.url,
    });
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCompared) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  return (
    <Link href={`/products/${product.slug}`} className="block group">
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative flex flex-col bg-soft-white dark:bg-charcoal border border-cream/20 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 group"
      >
        {/* Product Image Area (Gradients and Visual Overlay) */}
        <div
          className="relative aspect-square w-full flex items-center justify-center overflow-hidden transition-transform duration-700"
          style={{ background: cardGradient }}
        >
          {/* Decorative Pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Furniture Vector Representation for High Quality UI */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-24 h-24 text-charcoal/[0.04] dark:text-soft-white/[0.04] group-hover:scale-110 transition-transform duration-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20 8V6c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v2c-1.1 0-2 .9-2 2v6h2v2h2v-2h12v2h2v-2h2v-6c0-1.1-.9-2-2-2zM6 6h12v2H6V6zm14 10H4v-4c0-.55.45-1 1-1h1v3h12v-3h1c.55 0 1 .45 1 1v4z" />
            </svg>
          </div>

          {/* Badges */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            {product.discount > 0 && (
              <span className="px-2.5 py-1 bg-gold text-charcoal text-[10px] font-bold rounded-full tracking-wide shadow-md">
                -{product.discount}%
              </span>
            )}
            {product.isNewArrival && (
              <span className="px-2.5 py-1 bg-charcoal text-cream text-[10px] font-bold rounded-full tracking-wide shadow-md">
                NEW
              </span>
            )}
            {product.isBestSeller && (
              <span className="px-2.5 py-1 bg-sage text-soft-white text-[10px] font-bold rounded-full tracking-wide shadow-md">
                BEST
              </span>
            )}
          </div>

          {/* Quick Actions (Heart, Compare, Cart) */}
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Wishlist */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleToggleFavorite}
              className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 border border-cream/20 ${
                isFavorited
                  ? 'bg-red-500 text-white border-transparent'
                  : 'bg-soft-white hover:bg-gold hover:text-charcoal text-charcoal'
              }`}
              aria-label="Add to wishlist"
            >
              <Heart className={`w-4.5 h-4.5 ${isFavorited ? 'fill-current' : ''}`} />
            </motion.button>

            {/* Compare */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleToggleCompare}
              className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 border border-cream/20 ${
                isCompared
                  ? 'bg-gold text-charcoal'
                  : 'bg-soft-white hover:bg-gold hover:text-charcoal text-charcoal'
              }`}
              aria-label="Add to comparison"
            >
              <RefreshCw className="w-4.5 h-4.5" />
            </motion.button>

            {/* Quick View */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                openQuickView(product);
              }}
              className="w-9 h-9 rounded-full bg-soft-white hover:bg-gold hover:text-charcoal text-charcoal flex items-center justify-center shadow-lg transition-all duration-300 border border-cream/20"
              aria-label="Quick view"
            >
              <Eye className="w-4.5 h-4.5" />
            </motion.button>
          </div>

          {/* Image */}
          {product.images[0]?.url && (
            <img
              src={product.images[0].url}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          )}

          {/* Gradient Overlay for hover effect */}
          <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-all duration-500" />
        </div>

        {/* Product Details Area */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-charcoal/40 dark:text-soft-white/40 uppercase tracking-[0.15em] font-semibold">
              {product.category}
            </span>
            <h3 className="font-heading text-base font-bold text-charcoal dark:text-soft-white group-hover:text-gold transition-colors line-clamp-1">
              {product.name}
            </h3>
            
            {/* Rating */}
            <div className="flex items-center gap-1.5 pt-0.5">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(product.rating)
                        ? 'fill-gold text-gold'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] text-charcoal/50 dark:text-soft-white/50 font-body font-medium">
                ({product.reviewCount})
              </span>
            </div>
          </div>

          {/* Price & Cart Add */}
          <div className="flex items-center justify-between pt-4 border-t border-cream/20 mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-charcoal dark:text-soft-white font-body">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-charcoal/40 dark:text-soft-white/40 line-through font-body">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="p-2.5 rounded-xl bg-gold text-charcoal hover:bg-gold-light transition-colors flex items-center justify-center cursor-pointer shadow-md hover:shadow-lg"
              aria-label="Add to cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
