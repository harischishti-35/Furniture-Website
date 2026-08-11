import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Address, Order, Product } from '@/types';

interface UserState {
  user: User | null;
  addresses: Address[];
  orders: Order[];
  recentlyViewed: Product[];
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addAddress: (address: Address) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  addOrder: (order: Order) => void;
  addRecentlyViewed: (product: Product) => void;
}

const mockOrders: Order[] = [
  {
    id: 'CFM-A1B2C3',
    createdAt: '2026-06-15',
    status: 'delivered',
    items: [],
    total: 1299.99,
    subtotal: 1199.99,
    shipping: 0,
    tax: 100.00,
    shippingAddress: { id: '1', label: 'Home', fullName: 'Ahmed Chishti', street: '123 Main St', city: 'New York', state: 'NY', zipCode: '10001', country: 'US', phone: '555-0123', isDefault: true },
    paymentMethod: 'Credit Card',
    estimatedDelivery: '2026-06-22',
    trackingNumber: 'TRK1234567890'
  },
  {
    id: 'CFM-D4E5F6',
    createdAt: '2026-06-10',
    status: 'shipped',
    items: [],
    total: 749.99,
    subtotal: 699.99,
    shipping: 9.99,
    tax: 40.01,
    shippingAddress: { id: '1', label: 'Home', fullName: 'Ahmed Chishti', street: '123 Main St', city: 'New York', state: 'NY', zipCode: '10001', country: 'US', phone: '555-0123', isDefault: true },
    paymentMethod: 'PayPal',
    estimatedDelivery: '2026-06-17',
    trackingNumber: 'TRK9876543210'
  },
  {
    id: 'CFM-G7H8I9',
    createdAt: '2026-06-01',
    status: 'processing',
    items: [],
    total: 2459.00,
    subtotal: 2299.00,
    shipping: 0,
    tax: 160.00,
    shippingAddress: { id: '1', label: 'Home', fullName: 'Ahmed Chishti', street: '123 Main St', city: 'New York', state: 'NY', zipCode: '10001', country: 'US', phone: '555-0123', isDefault: true },
    paymentMethod: 'Credit Card',
    estimatedDelivery: '2026-06-08',
    trackingNumber: 'TRK1122334455'
  },
];

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      addresses: [
        { id: '1', label: 'Home', fullName: 'Ahmed Chishti', street: '123 Main Street', city: 'New York', state: 'NY', zipCode: '10001', country: 'US', phone: '555-0123', isDefault: true },
      ],
      orders: mockOrders,
      recentlyViewed: [],

      login: (email, _password) => {
        set({
          user: {
            id: '1',
            name: 'Ahmed Chishti',
            email,
            avatar: '',
            phone: '555-0123',
            addresses: [
              { id: '1', label: 'Home', fullName: 'Ahmed Chishti', street: '123 Main Street', city: 'New York', state: 'NY', zipCode: '10001', country: 'US', phone: '555-0123', isDefault: true },
            ],
            orders: mockOrders,
            createdAt: '2026-06-01T00:00:00.000Z',
            isLoggedIn: true,
            rewardPoints: 1250,
          },
        });
        return true;
      },

      register: (name, email, _password) => {
        set({
          user: {
            id: '1',
            name,
            email,
            avatar: '',
            phone: '',
            addresses: [],
            orders: [],
            createdAt: new Date().toISOString(),
            isLoggedIn: true,
            rewardPoints: 100,
          },
        });
        return true;
      },

      logout: () => set({ user: null }),

      updateProfile: (data) => {
        const user = get().user;
        if (user) {
          set({ user: { ...user, ...data } });
        }
      },

      addAddress: (address) => {
        set({ addresses: [...get().addresses, address] });
      },

      updateAddress: (id, data) => {
        set({
          addresses: get().addresses.map((a) =>
            a.id === id ? { ...a, ...data } : a
          ),
        });
      },

      removeAddress: (id) => {
        set({ addresses: get().addresses.filter((a) => a.id !== id) });
      },

      setDefaultAddress: (id) => {
        set({
          addresses: get().addresses.map((a) => ({
            ...a,
            isDefault: a.id === id,
          })),
        });
      },

      addOrder: (order) => {
        set({ orders: [order, ...get().orders] });
      },

      addRecentlyViewed: (product) => {
        const current = get().recentlyViewed.filter((p) => p.id !== product.id);
        set({ recentlyViewed: [product, ...current].slice(0, 10) });
      },
    }),
    { name: 'chishti-user' }
  )
);
