import {
  CREATE_CATEGORY_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_EVENTS_FAILURE,
  CREATE_EVENTS_REQUEST,
  CREATE_EVENTS_SUCCESS,
  CREATE_RESTAURANT_FAILURE,
  CREATE_RESTAURANT_REQUEST,
  CREATE_RESTAURANT_SUCCESS,
  DELETE_EVENTS_FAILURE,
  DELETE_EVENTS_REQUEST,
  DELETE_EVENTS_SUCCESS,
  DELETE_RESTAURANT_FAILURE,
  DELETE_RESTAURANT_REQUEST,
  DELETE_RESTAURANT_SUCCESS,
  GET_ALL_EVENTS_FAILURE,
  GET_ALL_EVENTS_REQUEST,
  GET_ALL_EVENTS_SUCCESS,
  GET_ALL_RESTAURANT_FAILURE,
  GET_ALL_RESTAURANT_REQUEST,
  GET_ALL_RESTAURANT_SUCCESS,
  GET_RESTAURANTS_CATEGORY_FAILURE,
  GET_RESTAURANTS_CATEGORY_REQUEST,
  GET_RESTAURANTS_CATEGORY_SUCCESS,
  GET_RESTAURANTS_EVENTS_FAILURE,
  GET_RESTAURANTS_EVENTS_REQUEST,
  GET_RESTAURANTS_EVENTS_SUCCESS,
  GET_RESTAURANT_BY_ID_FAILURE,
  GET_RESTAURANT_BY_ID_REQUEST,
  GET_RESTAURANT_BY_ID_SUCCESS,
  GET_RESTAURANT_BY_USER_FAILURE,
  GET_RESTAURANT_BY_USER_REQUEST,
  GET_RESTAURANT_BY_USER_SUCCESS,
  UPDATE_RESTAURANT_FAILURE,
  UPDATE_RESTAURANT_REQUEST,
  UPDATE_RESTAURANT_STATUS_FAILURE,
  UPDATE_RESTAURANT_STATUS_REQUEST,
  UPDATE_RESTAURANT_STATUS_SUCCESS,
  UPDATE_RESTAURANT_SUCCESS,
} from "./ActionTypes";
import { api } from "../../Config/Api";

export const createRestaurant = (reqData) => {
  console.log("token: ", reqData.token, " reqData: ", reqData);
  return async (dispatch) => {
    dispatch({ type: CREATE_RESTAURANT_REQUEST });
    try {
      const { data } = await api.post(
        `/api/admin/restaurant/create`,
        reqData.data,
        {
          headers: {
            Authorization: `Bearer ${reqData.token}`,
          },
        }
      );
      console.log("restaurant created: ", data);
      dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: data });
    } catch (err) {
      console.log("error catch: ", err);
      dispatch({ type: CREATE_RESTAURANT_FAILURE, payload: err });
    }
  };
};

export const getAllRestaurantsAction = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_RESTAURANT_REQUEST });
    try {
      const { data } = await api.get(`/api/user/restaurant/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("All restaurant: ", data);
      dispatch({ type: GET_ALL_RESTAURANT_SUCCESS, payload: data });
    } catch (err) {
      console.log("error in getting restaurant: ", err);
      dispatch({ type: GET_ALL_RESTAURANT_FAILURE, payload: err });
    }
  };
};

export const getRestaurantById = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });
    try {
      const response = await api.get(
        `/api/user/restaurant/${reqData.restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        }
      );
      dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: response.data });
    } catch (err) {
      console.log("erron in getting restaurantById: ", err);
      dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: err });
    }
  };
};

export const getRestaurantByUser = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_USER_REQUEST });

    try {
      const { data } = await api.get(`/api/admin/restaurant/user`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("get restaurant by user id: ", data);
      dispatch({ type: GET_RESTAURANT_BY_USER_SUCCESS, payload: data });
    } catch (err) {
      console.log("error in rest.by userid: ", err);
      dispatch({
        type: GET_RESTAURANT_BY_USER_FAILURE,
        payload: err.message,
      });
    }
  };
};

export const updateRestaurant = ({ restaurantId, restaurantData, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANT_REQUEST });
    try {
      const res = await api.put(
        `/api/admin/restaurant/update/${restaurantId}/user`,
        restaurantData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("restaurant updated: ", res);
      dispatch({ type: UPDATE_RESTAURANT_SUCCESS, payload: res.data });
    } catch (err) {
      console.log("error catch: ", err);
      dispatch({ type: UPDATE_RESTAURANT_FAILURE, payload: err });
    }
  };
};

export const deleteRestaurant = ({ restaurantId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_RESTAURANT_REQUEST });
    try {
      const res = await api.delete(
        `/api/admin/restaurant//delete/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("restaurant deleted: ", res.data);
      dispatch({ type: DELETE_RESTAURANT_SUCCESS, payload: restaurantId });
    } catch (err) {
      console.log("error catch: ", err);
      dispatch({ type: DELETE_RESTAURANT_FAILURE, payload: err });
    }
  };
};

export const updateRestaurantStatus = ({ restaurantId, jwt }) => {
  console.log("restaurantId: ", restaurantId);
  return async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });
    try {
      const res = await api.put(
        `/api/admin/restaurant/${restaurantId}/status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("restaurant status: ", res.data);
      dispatch({ type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: res.data });
    } catch (err) {
      console.log("error catch: ", err);
      dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: err });
    }
  };
};

export const createEventAction = ({ data, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_EVENTS_REQUEST });
    try {
      const res = await api.post(
        `/api/admin/restaurant/create/events`,
        data,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("restaurant events: ", res.data);
      dispatch({ type: CREATE_EVENTS_SUCCESS, payload: res.data });
    } catch (err) {
      console.log("error catch: ", err);
      dispatch({ type: CREATE_EVENTS_FAILURE, payload: err });
    }
  };
};

export const getAllEvents = ({ jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_EVENTS_REQUEST });
    try {
      const res = await api.get(`/api/restaurant/events`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("restaurant events: ", res.data);
      dispatch({ type: GET_ALL_EVENTS_SUCCESS, payload: res.data });
    } catch (err) {
      console.log("error catch: ", err);
      dispatch({ type: GET_ALL_EVENTS_FAILURE, payload: err });
    }
  };
};

export const deleteEventAction = ({ eventId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_EVENTS_REQUEST });
    try {
      const res = await api.delete(`/api/admin/events/${eventId}/delete`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("restaurant events: ", res.data);
      dispatch({ type: DELETE_EVENTS_SUCCESS, payload: eventId });
    } catch (err) {
      console.log("error catch: ", err);
      dispatch({ type: DELETE_EVENTS_FAILURE, payload: err });
    }
  };
};

export const getRestaurantsEvents = ({ restaurantId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANTS_EVENTS_REQUEST });
    try {
      const res = await api.get(
        `/api/admin/events/restaurant/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("restaurant events: ", res.data);
      dispatch({ type: GET_RESTAURANTS_EVENTS_SUCCESS, payload: restaurantId });
    } catch (err) {
      console.log("error catch: ", err);
      dispatch({ type: GET_RESTAURANTS_EVENTS_FAILURE, payload: err });
    }
  };
};

export const createCategoryaction = ({ reqData, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });
    try {
      const res = await api.post(`/api/admin/category/create`, reqData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("create category: ", res.data);
      dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: res.data });
    } catch (err) {
      console.log("error catch: ", err);
      dispatch({ type: CREATE_CATEGORY_FAILURE, payload: err });
    }
  };
};


export const getRestaurantsCategory = ({ restaurantId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANTS_CATEGORY_REQUEST });
    try {
      const res = await api.get(`/api/category/restaurant/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("get restaurant category: ", res.data);
      dispatch({ type: GET_RESTAURANTS_CATEGORY_SUCCESS, payload: res.data });
    } catch (err) {
      console.log("error catch: ", err);
      dispatch({ type: GET_RESTAURANTS_CATEGORY_FAILURE, payload: err });
    }
  };
};
