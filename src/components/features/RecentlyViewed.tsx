'use client';

import { useUserStore } from '@/store/userStore';
import ProductCard from '@/components/products/ProductCard';

export default function RecentlyViewed() {
  const recentlyViewed = useUserStore((s) => s.recentlyViewed);

  if (!recentlyViewed || recentlyViewed.length === 0) {
    return null;
  }

  return (
    <div className="py-12 border-t border-cream/20 bg-cream/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-left space-y-2">
          <span className="text-[10px] text-gold uppercase tracking-[0.2em] font-semibold">
            Your Browse History
          </span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal">
            Recently Viewed Pieces
          </h2>
          <div className="w-12 h-0.5 bg-gold" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {recentlyViewed.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
