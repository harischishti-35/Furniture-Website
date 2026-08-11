'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Tag, Heart, Info } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { products } from '@/data/products';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const cartCount = items?.length ?? 0;
  const subtotal = getTotalPrice();
  
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'WELCOME10') {
      setDiscount(subtotal * 0.1); // 10% off
      setCouponSuccess('WELCOME10 coupon applied! 10% discount subtracted.');
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try WELCOME10.');
      setCouponSuccess('');
      setDiscount(0);
    }
  };

  const shipping = subtotal > 500 || subtotal === 0 ? 0 : 49.99;
  const tax = subtotal * 0.08;
  const total = subtotal - discount + shipping + tax;

  const handleMoveToWishlist = (item: any) => {
    // Find the full product object from products mock data
    const productObj = products.find((p) => p.id === item.id);
    if (productObj) {
      if (!isInWishlist(productObj.id)) {
        toggleItem(productObj);
      }
      removeItem(item.id);
    }
  };

  return (
    <div className="py-12 md:py-20 bg-soft-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-10">
          <nav className="text-xs text-charcoal/40 uppercase tracking-wider mb-2 font-body">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link> / <span className="text-charcoal/70">Cart</span>
          </nav>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-charcoal flex items-center gap-3">
            Shopping Bag
            <span className="text-sm font-normal text-charcoal/40 font-body">({cartCount} items)</span>
          </h1>
        </div>

        {cartCount > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left: Items list (span 8) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-4">
                {items.map((item) => {
                  const isFav = isInWishlist(item.id);
                  return (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row gap-5 p-5 bg-soft-white border border-cream/20 rounded-2xl shadow-sm"
                    >
                      {/* Image Area */}
                      <div className="w-full sm:w-28 aspect-square bg-cream/15 rounded-xl flex-shrink-0 overflow-hidden flex items-center justify-center relative">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <svg className="w-10 h-10 text-charcoal/[0.04]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 8V6c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v2c-1.1 0-2 .9-2 2v6h2v2h2v-2h12v2h2v-2h2v-6c0-1.1-.9-2-2-2zM6 6h12v2H6V6zm14 10H4v-4c0-.55.45-1 1-1h1v3h12v-3h1c.55 0 1 .45 1 1v4z" />
                          </svg>
                        )}
                      </div>

                      {/* Content Area */}
                      <div className="flex-grow flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-heading text-lg font-bold text-charcoal hover:text-gold transition-colors">
                              <Link href={`/products/${item.name.toLowerCase().replace(/\s+/g, '-')}`}>
                                {item.name}
                              </Link>
                            </h3>
                            <p className="text-xs text-charcoal/40 font-body mt-0.5">SKU: CFM-{item.id.toUpperCase()}</p>
                          </div>
                          
                          <span className="font-heading text-lg font-bold text-charcoal">
                            ${(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>

                        {/* Controls (quantity, delete, save for later) */}
                        <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-cream/10">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center border border-cream/40 rounded-xl bg-cream/10 p-0.5">
                              <button
                                onClick={() => updateQuantity(item.id, Math.max(item.quantity - 1, 1))}
                                className="p-1.5 hover:text-gold transition-colors cursor-pointer"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-8 text-center font-bold text-xs text-charcoal font-body">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1.5 hover:text-gold transition-colors cursor-pointer"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-xs text-red-500 hover:text-red-700 hover:underline transition-all flex items-center gap-1 font-body cursor-pointer ml-2"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Remove
                            </button>
                          </div>

                          <button
                            onClick={() => handleMoveToWishlist(item)}
                            className="text-xs text-charcoal/50 hover:text-gold transition-all flex items-center gap-1 font-body cursor-pointer"
                          >
                            <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
                            {isFav ? 'Saved' : 'Save for Later'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Back to catalog link */}
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-gold hover:text-gold-dark font-medium transition-colors text-sm font-body mt-4"
              >
                Continue Shopping
              </Link>
            </div>

            {/* Right: Summary sidebar (span 4) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Order Summary Box */}
              <div className="bg-soft-white border border-cream/20 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
                <h3 className="font-heading text-xl font-bold text-charcoal">Order Summary</h3>
                
                <div className="space-y-3 font-body text-sm border-b border-cream/15 pb-4">
                  <div className="flex justify-between text-charcoal/70">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-gold font-semibold">
                      <span>Discount (10%)</span>
                      <span>-${discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-charcoal/70">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-charcoal/70">
                    <span>Estimated Tax (8%)</span>
                    <span>${tax.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline font-heading text-lg font-bold text-charcoal">
                  <span>Estimated Total</span>
                  <span className="text-xl">${total.toLocaleString()}</span>
                </div>

                {/* Checkout CTA */}
                <Link href="/checkout">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gold hover:bg-gold-light text-charcoal font-semibold rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-gold/15 cursor-pointer mt-4"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>

                {/* Free Shipping Alert banner */}
                {shipping > 0 && (
                  <div className="flex gap-2 p-3 bg-gold/5 border border-gold/10 rounded-xl text-xs text-charcoal/75 leading-relaxed font-body">
                    <Info className="w-4 h-4 text-gold flex-shrink-0" />
                    <p>
                      Add <span className="font-bold text-gold">${(500 - subtotal).toLocaleString()}</span> more to your cart to qualify for <span className="font-bold">Free Shipping</span>!
                    </p>
                  </div>
                )}
              </div>

              {/* Coupon Box */}
              <div className="bg-soft-white border border-cream/20 rounded-2xl p-6 shadow-sm space-y-4">
                <h4 className="font-heading text-base font-bold text-charcoal flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gold" />
                  Apply Promo Code
                </h4>
                
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-grow px-4 py-2.5 bg-soft-white border border-cream/40 rounded-xl text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-gold font-body"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-charcoal hover:bg-gold hover:text-charcoal text-cream font-semibold rounded-xl text-xs transition-colors duration-300 cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
                {couponError && <p className="text-xs text-red-500 font-body">{couponError}</p>}
                {couponSuccess && <p className="text-xs text-gold font-semibold font-body">{couponSuccess}</p>}
                <p className="text-[10px] text-charcoal/40 font-body">
                  Tip: Use code <span className="font-bold text-gold">WELCOME10</span> to get 10% off your order.
                </p>
              </div>

            </div>

          </div>
        ) : (
          <div className="text-center py-20 bg-cream/5 border border-dashed border-cream/35 rounded-3xl max-w-lg mx-auto flex flex-col items-center">
            <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center text-gold mb-6 shadow-inner">
              <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-charcoal mb-3">Your Bag is Empty</h2>
            <p className="text-sm text-charcoal/60 leading-relaxed max-w-xs mb-8 font-body">
              Looks like you haven't added anything yet. Explore our premium collections to elevate your space.
            </p>
            <Link
              href="/products"
              className="px-8 py-3.5 bg-gold hover:bg-gold-light text-charcoal font-semibold rounded-xl text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-gold/15"
            >
              Start Exploring
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
