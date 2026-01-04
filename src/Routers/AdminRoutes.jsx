import { Route, Routes } from "react-router-dom";
import Admin from "../admin/Admin";
import RequireAdmin from "./RequireAdmin";
import ScrollToTop from "../components/ScrollToTop";

const AdminRoutes = () => {
  return (
    <RequireAdmin>
      <ScrollToTop />
      <Routes>
        <Route path="/*" element={<Admin />} />
      </Routes>
    </RequireAdmin>
  );
};

export default AdminRoutes;
