'use client';

import Link from 'next/link';
import { Heart, ShoppingBag, Trash2, Star } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);

  const handleMoveToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.url,
    });
    removeItem(product.id);
  };

  return (
    <div className="space-y-6 font-body">
      <div className="flex items-center justify-between border-b border-cream/15 pb-4">
        <h2 className="font-heading text-xl md:text-2xl font-bold text-charcoal">My Wishlist</h2>
        <span className="text-xs text-charcoal/50 font-medium">({items.length} items total)</span>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map(({ product }) => (
            <div
              key={product.id}
              className="bg-soft-white border border-cream/20 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group"
            >
              {/* Product Image Area */}
              <div className="relative aspect-square w-full bg-cream/10 flex items-center justify-center overflow-hidden">
                {product.images[0]?.url ? (
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-cream/20 to-gold/10 flex items-center justify-center text-charcoal/20">
                    No Image
                  </div>
                )}

                {/* SVG Fallback */}
                <svg
                  className="absolute w-16 h-16 text-charcoal/[0.03] pointer-events-none"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20 8V6c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v2c-1.1 0-2 .9-2 2v6h2v2h2v-2h12v2h2v-2h2v-6c0-1.1-.9-2-2-2zM6 6h12v2H6V6zm14 10H4v-4c0-.55.45-1 1-1h1v3h12v-3h1c.55 0 1 .45 1 1v4z" />
                </svg>

                {/* Delete button from Wishlist */}
                <button
                  onClick={() => removeItem(product.id)}
                  className="absolute top-3 right-3 p-2 bg-soft-white/80 hover:bg-red-500 hover:text-white rounded-full shadow transition-all duration-300 text-charcoal/60 cursor-pointer"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Info & Cart CTA */}
              <div className="p-5 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] text-charcoal/40 uppercase tracking-widest font-bold">
                    {product.category}
                  </span>
                  <h3 className="font-heading text-base font-bold text-charcoal group-hover:text-gold transition-colors line-clamp-1">
                    <Link href={`/products/${product.slug}`}>{product.name}</Link>
                  </h3>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-[10px] text-charcoal/40 font-body">({product.reviewCount})</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-cream/15 pt-4 mt-auto">
                  <span className="text-base font-bold text-charcoal font-body">
                    ${product.price.toLocaleString()}
                  </span>
                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="p-2 bg-gold hover:bg-gold-light text-charcoal rounded-xl transition-colors flex items-center justify-center cursor-pointer shadow-md hover:shadow-lg"
                    aria-label="Move to cart"
                  >
                    <ShoppingBag className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-cream/5 border border-dashed border-cream/35 rounded-2xl">
          <p className="text-charcoal/50 text-base font-heading font-medium mb-4">Your wishlist is empty.</p>
          <Link href="/products" className="px-6 py-2.5 bg-gold text-charcoal font-semibold rounded-xl text-sm transition-colors">
            Explore Collections
          </Link>
        </div>
      )}
    </div>
  );
}
