'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, TrendingUp, ArrowRight, Tag } from 'lucide-react';

// Product type for search results
interface SearchProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  slug: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TRENDING_SEARCHES = [
  'Mid-century sofa',
  'Oak dining table',
  'Velvet armchair',
  'Walnut bookshelf',
  'King bed frame',
  'Standing desk',
];

const CATEGORY_QUICK_LINKS = [
  { name: 'Living Room', href: '/category/living-room', emoji: '🛋️' },
  { name: 'Bedroom', href: '/category/bedroom', emoji: '🛏️' },
  { name: 'Dining', href: '/category/dining', emoji: '🍽️' },
  { name: 'Office', href: '/category/office', emoji: '💼' },
  { name: 'Outdoor', href: '/category/outdoor', emoji: '🌿' },
];

// Fallback products for search demo
const DEMO_PRODUCTS: SearchProduct[] = [
  { id: '1', name: 'Velvet Sofa – Emerald', price: 1299, image: '/images/products/sofa-1.jpg', category: 'Living Room', slug: 'velvet-sofa-emerald' },
  { id: '2', name: 'Oak Dining Table', price: 899, image: '/images/products/table-1.jpg', category: 'Dining', slug: 'oak-dining-table' },
  { id: '3', name: 'Walnut Bed Frame', price: 1499, image: '/images/products/bed-1.jpg', category: 'Bedroom', slug: 'walnut-bed-frame' },
  { id: '4', name: 'Leather Accent Chair', price: 649, image: '/images/products/chair-1.jpg', category: 'Living Room', slug: 'leather-accent-chair' },
  { id: '5', name: 'Standing Desk Pro', price: 799, image: '/images/products/desk-1.jpg', category: 'Office', slug: 'standing-desk-pro' },
  { id: '6', name: 'Outdoor Lounge Set', price: 1899, image: '/images/products/outdoor-1.jpg', category: 'Outdoor', slug: 'outdoor-lounge-set' },
  { id: '7', name: 'Mid-Century Bookshelf', price: 549, image: '/images/products/shelf-1.jpg', category: 'Living Room', slug: 'mid-century-bookshelf' },
  { id: '8', name: 'Marble Coffee Table', price: 699, image: '/images/products/coffee-1.jpg', category: 'Living Room', slug: 'marble-coffee-table' },
];

const RECENT_SEARCHES_KEY = 'chishti-recent-searches';

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load products — try dynamic import, fall back to demo data
  const [searchProducts, setSearchProducts] = useState<SearchProduct[]>(DEMO_PRODUCTS);

  useEffect(() => {
    // Attempt to load from the data module; if it doesn't exist yet, use demo data
    import('@/data/products')
      .then((mod) => {
        if (mod.products && Array.isArray(mod.products) && mod.products.length > 0) {
          setSearchProducts(
            mod.products.map((p: any) => ({
              id: p.id ?? p.slug ?? String(Math.random()),
              name: p.name ?? 'Product',
              price: p.price ?? 0,
              image: p.image ?? p.images?.[0] ?? '/images/placeholder.jpg',
              category: p.category ?? '',
              slug: p.slug ?? p.id ?? '',
            }))
          );
        }
      })
      .catch(() => {
        // Data module not available yet — keep demo products
      });
  }, []);

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, [isOpen]);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  // Filter products based on query
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return searchProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery)
    ).slice(0, 6);
  }, [query, searchProducts]);

  // Save search to recent
  const saveRecentSearch = useCallback(
    (term: string) => {
      const updated = [term, ...recentSearches.filter((s) => s !== term)].slice(0, 5);
      setRecentSearches(updated);
      try {
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
    },
    [recentSearches]
  );

  const clearRecentSearches = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
    } catch {
      // ignore
    }
  };

  const handleSearch = (term: string) => {
    setQuery(term);
    saveRecentSearch(term);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      saveRecentSearch(query.trim());
      onClose();
      // Navigate to search results - would use router.push in full implementation
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Search Content */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-x-0 top-0 z-[90] max-h-[85vh] overflow-y-auto"
            style={{ backgroundColor: 'var(--bg-primary)' }}
          >
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
              {/* Close Button */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gold/10 transition-colors"
                  aria-label="Close search"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Search Input */}
              <form onSubmit={handleSubmit} className="relative mb-8">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold"
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for furniture, styles, rooms..."
                  className="w-full pl-12 pr-4 py-4 text-lg border-b-2 border-gold/30 focus:border-gold bg-transparent outline-none transition-colors font-body"
                  style={{ color: 'var(--text-primary)' }}
                  aria-label="Search products"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:text-gold transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </form>

              {/* Search Results */}
              {query.trim() && results.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-8"
                >
                  <h3
                    className="text-sm font-semibold uppercase tracking-wider mb-4"
                    style={{ color: 'var(--text-muted, var(--text-secondary))' }}
                  >
                    Products ({results.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        onClick={() => {
                          saveRecentSearch(query);
                          onClose();
                        }}
                        className="flex items-center gap-4 p-3 rounded-lg transition-colors hover:bg-gold/5 group"
                        style={{ borderColor: 'var(--border)' }}
                      >
                        <div
                          className="w-16 h-16 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden"
                          style={{ backgroundColor: 'var(--bg-secondary)' }}
                        >
                          <div className="w-full h-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center">
                            <Tag className="w-6 h-6 text-gold/40" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-sm font-medium truncate group-hover:text-gold transition-colors"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            {product.name}
                          </p>
                          <p
                            className="text-xs mt-0.5"
                            style={{ color: 'var(--text-muted, var(--text-secondary))' }}
                          >
                            {product.category}
                          </p>
                          <p className="text-sm font-semibold text-gold mt-1">
                            ${product.price.toLocaleString()}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-gold transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* No Results */}
              {query.trim() && results.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8 mb-8"
                >
                  <Search className="w-12 h-12 text-gold/30 mx-auto mb-3" />
                  <p style={{ color: 'var(--text-primary)' }} className="font-medium">
                    No results for &ldquo;{query}&rdquo;
                  </p>
                  <p
                    className="text-sm mt-1"
                    style={{ color: 'var(--text-muted, var(--text-secondary))' }}
                  >
                    Try different keywords or browse categories below
                  </p>
                </motion.div>
              )}

              {/* Idle State: Recent + Trending + Categories */}
              {!query.trim() && (
                <div className="space-y-8">
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3
                          className="text-sm font-semibold uppercase tracking-wider flex items-center gap-2"
                          style={{ color: 'var(--text-muted, var(--text-secondary))' }}
                        >
                          <Clock className="w-4 h-4" />
                          Recent Searches
                        </h3>
                        <button
                          onClick={clearRecentSearches}
                          className="text-xs text-gold hover:text-gold-dark transition-colors"
                        >
                          Clear All
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((term) => (
                          <button
                            key={term}
                            onClick={() => handleSearch(term)}
                            className="px-3.5 py-1.5 text-sm rounded-full border transition-all hover:bg-gold hover:text-charcoal hover:border-gold"
                            style={{
                              borderColor: 'var(--border)',
                              color: 'var(--text-secondary)',
                            }}
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Trending Searches */}
                  <div>
                    <h3
                      className="text-sm font-semibold uppercase tracking-wider flex items-center gap-2 mb-3"
                      style={{ color: 'var(--text-muted, var(--text-secondary))' }}
                    >
                      <TrendingUp className="w-4 h-4" />
                      Trending Searches
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {TRENDING_SEARCHES.map((term) => (
                        <button
                          key={term}
                          onClick={() => handleSearch(term)}
                          className="px-3.5 py-1.5 text-sm rounded-full border transition-all hover:bg-gold hover:text-charcoal hover:border-gold"
                          style={{
                            borderColor: 'var(--border)',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category Quick Links */}
                  <div>
                    <h3
                      className="text-sm font-semibold uppercase tracking-wider mb-3"
                      style={{ color: 'var(--text-muted, var(--text-secondary))' }}
                    >
                      Browse Categories
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {CATEGORY_QUICK_LINKS.map((cat) => (
                        <Link
                          key={cat.name}
                          href={cat.href}
                          onClick={onClose}
                          className="flex items-center gap-3 p-3 rounded-lg border transition-all hover:border-gold hover:bg-gold/5 group"
                          style={{ borderColor: 'var(--border)' }}
                        >
                          <span className="text-lg">{cat.emoji}</span>
                          <span
                            className="text-sm font-medium group-hover:text-gold transition-colors"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            {cat.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom edge shadow */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
