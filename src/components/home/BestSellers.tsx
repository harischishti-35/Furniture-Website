'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, ShoppingCart, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { products } from '@/data/products';
import { useCartStore } from '@/store/cartStore';

const productGradients = [
  'linear-gradient(145deg, #f5f0e8 0%, #e8dfd3 50%, #d4c5b0 100%)',
  'linear-gradient(145deg, #e8ede6 0%, #d4ddd0 50%, #c0cdb8 100%)',
  'linear-gradient(145deg, #f0ebe4 0%, #e0d5c8 50%, #d0c0a8 100%)',
  'linear-gradient(145deg, #ece8e0 0%, #ddd5c8 50%, #c8baa6 100%)',
  'linear-gradient(145deg, #e6ebe8 0%, #d0d8d2 50%, #bcc8be 100%)',
  'linear-gradient(145deg, #f2ede5 0%, #e5ddd0 50%, #d6c8b0 100%)',
  'linear-gradient(145deg, #eae5df 0%, #d8d0c5 50%, #c5b8a5 100%)',
  'linear-gradient(145deg, #e8ece6 0%, #d5ddd0 50%, #c0cdb5 100%)',
  'linear-gradient(145deg, #f0e8e0 0%, #e0d0c0 50%, #d0c0a8 100%)',
  'linear-gradient(145deg, #ede8e2 0%, #ddd3c5 50%, #c8b8a0 100%)',
];

export default function BestSellers() {
  const ref = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const addItem = useCartStore((s) => s.addItem);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const bestSellers = products.filter((p) => p.isBestSeller);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
    setTimeout(checkScroll, 400);
  };

  return (
    <section ref={ref} className="py-16 md:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-10 md:mb-12"
        >
          <div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-2">
              Best Sellers
            </h2>
            <div className="w-16 h-1 bg-gold rounded-full" />
          </div>
          <Link
            href="/products?filter=best-sellers"
            className="hidden sm:flex items-center gap-2 text-gold hover:text-gold-dark font-medium transition-colors group"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          {canScrollLeft && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-20 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gold hover:text-white transition-colors duration-200 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
          )}
          {canScrollRight && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-20 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gold hover:text-white transition-colors duration-200 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          )}

          {/* Cards Row */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
          >
            {bestSellers.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="min-w-[280px] sm:min-w-[300px] md:min-w-[320px] snap-start"
              >
                <motion.div
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Product Image Placeholder */}
                  <div
                    className="relative h-56 md:h-64 overflow-hidden"
                    style={{ background: productGradients[index % productGradients.length] }}
                  >
                    {/* Furniture icon watermark */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="w-20 h-20 text-charcoal/[0.06] group-hover:scale-110 transition-transform duration-500"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20 8V6c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v2c-1.1 0-2 .9-2 2v6h2v2h2v-2h12v2h2v-2h2v-6c0-1.1-.9-2-2-2zM6 6h12v2H6V6zm14 10H4v-4c0-.55.45-1 1-1h1v3h12v-3h1c.55 0 1 .45 1 1v4z" />
                      </svg>
                    </div>

                    {/* Best Seller badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 bg-gold text-charcoal text-xs font-bold rounded-full shadow-md">
                      Best Seller
                    </div>

                    {/* Sale badge */}
                    {product.originalPrice && (
                      <div className="absolute top-3 right-3 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-md">
                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-semibold text-charcoal mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-charcoal/50 text-sm mb-3 line-clamp-1">
                      {product.shortDescription}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-gold fill-gold'
                              : 'text-gray-200 fill-gray-200'
                          }`}
                        />
                      ))}
                      <span className="text-xs text-charcoal/50 ml-1">
                        ({product.reviewCount})
                      </span>
                    </div>

                    {/* Price + CTA */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-charcoal">
                          ${product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-charcoal/40 line-through">
                            ${product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          addItem({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                          })
                        }
                        className="w-10 h-10 rounded-full bg-charcoal text-cream flex items-center justify-center hover:bg-gold hover:text-charcoal transition-colors duration-300 cursor-pointer"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile View All */}
        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/products?filter=best-sellers"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-dark font-medium transition-colors"
          >
            View All Best Sellers
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
