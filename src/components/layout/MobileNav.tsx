'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronDown,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Heart,
  User,
  ShoppingBag,
} from 'lucide-react';
import { Facebook, Instagram, Twitter } from './SocialIcons';

interface NavLink {
  name: string;
  href: string;
}

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
}

const categories = [
  {
    name: 'Living Room',
    href: '/category/living-room',
    subcategories: [
      { name: 'Sofas & Sectionals', href: '/category/living-room/sofas' },
      { name: 'Coffee Tables', href: '/category/living-room/coffee-tables' },
      { name: 'TV Stands', href: '/category/living-room/tv-stands' },
      { name: 'Accent Chairs', href: '/category/living-room/accent-chairs' },
      { name: 'Bookshelves', href: '/category/living-room/bookshelves' },
    ],
  },
  {
    name: 'Bedroom',
    href: '/category/bedroom',
    subcategories: [
      { name: 'Beds & Frames', href: '/category/bedroom/beds' },
      { name: 'Nightstands', href: '/category/bedroom/nightstands' },
      { name: 'Dressers', href: '/category/bedroom/dressers' },
      { name: 'Wardrobes', href: '/category/bedroom/wardrobes' },
      { name: 'Vanity Sets', href: '/category/bedroom/vanity' },
    ],
  },
  {
    name: 'Dining',
    href: '/category/dining',
    subcategories: [
      { name: 'Dining Tables', href: '/category/dining/tables' },
      { name: 'Dining Chairs', href: '/category/dining/chairs' },
      { name: 'Bar Stools', href: '/category/dining/bar-stools' },
      { name: 'Buffets & Sideboards', href: '/category/dining/buffets' },
    ],
  },
  {
    name: 'Office',
    href: '/category/office',
    subcategories: [
      { name: 'Desks', href: '/category/office/desks' },
      { name: 'Office Chairs', href: '/category/office/chairs' },
      { name: 'Filing Cabinets', href: '/category/office/filing-cabinets' },
      { name: 'Desk Accessories', href: '/category/office/accessories' },
    ],
  },
  {
    name: 'Outdoor',
    href: '/category/outdoor',
    subcategories: [
      { name: 'Patio Sets', href: '/category/outdoor/patio-sets' },
      { name: 'Outdoor Sofas', href: '/category/outdoor/sofas' },
      { name: 'Garden Tables', href: '/category/outdoor/tables' },
      { name: 'Swing Chairs', href: '/category/outdoor/swings' },
    ],
  },
];

const overlayVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

const drawerVariants = {
  closed: { x: '-100%' },
  open: { x: 0 },
};

export default function MobileNav({ isOpen, onClose, navLinks }: MobileNavProps) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Trap focus inside when open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }

      if (e.key === 'Tab' && navRef.current) {
        const focusableElements = navRef.current.querySelectorAll(
          'button, a, input, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusableElements[0] as HTMLElement;
        const last = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const toggleCategory = (name: string) => {
    setOpenCategory(openCategory === name ? null : name);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            ref={navRef}
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 left-0 z-[70] w-[85%] max-w-sm flex flex-col shadow-2xl overflow-hidden"
            style={{ backgroundColor: 'var(--bg-primary)' }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 border-b"
              style={{ borderColor: 'var(--border)' }}
            >
              <Link href="/" onClick={onClose} className="flex flex-col">
                <span
                  className="text-xl font-heading font-bold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Chishti
                </span>
                <span className="text-[9px] tracking-[0.3em] uppercase text-gold font-medium -mt-1">
                  Furniture Mart
                </span>
              </Link>
              <button
                onClick={onClose}
                className="p-2 -mr-2 rounded-full hover:bg-gold/10 transition-colors"
                aria-label="Close menu"
                style={{ color: 'var(--text-primary)' }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Action Links */}
            <div
              className="flex items-center justify-around py-3 border-b"
              style={{ borderColor: 'var(--border)' }}
            >
              <Link
                href="/account"
                onClick={onClose}
                className="flex flex-col items-center gap-1 text-xs hover:text-gold transition-colors"
                style={{ color: 'var(--text-secondary)' }}
              >
                <User className="w-5 h-5" />
                Account
              </Link>
              <Link
                href="/wishlist"
                onClick={onClose}
                className="flex flex-col items-center gap-1 text-xs hover:text-gold transition-colors"
                style={{ color: 'var(--text-secondary)' }}
              >
                <Heart className="w-5 h-5" />
                Wishlist
              </Link>
              <Link
                href="/cart"
                onClick={onClose}
                className="flex flex-col items-center gap-1 text-xs hover:text-gold transition-colors"
                style={{ color: 'var(--text-secondary)' }}
              >
                <ShoppingBag className="w-5 h-5" />
                Cart
              </Link>
            </div>

            {/* Scrollable Navigation */}
            <nav className="flex-1 overflow-y-auto py-4" aria-label="Mobile navigation">
              {/* Primary Nav Links */}
              <div className="px-5 mb-4">
                <Link
                  href="/"
                  onClick={onClose}
                  className="block py-3 text-base font-medium transition-colors hover:text-gold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Home
                </Link>
              </div>

              {/* Category Accordions */}
              <div className="px-5 space-y-0">
                {categories.map((category) => (
                  <div
                    key={category.name}
                    className="border-b"
                    style={{ borderColor: 'var(--border-light, var(--border))' }}
                  >
                    <div className="flex items-center justify-between">
                      <Link
                        href={category.href}
                        onClick={onClose}
                        className="flex-1 py-3 text-base font-medium transition-colors hover:text-gold"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {category.name}
                      </Link>
                      <button
                        onClick={() => toggleCategory(category.name)}
                        className="p-2 -mr-2 hover:text-gold transition-colors"
                        aria-expanded={openCategory === category.name}
                        aria-label={`Expand ${category.name} submenu`}
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        <motion.div
                          animate={{ rotate: openCategory === category.name ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      </button>
                    </div>

                    <AnimatePresence>
                      {openCategory === category.name && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="pb-3 pl-4 space-y-1">
                            {category.subcategories.map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                onClick={onClose}
                                className="flex items-center gap-2 py-2 text-sm transition-colors hover:text-gold"
                                style={{ color: 'var(--text-secondary)' }}
                              >
                                <ChevronRight className="w-3 h-3 text-gold/60" />
                                {sub.name}
                              </Link>
                            ))}
                            <Link
                              href={category.href}
                              onClick={onClose}
                              className="flex items-center gap-2 py-2 text-sm font-medium text-gold"
                            >
                              View All {category.name}
                              <ChevronRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Additional Links */}
              <div className="px-5 mt-6 space-y-0">
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-3"
                  style={{ color: 'var(--text-muted, var(--text-secondary))' }}
                >
                  Quick Links
                </p>
                {[
                  { name: 'Blog', href: '/blog' },
                  { name: 'Contact', href: '/contact' },
                  { name: 'About Us', href: '/about' },
                  { name: 'FAQ', href: '/faq' },
                ].map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={onClose}
                    className="block py-2.5 text-sm transition-colors hover:text-gold"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Footer Contact Info */}
            <div
              className="border-t px-5 py-4 space-y-3"
              style={{ borderColor: 'var(--border)' }}
            >
              <a
                href="tel:+15551234567"
                className="flex items-center gap-3 text-sm hover:text-gold transition-colors"
                style={{ color: 'var(--text-secondary)' }}
              >
                <Phone className="w-4 h-4 text-gold" />
                (555) 123-4567
              </a>
              <a
                href="mailto:info@chishtifurniture.com"
                className="flex items-center gap-3 text-sm hover:text-gold transition-colors"
                style={{ color: 'var(--text-secondary)' }}
              >
                <Mail className="w-4 h-4 text-gold" />
                info@chishtifurniture.com
              </a>

              {/* Social Icons */}
              <div className="flex items-center gap-3 pt-2">
                {[
                  { icon: Facebook, label: 'Facebook' },
                  { icon: Instagram, label: 'Instagram' },
                  { icon: Twitter, label: 'Twitter' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-gold hover:text-charcoal"
                    style={{
                      backgroundColor: 'var(--border)',
                      color: 'var(--text-secondary)',
                    }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
