import ReduxConstants from "../../../constants/index.constants";
import { baseurl, handleResponse, headers } from "../../index.actions";

const handleEventRequest = async (request, actionName, dispatch) => {
  return handleResponse(request, "admin.event." + actionName, dispatch);
};

export const createEvent =
  ({ title, description, category, date, isVirtual, address }) =>
  (dispatch) => {
    dispatch({ type: ReduxConstants.fetch.admin.event.createEvent.LOADING });

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
    ).then(() => {
      this.getEvents();
    });
  };

export const getEvents = () => (dispatch) => {
  dispatch({ type: ReduxConstants.fetch.admin.event.getEvents.LOADING });

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
    dispatch({ type: ReduxConstants.fetch.admin.event.updateEvent.LOADING });

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
    ).then(() => {
      this.getEvents();
    });
  };

export const deleteEvent = (id) => (dispatch) => {
  dispatch({ type: ReduxConstants.fetch.admin.event.deleteEvent.LOADING });

  return handleEventRequest(
    fetch(`${baseurl}/v1/admins/events/logout/event/${id}`, {
      headers: headers(),
      method: "DELETE",
    }),
    "deleteEvent",
    dispatch
  ).then(() => {
    this.getEvents();
  });
};
