//@ts-nocheck
import { api } from "../../../config/apiConfig";
import { toast } from "react-toastify";
import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  UPDATE_USER_ROLE_REQUEST,
  UPDATE_USER_ROLE_SUCCESS,
  UPDATE_USER_ROLE_FAILURE,
} from "./ActionType";

export const getUsers = () => async (dispatch) => {
  dispatch({ type: GET_USERS_REQUEST });
  try {
    const { data } = await api.get("/api/admin/users/all");
    console.log("users data: ", data);
    dispatch({ type: GET_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_USERS_FAILURE, payload: error.message });
    toast.error(error.response?.data?.message || "Failed to load users");
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  dispatch({ type: DELETE_USER_REQUEST });
  try {
    const { data } = await api.delete(`/api/admin/users/${userId}/delete`);
    dispatch({ type: DELETE_USER_SUCCESS, payload: userId });
    toast.success("User deleted successfully");
  } catch (error) {
    dispatch({ type: DELETE_USER_FAILURE, payload: error.message });
    toast.error(error.response?.data?.message || "Failed to delete user");
  }
};

export const updateUserRole = (userId, newRole) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_ROLE_REQUEST });
  try {
    const { data } = await api.put(`/api/admin/users/${userId}/role`, {
      role: newRole,
    });
    dispatch({ type: UPDATE_USER_ROLE_SUCCESS, payload: data });
    toast.success("User role updated successfully");
  } catch (error) {
    dispatch({ type: UPDATE_USER_ROLE_FAILURE, payload: error.message });
    toast.error(error.response?.data?.message || "Failed to update user role");
  }
};
