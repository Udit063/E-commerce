import Products from "@/components/products/Products";
import Navbar from "../../components/navbar/navbar";

function Home() {
  return (
    <div>
      <div className="sticky w-full top-0 z-30">
        <Navbar />
      </div>

      <Products />
    </div>
  );
}

export default Home;
