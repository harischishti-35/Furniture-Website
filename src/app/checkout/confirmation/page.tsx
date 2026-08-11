'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Calendar } from 'lucide-react';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'CFM-UNKNOWN';
  const total = searchParams.get('total') || '0';

  return (
    <div className="py-20 md:py-32 bg-soft-white min-h-screen flex items-center">
      <div className="max-w-md mx-auto px-4 text-center">
        
        {/* Animated Checkmark */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 150 }}
          className="w-20 h-20 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner"
        >
          <CheckCircle2 className="w-10 h-10 stroke-[1.5]" />
        </motion.div>

        {/* Text Details */}
        <div className="space-y-3 mb-8">
          <span className="text-gold uppercase tracking-[0.2em] text-xs font-semibold block">
            Order Confirmed
          </span>
          <h1 className="font-heading text-3xl font-bold text-charcoal">
            Thank You for Your Order!
          </h1>
          <p className="text-sm text-charcoal/60 leading-relaxed font-body">
            We have received your order and are preparing it for delivery. A confirmation email has been sent to your registered address.
          </p>
        </div>

        {/* Order Info Card */}
        <div className="bg-cream/15 border border-cream/25 rounded-2xl p-6 mb-8 text-left space-y-4 shadow-sm font-body">
          <div className="flex justify-between text-sm">
            <span className="text-charcoal/50">Order Number:</span>
            <span className="font-bold text-charcoal">{orderId}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-charcoal/50">Total Paid:</span>
            <span className="font-bold text-charcoal">${parseFloat(total).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm border-t border-cream/15 pt-3">
            <span className="text-charcoal/50 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gold" />
              Est. Delivery:
            </span>
            <span className="font-semibold text-charcoal">7-10 Business Days</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="space-y-3">
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gold hover:bg-gold-light text-charcoal font-semibold rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-gold/15 cursor-pointer"
            >
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
          <Link href="/account">
            <button className="w-full py-4 border border-cream hover:bg-cream/10 text-charcoal font-medium rounded-xl text-sm transition-colors cursor-pointer">
              Go to User Dashboard
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 md:py-32 bg-soft-white min-h-screen flex items-center justify-center">
          <p className="text-lg font-heading text-charcoal/50 animate-pulse">Loading Order Receipt...</p>
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
