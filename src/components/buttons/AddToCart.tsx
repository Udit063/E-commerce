import cart from "@/assets/trolley.png";
import useProductStore from "@/store/store";
import { useEffect } from "react";

function AddToCart({ product }) {
  const addToCart = useProductStore((state) => state.addToCart);

  useEffect(() => {
    if (addToCart) {
      const products = useProductStore.getState().products;
      console.log("Current products in store:", products);
    }
  }, [addToCart]);

  return (
    <button
      onClick={() => addToCart(product)}
      className="w-full text-center flex justify-center items-center p-1.5 gap-2 text-lg bg-gray-200 rounded-md hover:bg-gray-300 transition duration-300 ease-in-out"
    >
      <img src={cart} alt="" className="w-[20px]" />
      <p>Add to Cart</p>
    </button>
  );
}

export default AddToCart;
