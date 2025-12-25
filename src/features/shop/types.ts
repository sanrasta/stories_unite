/**
 * Shop Feature Types
 */

export interface ShopProduct {
  id: string;
  title: string;
  description: string;
  price: string;
  priceAmount: number;
  currencyCode: string;
  coverUrl: string;
  type: 'book' | 'bundle' | 'subscription';
  available: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
  product: ShopProduct;
}

export interface CartState {
  items: CartItem[];
  totalAmount: number;
  currencyCode: string;
  isLoading: boolean;
  error: string | null;
}

export interface ShopState {
  products: ShopProduct[];
  featuredProducts: ShopProduct[];
  cart: CartState;
  isLoading: boolean;
  error: string | null;
}

