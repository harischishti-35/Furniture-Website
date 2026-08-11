'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ShoppingBag, ChevronDown, ChevronUp, MapPin, Calendar, Clock, Receipt, Truck } from 'lucide-react';
import { useUserStore } from '@/store/userStore';

function OrdersHistoryContent() {
  const searchParams = useSearchParams();
  const selectedOrderId = searchParams.get('id');
  const { orders } = useUserStore();

  const [expandedOrder, setExpandedOrder] = useState<string | null>(selectedOrderId);

  const toggleOrder = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="space-y-6 font-body">
      <div className="flex items-center justify-between border-b border-cream/15 pb-4">
        <h2 className="font-heading text-xl md:text-2xl font-bold text-charcoal">My Orders</h2>
        <span className="text-xs text-charcoal/50 font-medium">({orders.length} orders total)</span>
      </div>

      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => {
            const isExpanded = expandedOrder === order.id;
            return (
              <div
                key={order.id}
                className="bg-soft-white border border-cream/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Header Summary bar */}
                <div
                  onClick={() => toggleOrder(order.id)}
                  className="flex flex-wrap items-center justify-between gap-4 p-5 md:p-6 cursor-pointer hover:bg-cream/5 transition-colors"
                >
                  <div className="flex gap-6 flex-wrap">
                    <div>
                      <span className="text-[10px] text-charcoal/40 uppercase tracking-wider font-semibold block">Order ID</span>
                      <span className="text-sm font-bold text-charcoal">{order.id}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-charcoal/40 uppercase tracking-wider font-semibold block">Date Placed</span>
                      <span className="text-sm text-charcoal/70">{(order as any).date || order.createdAt}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-charcoal/40 uppercase tracking-wider font-semibold block">Total Amount</span>
                      <span className="text-sm font-semibold text-charcoal">${order.total.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${
                        order.status.toLowerCase() === 'delivered'
                          ? 'bg-green-500/10 text-green-600'
                          : order.status.toLowerCase() === 'shipped'
                          ? 'bg-blue-500/10 text-blue-600'
                          : 'bg-gold/10 text-gold'
                      }`}
                    >
                      {order.status}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-charcoal/40" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-charcoal/40" />
                    )}
                  </div>
                </div>

                {/* Detailed Expandable Section */}
                {isExpanded && (
                  <div className="p-5 md:p-6 border-t border-cream/10 bg-cream/5 space-y-6">
                    {/* Items table */}
                    <div className="space-y-4">
                      <h4 className="font-heading text-sm font-bold text-charcoal flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-gold" />
                        Order Items
                      </h4>
                      
                      <div className="divide-y divide-cream/10 border border-cream/15 rounded-xl bg-soft-white overflow-hidden p-4">
                        {order.items && order.items.length > 0 ? (
                          order.items.map((item: any, idx: number) => (
                            <div key={idx} className="flex gap-4 py-3 first:pt-0 last:pb-0">
                              <div className="w-12 h-12 bg-cream/10 border border-cream/15 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center relative">
                                {item.product.images?.[0]?.url ? (
                                  <img src={item.product.images[0].url} alt={item.product.name} className="w-full h-full object-cover" />
                                ) : (
                                  <svg className="w-6 h-6 text-charcoal/[0.04]" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20 8V6c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v2c-1.1 0-2 .9-2 2v6h2v2h2v-2h12v2h2v-2h2v-6c0-1.1-.9-2-2-2zM6 6h12v2H6V6zm14 10H4v-4c0-.55.45-1 1-1h1v3h12v-3h1c.55 0 1 .45 1 1v4z" />
                                  </svg>
                                )}
                              </div>
                              <div className="flex-grow flex flex-col justify-center">
                                <h5 className="font-heading text-sm font-bold text-charcoal">{item.product.name}</h5>
                                <span className="text-xs text-charcoal/50 font-body">Qty: {item.quantity}</span>
                              </div>
                              <span className="font-heading text-sm font-semibold text-charcoal flex items-center">
                                ${(item.priceAtPurchase * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          ))
                        ) : (
                          // Fallback mock items if list is empty
                          <div className="py-2 text-center text-charcoal/40 text-xs font-body">
                            Premium Furniture items & custom joinery orders.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Delivery & details grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-cream/10">
                      {/* Shipping Info */}
                      <div className="space-y-3">
                        <h4 className="font-heading text-sm font-bold text-charcoal flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gold" />
                          Delivery Location
                        </h4>
                        <p className="text-xs text-charcoal/60 leading-relaxed font-body pl-6">
                          <span className="font-bold text-charcoal">{order.shippingAddress.fullName}</span>
                          <br />
                          {order.shippingAddress.street}
                          <br />
                          {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                          <br />
                          Phone: {order.shippingAddress.phone}
                        </p>
                      </div>

                      {/* Shipment Status & Billing */}
                      <div className="space-y-3">
                        <h4 className="font-heading text-sm font-bold text-charcoal flex items-center gap-2">
                          <Truck className="w-4 h-4 text-gold" />
                          Shipment Details
                        </h4>
                        <ul className="text-xs text-charcoal/60 space-y-2 font-body pl-6">
                          <li>
                            <span className="font-semibold text-charcoal/70">Payment Method:</span> {order.paymentMethod}
                          </li>
                          <li className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-gold" />
                            <span className="font-semibold text-charcoal/70">Est. Delivery:</span> {order.estimatedDelivery || '7-10 Business Days'}
                          </li>
                          <li>
                            <span className="font-semibold text-charcoal/70">Tracking Number:</span>{' '}
                            <span className="font-bold text-charcoal">{order.trackingNumber || 'PENDING'}</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Price summary list */}
                    <div className="flex justify-end pt-4 border-t border-cream/10">
                      <div className="w-64 space-y-2 text-xs font-body text-charcoal/70">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>${order.subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Shipping</span>
                          <span>{order.shipping === 0 ? 'Free' : `$${order.shipping}`}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Estimated Tax</span>
                          <span>${order.tax.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold text-charcoal pt-2 border-t border-cream/10 font-heading">
                          <span>Total Paid</span>
                          <span>${order.total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-cream/5 border border-dashed border-cream/35 rounded-2xl">
          <p className="text-charcoal/50 text-base font-heading font-medium mb-4">No orders placed yet.</p>
          <Link href="/products" className="px-6 py-2.5 bg-gold text-charcoal font-semibold rounded-xl text-sm transition-colors">
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
}

export default function OrdersHistoryPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-20 bg-cream/5 border border-dashed border-cream/35 rounded-2xl animate-pulse">
          <p className="text-charcoal/50 text-base font-heading font-medium">Loading Order History...</p>
        </div>
      }
    >
      <OrdersHistoryContent />
    </Suspense>
  );
}
