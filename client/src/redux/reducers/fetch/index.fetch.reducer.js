import { combineReducers } from "redux";
import adminReducer from "./admin/index.admin.reducer";
import userReducer from "./user/index.user.reducer";

const fetchReducer = combineReducers({
  admin: adminReducer,
  user: userReducer,
});

export default fetchReducer;
