'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Star, RotateCcw } from 'lucide-react';
import { categories } from '@/data/categories';

export interface FiltersState {
  categories: string[];
  priceRange: [number, number];
  colors: string[];
  materials: string[];
  rating: number | null;
  inStockOnly: boolean;
}

interface ProductFiltersProps {
  filters: FiltersState;
  onChange: (filters: FiltersState) => void;
  maxPrice: number;
}

const colorSwatches = [
  { name: 'Walnut', hex: '#5c3d2e' },
  { name: 'Charcoal', stroke: '#1a1a2e', hex: '#2d2d4e' },
  { name: 'Gold', hex: '#c9a96e' },
  { name: 'Cream', hex: '#f5f0e8' },
  { name: 'Sage', hex: '#7c9473' },
  { name: 'White', hex: '#fafaf7' },
];

const availableMaterials = [
  'Solid Walnut',
  'Solid Oak',
  'Teak Wood',
  'Velvet Fabric',
  'Top-grain Leather',
  'Bouclé Fabric',
  'Linen Fabric',
  'Stainless Steel',
  'Tempered Glass',
  'Italian Marble',
];

export default function ProductFilters({
  filters,
  onChange,
  maxPrice,
}: ProductFiltersProps) {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    colors: true,
    materials: true,
    rating: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCategoryToggle = (categorySlug: string) => {
    const isSelected = filters.categories.includes(categorySlug);
    const updatedCategories = isSelected
      ? filters.categories.filter((c) => c !== categorySlug)
      : [...filters.categories, categorySlug];
    onChange({ ...filters, categories: updatedCategories });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: 0 | 1) => {
    const value = parseInt(e.target.value) || 0;
    const updatedRange = [...filters.priceRange] as [number, number];
    updatedRange[index] = value;
    onChange({ ...filters, priceRange: updatedRange });
  };

  const handleColorToggle = (colorName: string) => {
    const isSelected = filters.colors.includes(colorName);
    const updatedColors = isSelected
      ? filters.colors.filter((c) => c !== colorName)
      : [...filters.colors, colorName];
    onChange({ ...filters, colors: updatedColors });
  };

  const handleMaterialToggle = (material: string) => {
    const isSelected = filters.materials.includes(material);
    const updatedMaterials = isSelected
      ? filters.materials.filter((m) => m !== material)
      : [...filters.materials, material];
    onChange({ ...filters, materials: updatedMaterials });
  };

  const handleRatingSelect = (ratingValue: number) => {
    onChange({
      ...filters,
      rating: filters.rating === ratingValue ? null : ratingValue,
    });
  };

  const handleReset = () => {
    onChange({
      categories: [],
      priceRange: [0, maxPrice],
      colors: [],
      materials: [],
      rating: null,
      inStockOnly: false,
    });
  };

  return (
    <div className="space-y-6 w-full lg:max-w-xs pr-0 lg:pr-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-cream/20">
        <h2 className="font-heading text-lg font-bold text-charcoal">Filters</h2>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 text-xs text-gold hover:text-gold-dark transition-colors font-medium font-body"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset All
        </button>
      </div>

      {/* Stock availability */}
      <div className="flex items-center justify-between py-2">
        <span className="text-sm font-medium text-charcoal/70 font-body">In Stock Only</span>
        <button
          onClick={() => onChange({ ...filters, inStockOnly: !filters.inStockOnly })}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            filters.inStockOnly ? 'bg-gold' : 'bg-gray-300'
          }`}
          role="switch"
          aria-checked={filters.inStockOnly}
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              filters.inStockOnly ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Category Section */}
      <div className="border-b border-cream/20 pb-5">
        <button
          onClick={() => toggleSection('categories')}
          className="flex w-full items-center justify-between py-2 text-left font-heading text-sm font-bold text-charcoal"
        >
          <span>Categories</span>
          {expandedSections.categories ? (
            <ChevronUp className="w-4 h-4 text-charcoal/50" />
          ) : (
            <ChevronDown className="w-4 h-4 text-charcoal/50" />
          )}
        </button>

        {expandedSections.categories && (
          <div className="mt-3 space-y-2">
            {categories.map((category) => (
              <label
                key={category.id}
                className="flex items-center gap-3 cursor-pointer text-sm text-charcoal/70 hover:text-gold transition-colors font-body"
              >
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category.slug)}
                  onChange={() => handleCategoryToggle(category.slug)}
                  className="w-4 h-4 rounded border-cream/55 text-gold focus:ring-gold focus:outline-none"
                />
                <span>{category.name}</span>
                <span className="ml-auto text-xs text-charcoal/40 font-medium">
                  ({category.productCount})
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Section */}
      <div className="border-b border-cream/20 pb-5">
        <button
          onClick={() => toggleSection('price')}
          className="flex w-full items-center justify-between py-2 text-left font-heading text-sm font-bold text-charcoal"
        >
          <span>Price Range</span>
          {expandedSections.price ? (
            <ChevronUp className="w-4 h-4 text-charcoal/50" />
          ) : (
            <ChevronDown className="w-4 h-4 text-charcoal/50" />
          )}
        </button>

        {expandedSections.price && (
          <div className="mt-4 space-y-4">
            <input
              type="range"
              min="0"
              max={maxPrice}
              value={filters.priceRange[1]}
              onChange={(e) => {
                const updatedPrice = [...filters.priceRange] as [number, number];
                updatedPrice[1] = parseInt(e.target.value) || 0;
                onChange({ ...filters, priceRange: updatedPrice });
              }}
              className="w-full accent-gold bg-cream h-1 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="text-[10px] text-charcoal/40 font-semibold uppercase block mb-1">
                  Min Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-charcoal/40">
                    $
                  </span>
                  <input
                    type="number"
                    value={filters.priceRange[0]}
                    onChange={(e) => handlePriceChange(e, 0)}
                    className="w-full pl-6 pr-3 py-2 bg-soft-white border border-cream/40 rounded-lg text-sm text-charcoal focus:outline-none focus:border-gold font-body"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="text-[10px] text-charcoal/40 font-semibold uppercase block mb-1">
                  Max Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-charcoal/40">
                    $
                  </span>
                  <input
                    type="number"
                    value={filters.priceRange[1]}
                    onChange={(e) => handlePriceChange(e, 1)}
                    className="w-full pl-6 pr-3 py-2 bg-soft-white border border-cream/40 rounded-lg text-sm text-charcoal focus:outline-none focus:border-gold font-body"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Colors Section */}
      <div className="border-b border-cream/20 pb-5">
        <button
          onClick={() => toggleSection('colors')}
          className="flex w-full items-center justify-between py-2 text-left font-heading text-sm font-bold text-charcoal"
        >
          <span>Colors</span>
          {expandedSections.colors ? (
            <ChevronUp className="w-4 h-4 text-charcoal/50" />
          ) : (
            <ChevronDown className="w-4 h-4 text-charcoal/50" />
          )}
        </button>

        {expandedSections.colors && (
          <div className="mt-3 flex flex-wrap gap-2.5">
            {colorSwatches.map((color) => {
              const isSelected = filters.colors.includes(color.name);
              return (
                <button
                  key={color.name}
                  onClick={() => handleColorToggle(color.name)}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                    isSelected
                      ? 'border-gold scale-110 shadow-md ring-2 ring-gold/20'
                      : 'border-cream/35 hover:scale-105'
                  }`}
                  title={color.name}
                >
                  <span
                    className="w-6 h-6 rounded-full block border border-black/5"
                    style={{ backgroundColor: color.hex }}
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Materials Section */}
      <div className="border-b border-cream/20 pb-5">
        <button
          onClick={() => toggleSection('materials')}
          className="flex w-full items-center justify-between py-2 text-left font-heading text-sm font-bold text-charcoal"
        >
          <span>Materials</span>
          {expandedSections.materials ? (
            <ChevronUp className="w-4 h-4 text-charcoal/50" />
          ) : (
            <ChevronDown className="w-4 h-4 text-charcoal/50" />
          )}
        </button>

        {expandedSections.materials && (
          <div className="mt-3 space-y-2">
            {availableMaterials.map((material) => (
              <label
                key={material}
                className="flex items-center gap-3 cursor-pointer text-sm text-charcoal/70 hover:text-gold transition-colors font-body"
              >
                <input
                  type="checkbox"
                  checked={filters.materials.includes(material)}
                  onChange={() => handleMaterialToggle(material)}
                  className="w-4 h-4 rounded border-cream/55 text-gold focus:ring-gold focus:outline-none"
                />
                <span>{material}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rating Section */}
      <div className="pb-2">
        <button
          onClick={() => toggleSection('rating')}
          className="flex w-full items-center justify-between py-2 text-left font-heading text-sm font-bold text-charcoal"
        >
          <span>Minimum Rating</span>
          {expandedSections.rating ? (
            <ChevronUp className="w-4 h-4 text-charcoal/50" />
          ) : (
            <ChevronDown className="w-4 h-4 text-charcoal/50" />
          )}
        </button>

        {expandedSections.rating && (
          <div className="mt-3 space-y-2">
            {[4, 3, 2].map((stars) => {
              const isSelected = filters.rating === stars;
              return (
                <button
                  key={stars}
                  onClick={() => handleRatingSelect(stars)}
                  className={`flex w-full items-center gap-2 py-1 text-sm text-left hover:text-gold transition-colors font-body ${
                    isSelected ? 'text-gold font-semibold' : 'text-charcoal/70'
                  }`}
                >
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < stars ? 'fill-gold text-gold' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span>& Up</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
