import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/register/SignUp";
import ProductDetails from "./components/products/ProductDetails";
import { Route, BrowserRouter, Routes } from "react-router-dom";

function App() {
  const isAuth = window.location.pathname;
  console.log(isAuth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
