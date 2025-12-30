//@ts-nocheck
import { useNavigate } from "react-router-dom";

const HomeSectionCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (product?.id) {
      navigate(`/product/${product.id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer flex flex-col items-center bg-white rounded-lg overflow-hidden w-[15rem] mx-3 border border-gray-200 hover:shadow-lg transition-shadow"
    >
      <div className="h-[13rem] w-[10rem]">
        <img
          className="object-cover object-top w-full h-full"
          src={product?.imageUrl || ""}
          alt={product?.title || "Product"}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{product?.brand}</h3>
        <p className="mt-2 text-sm text-gray-500">{product?.title}</p>
        {product?.discountedPrice && (
          <div className="mt-2 flex items-center gap-2">
            <span className="text-lg font-semibold text-gray-900">
              ₹{product.discountedPrice}
            </span>
            {product.price > product.discountedPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.price}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeSectionCard;
