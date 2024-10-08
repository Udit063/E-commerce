import logo from "../../assets/logo.png";
import cart from "../../assets/trolley.png";
import { Link } from "react-router-dom";
import useProductStore from "@/store/store";
import { stat } from "fs";

function Navbar() {
  const products = useProductStore((state) => state.products);
  const totalQuantity = products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );
  return (
    <div className="w-full p-2 flex justify-center border border-gray-200 backdrop-blur-md">
      <div className="w-[80%] flex items-center justify-between">
        <div className="flex gap-12">
          <div className="flex cursor-pointer">
            <img src={logo} alt="" className="w-[50px]" />
            <div className="flex items-center justify-center">
              <p className="font-semibold">StyleHaven</p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Link to="/">
              <p className="text-gray-700 hover:text-gray-900">Home</p>
            </Link>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="flex items-center justify-center">
            <Link to="/login">
              <p className="text-gray-700 hover:text-gray-900">Login</p>
            </Link>
          </div>
          <div className="relative flex">
            <Link to="/cart">
              <div className="flex cursor-pointer">
                <img src={cart} alt="" className="w-[25px]" />
                <p className="absolute -right-1.5 -top-1.5 min-w-5 h-5 flex justify-center items-center bg-yellow-200 rounded-md text-xs shadow-md">
                  {totalQuantity}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
