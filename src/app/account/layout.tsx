'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { User, ShoppingBag, Heart, MapPin, Settings, LogOut, Lock } from 'lucide-react';
import { useUserStore } from '@/store/userStore';

const sidebarLinks = [
  { name: 'Dashboard', href: '/account', icon: User },
  { name: 'Orders', href: '/account/orders', icon: ShoppingBag },
  { name: 'Wishlist', href: '/account/wishlist', icon: Heart },
  { name: 'Addresses', href: '/account/addresses', icon: MapPin },
  { name: 'Settings', href: '/account/settings', icon: Settings },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useUserStore();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Redirect to login if not logged in
  useEffect(() => {
    if (!user) {
      // In a real app we'd redirect. Let's do it cleanly
      router.push('/auth/login');
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="py-20 text-center min-h-screen flex flex-col items-center justify-center bg-soft-white font-body">
        <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center text-gold mb-6 shadow-inner">
          <Lock className="w-6 h-6 stroke-[1.5]" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-charcoal mb-4">Access Denied</h2>
        <p className="text-charcoal/60 mb-6 max-w-xs mx-auto">Please sign in to view your account dashboard.</p>
        <Link href="/auth/login" className="px-6 py-2.5 bg-gold text-charcoal font-semibold rounded-xl text-sm transition-colors">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-20 bg-soft-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Dashboard Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0 bg-soft-white border border-cream/20 rounded-2xl p-6 shadow-sm">
            
            {/* User Profile Summary */}
            <div className="flex items-center gap-4 pb-6 border-b border-cream/15 mb-6">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold font-bold font-heading text-lg border border-gold/15">
                {user.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <h4 className="font-heading text-base font-bold text-charcoal truncate">{user.name}</h4>
                <p className="text-xs text-charcoal/45 truncate font-body">{user.email}</p>
              </div>
            </div>

            {/* Sidebar Navigation */}
            <nav className="space-y-1 font-body text-sm" aria-label="Account sidebar">
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${
                      isActive
                        ? 'bg-gold/10 text-gold font-bold'
                        : 'text-charcoal/65 hover:bg-cream/15 hover:text-gold'
                    }`}
                  >
                    <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-gold' : 'text-charcoal/40'}`} />
                    {link.name}
                  </Link>
                );
              })}

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-red-500 hover:bg-red-500/5 cursor-pointer text-left"
              >
                <LogOut className="w-4.5 h-4.5 text-red-400" />
                Sign Out
              </button>
            </nav>
          </aside>

          {/* Main Panel Content */}
          <main className="flex-grow w-full">
            {children}
          </main>
        </div>

      </div>
    </div>
  );
}
