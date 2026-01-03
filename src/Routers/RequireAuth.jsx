//@ts-nocheck
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const RequireAuth = ({ children }) => {
  //@ts-ignore
  const { auth } = useSelector((store) => store);
  const location = useLocation();
  const { handleOpenAuthModal } = useAuth();
  const jwt = localStorage.getItem("jwt");
  const isAuthenticated = jwt && auth.user;

  // Open auth modal when user is not authenticated
  useEffect(() => {
    if (auth.isAuthChecked && !isAuthenticated) {
      handleOpenAuthModal();
    }
  }, [auth.isAuthChecked, isAuthenticated, handleOpenAuthModal]);

  // Wait for auth check to complete
  if (!auth.isAuthChecked) {
    return null; // or a loading spinner
  }

  // If not authenticated, redirect to home
  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
