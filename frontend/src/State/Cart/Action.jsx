import { api } from "../../Config/Api";
import {
  ADD_ITEMS_TO_FAILURE,
  ADD_ITEMS_TO_REQUEST,
  ADD_ITEMS_TO_SUCCESS,
  CLEAR_CART_FAILURE,
  CLEAR_CART_REQUEST,
  CLEAR_CART_SUCCESS,
  FIND_CART_FAILURE,
  FIND_CART_REQUEST,
  FIND_CART_SUCCESS,
  GET_ALL_CART_ITEMS_FAILURE,
  GET_ALL_CART_ITEMS_REQUEST,
  GET_ALL_CART_ITEMS_SUCCESS,
  REMOVE_CARTITEM_FAILURE,
  REMOVE_CARTITEM_REQUEST,
  REMOVE_CARTITEM_SUCCESS,
  UPADTE_CARTITEM_FAILURE,
  UPADTE_CARTITEM_REQUEST,
  UPADTE_CARTITEM_SUCCESS,
} from "./ActionTypes";

export const findCart = (token) => {
  return async (dispatch) => {
    dispatch({ type: FIND_CART_REQUEST });
    try {
      const response = await api.get(`api/cart-item/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("my-cart: ", response.data);
      dispatch({ type: FIND_CART_SUCCESS, payload: response.data });
    } catch (err) {
      console.log("catch errorr: ", err);
      dispatch({ type: FIND_CART_FAILURE, payload: err });
    }
  };
};

export const getAllcartItems = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_CART_ITEMS_REQUEST });
    try {
      const response = await api.get(`api/cart-item/${reqData.cartId}/items`, {
        headers: {
          Authorization: `Bearer ${reqData.token}`,
        },
      });
      dispatch({ type: GET_ALL_CART_ITEMS_SUCCESS, payload: response.data });
    } catch (err) {
      console.log("catch errorr: ", err);
      dispatch({ type: GET_ALL_CART_ITEMS_FAILURE, payload: err });
    }
  };
};

export const addItemsTocart = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: ADD_ITEMS_TO_REQUEST });
    try {
      const response = await api.post(`api/cart-item/add`, reqData.cartItem, {
        headers: {
          Authorization: `Bearer ${reqData.token}`,
        },
      });
      console.log("add item to cart: ", response.data);
      dispatch({ type: ADD_ITEMS_TO_SUCCESS, payload: response.data });
    } catch (err) {
      console.log("catch errorr: ", err);
      dispatch({ type: ADD_ITEMS_TO_FAILURE, payload: err });
    }
  };
};

export const updateCartItem = (reqData) => {
  // console.log("reqData: ", reqData);
  return async (dispatch) => {
    dispatch({ type: UPADTE_CARTITEM_REQUEST });
    try {
      const {data} = await api.put(`api/cart-item/update`, reqData.data, {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
      });
      console.log("upadte item to cart: ", data);
      dispatch({ type: UPADTE_CARTITEM_SUCCESS, payload: data });
    } catch (err) {
      console.log("catch errorr: ", err);
      dispatch({ type: UPADTE_CARTITEM_FAILURE, payload: err });
    }
  };
};

export const clearCartItem = () => {
  return async (dispatch) => {
    dispatch({ type: CLEAR_CART_REQUEST });
    try {
      const data = await api.put(
        `api/cart-item/clear/cart`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      console.log("rmove item from cart: ", data);
      dispatch({ type: CLEAR_CART_SUCCESS, payload: data });
    } catch (err) {
      console.log("catch errorr: ", err);
      dispatch({ type: CLEAR_CART_FAILURE, payload: err });
    }
  };
};

export const removeCartItem = ({ cartItemId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: REMOVE_CARTITEM_REQUEST });
    try {
      const response = await api.delete(`api/cart-item/${cartItemId}/remove`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("rmove item from cart: ", response.data);
      dispatch({ type: REMOVE_CARTITEM_SUCCESS, payload: cartItemId });
    } catch (err) {
      console.log("catch errorr: ", err);
      dispatch({ type: REMOVE_CARTITEM_FAILURE, payload: err.message });
    }
  };
};
