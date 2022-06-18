import { combineReducers } from "redux";
import userEventReducer from "./event.user.reducer";

const userReducer = combineReducers({
  event: userEventReducer,
});

export default userReducer;
