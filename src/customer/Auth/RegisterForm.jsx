// @ts-nocheck
import {
  Button,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
} from "@mui/material";
import { InfoOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, register } from "../../store/Auth/Action";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const validateField = (name, value) => {
    const trimmed = typeof value === "string" ? value.trim() : value;

    switch (name) {
      case "firstName":
      case "lastName": {
        if (!trimmed) return "Required";
        if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(trimmed)) {
          return "Only alphabets are allowed";
        }
        return "";
      }
      case "email": {
        if (!trimmed) return "Required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmed)) {
          return "Enter a valid email address";
        }
        return "";
      }
      case "password": {
        if (!value) return "Required";
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
        if (!passwordRegex.test(value)) {
          return "Min 8 chars, with upper, lower, number & special character";
        }
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
      firstName: true,
      lastName: true,
      email: true,
      password: true,
    });

    return !Object.values(newErrors).some(Boolean);
  };

  const isFormValid =
    !validateField("firstName", form.firstName) &&
    !validateField("lastName", form.lastName) &&
    !validateField("email", form.email) &&
    !validateField("password", form.password);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const data = form;
    const userData = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim(),
      password: data.password,
    };
    dispatch(register(userData));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              autoComplete="given-name"
              value={form.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.firstName && Boolean(errors.firstName)}
              helperText={
                touched.firstName && errors.firstName ? errors.firstName : ""
              }
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              autoComplete="given-name"
              value={form.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.lastName && Boolean(errors.lastName)}
              helperText={
                touched.lastName && errors.lastName ? errors.lastName : ""
              }
            />
          </Grid>
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
                touched.password && errors.password ? errors.password : " "
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip
                      title="8+ chars, at least 1 uppercase, 1 lowercase, 1 number & 1 special character"
                      arrow
                    >
                      <IconButton edge="end" tabIndex={-1}>
                        <InfoOutlined fontSize="small" />
                      </IconButton>
                    </Tooltip>
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
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="flex flex-col items-center justify-center">
        <div className="py-3 flex items-center justify-center">
          <p> Already have an account?</p>
          <Button
            onClick={() => {
              navigate("/login");
            }}
            className="ml-5 p-0"
            size="small"
          >
            Login
          </Button>{" "}
          .
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
