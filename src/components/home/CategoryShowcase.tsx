'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { ArrowRight, Sofa, Bed, UtensilsCrossed, Briefcase, TreePine, Lamp } from 'lucide-react';
import Link from 'next/link';
import { categories } from '@/data/categories';

const categoryGradients = [
  'linear-gradient(135deg, #5c3d2e 0%, #8B6914 50%, #c9a96e 100%)',
  'linear-gradient(135deg, #1a1a2e 0%, #2d2d4e 50%, #7c9473 100%)',
  'linear-gradient(135deg, #8B6914 0%, #5c3d2e 50%, #1a1a2e 100%)',
  'linear-gradient(135deg, #2d2d4e 0%, #1a1a2e 50%, #5c3d2e 100%)',
  'linear-gradient(135deg, #7c9473 0%, #5c8a65 50%, #3d5c35 100%)',
  'linear-gradient(135deg, #c9a96e 0%, #b08d4f 50%, #5c3d2e 100%)',
];

const categoryIcons = [Sofa, Bed, UtensilsCrossed, Briefcase, TreePine, Lamp];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function CategoryShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-16 md:py-24 bg-soft-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-4">
            Shop by Category
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold-dark via-gold to-gold-light mx-auto rounded-full" />
          <p className="mt-4 text-charcoal/60 text-lg max-w-2xl mx-auto">
            Explore our curated collections designed to transform every room in your home.
          </p>
        </motion.div>

        {/* Category Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {categories.map((category, index) => {
            const Icon = categoryIcons[index] || Sofa;
            return (
              <motion.div key={category.id} variants={cardVariants}>
                <Link href={`/categories/${category.slug}`}>
                  <motion.div
                    whileHover={{ scale: 1.03, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative h-64 md:h-72 rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition-shadow duration-300"
                    style={{ background: categoryGradients[index] }}
                  >
                    {/* Pattern overlay */}
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage:
                          'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                      }}
                    />

                    {/* Hover brighten overlay */}
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-500" />

                    {/* Content */}
                    <div className="relative h-full flex flex-col items-center justify-center p-6 text-center z-10">
                      <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-7 h-7 text-cream" />
                      </div>
                      <h3 className="font-heading text-2xl md:text-3xl font-bold text-cream mb-2">
                        {category.name}
                      </h3>
                      <p className="text-cream/70 text-sm mb-3 max-w-[200px]">
                        {category.description.substring(0, 60)}...
                      </p>
                      <span className="text-gold text-sm font-medium">
                        {category.productCount} Products
                      </span>

                      {/* Hover arrow */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-gold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <ArrowRight className="w-4 h-4 text-charcoal" />
                      </motion.div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
