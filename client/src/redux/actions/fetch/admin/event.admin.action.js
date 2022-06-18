import ReduxConstants from "../../../constants/index.constants";
import { baseurl, handleResponse, headers } from "../../index.actions";

const handleEventRequest = async (request, actionName, dispatch) => {
  return handleResponse(request, "event." + actionName, dispatch);
};

export const createEvent =
  ({ title, description, category, date, isVirtual, address }) =>
  (dispatch) => {
    dispatch({ type: ReduxConstants.fetch.event.createEvent.LOADING });

    return handleEventRequest(
      fetch(`${baseurl}/v1/admins/events/create/event`, {
        headers: headers(),
        method: "POST",
        body: JSON.stringify({
          data: {
            title,
            description,
            category,
            date,
            isVirtual,
            address,
          },
        }),
      }),
      "createEvent",
      dispatch
    );
  };

export const getEvents = () => (dispatch) => {
  dispatch({ type: ReduxConstants.fetch.event.getEvents.LOADING });

  return handleEventRequest(
    fetch(`${baseurl}/v1/admins/events/get/events`, {
      headers: headers(),
      method: "GET",
    }),
    "getEvents",
    dispatch
  );
};

export const updateEvent =
  (id, { title, description, category, date, isVirtual, address }) =>
  (dispatch) => {
    dispatch({ type: ReduxConstants.fetch.event.updateEvent.LOADING });

    return handleEventRequest(
      fetch(`${baseurl}/v1/admins/events/update/event/${id}`, {
        headers: headers(),
        method: "PATCH",
        body: JSON.stringify({
          data: { title, description, category, date, isVirtual, address },
        }),
      }),
      "updateEvent",
      dispatch
    );
  };

export const deleteEvent = (id) => (dispatch) => {
  dispatch({ type: ReduxConstants.fetch.event.deleteEvent.LOADING });

  return handleEventRequest(
    fetch(`${baseurl}/v1/admins/events/logout/event/${id}`, {
      headers: headers(),
      method: "DELETE",
    }),
    "deleteEvent",
    dispatch
  );
};
