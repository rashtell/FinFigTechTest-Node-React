import ReduxConstants from "../../../constants/index.constants";
import { baseurl, handleResponse, headers } from "../../index.actions";

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

export const loginAdmin = (username, password) => (dispatch) => {
  dispatch({ type: ReduxConstants.fetch.admin.loginAdmin.LOADING });

  return handleAdminRequest(
    fetch(`${baseurl}/v1/admins/login/admin`, {
      headers: headers(),
      method: "POST",
      body: JSON.stringify({ data: { username: username, password } }),
    }),
    "loginAdmin",
    dispatch
  ).then((resJon) => {
    const token = resJon.extra.token ?? "";
    localStorage.setItem("figfin-token", token);

    dispatch({ type: ReduxConstants.app.SET_AUTHENTICATED, payload: true });
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
  dispatch({ type: RReduxConstants.fetch.admin.logoutAdmin.LOADING });

  return handleAdminRequest(
    fetch(`${baseurl}/v1/admins/logout/admin`, {
      headers: headers(),
      method: "POST",
    }),
    "logoutAdmin",
    dispatch
  ).then((resJson) => {
    localStorage.removeItem("figfin-token");

    dispatch({ type: ReduxConstants.app.SET_AUTHENTICATED, payload: false });
  });
};
