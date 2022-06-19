import { setAuthState } from "../actions/index.actions";
import ReduxConstants from "../constants/index.constants";

/**
 * This middleware handles authentication state persistence sychng to state
 * @param {*} store
 * @returns Response
 */
export const syncAuthState = (store) => (next) => (action) => {
  const state = store.getState();
  const authed = localStorage.getItem("figfin-authed") ?? null;
  const authToken = localStorage.getItem("figfin-token") ?? null;

  // sych authentication status from localstorage to redux state
  if (
    action.type != ReduxConstants.app.SET_AUTHENTICATED &&
    !state.app.isAuthenticated &&
    authed == "true" &&
    authToken
  ) {
    store.dispatch(setAuthState());
  }

  return next(action);
};

export default syncAuthState;
