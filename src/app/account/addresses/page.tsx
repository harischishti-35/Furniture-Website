'use client';

import { useState } from 'react';
import { MapPin, Plus, Trash2, Edit3, ShieldCheck, Home, Check } from 'lucide-react';
import { useUserStore } from '@/store/userStore';
import type { Address } from '@/types';

export default function AddressesPage() {
  const { addresses, addAddress, updateAddress, removeAddress, setDefaultAddress } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  // Form State
  const [label, setLabel] = useState('Home');
  const [fullName, setFullName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phone, setPhone] = useState('');

  const openAddModal = () => {
    setEditingAddress(null);
    setLabel('Home');
    setFullName('');
    setStreet('');
    setCity('');
    setState('');
    setZipCode('');
    setPhone('');
    setIsModalOpen(true);
  };

  const openEditModal = (addr: Address) => {
    setEditingAddress(addr);
    setLabel(addr.label || 'Home');
    setFullName(addr.fullName);
    setStreet(addr.street);
    setCity(addr.city);
    setState(addr.state);
    setZipCode(addr.zipCode || (addr as any).zip || '');
    setPhone(addr.phone);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !street || !city || !state || !zipCode || !phone) return;

    if (editingAddress) {
      updateAddress(editingAddress.id, {
        label,
        fullName,
        street,
        city,
        state,
        zipCode,
        phone,
      });
    } else {
      const newAddr: Address = {
        id: 'addr-' + Math.random().toString(36).substr(2, 9),
        label,
        fullName,
        street,
        city,
        state,
        zipCode,
        country: 'US',
        phone,
        isDefault: addresses.length === 0,
      };
      addAddress(newAddr);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 font-body">
      <div className="flex items-center justify-between border-b border-cream/15 pb-4">
        <h2 className="font-heading text-xl md:text-2xl font-bold text-charcoal">Shipping Addresses</h2>
        <button
          onClick={openAddModal}
          className="flex items-center gap-1.5 px-4 py-2 bg-gold hover:bg-gold-light text-charcoal font-semibold rounded-xl text-xs transition-colors cursor-pointer shadow-md"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Address
        </button>
      </div>

      {addresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`bg-soft-white border rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all duration-300 ${
                addr.isDefault ? 'border-gold ring-2 ring-gold/10' : 'border-cream/20 hover:shadow-md'
              }`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-cream/30 text-charcoal text-[10px] uppercase tracking-wider font-bold rounded-full border border-cream/25">
                    <Home className="w-3 h-3 text-gold" />
                    {addr.label || 'Address'}
                  </span>
                  {addr.isDefault && (
                    <span className="text-[10px] text-gold font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      Default Address
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <h4 className="font-heading text-base font-bold text-charcoal">{addr.fullName}</h4>
                  <p className="text-sm text-charcoal/70 leading-relaxed">
                    {addr.street}
                    <br />
                    {addr.city}, {addr.state} {addr.zipCode || (addr as any).zip}
                  </p>
                  <p className="text-xs text-charcoal/50 pt-1">Phone: {addr.phone}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between border-t border-cream/15 pt-4 mt-6">
                {!addr.isDefault ? (
                  <button
                    onClick={() => setDefaultAddress(addr.id)}
                    className="text-xs text-gold hover:text-gold-dark hover:underline font-semibold cursor-pointer"
                  >
                    Set as Default
                  </button>
                ) : (
                  <span className="text-[10px] text-charcoal/30 uppercase tracking-widest font-bold font-body">Active</span>
                )}

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => openEditModal(addr)}
                    className="text-charcoal/55 hover:text-gold p-1.5 rounded-full hover:bg-cream/10 transition-colors cursor-pointer"
                    title="Edit address"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeAddress(addr.id)}
                    disabled={addr.isDefault && addresses.length > 1}
                    className="text-charcoal/55 hover:text-red-500 p-1.5 rounded-full hover:bg-cream/10 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Delete address"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-cream/5 border border-dashed border-cream/35 rounded-2xl">
          <p className="text-charcoal/50 text-base font-heading font-medium mb-4">No shipping addresses configured.</p>
          <button
            onClick={openAddModal}
            className="px-6 py-2.5 bg-gold text-charcoal font-semibold rounded-xl text-sm transition-colors cursor-pointer"
          >
            Add First Address
          </button>
        </div>
      )}

      {/* Address Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-soft-white border border-cream/25 shadow-2xl rounded-2xl w-full max-w-md p-6 relative">
            <h3 className="font-heading text-lg font-bold text-charcoal mb-4">
              {editingAddress ? 'Edit Address' : 'Add New Address'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-charcoal/50 uppercase tracking-wider font-semibold block mb-1">
                    Label (e.g. Home, Work)
                  </label>
                  <input
                    type="text"
                    required
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    className="w-full px-4 py-2.5 bg-soft-white border border-cream/45 rounded-xl text-sm focus:outline-none focus:border-gold font-body"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-charcoal/50 uppercase tracking-wider font-semibold block mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-soft-white border border-cream/45 rounded-xl text-sm focus:outline-none focus:border-gold font-body"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-charcoal/50 uppercase tracking-wider font-semibold block mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full px-4 py-2.5 bg-soft-white border border-cream/45 rounded-xl text-sm focus:outline-none focus:border-gold font-body"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] text-charcoal/50 uppercase tracking-wider font-semibold block mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2.5 bg-soft-white border border-cream/45 rounded-xl text-sm focus:outline-none focus:border-gold font-body"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-charcoal/50 uppercase tracking-wider font-semibold block mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2.5 bg-soft-white border border-cream/45 rounded-xl text-sm focus:outline-none focus:border-gold font-body"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-charcoal/50 uppercase tracking-wider font-semibold block mb-1">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="w-full px-3 py-2.5 bg-soft-white border border-cream/45 rounded-xl text-sm focus:outline-none focus:border-gold font-body"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-charcoal/50 uppercase tracking-wider font-semibold block mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 bg-soft-white border border-cream/45 rounded-xl text-sm focus:outline-none focus:border-gold font-body"
                />
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 border border-cream/40 rounded-xl text-xs font-semibold font-body text-charcoal/70 hover:border-gold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gold hover:bg-gold-light text-charcoal font-semibold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  {editingAddress ? 'Save Changes' : 'Add Address'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
