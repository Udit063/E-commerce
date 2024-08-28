import Navbar from "@/components/navbar/navbar";
import OrderSummary from "@/components/cart/OrderSummary";
import { CartItems } from "@/components/cart/CartItems";

function Cart() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="flex px-[10%]">
        <div className="w-8/12">
          <CartItems />
        </div>
        <div className="w-4/12">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}

export default Cart;
