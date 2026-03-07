// @ts-nocheck
import {
  Button,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, login } from "../../store/Auth/Action";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const validateField = (name, value) => {
    const trimmed = typeof value === "string" ? value.trim() : value;

    switch (name) {
      case "email": {
        if (!trimmed) return "Required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmed)) {
          return "Enter a valid email address";
        }
        return "";
      }
      case "password": {
        if (!value) return "Password is required";
        return "";
      }
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const validateForm = () => {
    const newErrors = Object.keys(form).reduce((acc, key) => {
      acc[key] = validateField(key, form[key]);
      return acc;
    }, {});

    setErrors(newErrors);
    setTouched({
      email: true,
      password: true,
    });

    return !Object.values(newErrors).some(Boolean);
  };

  const isFormValid =
    !validateField("email", form.email) &&
    !validateField("password", form.password);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const data = form;
    const userData = {
      email: data.email.trim(),
      password: data.password,
    };
    dispatch(login(userData));
  };

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email ? errors.email : ""}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              required
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              label="Password"
              fullWidth
              autoComplete="password"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={
                touched.password && errors.password ? errors.password : ""
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Button
              type="submit"
              className="bg-[#9155FD] w-full"
              variant="contained"
              size="large"
              sx={{ padding: ".8rem 0", bgcolor: "#9155FD" }}
              disabled={!isFormValid}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="flex flex-col items-center justify-center">
        <div className="py-3 flex items-center justify-center">
          <p> Don't have an account?</p>
          <Button
            onClick={() => {
              navigate("/register");
            }}
            className="ml-5 p-0"
            size="small"
          >
            Register
          </Button>{" "}
          .
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
