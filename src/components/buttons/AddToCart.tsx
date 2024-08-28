import cart from "@/assets/trolley.png";

function AddToCart() {
  return (
    <button className="w-full text-center flex justify-center items-center p-1.5 gap-2 text-lg bg-gray-200 rounded-md hover:bg-gray-300 transition duration-300 ease-in-out">
      <img src={cart} alt="" className="w-[20px]" />
      <p>Add to Cart</p>
    </button>
  );
}

export default AddToCart;
