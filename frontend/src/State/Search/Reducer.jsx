import { SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE } from "./ActionTypes";

const initialState = {
  results: [],
  loading: false,
  error: null,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return { ...state, loading: true };
    case SEARCH_SUCCESS:
      return { ...state, loading: false, results: action.payload };
    case SEARCH_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default searchReducer;
