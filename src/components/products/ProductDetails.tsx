import { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { databases } from "@/appwrite/appwriteConfig";
import { error, log } from "console";

function ProductDetails() {
  const id = useParams();
  const [product, setProduct] = useState();

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

  return (
    <div>
      <Navbar />
      {product ? (
        <Card className="px-3 shadow-xl border border-slate-600 outline-0 backdrop-blur-sm bg-white/30">
          <CardContent className="w-full h-60 flex justify-center items-center p-3">
            <img
              src={product.image}
              alt=""
              width={100}
              height={100}
              className="w-full h-full object-fit"
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
              Rs. {product.price}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between px-3 pb-3">
            <Link
              to="/"
              className="w-full text-center flex justify-center items-center p-1.5 gap-2 text-lg bg-gray-200 rounded-md"
            >
              <img src="" alt="" className="w-[20px]" />
              <p>Add to Cart</p>
            </Link>
          </CardFooter>
        </Card>
      ) : (
        <p>Loading...</p> // Fallback content while product is loading
      )}
    </div>
  );
}

export default ProductDetails;
