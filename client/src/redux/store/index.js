import { applyMiddleware, createStore } from "redux";
import { Middlewares } from "../middlewares";
import appReducer from "../reducers/index.reducer";

export default () => {
  return applyMiddleware(...Middlewares)(createStore)(appReducer);
};
