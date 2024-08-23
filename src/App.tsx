import { Login } from "./components/auth/Login";
import { SignUp } from "./components/auth/SignUp";
import { Route, BrowserRouter, Routes } from "react-router-dom";

function App() {
  return (
    <div
      className={`flex w-full min-h-screen h-full justify-center items-center  bg-[url('/src/assets/background.jpeg')] bg-no-repeat bg-cover`}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
