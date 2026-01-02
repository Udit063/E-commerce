import { api } from "../../config/apiConfig";
import { toast } from "react-toastify";
import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_USER_ORDERS_FAILURE,
  GET_USER_ORDERS_REQUEST,
  GET_USER_ORDERS_SUCCESS,
} from "./ActionType";

export const createOrder = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });
  try {
    console.log("reqData:", reqData);

    const { data } = await api.post(`/api/orders/`, reqData.address);
    if (data.id) {
      reqData.navigate({ search: `step=3&order_id=${data.id}` });
    }
    console.log("created order: ", data);
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    toast.success("Order created successfully");
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload: error.message,
    });
    toast.error(error.response?.data?.message || "Failed to create order");
  }
};

export const getOrderById = (orderId) => async (dispatch) => {
  dispatch({ type: GET_ORDER_BY_ID_REQUEST });
  try {
    const { data } = await api.get(`/api/orders/${orderId}`);
    console.log("order by id: ", data);

    dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ORDER_BY_ID_FAILURE,
      payload: error.message,
    });
    toast.error(
      error.response?.data?.message || "Failed to load order details"
    );
  }
};

export const getUserOrders = () => async (dispatch) => {
  dispatch({ type: GET_USER_ORDERS_REQUEST });
  try {
    const { data } = await api.get(`/api/orders/user`);
    console.log("user orders: ", data);
    dispatch({ type: GET_USER_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_ORDERS_FAILURE,
      payload: error.message,
    });
    toast.error(error.response?.data?.message || "Failed to load your orders");
  }
};
