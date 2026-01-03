//@ts-nocheck
import { api } from "../../config/apiConfig";
import { toast } from "react-toastify";
import {
  ADD_ITEM_TO_CART_FAILURE,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  GET_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
  CLEAR_CART,
} from "./ActionType";

export const getCart = () => async (dispatch) => {
  dispatch({ type: GET_CART_REQUEST });
  try {
    const { data } = await api.get("/api/cart/");
    dispatch({ type: GET_CART_SUCCESS, payload: data });
    console.log("cart data:", data);
  } catch (error) {
    dispatch({ type: GET_CART_FAILURE, payload: error.message });
    toast.error(error.response?.data?.message || "Failed to load cart");
  }
};

export const addItemToCart = (reqData) => async (dispatch) => {
  dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
  try {
    const addData = {
      productId: reqData.productId,
      size: reqData.size,
    };

    // Add item to cart (always adds with quantity 1, user can update in cart)
    const { data } = await api.put("/api/cart/add", addData);
    dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data });
    toast.success("Item added to cart successfully");
  } catch (error) {
    dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error.message });
    toast.error(error.response?.data?.message || "Failed to add item to cart");
  }
};

export const removeCartItem = (cartItemId) => async (dispatch) => {
  dispatch({ type: REMOVE_CART_ITEM_REQUEST });
  try {
    const { data } = await api.delete(`/api/cart_item/${cartItemId}`);
    dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: data });
    toast.success("Item removed from cart");
  } catch (error) {
    dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: error.message });
    toast.error(
      error.response?.data?.message || "Failed to remove item from cart"
    );
  }
};

export const updateCartItem = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_CART_ITEM_REQUEST });
  try {
    const { data } = await api.put(
      `/api/cart_item/${reqData.cartItemId}`,
      reqData.data
    );
    console.log("cart123data: ", data);

    dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: error.message });
    toast.error(error.response?.data?.message || "Failed to update cart");
  }
};

export const clearCart = () => (dispatch) => {
  dispatch({ type: CLEAR_CART });
};
