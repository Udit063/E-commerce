import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAdmin = ({ children }) => {
  //@ts-ignore
  const { user, isAuthChecked } = useSelector((store) => store.auth);
  
  if (!isAuthChecked) {
    return null;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== "ROLE_ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAdmin;
