import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Link } from "react-router-dom";
import AddToCart from "../buttons/AddToCart";

function ProductCard({ product }) {
  return (
    <Card className="px-1 shadow-xl border border-slate-600 outline-0 backdrop-blur-sm bg-white/30">
      <Link to={`/products/${product.$id}`} state={{ product }}>
        <CardContent className="w-full h-60 flex justify-center items-center p-3">
          <img
            src={product.image}
            alt=""
            width={100}
            height={100}
            className="w-full h-full object-fit hover:scale-110 transition ease-in-out duration-300 hover:opacity-90"
          />
        </CardContent>
        <CardHeader className="pt-0 pb-2 px-3 space-y-0">
          <CardTitle className="text-xl text-left font-semibold truncate">
            {product.title}
          </CardTitle>
          <CardDescription className="pt-0 m-0">
            <p className="text-justify p-0 m-0 line-clamp-2">
              {product.description}
            </p>
          </CardDescription>
          <CardDescription className="text-gray-700 text-md pt-4">
            <span>&#8377; {product.price}</span>
            <span className="line-through px-2">
              &#8377; {product.price + Math.floor(product.price * 0.8)}
            </span>
          </CardDescription>
        </CardHeader>
      </Link>
      <CardFooter className="flex justify-between px-3 pb-3">
        <AddToCart product={product} />
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
