'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { Award, Compass, Eye, ShieldCheck } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
  },
};

export default function BrandStory() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const values = [
    {
      icon: Award,
      title: 'Uncompromised Quality',
      desc: 'We source only premium grade hardwoods, top-grain leathers, and high-resiliency foams to ensure every piece lasts for generations.',
    },
    {
      icon: Compass,
      title: 'Artisan Design',
      desc: 'Our designs merge modern ergonomics with mid-century and contemporary styles, creating visually stunning yet functional furniture.',
    },
    {
      icon: Eye,
      title: 'Sustainable Sourcing',
      desc: 'We partner with FSC-certified forestry groups and eco-friendly suppliers to preserve our forests and use non-toxic, natural finishes.',
    },
    {
      icon: ShieldCheck,
      title: 'Lifetime Guarantee',
      desc: 'We stand behind our frames and joinery with a lifetime warranty. We believe in furniture that survives life and changes with you.',
    },
  ];

  return (
    <section ref={ref} className="py-20 md:py-28 bg-soft-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left column: Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="lg:col-span-6 space-y-6"
          >
            <span className="text-gold uppercase tracking-[0.2em] text-xs font-semibold block">
              Our Story
            </span>
            <motion.h2
              variants={itemVariants}
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal leading-tight"
            >
              Crafting Heritage, Designing Comfort
            </motion.h2>
            <motion.div variants={itemVariants} className="w-16 h-0.5 bg-gold" />
            
            <motion.p
              variants={itemVariants}
              className="text-charcoal/70 text-base md:text-lg leading-relaxed"
            >
              Founded in 2012, Chishti Furniture Mart was born out of a simple frustration: the compromise between durability and affordability. We believed that everyone deserves to experience the warmth of genuine wood, the detail of hand-stitched leather, and the beauty of heirloom-quality furniture.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-charcoal/70 text-base leading-relaxed"
            >
              Each Chishti piece is crafted by skilled artisans who combine centuries-old joinery techniques with modern precision machinery. We design for homes that are lived in, creating spaces that feel refined, comfortable, and uniquely yours.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-6 pt-4 border-t border-cream"
            >
              <div>
                <h4 className="font-heading text-2xl md:text-3xl font-bold text-gold">14+</h4>
                <p className="text-xs text-charcoal/50 uppercase tracking-wider font-semibold">Years of Excellence</p>
              </div>
              <div>
                <h4 className="font-heading text-2xl md:text-3xl font-bold text-gold">100%</h4>
                <p className="text-xs text-charcoal/50 uppercase tracking-wider font-semibold">Artisan Handcrafted</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column: Values Grid */}
          <div className="lg:col-span-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {values.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="p-6 md:p-8 bg-cream/20 hover:bg-cream/40 rounded-2xl border border-cream/35 transition-colors duration-300 group"
                  >
                    <div className="w-12 h-12 bg-charcoal text-gold rounded-xl flex items-center justify-center mb-5 group-hover:bg-gold group-hover:text-charcoal transition-colors duration-300">
                      <Icon className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-charcoal mb-2">
                      {val.title}
                    </h3>
                    <p className="text-sm text-charcoal/60 leading-relaxed">
                      {val.desc}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
