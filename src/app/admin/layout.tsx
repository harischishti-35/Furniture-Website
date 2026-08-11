'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, Truck, Users, BarChart3, Store, Menu, X, Bell } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: ShoppingBag },
    { name: 'Orders', href: '/admin/orders', icon: Truck },
    { name: 'Customers', href: '/admin/customers', icon: Users },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col md:flex-row font-body">
      
      {/* Mobile Top Header */}
      <header className="md:hidden flex justify-between items-center bg-zinc-900 border-b border-zinc-800 px-6 py-4 z-40">
        <span className="font-heading text-lg font-bold text-gold tracking-wide">
          Chishti Admin
        </span>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-zinc-400 hover:text-zinc-100 cursor-pointer"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col justify-between z-30 flex-shrink-0`}
      >
        <div className="space-y-8">
          {/* Logo */}
          <div className="hidden md:block">
            <span className="font-heading text-xl font-bold text-gold tracking-widest block">
              Chishti Mart
            </span>
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mt-1 font-body">
              Management Portal
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 text-left">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gold text-zinc-950 shadow-lg shadow-gold/10'
                      : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions: Back to Store */}
        <div className="pt-6 border-t border-zinc-800">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 cursor-pointer"
          >
            <Store className="w-4 h-4 text-gold" />
            <span>Return to Store</span>
          </Link>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="flex-grow p-6 md:p-10 bg-zinc-950 min-h-screen overflow-x-hidden md:ml-0">
        
        {/* Top Management Info Bar */}
        <div className="hidden md:flex justify-between items-center mb-8 pb-6 border-b border-zinc-850">
          <div>
            <h1 className="font-heading text-2xl font-bold text-zinc-100">
              {navigation.find((n) => n.href === pathname)?.name || 'Admin Panel'}
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              Store operations overview & data tracking.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-850 text-zinc-400 hover:text-zinc-100 cursor-pointer">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold rounded-full" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-gold">
                AC
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-zinc-200">Ahmed Chishti</p>
                <p className="text-[10px] text-zinc-500 font-body">Super Admin</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content body */}
        <div className="min-h-[calc(100vh-140px)]">
          {children}
        </div>
      </main>
    </div>
  );
}
