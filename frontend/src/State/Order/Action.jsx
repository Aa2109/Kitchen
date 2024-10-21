import { api } from "../../Config/Api";
import {
  CREAT_ORDER_REQUEST,
  CREAT_ORDER_FAILURE,
  CREAT_ORDER_SUCCESS,
  GET_USERS_ORDERS_FAILURE,
  GET_USERS_ORDERS_REQUEST,
  GET_USERS_ORDERS_SUCCESS,
  UPDATE_CART_ITEM_QUANTITY_REQUEST,
  UPDATE_CART_ITEM_QUANTITY_SUCCESS,
  UPDATE_CART_ITEM_QUANTITY_FAILURE,
} from "./ActionTypes";

export const createOrder = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: CREAT_ORDER_REQUEST });
    try {
      const { data } = await api.post(`api/order/user/create`, reqData.order, {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
      });

      if (data.payment_url) {
        window.location.href = data.payment_url;
      }

      console.log("Created order: ", data);
      dispatch({ type: CREAT_ORDER_SUCCESS, payload: data });
    } catch (err) {
      console.log("catch error: ", err);
      dispatch({ type: CREAT_ORDER_FAILURE, payload: err });
    }
  };
};

export const getUsersOrder = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_USERS_ORDERS_REQUEST });
    try {
      const { data } = await api.get(`api/order/user/get`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("users order: ", data);
      dispatch({ type: GET_USERS_ORDERS_SUCCESS, payload: data });
    } catch (err) {
      console.log("catch error: ", err);
      dispatch({ type: GET_USERS_ORDERS_FAILURE, payload: err });
    }
  };
};

// Action creator for updating cart item quantity
export const updateCartItemQuantity = (item) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_CART_ITEM_QUANTITY_REQUEST });
    try {
      // Assuming you have an endpoint to update the cart item quantity
      const { data } = await api.put(`api/cart/update/${item.itemId}`, {
        quantity: item.quantity,
      });

      dispatch({ type: UPDATE_CART_ITEM_QUANTITY_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: UPDATE_CART_ITEM_QUANTITY_FAILURE, payload: err });
    }
  };
};