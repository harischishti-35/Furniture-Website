'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const cartCount = items?.length ?? 0;
  const subtotal = getTotalPrice();
  const shipping = subtotal > 500 ? 0 : 49.99;
  const total = subtotal + shipping;

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Cart Drawer */}
          <motion.aside
            ref={sidebarRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-[90] w-full sm:w-[420px] max-w-full flex flex-col shadow-2xl"
            style={{ backgroundColor: 'var(--bg-primary)' }}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 border-b"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-gold" />
                <h2
                  className="text-lg font-heading font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Shopping Bag
                </h2>
                <span
                  className="text-sm"
                  style={{ color: 'var(--text-muted, var(--text-secondary))' }}
                >
                  ({cartCount} {cartCount === 1 ? 'item' : 'items'})
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 -mr-2 rounded-full hover:bg-gold/10 transition-colors"
                aria-label="Close cart"
                style={{ color: 'var(--text-primary)' }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            {cartCount > 0 ? (
              <>
                <div className="flex-1 overflow-y-auto py-4 px-5 space-y-4">
                  {items.map((item: any) => (
                    <motion.div
                      key={item.id ?? item.productId ?? Math.random()}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-4 p-3 rounded-xl border transition-colors"
                      style={{
                        borderColor: 'var(--border)',
                        backgroundColor: 'var(--card-bg)',
                      }}
                    >
                      {/* Product Image Placeholder */}
                      <div
                        className="w-20 h-20 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden"
                        style={{ backgroundColor: 'var(--bg-secondary)' }}
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name ?? 'Product'}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center">
                            <Tag className="w-6 h-6 text-gold/40" />
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3
                          className="text-sm font-medium truncate"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {item.name ?? 'Product'}
                        </h3>
                        {(item.color || item.size) && (
                          <p
                            className="text-xs mt-0.5"
                            style={{ color: 'var(--text-muted, var(--text-secondary))' }}
                          >
                            {[item.color, item.size].filter(Boolean).join(' / ')}
                          </p>
                        )}
                        <p className="text-sm font-semibold text-gold mt-1">
                          ${(item.price ?? 0).toLocaleString()}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-0 border rounded-lg overflow-hidden" style={{ borderColor: 'var(--border)' }}>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id ?? item.productId,
                                  Math.max(1, (item.quantity ?? 1) - 1)
                                )
                              }
                              className="p-1.5 hover:bg-gold/10 transition-colors"
                              aria-label="Decrease quantity"
                              style={{ color: 'var(--text-secondary)' }}
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span
                              className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center"
                              style={{ color: 'var(--text-primary)' }}
                            >
                              {item.quantity ?? 1}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id ?? item.productId,
                                  (item.quantity ?? 1) + 1
                                )
                              }
                              className="p-1.5 hover:bg-gold/10 transition-colors"
                              aria-label="Increase quantity"
                              style={{ color: 'var(--text-secondary)' }}
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id ?? item.productId)}
                            className="p-1.5 text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Summary */}
                <div
                  className="border-t px-5 py-5 space-y-3"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <div className="flex justify-between text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span>Subtotal</span>
                    <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                      ${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span>Estimated Shipping</span>
                    <span className="font-medium" style={{ color: shipping === 0 ? 'var(--success, #7c9473)' : 'var(--text-primary)' }}>
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-gold">
                      Add ${(500 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  )}
                  <div
                    className="flex justify-between text-base font-semibold pt-3 border-t"
                    style={{
                      borderColor: 'var(--border)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <span>Total</span>
                    <span>${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>

                  <div className="space-y-2 pt-2">
                    <Link
                      href="/checkout"
                      onClick={onClose}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gold hover:bg-gold-dark text-charcoal font-semibold rounded-lg transition-colors group"
                    >
                      Checkout
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                      href="/cart"
                      onClick={onClose}
                      className="w-full flex items-center justify-center px-6 py-3 border rounded-lg font-medium transition-colors hover:border-gold hover:text-gold"
                      style={{
                        borderColor: 'var(--border)',
                        color: 'var(--text-primary)',
                      }}
                    >
                      View Cart
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              /* Empty State */
              <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: 'var(--bg-secondary)' }}
                >
                  <ShoppingBag className="w-10 h-10 text-gold/40" />
                </div>
                <h3
                  className="text-lg font-heading font-semibold mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Your bag is empty
                </h3>
                <p
                  className="text-sm mb-6 max-w-xs"
                  style={{ color: 'var(--text-muted, var(--text-secondary))' }}
                >
                  Looks like you haven't added any items to your shopping bag yet. Start browsing
                  our collections!
                </p>
                <Link
                  href="/category/living-room"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gold hover:bg-gold-dark text-charcoal font-semibold rounded-lg transition-colors group"
                >
                  Start Shopping
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
