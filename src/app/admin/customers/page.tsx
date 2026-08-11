'use client';

import { useState, useMemo } from 'react';
import { Search, ToggleLeft, ToggleRight, Mail, Phone, Calendar } from 'lucide-react';

interface CustomerItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedDate: string;
  orderCount: number;
  rewardPoints: number;
  status: 'active' | 'suspended';
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<CustomerItem[]>([
    {
      id: 'c-1',
      name: 'Ahmed Chishti',
      email: 'ahmed@chishti.com',
      phone: '555-0123',
      joinedDate: '2026-06-01',
      orderCount: 3,
      rewardPoints: 1250,
      status: 'active',
    },
    {
      id: 'c-2',
      name: 'Sophia Malik',
      email: 'sophia@example.com',
      phone: '555-9876',
      joinedDate: '2026-05-12',
      orderCount: 1,
      rewardPoints: 340,
      status: 'active',
    },
    {
      id: 'c-3',
      name: 'Omar Khan',
      email: 'omar@example.com',
      phone: '555-4567',
      joinedDate: '2026-04-18',
      orderCount: 5,
      rewardPoints: 2100,
      status: 'active',
    },
    {
      id: 'c-4',
      name: 'Ayesha Rahman',
      email: 'ayesha.r@example.com',
      phone: '555-7890',
      joinedDate: '2026-03-24',
      orderCount: 0,
      rewardPoints: 100,
      status: 'suspended',
    },
  ]);

  const [search, setSearch] = useState('');

  const filteredCustomers = useMemo(() => {
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, customers]);

  const handleToggleStatus = (id: string) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === 'active' ? 'suspended' : 'active' } : c
      )
    );
  };

  return (
    <div className="space-y-8 text-left">
      {/* Search Header */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <input
            type="text"
            placeholder="Search by customer name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 pl-11 bg-zinc-900 border border-zinc-800 rounded-xl text-sm font-body text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-gold transition-colors"
          />
          <Search className="w-4.5 h-4.5 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-500 font-semibold bg-zinc-900/50">
                <th className="p-4">Customer</th>
                <th className="p-4">Joined Date</th>
                <th className="p-4">Total Orders</th>
                <th className="p-4">Reward Balance</th>
                <th className="p-4">Account Status</th>
                <th className="p-4 text-right">Access Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-300">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-zinc-850/20 transition-colors">
                    {/* Customer Info */}
                    <td className="p-4">
                      <div className="text-left font-body">
                        <p className="font-bold text-zinc-100">{c.name}</p>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-zinc-500">
                          <span className="flex items-center gap-0.5"><Mail className="w-3 h-3 text-gold" /> {c.email}</span>
                          <span>&bull;</span>
                          <span className="flex items-center gap-0.5"><Phone className="w-3 h-3 text-gold" /> {c.phone}</span>
                        </div>
                      </div>
                    </td>

                    {/* Joined Date */}
                    <td className="p-4 text-zinc-400">
                      <span className="flex items-center gap-1.5 font-body">
                        <Calendar className="w-3.5 h-3.5 text-zinc-600" />
                        {new Date(c.joinedDate).toLocaleDateString()}
                      </span>
                    </td>

                    {/* Order Count */}
                    <td className="p-4 font-semibold text-zinc-100 font-body">{c.orderCount} Orders</td>

                    {/* Reward Points */}
                    <td className="p-4 font-semibold text-gold font-body">{c.rewardPoints} pts</td>

                    {/* Status */}
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-md ${
                          c.status === 'active'
                            ? 'bg-green-500/10 text-green-400'
                            : 'bg-red-500/10 text-red-400'
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleToggleStatus(c.id)}
                        className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                          c.status === 'active'
                            ? 'border-red-500/30 text-red-400 hover:bg-red-500/10'
                            : 'border-green-500/30 text-green-400 hover:bg-green-500/10'
                        }`}
                      >
                        {c.status === 'active' ? (
                          <>
                            <ToggleLeft className="w-4 h-4" />
                            Suspend
                          </>
                        ) : (
                          <>
                            <ToggleRight className="w-4 h-4" />
                            Activate
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-20 text-zinc-500 font-heading">
                    No customers found matching search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
