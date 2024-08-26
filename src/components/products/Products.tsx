import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { databases } from "@/appwrite/appwriteConfig";

const Products = () => {
  const [products, setProducts] = useState();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    const getProducts = databases.listDocuments(
      "66c90328001a42e8785f",
      "66c9034d001c90533fed"
    );
    getProducts.then(
      function (response) {
        console.log(response.documents);
        setProducts(response.documents);
      },
      function (error) {
        console.log(error);
      }
    );
    setLoader(false);
  }, []);

  if (loader) return <p>Loading...</p>;

  return (
    <div className="px-[10%] py-10 grid grid-cols-4 p-4 justify-center gap-8">
      {products &&
        products.map((product) => (
          <div key={product.$id}>
            <ProductCard
              key={product.$id}
              ID={product.$id}
              title={product.title}
              description={product.description}
              price={product.price}
              image={product.image}
            />
          </div>
        ))}
    </div>
  );
};

export default Products;
