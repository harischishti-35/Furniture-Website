'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { DollarSign, ShoppingBag, Users, AlertTriangle, ArrowUpRight, TrendingUp } from 'lucide-react';
import { products } from '@/data/products';

export default function AdminDashboard() {
  // Compute low stock items
  const lowStockItems = useMemo(() => {
    return products.filter((p) => p.stockQuantity < 10);
  }, []);

  const stats = [
    {
      label: 'Total Revenue',
      value: '$48,290.00',
      change: '+14.2% this month',
      icon: DollarSign,
      color: 'text-green-500',
      bg: 'bg-green-500/5',
    },
    {
      label: 'Total Orders',
      value: '184',
      change: '+8.1% this week',
      icon: ShoppingBag,
      color: 'text-blue-500',
      bg: 'bg-blue-500/5',
    },
    {
      label: 'Active Customers',
      value: '912',
      change: '+12.4% vs last month',
      icon: Users,
      color: 'text-purple-500',
      bg: 'bg-purple-500/5',
    },
    {
      label: 'Low Stock Warnings',
      value: lowStockItems.length.toString(),
      change: 'Needs immediate review',
      icon: AlertTriangle,
      color: 'text-amber-500',
      bg: 'bg-amber-500/5',
    },
  ];

  const recentOrders = [
    { id: 'CFM-A1B2C3', customer: 'Sophia Malik', date: '2026-06-19', total: 1299.99, status: 'Processing' },
    { id: 'CFM-Y7H4N2', customer: 'Haris Chishti', date: '2026-06-19', total: 2199.00, status: 'Processing' },
    { id: 'CFM-P9K1O8', customer: 'Amna Ali', date: '2026-06-18', total: 899.99, status: 'Shipped' },
    { id: 'CFM-X2L3M4', customer: 'Zainab Bibi', date: '2026-06-17', total: 399.00, status: 'Delivered' },
    { id: 'CFM-Q8W9E0', customer: 'Omar Khan', date: '2026-06-15', total: 1549.00, status: 'Delivered' },
  ];

  return (
    <div className="space-y-8 text-left">
      
      {/* Welcome Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 md:hidden">
        <div>
          <h1 className="font-heading text-2xl font-bold text-zinc-100">Dashboard</h1>
          <p className="text-xs text-zinc-500">Store operations overview & data tracking.</p>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex items-center justify-between hover:border-zinc-700 transition-colors"
            >
              <div className="space-y-2">
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider font-body">{stat.label}</p>
                <h3 className="text-2xl md:text-3xl font-bold text-zinc-100 font-body">{stat.value}</h3>
                <p className="text-[10px] text-zinc-400 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-gold" />
                  {stat.change}
                </p>
              </div>

              <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Orders & Stock Warnings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Orders (span 7) */}
        <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-heading text-lg font-bold text-zinc-100">Recent Transactions</h3>
            <Link
              href="/admin/orders"
              className="text-xs text-gold hover:text-gold-light hover:underline font-semibold flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-500 font-semibold">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-300">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="py-4 font-bold text-zinc-100">{order.id}</td>
                    <td className="py-4 text-zinc-400">{order.customer}</td>
                    <td className="py-4">
                      <span
                        className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-full ${
                          order.status === 'Delivered'
                            ? 'bg-green-500/10 text-green-400'
                            : order.status === 'Shipped'
                            ? 'bg-blue-500/10 text-blue-400'
                            : 'bg-gold/10 text-gold'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 font-semibold text-zinc-100 text-right">
                      ${order.total.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts (span 5) */}
        <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-heading text-lg font-bold text-zinc-100">Low Stock Indicators</h3>
            <Link
              href="/admin/products"
              className="text-xs text-gold hover:text-gold-light hover:underline font-semibold flex items-center gap-1"
            >
              <span>Manage Inventory</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4 max-h-[300px] overflow-y-auto scrollbar-thin">
            {lowStockItems.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-4 bg-zinc-950 rounded-xl border border-zinc-800"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-zinc-900 border border-zinc-850 rounded-lg flex items-center justify-center text-[10px] text-gold font-bold">
                    {product.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="text-left font-body">
                    <p className="text-xs font-bold text-zinc-200">{product.name}</p>
                    <p className="text-[10px] text-zinc-500">SKU: {product.sku}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-xs font-bold font-body px-2.5 py-1 rounded-md ${
                      product.stockQuantity === 0
                        ? 'bg-red-500/10 text-red-400'
                        : 'bg-amber-500/10 text-amber-400'
                    }`}
                  >
                    {product.stockQuantity} Left
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
