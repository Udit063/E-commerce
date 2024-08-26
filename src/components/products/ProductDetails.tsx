import { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import { useParams } from "react-router-dom";
import { databases } from "@/appwrite/appwriteConfig";
import cart from "@/assets/trolley.png";

function ProductDetails() {
  const id = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    console.log(id.id);
    const getProduct = async () => {
      try {
        const response = await databases.getDocument(
          "66c90328001a42e8785f",
          "66c9034d001c90533fed",
          id.id
        );
        setProduct(response);
        console.log(product);
      } catch (error) {
        console.log(error);
      }
    };

    if (id.id) {
      getProduct();
    }
  }, [id.id]);

  useEffect(() => {
    console.log(product);
  });
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
              <div className="text-4xl text-justify font-semibold">
                {product.title}
              </div>
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
              <div className="w-full text-center flex justify-center mt-6 items-center p-1.5 gap-2 bottom-0 text-lg bg-gray-200 rounded-md">
                <img src={cart} alt="" className="w-[20px]" />
                <p>Add to Cart</p>
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
