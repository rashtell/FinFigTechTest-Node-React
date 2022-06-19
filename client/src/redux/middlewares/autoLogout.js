import { logoutLocaly } from "../actions/index.actions";
import ReduxConstants from "../constants/index.constants";

/**
 * This middleware hangles logout of admins with invalid authentication token
 * @param {*} store
 * @returns
 */
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
