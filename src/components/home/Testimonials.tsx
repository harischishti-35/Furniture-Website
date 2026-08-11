'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '@/data/testimonials';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const slideNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const slidePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(slideNext, 6000);
    return () => clearInterval(timer);
  }, []);

  const activeTestimonial = testimonials[activeIndex];

  // Animation variants
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] },
    }),
  };

  return (
    <section className="py-20 md:py-28 bg-cream/35 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-sage/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[0.2em] text-xs font-semibold block mb-3">
            Customer Testimonials
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-4">
            Loved by Designers & Homeowners
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto" />
        </div>

        {/* Testimonial slider card */}
        <div className="relative bg-soft-white rounded-3xl p-8 md:p-16 shadow-xl border border-cream/40 min-h-[380px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[320px] flex flex-col justify-between">
          
          <div className="absolute top-8 left-8 text-gold/15">
            <Quote className="w-16 h-16 md:w-24 md:h-24 stroke-[1]" />
          </div>

          <div className="relative z-10 flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-6"
              >
                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < activeTestimonial.rating
                          ? 'fill-gold text-gold'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-charcoal/80 text-lg md:text-xl font-body leading-relaxed italic">
                  "{activeTestimonial.comment}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-cream/30">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gold/20 flex-shrink-0 bg-gold/10">
                    <img
                      src={activeTestimonial.avatar}
                      alt={activeTestimonial.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to initials if image fails
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="font-heading text-base font-semibold text-charcoal">
                      {activeTestimonial.name}
                    </h4>
                    <p className="text-xs text-charcoal/50">
                      {activeTestimonial.role} &bull; {activeTestimonial.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-end gap-3 mt-8 relative z-20">
            <button
              onClick={slidePrev}
              className="p-3 rounded-full border border-cream hover:bg-gold hover:text-charcoal hover:border-gold transition-colors duration-300 text-charcoal/60"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={slideNext}
              className="p-3 rounded-full border border-cream hover:bg-gold hover:text-charcoal hover:border-gold transition-colors duration-300 text-charcoal/60"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > activeIndex ? 1 : -1);
                setActiveIndex(index);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'w-8 bg-gold' : 'w-2 bg-gold/30'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
