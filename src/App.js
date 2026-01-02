import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdminRoutes from "./Routers/AdminRoutes";
import CustomerRoutes from "./Routers/CustomerRoutes";
import { getUser } from "./store/Auth/Action";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  //@ts-ignore
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    if (jwt && !auth.user) {
      //@ts-ignore
      dispatch(getUser(jwt));
    } else {
      dispatch({ type: "GET_USER_FAILURE" });
    }
  }, [jwt]);
  return (
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<CustomerRoutes />}></Route>
        <Route path="/admin/*" element={<AdminRoutes />}></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
