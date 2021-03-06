import { combineReducers } from "redux";
import ReduxConstants from "../constants/index.constants";
import fetchReducer from "./fetch/index.fetch.reducer";
import layoutReducer from "./layout/layout.reducer";

const appInitialState = {
  isAuthenticated: false,
  error: "",
  success: "",
};
const app = (state = appInitialState, action) => {
  switch (action.type) {
    case ReduxConstants.app.SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
      };

    case ReduxConstants.app.UNSET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: false,
      };

    case ReduxConstants.app.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ReduxConstants.app.CLEAR_ERROR:
      return {
        ...state,
        error: "",
      };

    case ReduxConstants.app.SET_SUSSESS:
      return {
        ...state,
        sussess: action.payload,
      };
    case ReduxConstants.app.CLEAR_SUSSESS:
      return {
        ...state,
        sussess: "",
      };
    default:
      return state;
  }
};

const appReducer = combineReducers({
  app,
  fetch: fetchReducer,
  layout: layoutReducer,
});

export default appReducer;
