'use client';

import { motion, Variants } from 'framer-motion';
import { ChevronDown, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const floatingVariants: Variants = {
  animate: {
    y: [-10, 10, -10],
    rotate: [0, 3, -3, 0],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
  },
};

const floatingVariants2: Variants = {
  animate: {
    y: [10, -10, 10],
    rotate: [0, -2, 2, 0],
    transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
  },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-banner.png')" }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal/90 via-charcoal/75 to-brown/80" />

      {/* Subtle animated pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 25% 25%, #c9a96e 1px, transparent 1px), radial-gradient(circle at 75% 75%, #c9a96e 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating decorative shapes */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-[15%] right-[10%] w-32 h-32 md:w-48 md:h-48 rounded-full border border-gold/20 hidden md:block"
      />
      <motion.div
        variants={floatingVariants2}
        animate="animate"
        className="absolute bottom-[25%] left-[5%] w-24 h-24 md:w-36 md:h-36 border border-gold/10 rotate-45 hidden md:block"
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-[40%] right-[25%] w-4 h-4 bg-gold/30 rounded-full hidden lg:block"
      />
      <motion.div
        variants={floatingVariants2}
        animate="animate"
        className="absolute bottom-[35%] right-[15%] w-3 h-3 bg-gold/20 rounded-full hidden lg:block"
      />

      {/* New Season Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute top-6 right-6 md:top-10 md:right-10 z-20"
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-gold/40 flex items-center justify-center"
        >
          <span className="text-gold text-[10px] md:text-xs font-semibold text-center leading-tight absolute">
            New Season
            <br />
            Collection
          </span>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
      >
        {/* Label */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-block px-5 py-2 text-xs md:text-sm font-semibold tracking-[0.25em] text-gold border border-gold/40 rounded-full backdrop-blur-sm bg-gold/5 uppercase">
            Premium Furniture Collection 2026
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-cream leading-[1.1] mb-6"
        >
          Elevate Your{' '}
          <span className="text-gold relative">
            Living Space
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent origin-left"
            />
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl text-cream/70 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          Discover handcrafted furniture pieces that blend timeless elegance with
          modern comfort. Transform your home into a masterpiece.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(201,169,110,0.4)' }}
              whileTap={{ scale: 0.97 }}
              className="group px-8 py-4 bg-gold text-charcoal font-semibold text-sm md:text-base rounded-full flex items-center gap-3 transition-all duration-300 hover:bg-gold-light cursor-pointer"
            >
              Explore Collection
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </Link>
          <Link href="/categories">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(201,169,110,0.15)' }}
              whileTap={{ scale: 0.97 }}
              className="group px-8 py-4 border-2 border-cream/40 text-cream font-semibold text-sm md:text-base rounded-full flex items-center gap-3 transition-all duration-300 hover:border-gold cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              View Lookbook
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-cream/50 text-xs tracking-[0.2em] uppercase">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-gold/70" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-soft-white to-transparent" />
    </section>
  );
}
