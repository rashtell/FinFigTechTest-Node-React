import ReduxConstants from "../../../constants/index.constants";
import {
  baseurl,
  handleResponse,
  headers,
  logoutLocaly,
  setAuthState,
} from "../../index.actions";

/**
 * This function appends module specific settings before handing over
 * @param {Request} request
 * @param {strign} actionName
 * @param {Dispatch} dispatch
 * @returns Promise<array>
 */
const handleAdminRequest = async (request, actionName, dispatch) => {
  return handleResponse(request, "admin." + actionName, dispatch);
};

export const createAdmin =
  ({ username, password, name, email }) =>
  (dispatch) => {
    dispatch({ type: ReduxConstants.fetch.admin.createAdmin.LOADING });

    return handleAdminRequest(
      fetch(`${baseurl}/v1/admins/create/admin`, {
        headers: headers(),
        method: "POST",
        body: JSON.stringify({
          data: {
            username,
            password,
            name,
            email,
          },
        }),
      }),
      "createAdmin",
      dispatch
    );
  };

export const loginAdmin =
  ({ username, password }) =>
  (dispatch) => {
    dispatch({ type: ReduxConstants.fetch.admin.loginAdmin.LOADING });

    return handleAdminRequest(
      fetch(`${baseurl}/v1/admins/login/admin`, {
        headers: headers(),
        method: "POST",
        body: JSON.stringify({ data: { username, password } }),
      }),
      "loginAdmin",
      dispatch
    ).then((resJon) => {
      //handle token storage and authentication process
      if (resJon.extra && resJon.extra.token) {
        const token = resJon.extra.token ?? "";

        localStorage.setItem("figfin-token", token);

        dispatch(setAuthState());
      }
    });
  };

export const getAdmin = () => (dispatch) => {
  dispatch({ type: ReduxConstants.fetch.admin.getAdmin.LOADING });

  return handleAdminRequest(
    fetch(`${baseurl}/v1/admins/get/admin`, {
      headers: headers(),
      method: "GET",
    }),
    "getAdmin",
    dispatch
  );
};

export const logoutAdmin = () => (dispatch) => {
  dispatch({ type: ReduxConstants.fetch.admin.logoutAdmin.LOADING });

  return handleAdminRequest(
    fetch(`${baseurl}/v1/admins/logout/admin`, {
      headers: headers(),
      method: "POST",
    }),
    "logoutAdmin",
    dispatch
  ).then((resJson) => {
    
    //Invalidate locally stored token
    dispatch(logoutLocaly());
  });
};
