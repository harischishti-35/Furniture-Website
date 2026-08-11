'use client';

import { useState, useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
  },
};

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    // Simulate API request
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <section ref={ref} className="py-20 md:py-28 bg-charcoal text-soft-white relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gold/5 blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-brown/10 blur-[100px] pointer-events-none -translate-x-1/4 translate-y-1/4" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center space-y-8"
        >
          <div className="space-y-4">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-semibold block">
              Join Our Club
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Experience the Art of Living
            </h2>
            <p className="text-cream/60 max-w-lg mx-auto text-sm md:text-base leading-relaxed font-body">
              Subscribe to receive styling inspiration, exclusive early access to luxury collections, and seasonal offers.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            {status === 'success' ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-cream/10 border border-gold/30 rounded-2xl p-6 flex flex-col items-center gap-3"
              >
                <CheckCircle2 className="w-10 h-10 text-gold" />
                <h4 className="font-heading text-lg font-semibold text-gold">Welcome to the Inner Circle</h4>
                <p className="text-xs text-cream/70">
                  You have successfully subscribed. Please check your inbox for your 10% welcome discount.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  required
                  disabled={status === 'loading'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow px-5 py-4 bg-soft-white/5 border border-cream/20 rounded-xl text-soft-white placeholder:text-cream/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors text-sm font-body disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status === 'loading' || !email}
                  className="px-8 py-4 bg-gold hover:bg-gold-light text-charcoal font-semibold rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-gold/10 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {status === 'loading' ? (
                    <div className="w-5 h-5 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
                  ) : (
                    <>
                      Subscribe
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
            <p className="text-[10px] text-cream/35 mt-4">
              By subscribing, you agree to our Terms of Service & Privacy Policy. Unsubscribe at any time.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
