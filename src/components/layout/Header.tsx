'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Sun,
  Moon,
  Menu,
  X,
  Phone,
  Mail,
  ChevronDown,
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useThemeStore } from '@/store/themeStore';
import MobileNav from './MobileNav';
import SearchModal from './SearchModal';
import CartSidebar from './CartSidebar';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Living Room', href: '/categories/living-room' },
  { name: 'Bedroom', href: '/categories/bedroom' },
  { name: 'Dining', href: '/categories/dining-room' },
  { name: 'Office', href: '/categories/office' },
  { name: 'Outdoor', href: '/categories/outdoor' },
  { name: 'Blog', href: '/blog' },
  { name: 'Visualizer', href: '/visualizer' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(true);

  const { items: cartItems } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { theme, toggleTheme } = useThemeStore();

  const cartCount = cartItems?.length ?? 0;
  const wishlistCount = wishlistItems?.length ?? 0;

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when overlays are open
  useEffect(() => {
    if (isMobileNavOpen || isSearchOpen || isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileNavOpen, isSearchOpen, isCartOpen]);

  const isDark = theme === 'dark';

  if (isAdmin) return null;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'shadow-lg backdrop-blur-xl'
            : ''
        }`}
        style={{
          backgroundColor: isScrolled ? 'var(--header-bg)' : 'var(--header-bg-solid)',
        }}
      >
        {/* Announcement Bar */}
        <AnimatePresence>
          {isAnnouncementVisible && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-charcoal text-soft-white overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-xs sm:text-sm">
                <div className="hidden sm:flex items-center gap-4 text-cream/70">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    (555) 123-4567
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    info@chishtifurniture.com
                  </span>
                </div>
                <p className="text-center flex-1 sm:flex-none font-medium tracking-wide">
                  Free Shipping on Orders Over $500 |{' '}
                  <span className="text-gold font-semibold">Use Code: WELCOME10</span>
                </p>
                <button
                  onClick={() => setIsAnnouncementVisible(false)}
                  className="ml-4 p-1 hover:text-gold transition-colors"
                  aria-label="Close announcement"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileNavOpen(true)}
              className="lg:hidden p-2 -ml-2 transition-colors hover:text-gold"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex flex-col">
                <span
                  className="text-xl sm:text-2xl font-heading font-bold tracking-tight"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Chishti
                </span>
                <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-gold font-medium -mt-1">
                  Furniture Mart
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative px-3 py-2 text-sm font-medium transition-colors hover:text-gold group"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {link.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-3/4" />
                </Link>
              ))}
            </nav>

            {/* Action Icons */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-full transition-colors hover:text-gold"
                aria-label="Search products"
                style={{ color: 'var(--text-primary)' }}
              >
                <Search className="w-5 h-5" />
              </motion.button>

              {/* Wishlist */}
              <Link href="/wishlist">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-2 rounded-full transition-colors hover:text-gold hidden sm:block"
                  style={{ color: 'var(--text-primary)' }}
                  aria-label={`Wishlist with ${wishlistCount} items`}
                >
                  <Heart className="w-5 h-5" />
                  {wishlistCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-0.5 -right-0.5 bg-gold text-charcoal text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center leading-none"
                    >
                      {wishlistCount}
                    </motion.span>
                  )}
                </motion.div>
              </Link>

              {/* Cart */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-full transition-colors hover:text-gold"
                aria-label={`Shopping bag with ${cartCount} items`}
                style={{ color: 'var(--text-primary)' }}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 bg-gold text-charcoal text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center leading-none"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.button>

              {/* User */}
              <Link href="/account">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full transition-colors hover:text-gold hidden sm:block"
                  style={{ color: 'var(--text-primary)' }}
                  aria-label="Account"
                >
                  <User className="w-5 h-5" />
                </motion.div>
              </Link>

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-full transition-colors hover:text-gold"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                style={{ color: 'var(--text-primary)' }}
              >
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom border accent */}
        <div className="h-px w-full" style={{ backgroundColor: 'var(--border)' }} />
      </header>

      {/* Spacer for fixed header */}
      <div
        className={`${isAnnouncementVisible ? 'h-[calc(4rem+36px)] sm:h-[calc(5rem+36px)]' : 'h-16 sm:h-20'} transition-all duration-300`}
      />

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        navLinks={navLinks}
      />

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
