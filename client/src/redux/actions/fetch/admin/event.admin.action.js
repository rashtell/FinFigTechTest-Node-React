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
      //get an updated list of the admin's events
      dispatch(getEvents());
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
      //get an updated list of the admin's events
      dispatch(getEvents());
    });
  };

export const deleteEvent = (id) => (dispatch) => {
  dispatch({ type: ReduxConstants.fetch.admin.event.deleteEvent.LOADING });

  return handleEventRequest(
    fetch(`${baseurl}/v1/admins/events/delete/event/${id}`, {
      headers: headers(),
      method: "DELETE",
    }),
    "deleteEvent",
    dispatch
  ).then(() => {
    //get an updated list of the admin's events
    dispatch(getEvents());
  });
};
