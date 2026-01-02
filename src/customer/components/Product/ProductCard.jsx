//@ts-nocheck
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product, viewMode = "grid" }) => {
  const navigate = useNavigate();

  if (viewMode === "list") {
    return (
      <div
        onClick={() => navigate(`/product/${product.id}`)}
        className="productCard w-full border border-gray-200 rounded-lg overflow-hidden transition-all cursor-pointer hover:shadow-lg"
      >
        <div className="flex">
          <div className="w-48 h-48 flex-shrink-0">
            <img
              src={product.imageUrl}
              className="h-full w-full object-cover object-left-top"
              alt={product.title}
            />
          </div>
          <div className="textPart bg-white p-5 flex-1 flex flex-col justify-between">
            <div>
              <p className="font-bold opacity-60 text-sm">{product.brand}</p>
              <p className="text-lg font-medium mt-1">{product.title}</p>
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <p className="font-semibold text-lg">
                ₹{product.discountedPrice}
              </p>
              <p className="line-through opacity-50">₹{product.price}</p>
              <p className="text-green-600 font-semibold">
                {product.discountPersent || product.discountPercent}% off
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (default)
  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="productCard w-[15rem] m-3 transition-all cursor-pointer"
    >
      <div className="h-[20rem]">
        <img
          src={product.imageUrl}
          className="h-full w-full object-cover object-left-top"
          alt={product.title}
        />
      </div>
      <div className="textPart bg-white p-3">
        <div>
          <p className="font-bold opacity-60">{product.brand}</p>
          <p>{product.title}</p>
        </div>
        <div className="flex items-center space-x-2">
          <p className="font-semibold">₹{product.discountedPrice}</p>
          <p className="line-through opacity-50">₹{product.price}</p>
          <p className="text-green-600 font-semibold">
            {product.discountPersent || product.discountPercent}% off
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
