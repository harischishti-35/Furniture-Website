'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { categories } from '@/data/categories';

export default function CategoriesPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any } },
  };

  return (
    <div className="py-16 md:py-24 bg-soft-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <nav className="text-xs text-charcoal/40 uppercase tracking-widest font-body">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-charcoal/70">Categories</span>
          </nav>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-charcoal leading-tight">
            Shop by Category
          </h1>
          <div className="w-16 h-0.5 bg-gold mx-auto my-4" />
          <p className="text-sm text-charcoal/60 leading-relaxed font-body">
            Explore our curated collections designed to bring exquisite design, warmth, and luxury to every corner of your home.
          </p>
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category) => {
            // Dynamically resolve icon component
            const IconComponent = (Icons as any)[category.icon || 'Layout'] || Icons.Layout;

            return (
              <motion.div key={category.id} variants={itemVariants}>
                <Link
                  href={`/categories/${category.slug}`}
                  className="group relative flex flex-col h-[320px] rounded-3xl overflow-hidden border border-cream/20 bg-soft-white shadow-sm hover:shadow-xl transition-all duration-500 block"
                >
                  {/* Decorative Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-tr ${category.gradient || 'from-charcoal to-zinc-950'} opacity-90 group-hover:opacity-95 transition-opacity duration-500`} />
                  
                  {/* Grid pattern overlay */}
                  <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle,#fff_1px,transparent_1px)] bg-[size:20px_20px]" />

                  {/* Category Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 text-cream">
                    {/* Top Section: Icon & Product Count */}
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 rounded-2xl bg-cream/10 backdrop-blur-md flex items-center justify-center border border-cream/20 text-gold group-hover:scale-110 transition-transform duration-500">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-semibold bg-cream/15 backdrop-blur-md px-3.5 py-1.5 rounded-full tracking-wide">
                        {category.productCount} Products
                      </span>
                    </div>

                    {/* Bottom Section: Name, Desc & CTA */}
                    <div className="space-y-3">
                      <h2 className="font-heading text-2xl font-bold group-hover:text-gold transition-colors duration-300">
                        {category.name}
                      </h2>
                      <p className="text-xs text-cream/70 line-clamp-2 leading-relaxed font-body">
                        {category.description}
                      </p>
                      
                      <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-gold group-hover:translate-x-1.5 transition-transform duration-300 font-body">
                        <span>Browse Collection</span>
                        <Icons.ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
