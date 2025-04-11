
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  gender?: 'men' | 'women' | 'unisex';
  images: string[];
  colors?: string[];
  sizes?: string[];
  tags?: string[];
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface Order {
  id: string;
  date: string;
  products: {
    product: Product;
    quantity: number;
  }[];
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  trackingNumber?: string;
}

export interface Address {
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface Filter {
  category?: string[];
  gender?: string[];
  priceRange?: [number, number];
  colors?: string[];
  sizes?: string[];
  tags?: string[];
}

export type Category = 'clothing' | 'shoes' | 'bags' | 'accessories' | 'all';

export type SortOption = 'price-asc' | 'price-desc' | 'newest' | 'popular';
