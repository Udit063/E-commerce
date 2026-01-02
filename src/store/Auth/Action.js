import { api } from "../../config/apiConfig";
import { toast } from "react-toastify";
import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionType";

const token = localStorage.getItem("jwt");
const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

export const register = (userData) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await api.post("/auth/signup", userData);
    const user = response.data;
    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
    }
    console.log("user ", user);

    dispatch(registerSuccess(user.jwt));
    toast.success("Registration successful! Welcome!");
  } catch (error) {
    dispatch(registerFailure(error.message));
    toast.error(
      error.response?.data?.message || "Registration failed. Please try again."
    );
  }
};

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (userData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await api.post("/auth/signin", userData);
    const user = response.data;

    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
    }
    console.log("user ", user);
    dispatch(loginSuccess(user.jwt));
    toast.success("Login successful! Welcome back!");
  } catch (error) {
    dispatch(loginFailure(error.message));
    toast.error(
      error.response?.data?.message ||
        "Login failed. Please check your credentials."
    );
  }
};

const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });

export const getUser = (jwt) => async (dispatch) => {
  dispatch(getUserRequest());
  try {
    // The api instance automatically adds the Authorization header via interceptor
    const response = await api.get("/api/users/profile");
    const user = response.data;
    console.log("user ", user);

    dispatch(getUserSuccess(user));
  } catch (error) {
    dispatch(getUserFailure(error.message));
    toast.error(error.response?.data?.message || "Failed to load user profile");
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT, payload: null });
  // localStorage.removeItem("jwt");
  localStorage.clear();
  toast.success("Logged out successfully");
};
