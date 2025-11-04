import "./App.css";
import Footer from "./customer/components/Footer/Footer";
import Navigation from "./customer/components/navigation/Navigation";
import HomePage from "./customer/components/pages/HomePage/HomePage";
import Product from "./customer/components/Product/Product";

function App() {
  return (
    <div>
      <Navigation />
      <div className="font-bold">
        {/* <HomePage /> */}
        <Product />
      </div>
      <Footer />
    </div>
  );
}

export default App;
