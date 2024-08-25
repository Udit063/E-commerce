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
  //   useEffect(() => {
  //     fetch("https://fakestoreapi.in/api/products")
  //       .then((res) => {
  //         if (!res.ok) {
  //           throw new Error("Network response was not ok");
  //         }
  //         return res.json();
  //       })
  //       .then((json) => {
  //         setProducts(json);
  //         console.log(json);

  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         setError(err.message);
  //         console.error(err.message);
  //         setLoading(false);
  //       });
  //   }, []);

  //   useEffect(() => {
  //     if (products.length > 0) {
  //       console.log("Products updated:", products.products);
  //     }
  //   }, [products]);

  if (loader) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-4 w-full h-full justify-center gap-8">
      {products &&
        products.map((product) => (
          <div key={product.$id}>
            <ProductCard
              key={product.$id}
              title={product.title}
              description={product.description}
              price={product.price * 50}
              image={product.image}
            />
          </div>
        ))}
    </div>
  );
};

export default Products;
