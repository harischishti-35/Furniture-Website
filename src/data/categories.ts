import type { Category } from '@/types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Living Room',
    slug: 'living-room',
    description: 'Sofas, coffee tables, accent chairs, and more to create your perfect living space.',
    productCount: 5,
    gradient: 'from-emerald-700 to-teal-900',
    icon: 'Sofa',
  },
  {
    id: '2',
    name: 'Bedroom',
    slug: 'bedroom',
    description: 'Beds, nightstands, dressers, and headboards for your dream bedroom.',
    productCount: 3,
    gradient: 'from-rose-700 to-pink-900',
    icon: 'Bed',
  },
  {
    id: '3',
    name: 'Dining Room',
    slug: 'dining-room',
    description: 'Dining tables, chairs, and sets for memorable meals together.',
    productCount: 3,
    gradient: 'from-amber-700 to-orange-900',
    icon: 'UtensilsCrossed',
  },
  {
    id: '4',
    name: 'Office',
    slug: 'office',
    description: 'Desks, chairs, and storage solutions for a productive workspace.',
    productCount: 2,
    gradient: 'from-sky-700 to-indigo-900',
    icon: 'Monitor',
  },
  {
    id: '5',
    name: 'Outdoor',
    slug: 'outdoor',
    description: 'Weather-resistant furniture for patios, gardens, and balconies.',
    productCount: 2,
    gradient: 'from-green-700 to-emerald-900',
    icon: 'TreePine',
  },
  {
    id: '6',
    name: 'Storage',
    slug: 'storage',
    description: 'Bookshelves, cabinets, and organizers to keep your home tidy.',
    productCount: 1,
    gradient: 'from-purple-700 to-violet-900',
    icon: 'Archive',
  },
];

export default categories;
