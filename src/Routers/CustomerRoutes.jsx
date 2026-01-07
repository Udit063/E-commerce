//@ts-nocheck
import { Route, Routes } from "react-router-dom";
import Cart from "../customer/components/Cart/Cart";
import Navigation from "../customer/components/navigation/Navigation";
import Footer from "../customer/components/Footer/Footer";
import Product from "../customer/components/Product/Product";
import { ProductDetails } from "../customer/components/ProductDetails/ProductDetails";
import { Checkout } from "../customer/components/Checkout/Checkout";
import Order from "../customer/components/Order/Order";
import OrderDetails from "../customer/components/Order/OrderDetails";
import HomePage from "../customer/pages/HomePage/HomePage";
import PaymentSuccess from "../customer/components/Payment/PaymentSuccess";
import RequireAuth from "./RequireAuth";
import ScrollToTop from "../components/ScrollToTop";

const CustomerRoutes = () => {
  return (
    <div>ī
      <ScrollToTop />
      <div>
        <Navigation />
      </div>
      <Routes>
        <Route path="/login" element={<HomePage />}></Route>
        <Route path="/register" element={<HomePage />}></Route>

        <Route path="/" element={<HomePage />}></Route>
        <Route
          path="/cart"
          element={
            <RequireAuth>
              <Cart />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/:lavelOne/:lavelTwo/:lavelThree"
          element={<Product />}
        ></Route>
        <Route path="/product/:productId" element={<ProductDetails />}></Route>
        <Route
          path="/checkout"
          element={
            <RequireAuth>
              <Checkout />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/account/order"
          element={
            <RequireAuth>
              <Order />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/account/order/:orderId"
          element={
            <RequireAuth>
              <OrderDetails />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/payment/:orderId"
          element={
            <RequireAuth>
              <PaymentSuccess />
            </RequireAuth>
          }
        ></Route>
      </Routes>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CustomerRoutes;
