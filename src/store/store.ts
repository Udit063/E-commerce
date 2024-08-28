import create from "zustand";

const useProductStore = create((set) => ({
  products: [],
  addProduct: (product) =>
    set((state) => {
      const existingProduct: state.products.find(p => p.id == product.id);
      if(!existingProduct){
        return {products: [...state.products, {...product, quantity:1}]}
      }
    }),

    increaseQuantity: (id) => set((state) => ({
        products: state.products.map(product => {
            product.id == id ? {...product, quantity: product.quantity+1} : product
        }),
    })),

    decreaseQuantity: (id) => set((state) =>({
        products: state.products.map(product => {
            if(product.id == id){
                if(product.quantity > 1){
                    return [{...product, quantity: product.quantity - 1}]
                } else{
                    return []
                }
            }
        })
    })),

    removeProduct: (id) => set((state) =>({
        products: state.product.filter(product => product.id !== id),
    })),
}));

export default useProductStore;
