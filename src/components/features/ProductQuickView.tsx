'use client';

import { useQuickViewStore } from '@/store/quickViewStore';
import { useCartStore } from '@/store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ProductQuickView() {
  const { isOpen, product, close } = useQuickViewStore();
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.url,
    });
    close();
  };

  return (
    <AnimatePresence>
      {isOpen && product && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-soft-white border border-cream/25 w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl relative z-10 grid grid-cols-1 md:grid-cols-12"
          >
            {/* Close Button */}
            <button
              onClick={close}
              className="absolute top-6 right-6 text-charcoal/50 hover:text-charcoal cursor-pointer z-20"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left: Image (span 5) */}
            <div className="md:col-span-5 h-[250px] md:h-full bg-cream/15 flex items-center justify-center relative min-h-[300px]">
              <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle,#000_1px,transparent_1px)] bg-[size:20px_20px]" />
              
              {product.images[0]?.url ? (
                <img
                  src={product.images[0].url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-charcoal/30">No Image</div>
              )}
            </div>

            {/* Right: Info (span 7) */}
            <div className="md:col-span-7 p-8 flex flex-col justify-between text-left space-y-6">
              <div className="space-y-4">
                <span className="text-[10px] text-gold uppercase tracking-[0.2em] font-semibold">
                  {product.category} &bull; {product.subcategory}
                </span>

                <h3 className="font-heading text-2xl font-bold text-charcoal leading-tight">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-charcoal">{product.rating}</span>
                  <span className="text-charcoal/30">|</span>
                  <span className="text-[10px] text-charcoal/50 font-body">
                    ({product.reviewCount} reviews)
                  </span>
                </div>

                <div className="text-xl font-bold text-charcoal font-body pt-2 border-t border-cream/20">
                  ${product.price.toLocaleString()}
                </div>

                <p className="text-xs md:text-sm text-charcoal/60 leading-relaxed font-body">
                  {product.shortDescription}
                </p>
              </div>

              {/* CTAs */}
              <div className="space-y-3 pt-4 border-t border-cream/20 font-body">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3.5 bg-gold hover:bg-gold-light text-charcoal font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Shopping Bag
                </button>

                <Link
                  href={`/products/${product.slug}`}
                  onClick={close}
                  className="w-full py-3 border border-cream/40 text-charcoal hover:border-gold hover:text-gold font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 uppercase tracking-wider block text-center"
                >
                  <span>View Full Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
