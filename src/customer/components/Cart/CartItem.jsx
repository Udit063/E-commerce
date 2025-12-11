import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../../store/Cart/Action";

export const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  
  const handleUpdateCartItem = (num) => {
    const data = {
      data: { quantity: item.quantity + num },
      cartItemId: item?.id,
    };
    //@ts-ignore
    dispatch(updateCartItem(data));
  };
  console.log("id: ", item?.id);

  const handleRemoveCartItem = () => {
    //@ts-ignore
    dispatch(removeCartItem(item?.id));
  };

  return (
    <div className="p-5 shadow-lg border rounded-md">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
          <img
            src={item?.product?.imageUrl}
            alt="cart-item"
            className="w-full h-full object-cove object-top"
          />
        </div>
        <div className="ml-3 space-y-1">
          <p className="font-semibold">{item?.product?.title}</p>
          <p className="opacity-70">
            Size: {item?.size}, {item?.product?.color}
          </p>
          <p className="opacity-70 mt-1">Seller: {item?.product?.brand}</p>
          <div className="flex items-center space-x-5 text-gray-900 pt-6">
            <p className="font-semibold">₹{item?.product?.discountedPrice}</p>
            <p className="opacity-50 line-through">₹{item?.product?.price}</p>
            <p className="text-green-600 font-semibold">
              {item?.product?.discountPercent}% off
            </p>
          </div>
        </div>
      </div>
      <div className="lg:flex items-center lg:space-x-10 pt-4">
        <div className="flex items-center space-x-2">
          <IconButton
            onClick={() => handleUpdateCartItem(-1)}
            disabled={item?.quantity <= 1}
          >
            <RemoveCircleOutline />
          </IconButton>
          <span className="py-1 px-7 border rounded-sm">{item?.quantity}</span>
          <IconButton onClick={() => handleUpdateCartItem(1)}>
            <AddCircleOutline />
          </IconButton>
        </div>
        <div>
          <Button
            onClick={handleRemoveCartItem}
            sx={{ color: "rgb(145 85 253)" }}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};
