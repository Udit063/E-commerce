import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Link } from "react-router-dom";
import cart from "@/assets/trolley.png";

function ProductCard({ productID, title, description, price, image }) {
  return (
    <Card className="px-3 shadow-xl border border-slate-600 outline-0 backdrop-blur-sm bg-white/30">
      <Link to={`/products/${productID}`}>
        <CardContent className="w-full h-60 flex justify-center items-center p-3">
          <img
            src={image}
            alt=""
            width={100}
            height={100}
            className="w-full h-full object-fit hover:scale-110 transition ease-in-out duration-300 hover:opacity-90"
          />
        </CardContent>
        <CardHeader className="pt-0 pb-2 px-3 space-y-0">
          <CardTitle className="text-xl text-left font-semibold truncate">
            {title}
          </CardTitle>
          <CardDescription className="pt-0 m-0">
            <p className="text-justify p-0 m-0 line-clamp-2">{description}</p>
          </CardDescription>
          <CardDescription className="text-gray-700 text-md pt-4">
            <span>Rs. {price}</span>
            <span className="line-through px-2">
              Rs. {price + Math.floor(price * 0.8)}
            </span>
          </CardDescription>
        </CardHeader>
      </Link>
      <CardFooter className="flex justify-between px-3 pb-3">
        <Link
          to="/"
          className="w-full text-center flex justify-center items-center p-1.5 gap-2 text-lg bg-gray-200 rounded-md"
        >
          <img src={cart} alt="" className="w-[20px]" />
          <p>Add to Cart</p>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
