import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import background from "../../assets/background.jpeg";
import { Link } from "react-router-dom";

function ProductCard() {
  return (
    <Card className="w-[300px] shadow-2xl border border-slate-600 outline-0 backdrop-blur-sm bg-white/30">
      <CardContent className="w-full h-60 flex justify-center items-center p-3">
        <img
          src={background}
          alt=""
          width={100}
          height={100}
          className="w-full h-full object-fit"
        />
      </CardContent>
      <CardHeader className="pt-0 pb-2 px-3 space-y-0">
        <CardTitle className="text-xl text-left font-semibold">Title</CardTitle>
        <CardDescription className="pt-0 m-0">
          <p className="text-justify p-0 m-0">
            Lorem ipsum dolor sit amet consectetur adipisicing molestias
            tenetur?
          </p>
        </CardDescription>
        <CardDescription className="text-black text-xl pt-4">
          Rs. 400
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between px-3 pb-3">
        <Link
          to="/"
          className="w-full text-center flex justify-center items-center p-1.5 text-lg bg-gray-200 rounded-md"
        >
          Add to Cart
        </Link>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
