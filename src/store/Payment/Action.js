import { api } from "../../config/apiConfig";
import { toast } from "react-toastify";
import {
  CREATE_PAYMENT_FAILURE,
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_SUCCESS,
  UPDATE_PAYMENT_FAILURE,
  UPDATE_PAYMENT_REQUEST,
  UPDATE_PAYMENT_SUCCESS,
} from "./ActionType";

export const createPayment = (orderId) => async (dispatch) => {
  dispatch({ type: CREATE_PAYMENT_REQUEST });
  try {
    const { data } = await api.post(`/api/payments/${orderId}`, {});
    if (data.payment_link_url) {
      window.location.href = data.payment_link_url;
    }
    console.log("data aayaa", data);
    toast.success("Redirecting to payment...");
    // dispatch({ type: CREATE_PAYMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_PAYMENT_FAILURE, payload: error.message });
    toast.error(error.response?.data?.message || "Failed to create payment");
  }
};

export const updatePayment = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_PAYMENT_REQUEST });
  try {
    const { data } = await api.get(
      `/api/payments?payment_id=${reqData.paymentId}&order_id=${reqData.orderId}`
    );
    console.log("update payment:", data);
    toast.success("Payment updated successfully");
    // dispatch({ type: UPDATE_PAYMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_PAYMENT_FAILURE, payload: error.message });
    toast.error(error.response?.data?.message || "Failed to update payment");
  }
};
