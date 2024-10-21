// actions.js
import { api } from "../../Config/Api";
import { SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE } from "./ActionTypes";

export const doSearch = (keyword, jwt) => {
  return async (dispatch) => {
    dispatch({ type: SEARCH_REQUEST });

    const url = `api/search?keyword=${encodeURIComponent(keyword)}`;

    try {
      const response = await api.get(url, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("Search Results: ", response);
            dispatch({ type: SEARCH_SUCCESS, payload: response.data });
          } catch (err) {
            console.log("catch error: ", err);
            dispatch({ type: SEARCH_FAILURE, payload: err });
          }
        };
      };
      


// export const deleteFoodAction = ({ foodId, jwt }) => {
//   console.log(jwt);

//   return async (dispatch) => {
//     dispatch({ type: DELETE_MENU_ITEM_REQUEST });
//     try {
//       const { data } = await api.delete(`api/admin/food/delete/${foodId}`, {
//         headers: {
//           Authorization: `Bearer ${jwt}`,
//         },
//       });
//       console.log("update menu item availability: ", data);
//       dispatch({ type: DELETE_MENU_ITEM_SUCCESS, payload: foodId });
//     } catch (err) {
//       console.log("catch error: ", err);
//       dispatch({ type: DELETE_MENU_ITEM_FAILURE, payload: err });
//     }
//   };
// };
