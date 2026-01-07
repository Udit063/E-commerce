// @ts-nocheck
import { api } from "../../config/apiConfig";
import { toast } from "react-toastify";
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
  GET_PRODUCT_REVIEWS_REQUEST,
  GET_PRODUCT_REVIEWS_SUCCESS,
  GET_PRODUCT_REVIEWS_FAILURE,
  GET_PRODUCT_RATINGS_FAILURE,
  GET_PRODUCT_RATINGS_SUCCESS,
  GET_PRODUCT_RATINGS_REQUEST,
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
    parentCategory,
  } = reqData;
  try {
    const parentCategoryParam = parentCategory
      ? `&parentCategory=${parentCategory}`
      : "";
    const { data } = await api.get(
      `/api/products?color=${colors}&size=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}${parentCategoryParam}`
    );
    dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
    // toast.success("Products loaded successfully");
  } catch (error) {
    dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
    toast.error(error.response?.data?.message || "Failed to load products");
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
    toast.error(
      error.response?.data?.message || "Failed to load product details"
    );
  }
};

export const getProductsByCategory =
  (categoryName, parentCategory, storageKey) => async (dispatch) => {
    dispatch({ type: GET_PRODUCTS_BY_CATEGORY_REQUEST });
    try {
      // Use storageKey if provided, otherwise use categoryName
      const key = storageKey || categoryName;

      // If parentCategory is provided, use findProducts endpoint instead
      if (
        parentCategory &&
        (parentCategory === "men" ||
          parentCategory === "women" ||
          parentCategory === "kids")
      ) {
        const reqData = {
          colors: "",
          sizes: "",
          minPrice: 0,
          maxPrice: 10000000,
          minDiscount: 0,
          category: categoryName,
          stock: "",
          sort: "price_low",
          pageNumber: 0,
          pageSize: 100, // Get more products for carousel
          parentCategory: parentCategory,
        };
        const { data } = await api.get(
          `/api/products?color=${reqData.colors}&size=${reqData.sizes}&minPrice=${reqData.minPrice}&maxPrice=${reqData.maxPrice}&minDiscount=${reqData.minDiscount}&category=${reqData.category}&stock=${reqData.stock}&sort=${reqData.sort}&pageNumber=${reqData.pageNumber}&pageSize=${reqData.pageSize}&parentCategory=${reqData.parentCategory}`
        );
        dispatch({
          type: GET_PRODUCTS_BY_CATEGORY_SUCCESS,
          payload: { categoryName: key, products: data.content || data },
        });
      } else {
        // Use the original endpoint if no parentCategory
        const { data } = await api.get(
          `/api/products/category/${categoryName}`
        );
        dispatch({
          type: GET_PRODUCTS_BY_CATEGORY_SUCCESS,
          payload: { categoryName: key, products: data },
        });
      }
    } catch (error) {
      dispatch({
        type: GET_PRODUCTS_BY_CATEGORY_FAILURE,
        payload: error.message,
      });
      toast.error(
        error.response?.data?.message || "Failed to load products by category"
      );
    }
  };

export const createProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });
    const { data } = await api.post(`/api/admin/products/`, product);
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
    toast.success("Product created successfully");
  } catch (error) {
    dispatch({ type: CREATE_PRODUCT_FAILURE, payload: error.message });
    toast.error(error.response?.data?.message || "Failed to create product");
  }
};

export const deleteProductById = (productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    const { data } = await api.delete(
      `/api/admin/products/${productId}/delete`
    );
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: productId });
    toast.success("Product deleted successfully");
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "Product cannot be deleted because it is used in orders";
    dispatch({
      type: DELETE_PRODUCT_FAILURE,
      payload: errorMessage,
    });
    toast.error(errorMessage);
  }
};

// Rating Actions
export const createRating = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_RATING_REQUEST });
  try {
    const { data } = await api.post("/api/ratings/create", reqData);
    dispatch({ type: CREATE_RATING_SUCCESS, payload: data });
    toast.success("Rating submitted successfully");
    return { success: true, data };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({
      type: CREATE_RATING_FAILURE,
      payload: errorMessage,
    });
    toast.error(errorMessage);
    return {
      success: false,
      error: errorMessage,
    };
  }
};

// Review Actions
export const createReview = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_REVIEW_REQUEST });
  try {
    const { data } = await api.post("/api/reviews/create", reqData);
    dispatch({ type: CREATE_REVIEW_SUCCESS, payload: data });
    toast.success("Review submitted successfully");
    return { success: true, data };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({
      type: CREATE_REVIEW_FAILURE,
      payload: errorMessage,
    });
    toast.error(errorMessage);
    return {
      success: false,
      error: errorMessage,
    };
  }
};

// Get Product Ratings
export const getProductRatings = (productId) => async (dispatch) => {
  dispatch({ type: GET_PRODUCT_RATINGS_REQUEST });
  try {
    const { data } = await api.get(`/api/ratings/product/${productId}`);
    dispatch({ type: GET_PRODUCT_RATINGS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_RATINGS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    toast.error(
      error.response?.data?.message || "Failed to load product ratings"
    );
  }
};

// Get Product Reviews
export const getProductReviews = (productId) => async (dispatch) => {
  dispatch({ type: GET_PRODUCT_REVIEWS_REQUEST });
  try {
    const { data } = await api.get(`/api/reviews/product/${productId}`);
    dispatch({ type: GET_PRODUCT_REVIEWS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_REVIEWS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    toast.error(
      error.response?.data?.message || "Failed to load product reviews"
    );
  }
};
