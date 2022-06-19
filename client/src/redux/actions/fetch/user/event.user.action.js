import ReduxConstants from "../../../constants/index.constants";
import { baseurl, handleResponse, headers } from "../../index.actions";

/**
 * This function appends module specific settings before handing over
 * @param {Request} request
 * @param {strign} actionName
 * @param {Dispatch} dispatch
 * @returns Promise<array>
 */
const handleEventRequest = async (request, actionName, dispatch) => {
  return handleResponse(request, "event." + actionName, dispatch);
};

export const searchEvent =
  ({ title, categories, dateRange, isVirtual, address }) =>
  (dispatch) => {
    dispatch({ type: ReduxConstants.fetch.event.searchEvent.LOADING });

    return handleEventRequest(
      fetch(`${baseurl}/v1/events/search/event`, {
        headers: headers(),
        method: "POST",
        body: JSON.stringify({
          data: {
            title,
            categories,
            dateRange,
            isVirtual,
            address,
          },
        }),
      }),
      "searchEvent",
      dispatch
    );
  };

export const getEventCategories = () => (dispatch) => {
  dispatch({ type: ReduxConstants.fetch.event.getEventCategories.LOADING });

  return handleEventRequest(
    fetch(`${baseurl}/v1/events/get/event-categories`, {
      headers: headers(),
      method: "GET",
    }),
    "getEventCategories",
    dispatch
  );
};
