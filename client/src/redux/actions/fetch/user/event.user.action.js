import ReduxConstants from "../../../constants/index.constants";
import { baseurl, handleResponse, headers } from "../../index.actions";

const handleEventRequest = async (request, actionName) => {
  return handleResponse(request, "event." + actionName);
};

export const searchEvent =
  ({ title, categories, dateRange: { from, to }, isVirtual, address }) =>
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
