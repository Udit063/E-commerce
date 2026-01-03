//@ts-nocheck
import { Button } from "@mui/material";
import { ShoppingBagOutlined } from "@mui/icons-material";
import { CartItem } from "./CartItem";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCart } from "../../../store/Cart/Action";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store);

  console.log("cart: ", cart);

  const handleCheckout = () => {
    navigate(`/checkout?step=2`);
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  useEffect(() => {
    dispatch(getCart());
  }, [cart.updateCartItem, cart.deleteCartItem]);

  const isEmpty = !cart.cart?.cartItems || cart.cart?.cartItems?.length === 0;

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-5">
        <ShoppingBagOutlined
          sx={{ fontSize: 120, color: "#d1d5db", marginBottom: 2 }}
        />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Looks like you haven't added any items to your cart yet.
        </p>
        <Button
          onClick={handleContinueShopping}
          variant="contained"
          sx={{
            px: "3rem",
            py: "0.75rem",
            bgcolor: "#9155fd",
            "&:hover": { bgcolor: "#7c3aed" },
          }}
        >
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="px-5 lg:px-16 py-8">
      <div className="lg:grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-4">
          {cart.cart?.cartItems?.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div className="mt-8 lg:mt-0">
          <div className="border rounded-lg p-6 bg-white shadow-sm sticky top-24">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Price Details
            </h3>
            <div className="space-y-4 border-b border-gray-200 pb-4">
              <div className="flex justify-between text-gray-700">
                <span>Price ({cart.cart?.cartItems?.length} items)</span>
                <span className="font-medium">
                  ₹{cart.cart?.totalPrice || 0}
                </span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Discount</span>
                <span className="font-medium text-green-600">
                  -₹{cart.cart?.discount || 0}
                </span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Delivery Charges</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
            </div>
            <div className="flex justify-between items-center pt-4 pb-6">
              <span className="text-lg font-semibold text-gray-900">
                Total Amount
              </span>
              <span className="text-xl font-bold text-gray-900">
                ₹{cart.cart?.totalDiscountedPrice || 0}
              </span>
            </div>
            <Button
              onClick={handleCheckout}
              variant="contained"
              fullWidth
              sx={{
                py: "0.875rem",
                bgcolor: "#9155fd",
                "&:hover": { bgcolor: "#7c3aed" },
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
