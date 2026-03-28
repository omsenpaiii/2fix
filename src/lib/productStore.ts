import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PRODUCTS } from "./products";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  features: string[];
}

interface ProductState {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  resetToDefaults: () => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: PRODUCTS as Product[],
      addProduct: (product) =>
        set((state) => ({ products: [...state.products, product] })),
      removeProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
      resetToDefaults: () => set({ products: PRODUCTS as Product[] }),
    }),
    {
      name: "2fix-products",
    }
  )
);
