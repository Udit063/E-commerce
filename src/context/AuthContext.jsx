//@ts-nocheck
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [openAuthModal, setOpenAuthModal] = useState(false);

  const handleOpenAuthModal = () => {
    setOpenAuthModal(true);
  };

  const handleCloseAuthModal = () => {
    setOpenAuthModal(false);
  };

  return (
    <AuthContext.Provider
      value={{
        openAuthModal,
        handleOpenAuthModal,
        handleCloseAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
