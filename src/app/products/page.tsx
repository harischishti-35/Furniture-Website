'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Grid, List, SlidersHorizontal, X, Star } from 'lucide-react';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import ProductCard from '@/components/products/ProductCard';
import ProductFilters, { FiltersState } from '@/components/products/ProductFilters';

const ITEMS_PER_PAGE = 12;

function ProductsCatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category');
  const initialFilter = searchParams.get('filter');

  // Find max product price for filter boundary
  const maxProductPrice = useMemo(() => {
    return Math.max(...products.map((p) => p.price), 1000);
  }, []);

  const [filters, setFilters] = useState<FiltersState>({
    categories: initialCategory ? [initialCategory] : [],
    priceRange: [0, maxProductPrice],
    colors: [],
    materials: [],
    rating: null,
    inStockOnly: false,
  });

  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const handleReset = () => {
    setFilters({
      categories: [],
      priceRange: [0, maxProductPrice],
      colors: [],
      materials: [],
      rating: null,
      inStockOnly: false,
    });
    setCurrentPage(1);
  };

  // Sync category search parameter when it changes
  useEffect(() => {
    if (initialCategory) {
      setFilters((prev) => ({
        ...prev,
        categories: [initialCategory],
      }));
      setCurrentPage(1);
    }
  }, [initialCategory]);

  // Sync filter search parameter (like best-sellers, trending, etc.)
  useEffect(() => {
    if (initialFilter) {
      if (initialFilter === 'best-sellers') setSortBy('best-seller');
      else if (initialFilter === 'trending') setSortBy('trending');
      else if (initialFilter === 'new-arrivals') setSortBy('new-arrival');
      setCurrentPage(1);
    }
  }, [initialFilter]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter by Category
    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category.toLowerCase().replace(/\s+/g, '-')));
    }

    // Filter by Price
    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Filter by Colors
    if (filters.colors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((color) => filters.colors.includes(color.name))
      );
    }

    // Filter by Materials
    if (filters.materials.length > 0) {
      result = result.filter((p) =>
        p.materials.some((m) => filters.materials.includes(m))
      );
    }

    // Filter by Rating
    if (filters.rating !== null) {
      result = result.filter((p) => p.rating >= (filters.rating || 0));
    }

    // Filter by Stock
    if (filters.inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // Sorting Logic
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'new-arrival') {
      result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    } else if (sortBy === 'best-seller') {
      result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    } else if (sortBy === 'trending') {
      result.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0));
    }

    return result;
  }, [filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedProducts, currentPage]);

  const removeCategoryFilter = (categorySlug: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c !== categorySlug),
    }));
    setCurrentPage(1);
  };

  const removeColorFilter = (color: string) => {
    setFilters((prev) => ({
      ...prev,
      colors: prev.colors.filter((c) => c !== color),
    }));
    setCurrentPage(1);
  };

  const removeMaterialFilter = (material: string) => {
    setFilters((prev) => ({
      ...prev,
      materials: prev.materials.filter((m) => m !== material),
    }));
    setCurrentPage(1);
  };

  const removeRatingFilter = () => {
    setFilters((prev) => ({ ...prev, rating: null }));
    setCurrentPage(1);
  };

  const activeFilterCount =
    filters.categories.length +
    filters.colors.length +
    filters.materials.length +
    (filters.rating !== null ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < maxProductPrice ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0);

  return (
    <div className="py-10 md:py-16 bg-soft-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs & Title */}
        <div className="mb-8">
          <nav className="text-xs text-charcoal/40 uppercase tracking-wider mb-2 font-body">
            <Link href="/" className="hover:text-gold transition-colors">
              Home
            </Link>{' '}
            / <span className="text-charcoal/70">Shop Catalog</span>
          </nav>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-charcoal">
            Our Collection
          </h1>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-cream/20 mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-cream/40 rounded-xl text-sm font-medium hover:border-gold transition-colors font-body"
            >
              <SlidersHorizontal className="w-4 h-4 text-gold" />
              Filters
            </button>
            <span className="text-sm text-charcoal/60 font-body">
              Showing {filteredAndSortedProducts.length} products
            </span>
          </div>

          <div className="flex items-center gap-3 justify-between sm:justify-end">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center border border-cream/20 rounded-xl overflow-hidden bg-cream/10 p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-gold text-charcoal shadow-sm'
                    : 'text-charcoal/60 hover:text-charcoal'
                }`}
                aria-label="Grid view"
              >
                <Grid className="w-4.5 h-4.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-gold text-charcoal shadow-sm'
                    : 'text-charcoal/60 hover:text-charcoal'
                }`}
                aria-label="List view"
              >
                <List className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-xs text-charcoal/50 uppercase tracking-wider font-semibold">
                Sort By
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2.5 bg-soft-white border border-cream/40 rounded-xl text-sm text-charcoal focus:outline-none focus:border-gold font-body"
              >
                <option value="featured">Featured</option>
                <option value="best-seller">Best Sellers</option>
                <option value="new-arrival">New Arrivals</option>
                <option value="trending">Trending</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0 bg-soft-white p-2 rounded-2xl border border-cream/10">
            <ProductFilters
              filters={filters}
              onChange={(f) => {
                setFilters(f);
                setCurrentPage(1);
              }}
              maxPrice={maxProductPrice}
            />
          </div>

          {/* Catalog Area */}
          <div className="flex-grow w-full space-y-8">
            {/* Active Filters Chips */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-charcoal/50 font-semibold font-body mr-1">Active:</span>
                {filters.categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => removeCategoryFilter(c)}
                    className="flex items-center gap-1 px-3 py-1 bg-cream/30 hover:bg-cream/55 text-xs text-charcoal/80 rounded-full border border-cream/25 transition-colors font-body"
                  >
                    Category: {categories.find((cat) => cat.slug === c)?.name || c}
                    <X className="w-3 h-3 text-charcoal/40" />
                  </button>
                ))}
                {filters.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => removeColorFilter(color)}
                    className="flex items-center gap-1 px-3 py-1 bg-cream/30 hover:bg-cream/55 text-xs text-charcoal/80 rounded-full border border-cream/25 transition-colors font-body"
                  >
                    Color: {color}
                    <X className="w-3 h-3 text-charcoal/40" />
                  </button>
                ))}
                {filters.materials.map((m) => (
                  <button
                    key={m}
                    onClick={() => removeMaterialFilter(m)}
                    className="flex items-center gap-1 px-3 py-1 bg-cream/30 hover:bg-cream/55 text-xs text-charcoal/80 rounded-full border border-cream/25 transition-colors font-body"
                  >
                    Material: {m}
                    <X className="w-3 h-3 text-charcoal/40" />
                  </button>
                ))}
                {filters.rating !== null && (
                  <button
                    onClick={removeRatingFilter}
                    className="flex items-center gap-1 px-3 py-1 bg-cream/30 hover:bg-cream/55 text-xs text-charcoal/80 rounded-full border border-cream/25 transition-colors font-body"
                  >
                    Rating: {filters.rating}+ Stars
                    <X className="w-3 h-3 text-charcoal/40" />
                  </button>
                )}
                {(filters.priceRange[0] > 0 || filters.priceRange[1] < maxProductPrice) && (
                  <button
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, priceRange: [0, maxProductPrice] }))
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-cream/30 hover:bg-cream/55 text-xs text-charcoal/80 rounded-full border border-cream/25 transition-colors font-body"
                  >
                    Price: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                    <X className="w-3 h-3 text-charcoal/40" />
                  </button>
                )}
                {filters.inStockOnly && (
                  <button
                    onClick={() => setFilters((prev) => ({ ...prev, inStockOnly: false }))}
                    className="flex items-center gap-1 px-3 py-1 bg-cream/30 hover:bg-cream/55 text-xs text-charcoal/80 rounded-full border border-cream/25 transition-colors font-body"
                  >
                    In Stock Only
                    <X className="w-3 h-3 text-charcoal/40" />
                  </button>
                )}
              </div>
            )}

            {/* Products Grid/List */}
            {paginatedProducts.length > 0 ? (
              viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {paginatedProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      className="block group bg-soft-white border border-cream/25 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex flex-col sm:flex-row gap-6 p-5">
                        <div className="w-full sm:w-48 aspect-square rounded-xl overflow-hidden bg-cream/25 flex-shrink-0 flex items-center justify-center relative">
                          <img
                            src={product.images[0]?.url}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          <svg
                            className="absolute w-12 h-12 text-charcoal/[0.04]"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M20 8V6c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v2c-1.1 0-2 .9-2 2v6h2v2h2v-2h12v2h2v-2h2v-6c0-1.1-.9-2-2-2zM6 6h12v2H6V6zm14 10H4v-4c0-.55.45-1 1-1h1v3h12v-3h1c.55 0 1 .45 1 1v4z" />
                          </svg>
                        </div>
                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div className="space-y-2">
                            <span className="text-xs text-charcoal/40 uppercase tracking-widest font-bold">
                              {product.category}
                            </span>
                            <h3 className="font-heading text-xl font-bold text-charcoal group-hover:text-gold transition-colors">
                              {product.name}
                            </h3>
                            <p className="text-sm text-charcoal/60 leading-relaxed font-body line-clamp-2">
                              {product.shortDescription}
                            </p>
                            <div className="flex items-center gap-1 pt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3.5 h-3.5 ${
                                    i < Math.floor(product.rating)
                                      ? 'fill-gold text-gold'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                              <span className="text-xs text-charcoal/40 font-semibold font-body ml-1">
                                ({product.reviewCount} reviews)
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between border-t border-cream/15 pt-4 mt-6">
                            <span className="text-xl font-bold text-charcoal font-body">
                              ${product.price.toLocaleString()}
                            </span>
                            <span className="px-6 py-2.5 bg-gold text-charcoal hover:bg-gold-light transition-colors rounded-xl text-sm font-semibold font-body">
                              View Details
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )
            ) : (
              <div className="text-center py-20 bg-cream/10 border border-dashed border-cream/30 rounded-2xl">
                <p className="text-lg text-charcoal/50 font-heading font-medium">
                  No products match your filters.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-4 px-6 py-2.5 bg-gold hover:bg-gold-light text-charcoal font-semibold rounded-xl text-sm transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 pt-8">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-cream/40 rounded-xl text-sm font-medium hover:border-gold transition-colors font-body disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-xl text-sm font-medium transition-colors font-body ${
                      currentPage === i + 1
                        ? 'bg-gold text-charcoal font-bold'
                        : 'border border-cream/40 hover:border-gold'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-cream/40 rounded-xl text-sm font-medium hover:border-gold transition-colors font-body disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <MobileFiltersDrawer
        isOpen={isMobileFiltersOpen}
        onClose={() => setIsMobileFiltersOpen(false)}
        filters={filters}
        onChange={setFilters}
        maxPrice={maxProductPrice}
        resetAll={handleReset}
      />
    </div>
  );
}

interface MobileFiltersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FiltersState;
  onChange: (filters: FiltersState) => void;
  maxPrice: number;
  resetAll: () => void;
}

function MobileFiltersDrawer({
  isOpen,
  onClose,
  filters,
  onChange,
  maxPrice,
  resetAll,
}: MobileFiltersDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Content Drawer */}
      <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-soft-white py-4 pb-12 shadow-xl p-6">
        <div className="flex items-center justify-between pb-4 border-b border-cream/20 mb-6">
          <h2 className="font-heading text-lg font-bold text-charcoal">Filters</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-cream text-charcoal"
            aria-label="Close filters"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <ProductFilters filters={filters} onChange={onChange} maxPrice={maxPrice} />

        <div className="mt-8 space-y-3">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gold hover:bg-gold-light text-charcoal font-semibold rounded-xl text-sm transition-colors"
          >
            Apply Filters
          </button>
          <button
            onClick={() => {
              resetAll();
              onClose();
            }}
            className="w-full py-3 border border-cream hover:bg-cream/10 text-charcoal font-medium rounded-xl text-sm transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 bg-soft-white min-h-screen flex items-center justify-center animate-pulse">
          <p className="text-lg font-heading text-charcoal/50">Loading Collection...</p>
        </div>
      }
    >
      <ProductsCatalogContent />
    </Suspense>
  );
}
