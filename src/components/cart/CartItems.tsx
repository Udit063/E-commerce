import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useProductStore from "@/store/store";
import { useEffect } from "react";
import { Button } from "../ui/button";

export function CartItems() {
  const products = useProductStore((state) => state.products);
  const increaseQuantity = useProductStore((state) => state.increaseQuantity);
  const decreaseQuantity = useProductStore((state) => state.decreaseQuantity);

  useEffect(() => {
    console.log(products);
  }, [products]);

  return products.length === 0 ? (
    <div className="flex flex-col justify-center items-center w-full h-[500px] text-3xl text-main font-semibold">
      <p>Nothing here yet</p>
    </div>
  ) : (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.$id}>
            <TableCell>
              <img
                src={product.image}
                alt={`${product.name} image`}
                height={100}
                width={100}
                className="h-[50px] w-[50px]"
              />
            </TableCell>
            <TableCell>{product.title}</TableCell>
            <TableCell className="flex items-center">
              <Button
                variant="outline"
                onClick={() => decreaseQuantity(product.$id)}
                className="ml-1 md:ml-0 mr-1 sm:mr-2 px-2 py-1 text-sm sm:px-3 sm:py-2 sm:text-base"
              >
                -
              </Button>
              <p className="border border-input px-2 py-1 text-sm sm:px-3 sm:py-2 sm:text-base rounded-md ">
                {product.quantity}
              </p>
              <Button
                variant="outline"
                onClick={() => increaseQuantity(product.$id)}
                className="ml-1 sm:ml-2 px-2 py-1 text-sm sm:px-3 sm:py-2 sm:text-base"
              >
                +
              </Button>
            </TableCell>
            <TableCell className="text-right">
              ${product.price * product.quantity}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
