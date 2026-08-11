'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Package, Star, Globe } from 'lucide-react';

interface Stat {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}

const stats: Stat[] = [
  { icon: Users, value: 10000, suffix: '+', label: 'Happy Customers' },
  { icon: Package, value: 5000, suffix: '+', label: 'Products' },
  { icon: Star, value: 4.8, suffix: '★', label: 'Average Rating', decimals: 1 },
  { icon: Globe, value: 50, suffix: '+', label: 'Countries' },
];

function AnimatedCounter({
  value,
  suffix,
  decimals = 0,
  inView,
}: {
  value: number;
  suffix: string;
  decimals?: number;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const end = value;
    const duration = 2000;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      start = eased * end;
      setCount(start);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [inView, value]);

  const display = decimals > 0
    ? count.toFixed(decimals)
    : Math.floor(count).toLocaleString();

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section
      ref={ref}
      className="relative bg-charcoal py-12 md:py-16 border-y border-gold/20"
    >
      {/* Subtle gold shimmer line top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gold/10 flex items-center justify-center mb-3 group-hover:bg-gold/20 transition-colors duration-300">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-gold" />
                </div>
                <div className="text-3xl md:text-4xl font-heading font-bold text-cream mb-1">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                    inView={inView}
                  />
                </div>
                <div className="text-sm md:text-base text-cream/60 font-light">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Subtle gold shimmer line bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
    </section>
  );
}
