import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/register/SignUp";
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
