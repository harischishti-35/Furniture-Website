'use client';

import { useState, useMemo } from 'react';
import { Search, Plus, Edit2, Trash2, X, AlertCircle } from 'lucide-react';
import { products as initialProducts } from '@/data/products';
import { categories } from '@/data/categories';
import type { Product } from '@/types';

export default function AdminProductsPage() {
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [form, setForm] = useState({
    name: '',
    sku: '',
    category: 'Living Room',
    price: 0,
    stockQuantity: 0,
  });

  const [formError, setFormError] = useState('');

  // Filter products
  const filteredProducts = useMemo(() => {
    return productList.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory, productList]);

  // Open modal for adding
  const handleOpenAddModal = () => {
    setIsEditing(false);
    setForm({
      name: '',
      sku: `CFM-PRD-${Math.floor(100 + Math.random() * 900)}`,
      category: 'Living Room',
      price: 299.99,
      stockQuantity: 10,
    });
    setFormError('');
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleOpenEditModal = (p: Product) => {
    setIsEditing(true);
    setEditingId(p.id);
    setForm({
      name: p.name,
      sku: p.sku,
      category: p.category,
      price: p.price,
      stockQuantity: p.stockQuantity,
    });
    setFormError('');
    setIsModalOpen(true);
  };

  // Handle Save
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setFormError('Product name is required');
      return;
    }

    if (isEditing && editingId) {
      setProductList((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? {
                ...p,
                name: form.name,
                sku: form.sku,
                category: form.category,
                price: Number(form.price),
                stockQuantity: Number(form.stockQuantity),
                inStock: Number(form.stockQuantity) > 0,
              }
            : p
        )
      );
    } else {
      const newProduct: Product = {
        id: (productList.length + 1).toString(),
        name: form.name,
        slug: form.name.toLowerCase().replace(/\s+/g, '-'),
        description: 'Bespoke item added via administrative console.',
        shortDescription: 'Bespoke item added via administrative console.',
        price: Number(form.price),
        originalPrice: Number(form.price),
        discount: 0,
        images: [{ id: 'new-img', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', alt: form.name }],
        category: form.category,
        subcategory: 'Custom',
        colors: [{ name: 'Default', hex: '#A89880' }],
        sizes: [{ label: 'Standard', dimensions: 'N/A', priceModifier: 0 }],
        materials: ['Solid Oak'],
        dimensions: { width: 100, height: 75, depth: 80, unit: 'cm' },
        weight: 15,
        specifications: {},
        rating: 5.0,
        reviewCount: 0,
        reviews: [],
        inStock: Number(form.stockQuantity) > 0,
        stockQuantity: Number(form.stockQuantity),
        sku: form.sku,
        tags: ['custom'],
        isFeatured: false,
        isNewArrival: true,
        isBestSeller: false,
        isTrending: false,
        createdAt: new Date().toISOString(),
      };
      setProductList((prev) => [newProduct, ...prev]);
    }

    setIsModalOpen(false);
  };

  // Handle Delete
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProductList((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-8 text-left">
      {/* Header and Add button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-zinc-100 md:hidden">Products</h1>
          <p className="text-xs text-zinc-500 md:hidden">Catalog list and inventory management.</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-gold hover:bg-gold-light text-zinc-950 font-bold rounded-xl text-sm transition-all duration-300 shadow-md cursor-pointer ml-auto"
        >
          <Plus className="w-4.5 h-4.5" />
          Add Product
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <input
            type="text"
            placeholder="Search by name or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 pl-11 bg-zinc-900 border border-zinc-800 rounded-xl text-sm font-body text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-gold transition-colors"
          />
          <Search className="w-4.5 h-4.5 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>

        {/* Category filter */}
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 scrollbar-thin">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
              selectedCategory === 'All'
                ? 'bg-gold text-zinc-950 font-bold'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.name
                  ? 'bg-gold text-zinc-950 font-bold'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-500 font-semibold bg-zinc-900/50">
                <th className="p-4">Product</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-300">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-zinc-850/20 transition-colors">
                    {/* Name */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images[0]?.url}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded-lg bg-zinc-950 border border-zinc-800"
                        />
                        <div className="text-left font-body">
                          <p className="font-bold text-zinc-100">{product.name}</p>
                          <p className="text-[10px] text-zinc-500 capitalize">{product.subcategory}</p>
                        </div>
                      </div>
                    </td>

                    {/* SKU */}
                    <td className="p-4 font-mono text-zinc-400">{product.sku}</td>

                    {/* Category */}
                    <td className="p-4 text-zinc-400">{product.category}</td>

                    {/* Price */}
                    <td className="p-4 font-semibold text-zinc-100">${product.price.toLocaleString()}</td>

                    {/* Stock */}
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-md ${
                          product.stockQuantity === 0
                            ? 'bg-red-500/10 text-red-400'
                            : product.stockQuantity < 10
                            ? 'bg-amber-500/10 text-amber-400'
                            : 'bg-green-500/10 text-green-400'
                        }`}
                      >
                        {product.stockQuantity === 0
                          ? 'Out of Stock'
                          : product.stockQuantity < 10
                          ? `Low Stock (${product.stockQuantity})`
                          : `In Stock (${product.stockQuantity})`}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(product)}
                          className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-zinc-100 rounded-lg cursor-pointer transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg cursor-pointer transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-20 text-zinc-500 font-heading">
                    No products matching search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 w-full max-w-lg space-y-6 relative text-left">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-heading text-xl font-bold text-zinc-100">
              {isEditing ? 'Edit Product Details' : 'Register New Product'}
            </h3>

            {formError && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl font-body">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs md:text-sm font-body">
              {/* Product Name */}
              <div className="space-y-1.5">
                <label className="font-semibold text-zinc-400">Product Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Oak Display Shelf"
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* SKU */}
                <div className="space-y-1.5">
                  <label className="font-semibold text-zinc-400">SKU Reference</label>
                  <input
                    type="text"
                    value={form.sku}
                    onChange={(e) => setForm({ ...form, sku: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1.5">
                  <label className="font-semibold text-zinc-400">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:border-gold transition-colors"
                  >
                    <option value="Living Room">Living Room</option>
                    <option value="Bedroom">Bedroom</option>
                    <option value="Dining Room">Dining Room</option>
                    <option value="Office">Office</option>
                    <option value="Outdoor">Outdoor</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Price */}
                <div className="space-y-1.5">
                  <label className="font-semibold text-zinc-400">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>

                {/* Stock Quantity */}
                <div className="space-y-1.5">
                  <label className="font-semibold text-zinc-400">Stock Quantity</label>
                  <input
                    type="number"
                    value={form.stockQuantity}
                    onChange={(e) => setForm({ ...form, stockQuantity: Number(e.target.value) })}
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gold hover:bg-gold-light text-zinc-950 font-bold rounded-xl text-sm transition-colors cursor-pointer shadow-md mt-4"
              >
                {isEditing ? 'Save Product Details' : 'Register Product'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
