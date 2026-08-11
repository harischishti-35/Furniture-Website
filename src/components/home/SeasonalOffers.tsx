'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, Tag, ArrowRight, Flame } from 'lucide-react';
import Link from 'next/link';

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

const deals = [
  {
    name: 'Velvet Lounge Chair',
    original: 1299,
    sale: 779,
    gradient: 'linear-gradient(135deg, #5c3d2e 0%, #c9a96e 100%)',
    discount: '40% OFF',
  },
  {
    name: 'Marble Coffee Table',
    original: 899,
    sale: 539,
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #7c9473 100%)',
    discount: '40% OFF',
  },
];

export default function SeasonalOffers() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  // 7 days from now
  const [saleEnd] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d;
  });
  const { days, hours, minutes, seconds } = useCountdown(saleEnd);

  const timerUnits = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ];

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-24 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #c9a96e 0%, #b08d4f 30%, #8b6914 60%, #5c3d2e 100%)',
      }}
    >
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Promo Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-5 h-5 text-charcoal" />
              <span className="text-charcoal font-semibold text-sm tracking-wide uppercase">
                Limited Time Offer
              </span>
            </div>

            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-4 leading-tight">
              Summer Sale
              <br />
              <span className="text-white">Up to 40% Off</span>
            </h2>

            <p className="text-charcoal/80 text-lg mb-8 max-w-lg">
              Transform your space with incredible savings on our most beloved
              pieces. Limited stock available — shop before the season ends.
            </p>

            {/* Countdown Timer */}
            <div className="flex gap-3 md:gap-4 mb-8">
              {timerUnits.map((unit) => (
                <div
                  key={unit.label}
                  className="flex flex-col items-center"
                >
                  <div className="relative w-16 h-16 md:w-20 md:h-20 bg-charcoal rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
                    <motion.span
                      key={unit.value}
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-2xl md:text-3xl font-bold text-cream font-heading"
                    >
                      {String(unit.value).padStart(2, '0')}
                    </motion.span>
                    {/* Flip line */}
                    <div className="absolute w-full h-px bg-cream/10 top-1/2" />
                  </div>
                  <span className="text-charcoal/70 text-xs mt-2 font-medium">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>

            <Link href="/products?sale=true">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-charcoal text-cream font-semibold rounded-full flex items-center gap-3 hover:bg-charcoal/90 transition-colors cursor-pointer group"
              >
                <Clock className="w-4 h-4" />
                Shop the Sale
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Right: Deal Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-5"
          >
            {deals.map((deal, index) => (
              <motion.div
                key={deal.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.15, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="relative rounded-2xl overflow-hidden shadow-xl cursor-pointer group"
              >
                <div
                  className="h-40 md:h-48 relative"
                  style={{ background: deal.gradient }}
                >
                  {/* Pattern */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                      backgroundSize: '16px 16px',
                    }}
                  />

                  {/* Furniture icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-24 h-24 text-white/[0.06] group-hover:scale-110 transition-transform duration-500"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20 8V6c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v2c-1.1 0-2 .9-2 2v6h2v2h2v-2h12v2h2v-2h2v-6c0-1.1-.9-2-2-2zM6 6h12v2H6V6zm14 10H4v-4c0-.55.45-1 1-1h1v3h12v-3h1c.55 0 1 .45 1 1v4z" />
                    </svg>
                  </div>

                  {/* Discount badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full shadow-md">
                    <Tag className="w-3 h-3" />
                    {deal.discount}
                  </div>

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 to-transparent">
                    <h3 className="font-heading text-xl font-semibold text-cream mb-1">
                      {deal.name}
                    </h3>
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl font-bold text-cream">
                        ${deal.sale}
                      </span>
                      <span className="text-base text-cream/50 line-through">
                        ${deal.original}
                      </span>
                      <span className="text-sm text-green-300 font-medium">
                        Save ${deal.original - deal.sale}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
