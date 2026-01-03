import { Box, Modal, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const AuthModal = ({ open, handleClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  // Show register form if on /register, otherwise show login form
  const isRegisterPage = location.pathname === "/register";

  const handleModalClose = (event, reason) => {
    // Close the modal
    handleClose();
    // Redirect to home page if clicking outside (backdrop) or pressing escape
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      // Only redirect if we're on /login or /register routes
      if (location.pathname === "/login" || location.pathname === "/register") {
        navigate("/");
      }
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {isRegisterPage ? <RegisterForm /> : <LoginForm />}
        </Box>
      </Modal>
    </div>
  );
};

export default AuthModal;
