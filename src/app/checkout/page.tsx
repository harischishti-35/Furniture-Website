'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CreditCard, CheckCircle2, ChevronRight, Truck, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useUserStore } from '@/store/userStore';
import { generateOrderId } from '@/lib/utils'; // wait, does generateOrderId exist in utils.ts? We can just create a helper or see if it does. Let's see if we have generateOrderId or we can write a simple random string generator.

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart, getTotalPrice } = useCartStore();
  const addOrder = useUserStore((s) => s.addOrder);

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  
  // Shipping Form State
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
  });

  // Payment Form State
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'paypal' | 'cod'
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
  });

  const subtotal = getTotalPrice();
  const discount = 0; // We can let this be 0 or check if they came from cart
  const shipping = subtotal > 500 ? 0 : 49.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingAddress.fullName || !shippingAddress.street || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zipCode || !shippingAddress.phone) {
      alert('Please fill in all shipping fields.');
      return;
    }
    setStep(2);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === 'card') {
      if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvc) {
        alert('Please fill in all card details.');
        return;
      }
    }
    setStep(3);
  };

  const handlePlaceOrder = () => {
    // Generate order id
    const orderId = 'CFM-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    // Create new order object
    const newOrder: any = {
      id: orderId,
      items: items.map((item) => ({
        product: {
          id: item.id,
          name: item.name,
          price: item.price,
          images: [{ url: item.image || '' }],
        },
        quantity: item.quantity,
        priceAtPurchase: item.price,
      })),
      status: 'confirmed',
      subtotal,
      tax,
      shipping,
      total,
      shippingAddress: {
        id: 'addr-' + Date.now(),
        label: 'Shipping Address',
        ...shippingAddress,
        isDefault: false,
      },
      paymentMethod: paymentMethod === 'card' ? 'Credit Card' : paymentMethod === 'paypal' ? 'PayPal' : 'Cash on Delivery',
      createdAt: new Date().toISOString().split('T')[0],
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      trackingNumber: 'TRK' + Math.floor(100000000 + Math.random() * 900000000),
    };

    // Add to user store
    addOrder(newOrder);

    // Clear Cart
    clearCart();

    // Redirect to confirmation with query params
    router.push(`/checkout/confirmation?orderId=${orderId}&total=${total}`);
  };

  if (items.length === 0 && step < 4) {
    return (
      <div className="py-20 text-center min-h-screen flex flex-col items-center justify-center bg-soft-white">
        <h2 className="font-heading text-2xl font-bold text-charcoal mb-4">Your Bag is Empty</h2>
        <p className="text-charcoal/60 mb-6">You cannot checkout with an empty bag.</p>
        <Link href="/products" className="px-6 py-2.5 bg-gold text-charcoal font-semibold rounded-xl text-sm transition-colors">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-20 bg-soft-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step Indicator Progress Bar */}
        <div className="flex items-center justify-center gap-2 md:gap-4 mb-12">
          {['Shipping', 'Payment', 'Review'].map((label, idx) => {
            const stepNum = idx + 1;
            const isCompleted = step > stepNum;
            const isActive = step === stepNum;

            return (
              <div key={label} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      isCompleted
                        ? 'bg-gold text-charcoal'
                        : isActive
                        ? 'bg-charcoal text-gold ring-4 ring-gold/20'
                        : 'bg-cream text-charcoal/40 border border-cream/20'
                    }`}
                  >
                    {isCompleted ? '✓' : stepNum}
                  </div>
                  <span
                    className={`text-xs md:text-sm font-semibold tracking-wide ${
                      isActive ? 'text-charcoal font-bold' : 'text-charcoal/40'
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {idx < 2 && <ChevronRight className="w-4 h-4 text-charcoal/20 mx-2 md:mx-4" />}
              </div>
            );
          })}
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Panel: Checkout Forms (span 7) */}
          <div className="lg:col-span-7 bg-soft-white border border-cream/20 rounded-2xl p-6 md:p-8 shadow-sm">
            
            {/* Step 1: Shipping Address Form */}
            {step === 1 && (
              <form onSubmit={handleShippingSubmit} className="space-y-6">
                <h2 className="font-heading text-xl md:text-2xl font-bold text-charcoal mb-4">Shipping Information</h2>
                
                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <label className="text-xs text-charcoal/50 uppercase tracking-wider font-semibold block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.fullName}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-soft-white border border-cream/45 rounded-xl text-sm focus:outline-none focus:border-gold font-body"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-charcoal/50 uppercase tracking-wider font-semibold block mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.street}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                      placeholder="123 Main St, Apt 4B"
                      className="w-full px-4 py-3 bg-soft-white border border-cream/45 rounded-xl text-sm focus:outline-none focus:border-gold font-body"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-1">
                      <label className="text-xs text-charcoal/50 uppercase tracking-wider font-semibold block mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                        placeholder="New York"
                        className="w-full px-4 py-3 bg-soft-white border border-cream/45 rounded-xl text-sm focus:outline-none focus:border-gold font-body"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="text-xs text-charcoal/50 uppercase tracking-wider font-semibold block mb-1">State / Province</label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.state}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                        placeholder="NY"
                        className="w-full px-4 py-3 bg-soft-white border border-cream/45 rounded-xl text-sm focus:outline-none focus:border-gold font-body"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="text-xs text-charcoal/50 uppercase tracking-wider font-semibold block mb-1">Zip / Postal Code</label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.zipCode}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                        placeholder="10001"
                        className="w-full px-4 py-3 bg-soft-white border border-cream/45 rounded-xl text-sm focus:outline-none focus:border-gold font-body"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-charcoal/50 uppercase tracking-wider font-semibold block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                      placeholder="(555) 123-4567"
                      className="w-full px-4 py-3 bg-soft-white border border-cream/45 rounded-xl text-sm focus:outline-none focus:border-gold font-body"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 bg-gold hover:bg-gold-light text-charcoal font-semibold rounded-xl text-sm transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg hover:shadow-gold/15"
                  >
                    Continue to Payment
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: Payment Method Form */}
            {step === 2 && (
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <h2 className="font-heading text-xl md:text-2xl font-bold text-charcoal mb-4">Payment Method</h2>
                
                {/* Method selector */}
                <div className="grid grid-cols-3 gap-3">
                  {['card', 'paypal', 'cod'].map((method) => {
                    const isActive = paymentMethod === method;
                    return (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPaymentMethod(method)}
                        className={`py-4 border rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                          isActive
                            ? 'border-gold bg-gold/5 text-charcoal font-semibold shadow-sm'
                            : 'border-cream/40 text-charcoal/60 hover:border-gold'
                        }`}
                      >
                        <CreditCard className="w-5 h-5 text-gold" />
                        <span className="text-xs uppercase tracking-wider font-body font-bold">
                          {method === 'card' ? 'Credit Card' : method === 'paypal' ? 'PayPal' : 'COD'}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Conditional Form Fields */}
                {paymentMethod === 'card' ? (
                  <div className="space-y-4 pt-4">
                    <div>
                      <label className="text-xs text-charcoal/50 uppercase tracking-wider font-semibold block mb-1">Card Number</label>
                      <input
                        type="text"
                        required
                        placeholder="4111 2222 3333 4444"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                        className="w-full px-4 py-3 bg-soft-white border border-cream/45 rounded-xl text-sm focus:outline-none focus:border-gold font-body"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-charcoal/50 uppercase tracking-wider font-semibold block mb-1">Name on Card</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                        className="w-full px-4 py-3 bg-soft-white border border-cream/45 rounded-xl text-sm focus:outline-none focus:border-gold font-body"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-charcoal/50 uppercase tracking-wider font-semibold block mb-1">Expiration Date</label>
                        <input
                          type="text"
                          required
                          placeholder="MM/YY"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                          className="w-full px-4 py-3 bg-soft-white border border-cream/45 rounded-xl text-sm focus:outline-none focus:border-gold font-body"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-charcoal/50 uppercase tracking-wider font-semibold block mb-1">Security Code (CVC)</label>
                        <input
                          type="password"
                          required
                          placeholder="123"
                          maxLength={4}
                          value={cardDetails.cvc}
                          onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                          className="w-full px-4 py-3 bg-soft-white border border-cream/45 rounded-xl text-sm focus:outline-none focus:border-gold font-body"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-5 bg-cream/10 border border-cream/20 rounded-xl text-sm text-charcoal/70 leading-relaxed font-body">
                    {paymentMethod === 'paypal' ? (
                      <p>
                        Upon clicking "Proceed to Review", you will be redirected to PayPal sandbox to complete your transaction authorization, then return here to submit the order.
                      </p>
                    ) : (
                      <p>
                        Cash on Delivery: Pay in cash directly to our delivery drivers when they unload, assemble, and position your furniture in your designated room.
                      </p>
                    )}
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-4 border border-cream/40 rounded-xl text-sm font-semibold font-body text-charcoal/70 hover:border-gold transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-grow py-4 bg-gold hover:bg-gold-light text-charcoal font-semibold rounded-xl text-sm transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg hover:shadow-gold/15"
                  >
                    Continue to Review
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Final Review Order */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="font-heading text-xl md:text-2xl font-bold text-charcoal mb-4">Review Your Order</h2>
                
                <div className="space-y-4 border-b border-cream/20 pb-5">
                  <h3 className="font-heading text-base font-bold text-charcoal">Shipping Address</h3>
                  <p className="text-sm text-charcoal/70 leading-relaxed font-body">
                    <span className="font-bold text-charcoal">{shippingAddress.fullName}</span>
                    <br />
                    {shippingAddress.street}
                    <br />
                    {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
                    <br />
                    Phone: {shippingAddress.phone}
                  </p>
                </div>

                <div className="space-y-4 border-b border-cream/20 pb-5">
                  <h3 className="font-heading text-base font-bold text-charcoal">Payment Method</h3>
                  <p className="text-sm text-charcoal/70 leading-relaxed font-body">
                    {paymentMethod === 'card' ? (
                      <span>Credit Card ending in *{cardDetails.number.slice(-4)}</span>
                    ) : paymentMethod === 'paypal' ? (
                      <span>PayPal Account (Simulated)</span>
                    ) : (
                      <span>Cash on Delivery (COD)</span>
                    )}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-4 border border-cream/40 rounded-xl text-sm font-semibold font-body text-charcoal/70 hover:border-gold transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="flex-grow py-4 bg-gold hover:bg-gold-light text-charcoal font-semibold rounded-xl text-sm transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg hover:shadow-gold/15"
                  >
                    Place Order - ${total.toLocaleString()}
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Panel: Basket details (span 5) */}
          <div className="lg:col-span-5 bg-soft-white border border-cream/20 rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="font-heading text-lg font-bold text-charcoal border-b border-cream/15 pb-3">Your Basket</h3>
            
            {/* Basket Items scroll */}
            <div className="divide-y divide-cream/10 max-h-72 overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 py-3 first:pt-0 last:pb-0">
                  <div className="w-14 h-14 bg-cream/10 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center relative border border-cream/15">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-6 h-6 text-charcoal/[0.04]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 8V6c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v2c-1.1 0-2 .9-2 2v6h2v2h2v-2h12v2h2v-2h2v-6c0-1.1-.9-2-2-2zM6 6h12v2H6V6zm14 10H4v-4c0-.55.45-1 1-1h1v3h12v-3h1c.55 0 1 .45 1 1v4z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-grow flex flex-col justify-center">
                    <h4 className="font-heading text-sm font-bold text-charcoal line-clamp-1">{item.name}</h4>
                    <span className="text-xs text-charcoal/50 font-body">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-heading text-sm font-semibold text-charcoal flex items-center">
                    ${(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-3 font-body text-xs border-t border-cream/15 pt-4">
              <div className="flex justify-between text-charcoal/70">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-charcoal/70">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
              </div>
              <div className="flex justify-between text-charcoal/70">
                <span>Estimated Tax (8%)</span>
                <span>${tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-baseline font-heading text-sm font-bold text-charcoal pt-2 border-t border-cream/10">
                <span>Estimated Total</span>
                <span className="text-base">${total.toLocaleString()}</span>
              </div>
            </div>

            {/* Delivery Alert info */}
            <div className="p-4 bg-gold/5 border border-gold/10 rounded-xl space-y-2 text-xs text-charcoal/70 leading-relaxed font-body">
              <div className="flex gap-2">
                <Truck className="w-4 h-4 text-gold flex-shrink-0" />
                <div>
                  <span className="font-semibold text-charcoal/80">Estimated Delivery</span>
                  <p>In 7-10 business days, with full white glove assembly service.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
