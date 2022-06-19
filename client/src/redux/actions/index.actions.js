import ReduxConstants from "../constants/index.constants";

//#region Request helpers
/**
 * This function setsup the header for all api requests
 * It appends the authentication token from staorage
 * @returns object
 */
export const headers = () => ({
  Authorization: `Bearer ${localStorage.getItem("figfin-token")}`,
  "Content-Type": "application/json",
});

const port = process.env.PORT ?? 4480;
export const baseurl = "http://localhost:" + port;

/**
 * This method handles all common procedures in fetch actions
 * @param {Request} request
 * @param {string} actionName
 * @param {Dispatch} dispatch
 * @returns Promise<object>
 */
export const handleResponse = async (request, actionName = "", dispatch) => {
  let fetchConstant = ReduxConstants.fetch;
  fetchConstant = [fetchConstant, ...actionName.split(".")].reduce(
    (prev, curr) => prev[curr]
  );

  return request
    .then((res) => res.json())
    .then((resJson) => {
      const data = resJson.data;
      const type = resJson.type;
      const message = resJson.msg;

      if (type == "error") {
        dispatch({
          type: fetchConstant.LOAD_FAILED,
          payload: message,
        });

        return resJson;
      }

      dispatch({
        type: fetchConstant.LOAD_SUCCESS,
        payload: { data, message },
      });

      return resJson;
    })
    .catch((error) => {
      const errorMessage = error.message;
      dispatch({
        type: fetchConstant.LOAD_FAILED,
        payload: errorMessage,
      });

      return { type: "error", message: errorMessage };
    })
    .finally(() => {
      dispatch({ type: fetchConstant.LOADED });
    });
};

//#endregion

//#region App
export const setAppError = (payload) => ({
  type: ReduxConstants.app.SET_ERROR,
  payload,
});
export const clearAppError = () => ({
  type: ReduxConstants.app.CLEAR_ERROR,
});

export const setAppSuccess = (payload) => ({
  type: ReduxConstants.app.SET_SUCCESS,
  payload,
});
export const clearAppSuccess = () => ({
  type: ReduxConstants.app.CLEAR_SUCCESS,
});
//#endregion

//#region Admin
export const setCreateAdminRequestParams = (payload) => ({
  type: ReduxConstants.fetch.admin.createAdmin.SET_REQUEST_PARAMS,
  payload,
});
export const setLoginAdminRequestParams = (payload) => ({
  type: ReduxConstants.fetch.admin.loginAdmin.SET_REQUEST_PARAMS,
  payload,
});
export const logoutLocaly = () => (dispatch) => {
  dispatch({ type: ReduxConstants.app.UNSET_AUTHENTICATED });
  console.log("logoutLocaly");
  localStorage.removeItem("figfin-token");
  localStorage.removeItem("figfin-authed");
};

export const setAuthState = () => (dispatch) => {
  localStorage.setItem("figfin-authed", "true");
  dispatch({ type: ReduxConstants.app.SET_AUTHENTICATED, payload: true });
};
//#endregion

//#region  Admin Event
export const setAdminCreateEventRequestParams = (payload) => ({
  type: ReduxConstants.fetch.admin.createEvent.SET_REQUEST_PARAMS,
  payload,
});
export const setAdminUpdateEventRequestParams = (payload) => ({
  type: ReduxConstants.fetch.admin.updateEvent.SET_REQUEST_PARAMS,
  payload,
});
//#endregion

//#region User Event
export const setUserSearchEventRequestParams = (payload) => ({
  type: ReduxConstants.fetch.event.searchEvent.SET_REQUEST_PARAMS,
  payload,
});
//#endregion
