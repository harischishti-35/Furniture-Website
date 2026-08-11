'use client';

import { useState, useMemo } from 'react';
import { Search, Eye, RefreshCw, X } from 'lucide-react';
import type { Order, OrderStatus } from '@/types';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'CFM-A1B2C3',
      createdAt: '2026-06-15T10:30:00.000Z',
      status: 'delivered',
      subtotal: 1199.99,
      tax: 100.00,
      shipping: 0,
      total: 1299.99,
      shippingAddress: {
        id: '1',
        label: 'Home',
        fullName: 'Ahmed Chishti',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'US',
        phone: '555-0123',
        isDefault: true,
      },
      paymentMethod: 'Credit Card',
      estimatedDelivery: '2026-06-22',
      trackingNumber: 'TRK1234567890',
      items: [],
    },
    {
      id: 'CFM-D4E5F6',
      createdAt: '2026-06-10T14:45:00.000Z',
      status: 'shipped',
      subtotal: 699.99,
      tax: 40.01,
      shipping: 9.99,
      total: 749.99,
      shippingAddress: {
        id: '2',
        label: 'Office',
        fullName: 'Sophia Malik',
        street: '456 Business Rd',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60611',
        country: 'US',
        phone: '555-9876',
        isDefault: false,
      },
      paymentMethod: 'PayPal',
      estimatedDelivery: '2026-06-17',
      trackingNumber: 'TRK9876543210',
      items: [],
    },
    {
      id: 'CFM-G7H8I9',
      createdAt: '2026-06-01T09:15:00.000Z',
      status: 'processing',
      subtotal: 2299.00,
      tax: 160.00,
      shipping: 0,
      total: 2459.00,
      shippingAddress: {
        id: '3',
        label: 'Home',
        fullName: 'Omar Khan',
        street: '789 Residential Way',
        city: 'Houston',
        state: 'TX',
        zipCode: '77002',
        country: 'US',
        phone: '555-4567',
        isDefault: true,
      },
      paymentMethod: 'Credit Card',
      estimatedDelivery: '2026-06-08',
      trackingNumber: 'TRK1122334455',
      items: [],
    },
  ]);

  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Filter orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.shippingAddress.fullName.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = selectedStatus === 'All' || o.status === selectedStatus.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [search, selectedStatus, orders]);

  // Update order status
  const handleUpdateStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
    if (selectedOrder?.id === id) {
      setSelectedOrder((prev) => (prev ? { ...prev, status } : null));
    }
  };

  return (
    <div className="space-y-8 text-left">
      {/* Search and filter header */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <input
            type="text"
            placeholder="Search by Order ID or Customer name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 pl-11 bg-zinc-900 border border-zinc-800 rounded-xl text-sm font-body text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-gold transition-colors"
          />
          <Search className="w-4.5 h-4.5 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 scrollbar-thin">
          {['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                selectedStatus === status
                  ? 'bg-gold text-zinc-950 font-bold'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-500 font-semibold bg-zinc-900/50">
                <th className="p-4">Order ID</th>
                <th className="p-4">Date</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-300">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-zinc-850/20 transition-colors">
                    {/* ID */}
                    <td className="p-4 font-bold text-zinc-100">{order.id}</td>

                    {/* Date */}
                    <td className="p-4 text-zinc-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    {/* Customer */}
                    <td className="p-4 font-semibold text-zinc-100">
                      {order.shippingAddress.fullName}
                    </td>

                    {/* Payment */}
                    <td className="p-4 text-zinc-400">{order.paymentMethod}</td>

                    {/* Total */}
                    <td className="p-4 font-semibold text-zinc-100">${order.total.toLocaleString()}</td>

                    {/* Status */}
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-md ${
                          order.status === 'delivered'
                            ? 'bg-green-500/10 text-green-400'
                            : order.status === 'shipped'
                            ? 'bg-blue-500/10 text-blue-400'
                            : order.status === 'cancelled'
                            ? 'bg-red-500/10 text-red-400'
                            : 'bg-gold/10 text-gold'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2 items-center">
                        {/* Status update selector */}
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateStatus(order.id, e.target.value as OrderStatus)}
                          className="bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-gold transition-colors font-body cursor-pointer"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>

                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-20 text-zinc-500 font-heading">
                    No orders matching search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Drawer / Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 w-full max-w-lg space-y-6 relative text-left">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1.5">
              <h3 className="font-heading text-xl font-bold text-zinc-100">Order Information</h3>
              <p className="text-[10px] text-zinc-500">ID: {selectedOrder.id} &bull; Placed: {new Date(selectedOrder.createdAt).toLocaleString()}</p>
            </div>

            <div className="space-y-4 text-xs md:text-sm font-body border-t border-zinc-800 pt-4">
              {/* Shipping Address */}
              <div className="space-y-1">
                <h4 className="font-bold text-zinc-200 uppercase text-[10px] tracking-wider text-gold">Shipping Location</h4>
                <p className="text-zinc-400">
                  <span className="font-semibold text-zinc-300">{selectedOrder.shippingAddress.fullName}</span>
                  <br />
                  {selectedOrder.shippingAddress.street}
                  <br />
                  {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}
                  <br />
                  Phone: {selectedOrder.shippingAddress.phone}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Method */}
                <div className="space-y-1">
                  <h4 className="font-bold text-zinc-200 uppercase text-[10px] tracking-wider text-gold">Payment Method</h4>
                  <p className="text-zinc-400">{selectedOrder.paymentMethod}</p>
                </div>

                {/* Status */}
                <div className="space-y-1">
                  <h4 className="font-bold text-zinc-200 uppercase text-[10px] tracking-wider text-gold">Shipment Status</h4>
                  <p className="text-zinc-400 capitalize">{selectedOrder.status}</p>
                </div>
              </div>

              {/* Pricing breakdown */}
              <div className="border-t border-zinc-800 pt-4 space-y-2">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal:</span>
                  <span>${selectedOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Estimated Tax (8%):</span>
                  <span>${selectedOrder.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>White Glove Delivery:</span>
                  <span>{selectedOrder.shipping === 0 ? 'Free' : `$${selectedOrder.shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-zinc-100 font-bold border-t border-zinc-800 pt-2 text-base">
                  <span>Grand Total:</span>
                  <span>${selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
