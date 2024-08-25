import Products from "@/components/products/Products";
import Navbar from "../../components/navbar/navbar";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="text-3xl font-semibold flex items-center justify-center">
        <Products />
      </div>
    </div>
  );
}

export default Home;
