import ReduxConstants from "../constants/index.constants";

//#region Request helpers
export const headers = () => ({
  Authorization: `Bearer ${localStorage.getItem("figfin-token")}`,
  "Content-Type": "application/json",
});

const port = process.env.PORT ?? 4048;
export const baseurl = "http://localhost:" + port;

export const handleResponse = async (request, actionName = "", dispatch) => {
  let fetchConstant = ReduxConstants.fetch;
  [fetchConstant, ...actionName.split(".")].reduce((prev, curr) => prev[curr]);

  return request()
    .then((res) => res.json())
    .then((resJson) => {
      const data = resJson.data;
      const type = resJson.type;
      const message = resJson.message;

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
