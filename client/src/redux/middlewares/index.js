import thunk from "redux-thunk";
import { autoLogout } from "./autoLogout";
import { syncAuthState } from "./syncAuthState";

export const Middlewares = [
  thunk,
  syncAuthState,
  autoLogout,
];

export default Middlewares;
