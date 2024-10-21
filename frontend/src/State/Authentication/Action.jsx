import axios from "axios";
import {
  ADD_TO_FAVORITE_FAILURE,
  ADD_TO_FAVORITE_REQUEST,
  ADD_TO_FAVORITE_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionTypes";
import { API_URL, api } from "../../Config/Api";

export const registerUser = (reqData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    console.log("Request Data", reqData);
    const { data } = await axios.post(
      `${API_URL}/auth/signup`,
      reqData.userData
    );
    if (data.jwt) localStorage.setItem("jwt", data.jwt);
    if (data.role === "ROLE_RESTURANT_OWNER") {
      reqData.navigate("/admin/restaurant");
    } else {
      reqData.navigate("/");
    }
    dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
    console.log("Register success: ", data);

    // let resData = await axios({
    //     method: 'POST',
    //     url: '/api/auth/register',
    //     data: reqDat,
    //     headers:{'Content-Type':'application/json'}
    // })
  } catch (err) {
    dispatch({ type: REGISTER_FAILURE, payload: err });
    console.log("Error in register user", err);
  }
};

export const loginUser = (reqData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    console.log("Request Data", reqData);
    const { data } = await axios.post(
      `${API_URL}/auth/signin`,
      reqData.userData
    );
    if (data.jwt) localStorage.setItem("jwt", data.jwt);
    if (data.role === "ROLE_RESTURANT_OWNER") {
      reqData.navigate("/admin/restaurant");
    } else {
      reqData.navigate("/");
    }
    dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
    console.log("login success: ", data);
  } catch (err) {
    dispatch({ type: LOGIN_FAILURE, payload: err });
    console.log("Error in signin user", err);
  }
};

export const getUser = (jwt) => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });

  try {
    const { data } = await api.get(`api/user/profile`, {
      headers:{ 
        Authorization:`Bearer ${jwt}`},
    });

    dispatch({ type: GET_USER_SUCCESS, payload: data});
    console.log("user profile: ", data);
  } catch (err) {
    dispatch({ type: GET_USER_FAILURE, payload: err });
    console.log("Error in getting user", err);
  }
};

export const addToFavorite =({restaurantId, jwt }) =>async (dispatch) => {
    dispatch({ type: ADD_TO_FAVORITE_REQUEST });
    // console.log("jwt: ",jwt, "restaurantId: ",restaurantId);
    try {
      const { data } = await api.put(
        `/api/user/restaurant/${restaurantId}/add-favorite`,
        {},
        {
          headers:{
           Authorization: `Bearer ${jwt}`,
          }
        }
      );

      dispatch({ type: ADD_TO_FAVORITE_SUCCESS, payload: data });
      console.log("added to favorite: ", data);
    } catch (err) {
      dispatch({ type: ADD_TO_FAVORITE_FAILURE, payload: err });
      console.log("Error in getting restaurant", err);
    }
  };

export const logout = () => async (dispatch) => {
  // dispatch({type:ADD_TO_FAVORITE_REQUEST})
  try {
    localStorage.clear();
    dispatch({ type: LOGOUT });
    console.log("logout success");
  } catch (err) {
    console.log("Error in logout", err);
  }
};
