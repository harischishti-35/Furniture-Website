'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, MapPin, Settings, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { useUserStore } from '@/store/userStore';

export default function AccountDashboard() {
  const { user, orders, recentlyViewed } = useUserStore();

  if (!user) return null;

  // Calculate quick stats
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);
  const rewardPoints = user.rewardPoints ?? 0;
  const recentOrders = orders.slice(0, 3);

  return (
    <div className="space-y-8 font-body">
      {/* Welcome Hero Banner */}
      <div className="bg-charcoal text-soft-white rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-md">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <span className="text-gold uppercase tracking-[0.2em] text-xs font-semibold block">
            Customer Portal
          </span>
          <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight">
            Hello, {user.name}
          </h2>
          <p className="text-sm text-cream/70 max-w-md leading-relaxed">
            Welcome to your premium membership dashboard. Track shipments, manage address books, and view your loyalty points.
          </p>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Stat 1: Completed Orders */}
        <div className="bg-soft-white border border-cream/20 rounded-2xl p-5 shadow-sm space-y-2">
          <span className="text-xs text-charcoal/40 uppercase tracking-wider font-semibold block">
            Total Orders
          </span>
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-charcoal">{orders.length}</h3>
        </div>

        {/* Stat 2: Reward Points */}
        <div className="bg-soft-white border border-cream/20 rounded-2xl p-5 shadow-sm space-y-2">
          <span className="text-xs text-charcoal/40 uppercase tracking-wider font-semibold block">
            Reward Points
          </span>
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-gold">{rewardPoints} pts</h3>
        </div>

        {/* Stat 3: Total Spent */}
        <div className="bg-soft-white border border-cream/20 rounded-2xl p-5 shadow-sm space-y-2">
          <span className="text-xs text-charcoal/40 uppercase tracking-wider font-semibold block">
            Total Spent
          </span>
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-charcoal">
            ${totalSpent.toLocaleString()}
          </h3>
        </div>

        {/* Stat 4: Recently Viewed */}
        <div className="bg-soft-white border border-cream/20 rounded-2xl p-5 shadow-sm space-y-2">
          <span className="text-xs text-charcoal/40 uppercase tracking-wider font-semibold block">
            Recently Viewed
          </span>
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-charcoal">
            {recentlyViewed.length} items
          </h3>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-soft-white border border-cream/20 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-cream/15 pb-4">
          <h3 className="font-heading text-xl font-bold text-charcoal">Recent Orders</h3>
          <Link
            href="/account/orders"
            className="flex items-center gap-1 text-xs text-gold hover:text-gold-dark font-semibold group transition-all"
          >
            View All Orders
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-cream/15 text-xs text-charcoal/40 uppercase tracking-wider font-semibold">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Total</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream/10 text-sm">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-cream/5 transition-colors">
                    <td className="py-4 font-bold text-charcoal">{order.id}</td>
                    <td className="py-4 text-charcoal/60">{order.createdAt}</td>
                    <td className="py-4">
                      <span
                        className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${
                          order.status.toLowerCase() === 'delivered'
                            ? 'bg-green-500/10 text-green-600'
                            : order.status.toLowerCase() === 'shipped'
                            ? 'bg-blue-500/10 text-blue-600'
                            : 'bg-gold/10 text-gold'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 font-semibold text-charcoal">
                      ${order.total.toLocaleString()}
                    </td>
                    <td className="py-4 text-right">
                      <Link
                        href={`/account/orders?id=${order.id}`}
                        className="text-xs text-gold hover:text-gold-dark font-semibold hover:underline"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10 text-charcoal/40 text-sm">
            You haven't placed any orders yet.
          </div>
        )}
      </div>

      {/* Account Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Box 1: Wishlist */}
        <Link href="/account/wishlist" className="block group">
          <div className="bg-soft-white border border-cream/20 hover:border-gold rounded-2xl p-6 shadow-sm transition-all duration-300 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gold/10 text-gold rounded-xl flex items-center justify-center group-hover:bg-gold group-hover:text-charcoal transition-colors">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading text-base font-bold text-charcoal">My Wishlist</h4>
                <p className="text-xs text-charcoal/40 font-body">Browse your saved designs</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-charcoal/30 group-hover:translate-x-1 transition-all" />
          </div>
        </Link>

        {/* Box 2: Address book */}
        <Link href="/account/addresses" className="block group">
          <div className="bg-soft-white border border-cream/20 hover:border-gold rounded-2xl p-6 shadow-sm transition-all duration-300 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gold/10 text-gold rounded-xl flex items-center justify-center group-hover:bg-gold group-hover:text-charcoal transition-colors">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading text-base font-bold text-charcoal">Addresses</h4>
                <p className="text-xs text-charcoal/40 font-body">Configure delivery locations</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-charcoal/30 group-hover:translate-x-1 transition-all" />
          </div>
        </Link>

        {/* Box 3: Profile Settings */}
        <Link href="/account/settings" className="block group">
          <div className="bg-soft-white border border-cream/20 hover:border-gold rounded-2xl p-6 shadow-sm transition-all duration-300 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gold/10 text-gold rounded-xl flex items-center justify-center group-hover:bg-gold group-hover:text-charcoal transition-colors">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading text-base font-bold text-charcoal">Settings</h4>
                <p className="text-xs text-charcoal/40 font-body">Change password and profile info</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-charcoal/30 group-hover:translate-x-1 transition-all" />
          </div>
        </Link>
      </div>

    </div>
  );
}
