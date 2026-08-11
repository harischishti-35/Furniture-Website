'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence, Variants } from 'framer-motion';
import { Eye, X } from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  size: string; // 'large', 'tall', 'wide', 'standard'
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: 'Mid-Century Modern Sanctuary',
    category: 'Living Room',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1000&q=80',
    size: 'large',
  },
  {
    id: 2,
    title: 'Minimalist Walnut Haven',
    category: 'Bedroom',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80',
    size: 'tall',
  },
  {
    id: 3,
    title: 'Contemporary Nordic Banquet',
    category: 'Dining Room',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
    size: 'standard',
  },
  {
    id: 4,
    title: 'Biophilic Creative Studio',
    category: 'Office',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800&q=80',
    size: 'standard',
  },
  {
    id: 5,
    title: 'Monochromatic Culinary Space',
    category: 'Kitchen',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1000&q=80',
    size: 'wide',
  },
  {
    id: 6,
    title: 'Solitude Patio Lounge',
    category: 'Outdoor',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
    size: 'standard',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function InspirationGallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  return (
    <section ref={ref} className="py-20 md:py-28 bg-cream/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[0.2em] text-xs font-semibold block mb-3">
            Get Inspired
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-4">
            Interior Inspiration Gallery
          </h2>
          <p className="mt-4 text-charcoal/60 text-base max-w-xl mx-auto font-body">
            See how designers bring warmth, character, and luxury into daily living spaces using Chishti pieces.
          </p>
          <div className="w-16 h-0.5 bg-gold mx-auto mt-6" />
        </div>

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px] md:auto-rows-[280px]"
        >
          {galleryItems.map((item) => {
            let colSpan = 'md:col-span-1';
            let rowSpan = 'row-span-1';

            if (item.size === 'large') {
              colSpan = 'md:col-span-2';
              rowSpan = 'row-span-2';
            } else if (item.size === 'tall') {
              rowSpan = 'row-span-2';
            } else if (item.size === 'wide') {
              colSpan = 'md:col-span-2';
            }

            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className={`${colSpan} ${rowSpan} relative rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300`}
                onClick={() => setActiveImage(item)}
              >
                {/* Background Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-soft-white/20 backdrop-blur-md flex items-center justify-center text-soft-white transform scale-90 group-hover:scale-100 transition-all duration-300 hover:bg-gold hover:text-charcoal">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>

                {/* Info Text Overlay (Bottom) */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent text-soft-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-semibold">
                    {item.category}
                  </span>
                  <h3 className="font-heading text-base md:text-lg font-bold mt-1">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 p-4 md:p-10 backdrop-blur-sm"
            onClick={() => setActiveImage(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 md:top-8 md:right-8 text-soft-white/60 hover:text-soft-white p-2 rounded-full bg-soft-white/10 hover:bg-soft-white/20 transition-colors"
              onClick={() => setActiveImage(null)}
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Lightbox Content */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative max-w-5xl max-h-[85vh] overflow-hidden rounded-2xl bg-charcoal flex flex-col md:flex-row shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
            >
              <div className="flex-1 overflow-hidden flex items-center justify-center bg-black/40">
                <img
                  src={activeImage.image}
                  alt={activeImage.title}
                  className="max-h-[60vh] md:max-h-[85vh] w-auto max-w-full object-contain"
                />
              </div>

              {/* Text Sidebar in Lightbox */}
              <div className="w-full md:w-80 bg-charcoal p-6 md:p-8 flex flex-col justify-center text-soft-white space-y-4 border-t md:border-t-0 md:border-l border-cream/15">
                <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">
                  {activeImage.category}
                </span>
                <h3 className="font-heading text-xl md:text-2xl font-bold leading-tight">
                  {activeImage.title}
                </h3>
                <p className="text-sm text-soft-white/60 leading-relaxed font-body">
                  A custom-tailored environment demonstrating the use of modern wood craft, delicate metallic styling, and luxury fabrics to complete a premium home aesthetic.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setActiveImage(null)}
                    className="w-full py-3 bg-gold hover:bg-gold-light text-charcoal font-semibold rounded-xl text-sm transition-colors duration-300"
                  >
                    Close Inspiration
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
