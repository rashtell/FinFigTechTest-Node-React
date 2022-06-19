import { logoutLocaly } from "../actions/index.actions";
import ReduxConstants from "../constants/index.constants";

export const autoLogout = (store) => (next) => (action) => {
  if (
    typeof action.payload === "string" &&
    action.payload.toLowerCase == "invalid request"
  ) {
    store.dispatch(logoutLocaly());
  }

  return next(action);
};

export default autoLogout;
