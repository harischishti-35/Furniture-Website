import type { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Artisan Oak Dining Table',
    slug: 'artisan-oak-dining-table',
    description: 'Handcrafted from premium solid oak, this dining table is a masterpiece of modern craftsmanship.',
    shortDescription: 'Handcrafted solid oak dining table for 6-8 guests.',
    price: 1299.99,
    originalPrice: 1599.99,
    discount: 18,
    images: [
      { id: '1-1', url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80', alt: 'Artisan Oak Dining Table' },
      { id: '1-2', url: 'https://images.unsplash.com/photo-1555685397-9e00ca4e29de?w=800&q=80', alt: 'Oak Grain Detail' }
    ],
    category: 'Dining Room',
    subcategory: 'Tables',
    colors: [
      { name: 'Natural Oak', hex: '#D7A15C' },
      { name: 'Walnut', hex: '#5c3d2e' },
      { name: 'Espresso', hex: '#2B1A0A' }
    ],
    sizes: [
      { label: '6-Seater', dimensions: '180 x 90 x 76 cm', priceModifier: 0 },
      { label: '8-Seater', dimensions: '220 x 100 x 76 cm', priceModifier: 300 },
      { label: '10-Seater', dimensions: '260 x 110 x 76 cm', priceModifier: 600 }
    ],
    materials: ['Solid Oak Wood', 'Natural Oil Finish'],
    dimensions: { width: 180, height: 76, depth: 90, unit: 'cm' },
    weight: 45,
    specifications: {
      'Material': 'Solid Oak Wood',
      'Finish': 'Natural Lacquer',
      'Seating': '6-8 People',
      'Assembly': 'Required',
      'Warranty': '5 Years',
      'Weight Capacity': '150 kg'
    },
    rating: 4.8,
    reviewCount: 124,
    reviews: [
      {
        id: 'r1-1',
        userId: 'u1',
        userName: 'David L.',
        userAvatar: '',
        rating: 5,
        title: 'Exceptional craftsmanship',
        comment: 'The oak grain is stunning. Absolutely the highlight of our dining room.',
        date: '2026-06-15',
        helpful: 12,
        images: []
      }
    ],
    inStock: true,
    stockQuantity: 15,
    sku: 'CFM-DT-001',
    tags: ['dining', 'oak', 'table', 'premium'],
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    isTrending: false,
    createdAt: '2026-05-10T10:00:00.000Z'
  },
  {
    id: '2',
    name: 'Velvet Cloud Sofa',
    slug: 'velvet-cloud-sofa',
    description: 'Sink into luxury with our premium velvet sofa, designed for ultimate comfort.',
    shortDescription: 'Premium velvet 3-seater sofa with gold-finished legs.',
    price: 2199.00,
    originalPrice: 2199.00,
    discount: 0,
    images: [
      { id: '2-1', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', alt: 'Velvet Cloud Sofa Main' },
      { id: '2-2', url: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80', alt: 'Living Room Setup' }
    ],
    category: 'Living Room',
    subcategory: 'Sofas',
    colors: [
      { name: 'Sage Green', hex: '#7c9473' },
      { name: 'Navy Blue', hex: '#1D3557' },
      { name: 'Charcoal', hex: '#2F3E46' }
    ],
    sizes: [
      { label: '2-Seater', dimensions: '180 x 95 x 85 cm', priceModifier: -300 },
      { label: '3-Seater', dimensions: '220 x 95 x 85 cm', priceModifier: 0 },
      { label: 'L-Shape', dimensions: '280 x 160 x 85 cm', priceModifier: 800 }
    ],
    materials: ['Italian Velvet Upholstery', 'Kiln-dried Hardwood Frame'],
    dimensions: { width: 220, height: 85, depth: 95, unit: 'cm' },
    weight: 65,
    specifications: {
      'Upholstery': 'Italian Velvet',
      'Frame': 'Kiln-dried Hardwood',
      'Cushions': 'High-density Foam',
      'Legs': 'Gold-finished Metal',
      'Warranty': '3 Years',
      'Seat Height': '45 cm'
    },
    rating: 4.9,
    reviewCount: 89,
    reviews: [
      {
        id: 'r2-1',
        userId: 'u2',
        userName: 'Sophia M.',
        userAvatar: '',
        rating: 5,
        title: 'Like sitting on a cloud',
        comment: 'The velvet feels incredible, and the cushions are both supportive and plush.',
        date: '2026-06-18',
        helpful: 24,
        images: []
      }
    ],
    inStock: true,
    stockQuantity: 8,
    sku: 'CFM-SF-002',
    tags: ['sofa', 'velvet', 'luxury', 'living room'],
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: false,
    isTrending: true,
    createdAt: '2026-04-12T08:30:00.000Z'
  },
  {
    id: '3',
    name: 'Marble Top Coffee Table',
    slug: 'marble-top-coffee-table',
    description: 'Italian Carrara marble paired with brushed brass creates timeless elegance.',
    shortDescription: 'Italian marble and brass coffee table.',
    price: 899.99,
    originalPrice: 1099.99,
    discount: 18,
    images: [
      { id: '3-1', url: 'https://images.unsplash.com/photo-1555685397-9e00ca4e29de?w=800&q=80', alt: 'Marble Top Coffee Table' }
    ],
    category: 'Living Room',
    subcategory: 'Tables',
    colors: [
      { name: 'White Marble', hex: '#FFFFFF' },
      { name: 'Black Marble', hex: '#1E1E1E' }
    ],
    sizes: [
      { label: 'Medium', dimensions: '120 x 60 x 45 cm', priceModifier: 0 },
      { label: 'Large', dimensions: '140 x 70 x 45 cm', priceModifier: 150 }
    ],
    materials: ['Italian Carrara Marble', 'Brushed Brass-finished Steel Frame'],
    dimensions: { width: 120, height: 45, depth: 60, unit: 'cm' },
    weight: 35,
    specifications: {
      'Top Material': 'Carrara Marble',
      'Base': 'Brushed Brass',
      'Shape': 'Rectangular',
      'Assembly': 'Minimal',
      'Warranty': '2 Years'
    },
    rating: 4.7,
    reviewCount: 67,
    reviews: [],
    inStock: true,
    stockQuantity: 12,
    sku: 'CFM-CT-003',
    tags: ['coffee table', 'marble', 'brass', 'luxury'],
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: true,
    isTrending: false,
    createdAt: '2026-05-02T12:00:00.000Z'
  },
  {
    id: '4',
    name: 'Scandinavian Bed Frame',
    slug: 'scandinavian-bed-frame',
    description: 'Minimalist design meets maximum comfort in this Nordic-inspired bed frame.',
    shortDescription: 'Minimalist Nordic bed frame with slatted headboard.',
    price: 1549.00,
    originalPrice: 1549.00,
    discount: 0,
    images: [
      { id: '4-1', url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80', alt: 'Scandinavian Bed Frame' }
    ],
    category: 'Bedroom',
    subcategory: 'Beds',
    colors: [
      { name: 'Light Oak', hex: '#E2D4C9' },
      { name: 'White Oak', hex: '#F0E9E4' }
    ],
    sizes: [
      { label: 'Queen', dimensions: '210 x 165 x 110 cm', priceModifier: 0 },
      { label: 'King', dimensions: '220 x 195 x 110 cm', priceModifier: 200 }
    ],
    materials: ['Solid Ash Wood'],
    dimensions: { width: 210, height: 110, depth: 165, unit: 'cm' },
    weight: 55,
    specifications: {
      'Material': 'Ash Wood',
      'Headboard': 'Slatted Design',
      'Slat System': 'Included',
      'Warranty': '10 Years'
    },
    rating: 4.6,
    reviewCount: 203,
    reviews: [],
    inStock: true,
    stockQuantity: 20,
    sku: 'CFM-BF-004',
    tags: ['bed', 'scandinavian', 'bedroom', 'minimalist'],
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    isTrending: false,
    createdAt: '2026-06-01T09:00:00.000Z'
  },
  {
    id: '5',
    name: 'Executive Leather Chair',
    slug: 'executive-leather-chair',
    description: 'Premium full-grain leather office chair for the discerning professional.',
    shortDescription: 'Full-grain leather executive office chair.',
    price: 1899.00,
    originalPrice: 2299.00,
    discount: 17,
    images: [
      { id: '5-1', url: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80', alt: 'Executive Leather Chair' }
    ],
    category: 'Office',
    subcategory: 'Chairs',
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Cognac Brown', hex: '#8B5A2B' }
    ],
    sizes: [
      { label: 'Standard', dimensions: '70 x 70 x 125 cm', priceModifier: 0 }
    ],
    materials: ['Full-grain Leather', 'Aluminum Base'],
    dimensions: { width: 70, height: 125, depth: 70, unit: 'cm' },
    weight: 22,
    specifications: {
      'Upholstery': 'Full-grain Leather',
      'Base': 'Polished Aluminum',
      'Adjustability': 'Height, Tilt, Armrest',
      'Warranty': '7 Years'
    },
    rating: 4.9,
    reviewCount: 156,
    reviews: [],
    inStock: true,
    stockQuantity: 6,
    sku: 'CFM-OC-005',
    tags: ['office', 'chair', 'leather', 'executive'],
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: false,
    isTrending: true,
    createdAt: '2026-05-15T11:00:00.000Z'
  },
  {
    id: '6',
    name: 'Rattan Lounge Chair',
    slug: 'rattan-lounge-chair',
    description: 'Bring the tropics home with this handwoven rattan accent chair.',
    shortDescription: 'Handwoven rattan accent chair with cushion.',
    price: 649.00,
    originalPrice: 649.00,
    discount: 0,
    images: [
      { id: '6-1', url: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80', alt: 'Rattan Lounge Chair' }
    ],
    category: 'Living Room',
    subcategory: 'Chairs',
    colors: [
      { name: 'Natural Rattan', hex: '#D2B48C' }
    ],
    sizes: [
      { label: 'Standard', dimensions: '75 x 80 x 90 cm', priceModifier: 0 }
    ],
    materials: ['Natural Rattan', 'Steel reinforcement'],
    dimensions: { width: 75, height: 90, depth: 80, unit: 'cm' },
    weight: 12,
    specifications: {
      'Material': 'Natural Rattan',
      'Cushion': 'Removable Linen',
      'Indoor/Outdoor': 'Indoor Only',
      'Warranty': '2 Years'
    },
    rating: 4.5,
    reviewCount: 44,
    reviews: [],
    inStock: true,
    stockQuantity: 18,
    sku: 'CFM-AC-006',
    tags: ['chair', 'rattan', 'accent', 'bohemian'],
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    isTrending: false,
    createdAt: '2026-06-05T14:00:00.000Z'
  },
  {
    id: '7',
    name: 'Glass Display Cabinet',
    slug: 'glass-display-cabinet',
    description: 'Showcase your treasures in this elegant tempered glass cabinet.',
    shortDescription: 'Tempered glass and brass display cabinet.',
    price: 1199.00,
    originalPrice: 1199.00,
    discount: 0,
    images: [
      { id: '7-1', url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80', alt: 'Glass Display Cabinet' }
    ],
    category: 'Living Room',
    subcategory: 'Storage',
    colors: [
      { name: 'Brass', hex: '#D4AF37' },
      { name: 'Black', hex: '#1E1E1E' }
    ],
    sizes: [
      { label: '3-Shelf', dimensions: '90 x 40 x 180 cm', priceModifier: 0 }
    ],
    materials: ['Tempered Safety Glass', 'Brass-plated Steel Frame'],
    dimensions: { width: 90, height: 180, depth: 40, unit: 'cm' },
    weight: 40,
    specifications: {
      'Glass': 'Tempered Safety Glass',
      'Frame': 'Brass-plated Steel',
      'Shelves': '3 Adjustable',
      'Warranty': '3 Years'
    },
    rating: 4.4,
    reviewCount: 31,
    reviews: [],
    inStock: true,
    stockQuantity: 10,
    sku: 'CFM-DC-007',
    tags: ['cabinet', 'glass', 'display', 'storage'],
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: false,
    isTrending: false,
    createdAt: '2026-03-20T10:00:00.000Z'
  },
  {
    id: '8',
    name: 'Teak Garden Bench',
    slug: 'teak-garden-bench',
    description: 'Weather-resistant premium teak bench for your outdoor sanctuary.',
    shortDescription: 'Premium teak outdoor garden bench.',
    price: 799.00,
    originalPrice: 799.00,
    discount: 0,
    images: [
      { id: '8-1', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80', alt: 'Teak Garden Bench' }
    ],
    category: 'Outdoor',
    subcategory: 'Benches',
    colors: [
      { name: 'Natural Teak', hex: '#C2843A' }
    ],
    sizes: [
      { label: '4ft', dimensions: '120 x 60 x 90 cm', priceModifier: 0 },
      { label: '5ft', dimensions: '150 x 60 x 90 cm', priceModifier: 100 }
    ],
    materials: ['Solid Grade-A Teak Wood'],
    dimensions: { width: 120, height: 90, depth: 60, unit: 'cm' },
    weight: 25,
    specifications: {
      'Material': 'Grade-A Teak Wood',
      'Hardware': 'Stainless Steel',
      'Weather Resistant': 'Yes',
      'Warranty': '5 Years'
    },
    rating: 4.7,
    reviewCount: 52,
    reviews: [],
    inStock: true,
    stockQuantity: 15,
    sku: 'CFM-GB-008',
    tags: ['bench', 'teak', 'outdoor', 'garden'],
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: false,
    isTrending: false,
    createdAt: '2026-04-10T16:00:00.000Z'
  },
  {
    id: '9',
    name: 'Minimalist Oak Desk',
    slug: 'minimalist-oak-desk',
    description: 'A clean and solid wood desk with integrated drawer and cable routing.',
    shortDescription: 'Solid oak desk with drawer.',
    price: 849.00,
    originalPrice: 849.00,
    discount: 0,
    images: [
      { id: '9-1', url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80', alt: 'Minimalist Oak Desk' }
    ],
    category: 'Office',
    subcategory: 'Desks',
    colors: [
      { name: 'Natural Oak', hex: '#D7A15C' },
      { name: 'Walnut Finish', hex: '#5c3d2e' }
    ],
    sizes: [
      { label: 'Standard', dimensions: '120 x 60 x 75 cm', priceModifier: 0 },
      { label: 'Wide', dimensions: '140 x 70 x 75 cm', priceModifier: 150 }
    ],
    materials: ['Solid Oak Wood'],
    dimensions: { width: 120, height: 75, depth: 60, unit: 'cm' },
    weight: 28,
    specifications: {
      'Material': 'Solid Oak Wood',
      'Drawers': '1 Soft-close Drawer',
      'Assembly': 'Required',
      'Warranty': '3 Years'
    },
    rating: 4.8,
    reviewCount: 92,
    reviews: [],
    inStock: true,
    stockQuantity: 11,
    sku: 'CFM-DK-009',
    tags: ['desk', 'oak', 'office', 'minimalist'],
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: false,
    isTrending: false,
    createdAt: '2026-05-18T10:00:00.000Z'
  },
  {
    id: '10',
    name: 'Metal Bar Stool Set',
    slug: 'metal-bar-stool-set',
    description: 'Industrial-chic metal bar stools with comfortable cushioned seats.',
    shortDescription: 'Set of 2 industrial metal bar stools.',
    price: 399.00,
    originalPrice: 499.00,
    discount: 20,
    images: [
      { id: '10-1', url: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80', alt: 'Metal Bar Stool Set' }
    ],
    category: 'Dining Room',
    subcategory: 'Chairs',
    colors: [
      { name: 'Matte Black', hex: '#1E1E1E' },
      { name: 'Copper', hex: '#B87333' }
    ],
    sizes: [
      { label: 'Counter Height', dimensions: '45 x 45 x 65 cm', priceModifier: 0 },
      { label: 'Bar Height', dimensions: '45 x 45 x 75 cm', priceModifier: 50 }
    ],
    materials: ['Powder-coated Steel', 'PU Leather Cushion'],
    dimensions: { width: 45, height: 75, depth: 45, unit: 'cm' },
    weight: 8,
    specifications: {
      'Material': 'Powder-coated Steel',
      'Seat': 'PU Leather Cushion',
      'Set': '2 Stools',
      'Warranty': '2 Years'
    },
    rating: 4.5,
    reviewCount: 113,
    reviews: [],
    inStock: true,
    stockQuantity: 40,
    sku: 'CFM-BS-010',
    tags: ['bar stool', 'metal', 'industrial', 'dining'],
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: true,
    isTrending: false,
    createdAt: '2026-04-20T10:00:00.000Z'
  },
  {
    id: '11',
    name: 'Upholstered Headboard',
    slug: 'upholstered-headboard',
    description: 'Channel-tufted velvet headboard for a luxurious bedroom upgrade.',
    shortDescription: 'Channel-tufted velvet headboard.',
    price: 699.00,
    originalPrice: 699.00,
    discount: 0,
    images: [
      { id: '11-1', url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80', alt: 'Upholstered Headboard' }
    ],
    category: 'Bedroom',
    subcategory: 'Decor',
    colors: [
      { name: 'Midnight Blue', hex: '#1D3557' },
      { name: 'Grey', hex: '#808080' }
    ],
    sizes: [
      { label: 'Queen', dimensions: '160 x 10 x 130 cm', priceModifier: 0 },
      { label: 'King', dimensions: '200 x 10 x 130 cm', priceModifier: 150 }
    ],
    materials: ['Performance Velvet Upholstery', 'Multi-layer Foam padding'],
    dimensions: { width: 160, height: 130, depth: 10, unit: 'cm' },
    weight: 18,
    specifications: {
      'Upholstery': 'Performance Velvet',
      'Padding': 'Multi-layer Foam',
      'Mounting': 'Wall-mount Included',
      'Warranty': '5 Years'
    },
    rating: 4.6,
    reviewCount: 57,
    reviews: [],
    inStock: true,
    stockQuantity: 14,
    sku: 'CFM-HB-011',
    tags: ['headboard', 'velvet', 'bedroom', 'luxury'],
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    isTrending: false,
    createdAt: '2026-06-11T12:00:00.000Z'
  },
  {
    id: '12',
    name: 'Standing Desk Pro',
    slug: 'standing-desk-pro',
    description: 'Electric height-adjustable standing desk for the modern workspace.',
    shortDescription: 'Electric sit-stand desk with memory presets.',
    price: 949.00,
    originalPrice: 949.00,
    discount: 0,
    images: [
      { id: '12-1', url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80', alt: 'Standing Desk Pro' }
    ],
    category: 'Office',
    subcategory: 'Desks',
    colors: [
      { name: 'Walnut Top / Black Frame', hex: '#3E2723' },
      { name: 'White Top / White Frame', hex: '#FFFFFF' }
    ],
    sizes: [
      { label: '60 inch', dimensions: '150 x 75 x 65-130 cm', priceModifier: 0 }
    ],
    materials: ['Solid Walnut Desktop', 'Steel Adjustable Frame'],
    dimensions: { width: 150, height: 65, depth: 75, unit: 'cm' },
    weight: 38,
    specifications: {
      'Motor': 'Dual Motor Electric',
      'Height Range': '65-130 cm',
      'Speed': '38mm/s',
      'Memory Presets': '4 Positions',
      'Warranty': '5 Years'
    },
    rating: 4.8,
    reviewCount: 234,
    reviews: [],
    inStock: true,
    stockQuantity: 22,
    sku: 'CFM-SD-012',
    tags: ['desk', 'standing', 'office', 'ergonomic'],
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: false,
    isTrending: true,
    createdAt: '2026-05-20T10:00:00.000Z'
  },
  {
    id: '13',
    name: 'Ceramic Dining Set',
    slug: 'ceramic-dining-set',
    description: 'Artisan ceramic dining set with organic shapes and earthy glazes.',
    shortDescription: 'Handmade ceramic 4-piece dining set.',
    price: 189.00,
    originalPrice: 189.00,
    discount: 0,
    images: [
      { id: '13-1', url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80', alt: 'Ceramic Dining Set' }
    ],
    category: 'Dining Room',
    subcategory: 'Decor',
    colors: [
      { name: 'Earth Tone', hex: '#A0522D' },
      { name: 'Ocean Blue', hex: '#4682B4' }
    ],
    sizes: [
      { label: '4-Piece', dimensions: '28 x 28 x 3 cm (plate)', priceModifier: 0 }
    ],
    materials: ['Stoneware Ceramic'],
    dimensions: { width: 28, height: 3, depth: 28, unit: 'cm' },
    weight: 4,
    specifications: {
      'Material': 'Stoneware Ceramic',
      'Glaze': 'Food-safe Reactive',
      'Dishwasher Safe': 'Yes',
      'Microwave Safe': 'Yes',
      'Warranty': '1 Year'
    },
    rating: 4.4,
    reviewCount: 66,
    reviews: [],
    inStock: false,
    stockQuantity: 0,
    sku: 'CFM-DS-013',
    tags: ['dining set', 'ceramic', 'handmade', 'artisan'],
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: false,
    isTrending: false,
    createdAt: '2026-04-05T09:00:00.000Z'
  },
  {
    id: '14',
    name: 'Linen Sectional Sofa',
    slug: 'linen-sectional-sofa',
    description: 'Modular linen sectional that adapts to your living space.',
    shortDescription: 'Modular linen sectional with ottoman.',
    price: 3299.00,
    originalPrice: 3899.00,
    discount: 15,
    images: [
      { id: '14-1', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', alt: 'Linen Sectional Sofa' }
    ],
    category: 'Living Room',
    subcategory: 'Sofas',
    colors: [
      { name: 'Oatmeal', hex: '#EAE6DF' },
      { name: 'Slate Grey', hex: '#708090' }
    ],
    sizes: [
      { label: '3-Piece', dimensions: '260 x 200 x 85 cm', priceModifier: -300 },
      { label: '4-Piece', dimensions: '320 x 200 x 85 cm', priceModifier: 0 }
    ],
    materials: ['Belgian Linen Blend Upholstery', 'Solid Hardwood frame'],
    dimensions: { width: 320, height: 85, depth: 200, unit: 'cm' },
    weight: 95,
    specifications: {
      'Upholstery': 'Belgian Linen Blend',
      'Cushions': 'Down-wrapped Foam',
      'Modules': 'Interchangeable',
      'Warranty': '5 Years'
    },
    rating: 4.7,
    reviewCount: 145,
    reviews: [],
    inStock: true,
    stockQuantity: 5,
    sku: 'CFM-SS-014',
    tags: ['sectional', 'sofa', 'modular', 'linen'],
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: true,
    isTrending: false,
    createdAt: '2026-05-12T14:00:00.000Z'
  },
  {
    id: '15',
    name: 'Walnut Nightstand',
    slug: 'walnut-nightstand',
    description: 'Mid-century modern nightstand with brass accents and soft-close drawer.',
    shortDescription: 'Mid-century walnut nightstand with brass pulls.',
    price: 449.00,
    originalPrice: 449.00,
    discount: 0,
    images: [
      { id: '15-1', url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80', alt: 'Walnut Nightstand' }
    ],
    category: 'Bedroom',
    subcategory: 'Storage',
    colors: [
      { name: 'Walnut', hex: '#5c3d2e' }
    ],
    sizes: [
      { label: 'Standard', dimensions: '50 x 40 x 55 cm', priceModifier: 0 }
    ],
    materials: ['Solid Walnut Wood'],
    dimensions: { width: 50, height: 55, depth: 40, unit: 'cm' },
    weight: 15,
    specifications: {
      'Material': 'Solid Walnut',
      'Drawer': 'Soft-close Mechanism',
      'Hardware': 'Brass Pulls',
      'Warranty': '3 Years'
    },
    rating: 4.5,
    reviewCount: 88,
    reviews: [],
    inStock: true,
    stockQuantity: 35,
    sku: 'CFM-NS-015',
    tags: ['nightstand', 'bedroom', 'mid-century', 'walnut'],
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: false,
    isTrending: false,
    createdAt: '2026-04-18T10:00:00.000Z'
  },
  {
    id: '16',
    name: 'Outdoor Dining Set',
    slug: 'outdoor-dining-set',
    description: 'Complete outdoor dining solution with weather-resistant aluminum frame.',
    shortDescription: 'All-weather 6-piece outdoor dining set.',
    price: 2199.00,
    originalPrice: 2199.00,
    discount: 0,
    images: [
      { id: '16-1', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80', alt: 'Outdoor Dining Set' }
    ],
    category: 'Outdoor',
    subcategory: 'Dining Sets',
    colors: [
      { name: 'Charcoal', hex: '#2F3E46' },
      { name: 'Teak', hex: '#C2843A' }
    ],
    sizes: [
      { label: '6-Person', dimensions: '180 x 100 x 75 cm', priceModifier: 0 }
    ],
    materials: ['Powder-coated Aluminum Frame', 'Ceramic Stone Top'],
    dimensions: { width: 180, height: 75, depth: 100, unit: 'cm' },
    weight: 70,
    specifications: {
      'Frame': 'Powder-coated Aluminum',
      'Table Top': 'Ceramic Stone',
      'Cushions': 'Sunbrella Fabric',
      'Warranty': '5 Years'
    },
    rating: 4.6,
    reviewCount: 41,
    reviews: [],
    inStock: true,
    stockQuantity: 8,
    sku: 'CFM-OD-016',
    tags: ['outdoor', 'dining', 'patio', 'aluminum'],
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    isTrending: false,
    createdAt: '2026-06-15T09:00:00.000Z'
  }
];

export default products;
