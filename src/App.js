import "./App.css";
import Cart from "./customer/components/Cart/Cart";
import {Checkout} from "./customer/components/Checkout/Checkout";
import Footer from "./customer/components/Footer/Footer";
import Navigation from "./customer/components/navigation/Navigation";
import Order from "./customer/components/Order/Order";
import HomePage from "./customer/components/pages/HomePage/HomePage";
import Product from "./customer/components/Product/Product";
import {ProductDetails} from "./customer/components/ProductDetails/ProductDetails";

function App() {
  return (
    <div>
      <Navigation />
      <div className="font-bold">
        {/* <HomePage /> */}
        {/* <Product /> */}
        {/* <ProductDetails /> */}
        {/* <Cart /> */}
        {/* <Checkout /> */}
        <Order />
      </div>
      <Footer />
    </div>
  );
}

export default App;
