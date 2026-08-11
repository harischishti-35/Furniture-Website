'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  CreditCard,
  Shield,
  Truck,
} from 'lucide-react';
import { Facebook, Instagram, Twitter, Youtube } from './SocialIcons';

const quickLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Careers', href: '/careers' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Store Locator', href: '/stores' },
];

const customerServiceLinks = [
  { name: 'My Account', href: '/account' },
  { name: 'Order Tracking', href: '/orders' },
  { name: 'Wishlist', href: '/wishlist' },
  { name: 'Returns & Exchanges', href: '/returns' },
  { name: 'Shipping Info', href: '/shipping' },
  { name: 'Size Guide', href: '/size-guide' },
];

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
];

export default function Footer() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  if (isAdmin) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream/90" role="contentinfo">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-soft-white mb-2">
                Stay Inspired
              </h3>
              <p className="text-cream/60 max-w-md">
                Subscribe to our newsletter for exclusive offers, design tips, and new arrivals.
              </p>
            </div>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto"
            >
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full sm:w-80 px-5 py-3.5 bg-white/10 border border-white/15 rounded-lg text-soft-white placeholder-cream/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                  required
                  aria-label="Email address for newsletter"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-8 py-3.5 bg-gold hover:bg-gold-dark text-charcoal font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 group"
              >
                {isSubscribed ? (
                  'Subscribed ✓'
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1: Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <div className="flex flex-col">
                <span className="text-2xl font-heading font-bold text-soft-white">
                  Chishti
                </span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-gold font-medium -mt-1">
                  Furniture Mart
                </span>
              </div>
            </Link>
            <p className="text-cream/50 text-sm leading-relaxed mb-6 max-w-xs">
              Crafting premium furniture that transforms houses into homes. Every piece tells a
              story of quality, comfort, and timeless elegance.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/8 hover:bg-gold hover:text-charcoal flex items-center justify-center text-cream/60 transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-soft-white uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/50 hover:text-gold transition-colors duration-200 inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-2 overflow-hidden transition-all duration-200">
                      <ArrowRight className="w-3 h-3 text-gold" />
                    </span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div>
            <h4 className="text-sm font-semibold text-soft-white uppercase tracking-wider mb-5">
              Customer Service
            </h4>
            <ul className="space-y-3">
              {customerServiceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/50 hover:text-gold transition-colors duration-200 inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-2 overflow-hidden transition-all duration-200">
                      <ArrowRight className="w-3 h-3 text-gold" />
                    </span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-soft-white uppercase tracking-wider mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-sm text-cream/50">
                  123 Furniture Lane, Design District
                  <br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <a
                  href="tel:+15551234567"
                  className="text-sm text-cream/50 hover:text-gold transition-colors"
                >
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a
                  href="mailto:info@chishtifurniture.com"
                  className="text-sm text-cream/50 hover:text-gold transition-colors"
                >
                  info@chishtifurniture.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <div className="text-sm text-cream/50">
                  <p>Mon - Fri: 9:00 AM - 8:00 PM</p>
                  <p>Sat - Sun: 10:00 AM - 6:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-cream/40">
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Truck className="w-5 h-5 text-gold" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Shield className="w-5 h-5 text-gold" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <CreditCard className="w-5 h-5 text-gold" />
              <span>Easy Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-cream/40">
              © {currentYear} Chishti Furniture Mart. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              {['Visa', 'Mastercard', 'Amex', 'PayPal'].map((method) => (
                <span
                  key={method}
                  className="px-2.5 py-1 text-[10px] font-medium bg-white/8 rounded text-cream/50 border border-white/10"
                >
                  {method}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 text-xs text-cream/40">
              <Link href="/privacy" className="hover:text-gold transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-gold transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
