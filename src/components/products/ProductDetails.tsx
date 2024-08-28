import Navbar from "../navbar/navbar";
import AddToCart from "../buttons/AddToCart";
import { useLocation } from "react-router-dom";

function ProductDetails() {
  const location = useLocation();
  const { product } = location.state || {};
  const originalPrice = product.price + Math.floor(product.price * 0.8);

  return (
    <div>
      <Navbar />
      {product ? (
        <div className="px-[10%] flex py-8">
          <div className="w-[50%] p-4 flex items-center justify-center">
            <img
              src={product.image}
              alt=""
              className="w-10/12 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-[50%] flex justify-start items-center">
            <div className="w-11/12 flex flex-col items-start justify-center">
              <div className="text-4xl font-semibold">{product.title}</div>
              <div className="text-sm text-justify text-gray-700 pt-1">
                {product.description}
              </div>
              <div className="text-black text-left font-semibold text-2xl pt-4">
                <span>Rs. {product.price}</span>
                <span className="line-through px-3 text-base">
                  Rs. {originalPrice}
                </span>
                <span className="text-green-600 text-xl ">
                  {Math.floor(
                    ((originalPrice - product.price) * 100) / originalPrice
                  )}
                  % off
                </span>
              </div>
              <div className="w-full text-center flex justify-center mt-6 items-center bottom-0 text-lg rounded-md">
                <AddToCart product={product} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProductDetails;
