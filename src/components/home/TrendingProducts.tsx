'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { Star, ShoppingCart, TrendingUp } from 'lucide-react';
import { products } from '@/data/products';
import { useCartStore } from '@/store/cartStore';

const trendingGradients = [
  'linear-gradient(160deg, #1a1a2e 0%, #2d2d50 50%, #c9a96e 100%)',
  'linear-gradient(160deg, #5c3d2e 0%, #8b6040 50%, #d4ba85 100%)',
  'linear-gradient(160deg, #7c9473 0%, #5c7a53 50%, #3d5830 100%)',
  'linear-gradient(160deg, #2d1f15 0%, #5c3d2e 50%, #a07050 100%)',
  'linear-gradient(160deg, #1a1a2e 0%, #3a3a5e 50%, #7c9473 100%)',
  'linear-gradient(160deg, #c9a96e 0%, #a88950 50%, #5c3d2e 100%)',
  'linear-gradient(160deg, #3d5830 0%, #7c9473 50%, #b0c8a0 100%)',
  'linear-gradient(160deg, #2d2d50 0%, #1a1a2e 50%, #5c3d2e 100%)',
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function TrendingProducts() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const addItem = useCartStore((s) => s.addItem);

  const trending = products.filter((p) => p.isTrending).slice(0, 8);

  return (
    <section ref={ref} className="py-16 md:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal">
              Trending Now
            </h2>
            <span className="text-2xl" role="img" aria-label="fire">🔥</span>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-24 h-1 bg-gradient-to-r from-gold-dark via-gold to-gold-light mx-auto rounded-full origin-left"
          />
          <p className="mt-4 text-charcoal/60 text-lg max-w-xl mx-auto">
            The pieces everyone is loving right now. Don&apos;t miss out.
          </p>
        </motion.div>

        {/* Masonry-style Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5"
        >
          {trending.map((product, index) => {
            const isTall = index % 3 === 0;
            return (
              <motion.div
                key={product.id}
                variants={cardVariants}
                className="break-inside-avoid"
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  className={`relative rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300 ${
                    isTall ? 'h-96 md:h-[420px]' : 'h-72 md:h-80'
                  }`}
                  style={{ background: trendingGradients[index % trendingGradients.length] }}
                >
                  {/* Pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage:
                        'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0.05) 60%, transparent 60%)',
                      backgroundSize: '30px 30px',
                    }}
                  />

                  {/* Furniture icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-24 h-24 text-white/[0.05] group-hover:scale-110 transition-transform duration-500"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20 8V6c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v2c-1.1 0-2 .9-2 2v6h2v2h2v-2h12v2h2v-2h2v-6c0-1.1-.9-2-2-2zM6 6h12v2H6V6zm14 10H4v-4c0-.55.45-1 1-1h1v3h12v-3h1c.55 0 1 .45 1 1v4z" />
                    </svg>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-full z-10">
                    <Star className="w-3 h-3 text-gold fill-gold" />
                    <span className="text-xs font-semibold text-cream">{product.rating}</span>
                  </div>

                  {/* Trending badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 bg-gold/90 rounded-full z-10">
                    <TrendingUp className="w-3 h-3 text-charcoal" />
                    <span className="text-xs font-bold text-charcoal">Trending</span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-all duration-500" />

                  {/* Bottom Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-300 z-10">
                    <h3 className="font-heading text-lg font-semibold text-cream mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-cream/60 text-sm mb-3 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {product.shortDescription}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-cream">
                        ${product.price.toLocaleString()}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          addItem({ id: product.id, name: product.name, price: product.price })
                        }
                        className="px-4 py-2 bg-gold text-charcoal text-sm font-semibold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 cursor-pointer hover:bg-gold-light"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Shop Now
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
