'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Grid, SlidersHorizontal } from 'lucide-react';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';

interface CategoryDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryDetailPage({ params }: CategoryDetailPageProps) {
  const { slug } = React.use(params);
  const router = useRouter();

  const category = useMemo(() => {
    return categories.find((c) => c.slug === slug);
  }, [slug]);

  const categoryProducts = useMemo(() => {
    return products.filter((p) => p.category.toLowerCase().replace(/\s+/g, '-') === slug);
  }, [slug]);

  if (!category) {
    return (
      <div className="py-20 text-center min-h-screen flex flex-col items-center justify-center bg-soft-white">
        <h2 className="font-heading text-2xl font-bold text-charcoal mb-4">Category Not Found</h2>
        <p className="text-charcoal/60 mb-6 font-body">The category you are looking for does not exist or has been removed.</p>
        <Link href="/categories" className="px-6 py-2.5 bg-gold text-charcoal font-semibold rounded-xl text-sm transition-colors font-body">
          Back to Categories
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-soft-white min-h-screen pb-16 md:pb-24">
      {/* Banner Area */}
      <div className={`relative bg-gradient-to-tr ${category.gradient || 'from-charcoal to-zinc-900'} py-20 md:py-28 text-cream overflow-hidden`}>
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle,#fff_1px,transparent_1px)] bg-[size:20px_20px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-cream/70 hover:text-cream transition-colors text-xs font-semibold uppercase tracking-widest mb-6 font-body cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="max-w-2xl space-y-4">
            <h1 className="font-heading text-4xl md:text-5xl font-bold leading-tight">
              {category.name}
            </h1>
            <p className="text-sm md:text-base text-cream/80 leading-relaxed font-body">
              {category.description}
            </p>
          </div>
        </div>
      </div>

      {/* Product Listing Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-16">
        <div className="flex justify-between items-center pb-6 border-b border-cream/20 mb-8">
          <span className="text-sm text-charcoal/60 font-body">
            Showing {categoryProducts.length} items in {category.name}
          </span>
          <Link
            href="/products"
            className="flex items-center gap-2 text-xs font-bold text-gold hover:text-gold-dark transition-colors font-body uppercase tracking-wider"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            View All Catalog Filters
          </Link>
        </div>

        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-cream/10 border border-dashed border-cream/30 rounded-3xl">
            <p className="text-lg text-charcoal/50 font-heading font-medium">
              No products found in this category.
            </p>
            <p className="text-xs text-charcoal/40 font-body mt-2">
              New arrivals for this collection are coming soon.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-block px-6 py-2.5 bg-gold hover:bg-gold-light text-charcoal font-semibold rounded-xl text-sm transition-colors font-body"
            >
              Browse Full Catalog
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
