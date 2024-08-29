import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const productStore = (set) => ({
  products: [],
  addToCart: (product) =>
    set((state) => {
      console.log("Adding product:", product);

      const existingProduct = state.products.find((p) => p.$id === product.$id);
      if (!existingProduct) {
        console.log("Product not found, adding new one");
        return { products: [...state.products, { ...product, quantity: 1 }] };
      }
    }),

  increaseQuantity: (id) =>
    set((state) => {
      const existingProduct = state.products.find((p) => p.$id === id);
      if (!existingProduct) {
        console.log("Product not found:", id);
        console.log("Current products in store:", state.products);
        return state;
      }
      return {
        products: state.products.map((product) =>
          product.$id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        ),
      };
    }),

  decreaseQuantity: (id) =>
    set((state) => {
      const existingProduct = state.products.find((p) => p.$id === id);
      if (!existingProduct) {
        console.log("Product not found:", id);
        console.log("Current products in store:", state.products);
        return state;
      }
      return {
        products: state.products.flatMap((product) => {
          if (product.$id === id) {
            if (product.quantity > 1) {
              return [{ ...product, quantity: product.quantity - 1 }];
            } else {
              return [];
            }
          }
          return [product];
        }),
      };
    }),

  removeProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.$id !== id),
    })),
});

const useProductStore = create(
  devtools(
    persist(productStore, {
      name: "products",
    })
  )
);

export default useProductStore;
