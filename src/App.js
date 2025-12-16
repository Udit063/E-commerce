import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdminRoutes from "./Routers/AdminRoutes";
import CustomerRoutes from "./Routers/CustomerRoutes";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<CustomerRoutes />}></Route>
        <Route path="/admin/*" element={<AdminRoutes />}></Route>
      </Routes>
    </div>
  );
}

export default App;
