import { api } from "../../../config/apiConfig";
import { toast } from "react-toastify";
import {
  CANCELLED_ORDER_FAILURE,
  CANCELLED_ORDER_REQUEST,
  CANCELLED_ORDER_SUCCESS,
  CONFIRMED_ORDER_FAILURE,
  CONFIRMED_ORDER_REQUEST,
  CONFIRMED_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELIVERED_ORDER_FAILURE,
  DELIVERED_ORDER_REQUEST,
  DELIVERED_ORDER_SUCCESS,
  GET_ORDERS_FAILURE,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  SHIP_ORDER_FAILURE,
  SHIP_ORDER_REQUEST,
  SHIP_ORDER_SUCCESS,
} from "./ActionType";

export const getOrders = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ORDERS_REQUEST });
    try {
      const response = await api.get(`/api/admin/orders/`);
      dispatch({ type: GET_ORDERS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_ORDERS_FAILURE, payload: error.message });
      toast.error(error.response?.data?.message || "Failed to load orders");
    }
  };
};

export const confirmOrder = (orderId) => async (dispatch) => {
  dispatch({ type: CONFIRMED_ORDER_REQUEST });
  try {
    const response = await api.put(`/api/admin/orders/${orderId}/confirmed`);
    const data = response.data;
    dispatch({ type: CONFIRMED_ORDER_SUCCESS, payload: data });
    toast.success("Order confirmed successfully");
  } catch (error) {
    dispatch({ type: CONFIRMED_ORDER_FAILURE, payload: error.message });
    toast.error(error.response?.data?.message || "Failed to confirm order");
  }
};

export const shipOrder = (orderId) => async (dispatch) => {
  dispatch({ type: SHIP_ORDER_REQUEST });
  try {
    const { data } = await api.put(`/api/admin/orders/${orderId}/ship`);
    dispatch({ type: SHIP_ORDER_SUCCESS, payload: data });
    toast.success("Order shipped successfully");
  } catch (error) {
    dispatch({ type: SHIP_ORDER_FAILURE, payload: error.message });
    toast.error(error.response?.data?.message || "Failed to ship order");
  }
};

export const deliverOrder = (orderId) => async (dispatch) => {
  dispatch({ type: DELIVERED_ORDER_REQUEST });
  try {
    const response = await api.put(`/api/admin/orders/${orderId}/deliver`);
    const data = response.data;
    dispatch({ type: DELIVERED_ORDER_SUCCESS, payload: data });
    toast.success("Order delivered successfully");
  } catch (error) {
    dispatch({ type: DELIVERED_ORDER_FAILURE, payload: error.message });
    toast.error(error.response?.data?.message || "Failed to deliver order");
  }
};

// export const cancelOrder = (orderId) => async (dispatch) => {
//   dispatch({ type: CANCELLED_ORDER_REQUEST });
//   try {
//     const response = await api.put(`/api/admin/orders/${orderId}/cancel`);
//     const data = response.data;
//     dispatch({ type: CANCELLED_ORDER_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({ type: CANCELLED_ORDER_FAILURE, payload: error.message });
//   }
// };

export const deleteOrder = (orderId) => async (dispatch) => {
  dispatch({ type: DELETE_ORDER_REQUEST });
  try {
    const response = await api.delete(`/api/admin/orders/${orderId}/delete`);
    const data = response.data;
    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data });
    toast.success("Order deleted successfully");
  } catch (error) {
    dispatch({ type: DELETE_ORDER_FAILURE, payload: error.message });
    toast.error(error.response?.data?.message || "Failed to delete order");
  }
};
