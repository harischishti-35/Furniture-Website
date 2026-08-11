'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { Eye, ShoppingCart, Star } from 'lucide-react';
import { products } from '@/data/products';
import { useCartStore } from '@/store/cartStore';

const newArrivalGradients = [
  'linear-gradient(135deg, #f5f0e8 0%, #e0d5c0 40%, #c9a96e 100%)',
  'linear-gradient(135deg, #e8ede6 0%, #c5d0bc 40%, #7c9473 100%)',
  'linear-gradient(135deg, #f0ebe4 0%, #ddd0c0 40%, #b09070 100%)',
  'linear-gradient(135deg, #eae8e5 0%, #d8d0c5 40%, #a89880 100%)',
  'linear-gradient(135deg, #e6ebe8 0%, #d0d8d0 40%, #8ca888 100%)',
  'linear-gradient(135deg, #f2eee6 0%, #e0d5c5 40%, #c0a878 100%)',
  'linear-gradient(135deg, #ece8e2 0%, #d0c5b0 40%, #a89070 100%)',
  'linear-gradient(135deg, #e8ece6 0%, #c8d5c0 40%, #90a888 100%)',
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function NewArrivals() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const addItem = useCartStore((s) => s.addItem);

  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 6);

  return (
    <section ref={ref} className="py-16 md:py-24 bg-soft-white">
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
              New Arrivals
            </h2>
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="px-3 py-1 bg-gold text-charcoal text-xs font-bold rounded-full"
            >
              JUST IN
            </motion.span>
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-gold-dark via-gold to-gold-light mx-auto rounded-full" />
        </motion.div>

        {/* Asymmetric Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-5"
        >
          {/* First Row: 1 large + 2 medium */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {newArrivals.slice(0, 1).map((product, i) => (
              <motion.div
                key={product.id}
                variants={cardVariants}
                className="md:col-span-2 lg:col-span-1 lg:row-span-2"
              >
                <ProductCard
                  product={product}
                  gradient={newArrivalGradients[i]}
                  large
                  onAddToCart={() =>
                    addItem({ id: product.id, name: product.name, price: product.price })
                  }
                />
              </motion.div>
            ))}
            {newArrivals.slice(1, 3).map((product, i) => (
              <motion.div key={product.id} variants={cardVariants}>
                <ProductCard
                  product={product}
                  gradient={newArrivalGradients[i + 1]}
                  onAddToCart={() =>
                    addItem({ id: product.id, name: product.name, price: product.price })
                  }
                />
              </motion.div>
            ))}
          </div>

          {/* Second Row: 3 equal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {newArrivals.slice(3, 6).map((product, i) => (
              <motion.div key={product.id} variants={cardVariants}>
                <ProductCard
                  product={product}
                  gradient={newArrivalGradients[i + 3]}
                  onAddToCart={() =>
                    addItem({ id: product.id, name: product.name, price: product.price })
                  }
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  gradient,
  large = false,
  onAddToCart,
}: {
  product: (typeof products)[number];
  gradient: string;
  large?: boolean;
  onAddToCart: () => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`relative rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300 ${
        large ? 'h-[400px] md:h-full min-h-[400px]' : 'h-72 md:h-80'
      }`}
      style={{ background: gradient }}
    >
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'radial-gradient(circle, #1a1a2e 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Furniture icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className={`text-charcoal/[0.05] group-hover:scale-110 transition-transform duration-500 ${
            large ? 'w-32 h-32' : 'w-20 h-20'
          }`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20 8V6c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v2c-1.1 0-2 .9-2 2v6h2v2h2v-2h12v2h2v-2h2v-6c0-1.1-.9-2-2-2zM6 6h12v2H6V6zm14 10H4v-4c0-.55.45-1 1-1h1v3h12v-3h1c.55 0 1 .45 1 1v4z" />
        </svg>
      </div>

      {/* NEW Badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className="px-3 py-1 bg-charcoal text-cream text-xs font-bold rounded-full shadow-lg tracking-wide">
          NEW
        </span>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/60 transition-all duration-500" />

      {/* Quick View button (appears on hover) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
      >
        <button className="px-6 py-3 bg-gold text-charcoal font-semibold rounded-full flex items-center gap-2 hover:bg-gold-light transition-colors cursor-pointer">
          <Eye className="w-4 h-4" />
          Quick View
        </button>
      </motion.div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-transparent z-10">
        <div className="flex items-center gap-1 mb-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < Math.floor(product.rating)
                  ? 'text-gold fill-gold'
                  : 'text-gray-400'
              }`}
            />
          ))}
        </div>
        <h3 className="font-heading text-lg md:text-xl font-semibold text-cream mb-1">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-cream">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-cream/50 line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            className="w-9 h-9 rounded-full bg-gold text-charcoal flex items-center justify-center hover:bg-gold-light transition-colors cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
