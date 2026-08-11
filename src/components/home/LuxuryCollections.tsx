'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Gem, Shield, Award } from 'lucide-react';
import Link from 'next/link';

export default function LuxuryCollections() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yDeco = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-32 overflow-hidden bg-charcoal"
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(30deg, #c9a96e 12%, transparent 12.5%, transparent 87%, #c9a96e 87.5%, #c9a96e), linear-gradient(150deg, #c9a96e 12%, transparent 12.5%, transparent 87%, #c9a96e 87.5%, #c9a96e)',
          backgroundSize: '80px 140px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text Content */}
          <motion.div
            style={{ y: yText }}
            className="relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-gold border border-gold/30 rounded-full mb-6 uppercase">
                Exclusive
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6 leading-tight"
            >
              The{' '}
              <span className="text-gold">Luxury</span>
              <br />
              Collection
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-cream/60 text-lg md:text-xl leading-relaxed mb-8 max-w-lg"
            >
              Indulge in our most exquisite pieces, where master craftsmanship
              meets the finest materials. Each item is a testament to the art of
              furniture making — designed for those who accept nothing less than
              perfection.
            </motion.p>

            {/* Feature list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="space-y-4 mb-10"
            >
              {[
                { icon: Gem, text: 'Premium Italian & European materials' },
                { icon: Shield, text: 'Lifetime structural warranty' },
                { icon: Award, text: 'Award-winning designs' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-gold" />
                  </div>
                  <span className="text-cream/70 text-sm md:text-base">{text}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <Link href="/products?collection=luxury">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(201,169,110,0.3)' }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 bg-gold text-charcoal font-semibold rounded-full flex items-center gap-3 hover:bg-gold-light transition-colors cursor-pointer group"
                >
                  Discover Luxury
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Decorative Visual */}
          <motion.div
            style={{ y: yDeco }}
            className="relative hidden lg:block"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Main decorative gradient block */}
              <div
                className="w-full h-[500px] rounded-3xl overflow-hidden relative"
                style={{
                  background:
                    'linear-gradient(135deg, #5c3d2e 0%, #1a1a2e 40%, #c9a96e 100%)',
                }}
              >
                {/* Gold corner accents */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-gold/50 rounded-tl-3xl" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-gold/50 rounded-br-3xl" />

                {/* Center furniture icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-40 h-40 text-gold/10"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 8V6c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v2c-1.1 0-2 .9-2 2v6h2v2h2v-2h12v2h2v-2h2v-6c0-1.1-.9-2-2-2zM6 6h12v2H6V6zm14 10H4v-4c0-.55.45-1 1-1h1v3h12v-3h1c.55 0 1 .45 1 1v4z" />
                  </svg>
                </div>

                {/* Geometric shapes */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                  className="absolute top-10 right-10 w-24 h-24 border border-gold/20 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="absolute bottom-16 left-10 w-16 h-16 border border-gold/15 rotate-45"
                />
                <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-gold/30 rounded-full" />
                <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-gold/40 rounded-full" />
              </div>

              {/* Floating gold accent card */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -left-6 bg-gold/90 rounded-2xl p-5 shadow-2xl"
              >
                <p className="font-heading text-charcoal text-2xl font-bold">200+</p>
                <p className="text-charcoal/70 text-sm">Luxury Pieces</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Gold line decorations */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  );
}
