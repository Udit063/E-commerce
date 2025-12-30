// @ts-nocheck
import { api } from "../../config/apiConfig";
import {
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  GET_PRODUCTS_BY_CATEGORY_REQUEST,
  GET_PRODUCTS_BY_CATEGORY_SUCCESS,
  GET_PRODUCTS_BY_CATEGORY_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAILURE,
  CREATE_RATING_SUCCESS,
  CREATE_RATING_FAILURE,
  CREATE_RATING_REQUEST,
  CREATE_REVIEW_REQUEST,
} from "./ActionType";

export const findProducts = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCTS_REQUEST });
  const {
    colors,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    category,
    stock,
    sort,
    pageNumber,
    pageSize,
  } = reqData;
  try {
    const { data } = await api.get(
      `/api/products?color=${colors}&size=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    console.log("product data: ", data);

    dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
  }
};

export const findProductById = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });
  const { productId } = reqData;
  try {
    const { data } = await api.get(`/api/products/id/${productId}`);
    dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
  }
};

export const getProductsByCategory = (categoryName) => async (dispatch) => {
  dispatch({ type: GET_PRODUCTS_BY_CATEGORY_REQUEST });
  try {
    const { data } = await api.get(`/api/products/category/${categoryName}`);
    console.log("products by category: ", data);
    dispatch({
      type: GET_PRODUCTS_BY_CATEGORY_SUCCESS,
      payload: { categoryName, products: data },
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_BY_CATEGORY_FAILURE,
      payload: error.message,
    });
  }
};

export const createProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });
    const { data } = await api.post(`/api/admin/products/`, product);
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_PRODUCT_FAILURE, payload: error.message });
  }
};

export const deleteProductById = (productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    const { data } = await api.delete(
      `/api/admin/products/${productId}/delete`
    );
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: productId });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAILURE,
      payload:
        error.response?.data?.message ||
        "Product cannot be deleted because it is used in orders",
    });
  }
};

// Rating Actions
export const createRating = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_RATING_REQUEST });
  try {
    const { data } = await api.post("/api/ratings/create", reqData);
    console.log("rating created: ", data);
    dispatch({ type: CREATE_RATING_SUCCESS, payload: data });
    return { success: true, data };
  } catch (error) {
    dispatch({
      type: CREATE_RATING_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};

// Review Actions
export const createReview = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_REVIEW_REQUEST });
  try {
    const { data } = await api.post("/api/reviews/create", reqData);
    console.log("review created: ", data);
    dispatch({ type: CREATE_REVIEW_SUCCESS, payload: data });
    return { success: true, data };
  } catch (error) {
    dispatch({
      type: CREATE_REVIEW_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};
