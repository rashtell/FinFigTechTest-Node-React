import { combineReducers } from "redux";
import adminAdminReducer from "./admin.reducer";
import adminEventReducer from "./event.admin.reducer";

const adminReducer = combineReducers({
  admin: adminAdminReducer,
  event: adminEventReducer,
});

export default adminReducer;
