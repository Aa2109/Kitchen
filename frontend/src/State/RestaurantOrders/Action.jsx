import { api } from "../../Config/Api";
import {
  GET_RESTAURANTS_ORDER_FAILURE,
  GET_RESTAURANTS_ORDER_REQUEST,
  GET_RESTAURANTS_ORDER_SUCCESS,
  UPADTE_ORDER_STATUS_FAILURE,
  UPADTE_ORDER_STATUS_REQUEST,
  UPADTE_ORDER_STATUS_SUCCESS,
} from "./ActionTypes";

export const updateOrderStatus = ({ orderId, orderStatus, jwt }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: UPADTE_ORDER_STATUS_REQUEST });

      const response = await api.put(
        `api/admin/order/${orderId}/${orderStatus}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      console.log("upadated order: ", response.data);
      dispatch({ type: UPADTE_ORDER_STATUS_SUCCESS, payload: response.data });
    } catch (err) {
      console.log("catched error: ", err);
      dispatch({ type: UPADTE_ORDER_STATUS_FAILURE, payload: err });
    }
  };
};

export const fetchRestaurantsOrder = ({ restaurantId, jwt }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_RESTAURANTS_ORDER_REQUEST });

      // const {data} = await api.get(`/api/admin/order/restaurant/${restaurantId}`,{params:{order_status:orderStatus}},{
      const { data } = await api.get(
        `/api/admin/order/restaurant/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      console.log("restaurants order: ", data);
      dispatch({ type: GET_RESTAURANTS_ORDER_SUCCESS, payload: data });
    } catch (err) {
      console.log("catched error: ", err);
      dispatch({ type: GET_RESTAURANTS_ORDER_FAILURE, payload: err });
    }
  };
};
