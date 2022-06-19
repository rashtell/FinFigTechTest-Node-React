import { combineReducers } from "redux";
import ReduxConstants from "../../../constants/index.constants";

const createEventInitialState = {
  request: {
    title: "",
    description: "",
    category: "",
    date: "",
    isVirtual: false,
    address: "",
  },
  response: {
    message: "",
    data: {
      _id: "",
      adminID: null,
      title: "",
      description: "",
      category: "",
      date: "",
      isVirtual: false,
      address: "",
      createdAt: "",
      updatedAt: "",
    },
  },
  loading: false,
};
const createEvent = (state = createEventInitialState, action) => {
  switch (action.type) {
    case ReduxConstants.fetch.admin.event.createEvent.SET_REQUEST_PARAMS:
      return { ...state, request: { ...state.request, ...action.payload } };

    case ReduxConstants.fetch.admin.event.createEvent.LOADING:
      return { ...state, loading: true };

    case ReduxConstants.fetch.admin.event.createEvent.LOADED:
      return { ...state, loading: false };

    case ReduxConstants.fetch.admin.event.createEvent.LOAD_SUCCESS:
      return {
        ...state,
        request: createEventInitialState.request,
        response: action.payload,
      };

    case ReduxConstants.fetch.admin.event.createEvent.LOAD_FAILED:
      return {
        ...state,
        response: {
          data: createEventInitialState.response.data,
          message: action.payload,
        },
      };

    default:
      return state;
  }
};

const getEventsInitialState = {
  request: null,
  response: {
    message: "",
    data: [],
  },
  loading: false,
};
const getEvents = (state = getEventsInitialState, action) => {
  switch (action.type) {
    case ReduxConstants.fetch.admin.event.getEvents.SET_REQUEST_PARAMS:
      return { ...state, request: null };

    case ReduxConstants.fetch.admin.event.getEvents.LOADING:
      return { ...state, loading: true };

    case ReduxConstants.fetch.admin.event.getEvents.LOADED:
      return { ...state, loading: false };

    case ReduxConstants.fetch.admin.event.getEvents.LOAD_SUCCESS:
      return { ...state, response: action.payload };

    case ReduxConstants.fetch.admin.event.getEvents.LOAD_FAILED:
      return {
        ...state,
        response: {
          data: getEventsInitialState.response.data,
          message: action.payload,
        },
      };

    default:
      return state;
  }
};

const updateEventInitialState = {
  request: {
    title: "",
    description: "",
    category: "",
    date: "",
    isVirtual: false,
    address: "",
  },
  response: {
    message: "",
    data: {
      _id: "",
      adminID: null,
      title: "",
      description: "",
      category: "",
      date: "",
      isVirtual: false,
      address: "",
      createdAt: "",
      updatedAt: "",
    },
  },
  loading: false,
};
const updateEvent = (state = updateEventInitialState, action) => {
  switch (action.type) {
    case ReduxConstants.fetch.admin.event.updateEvent.SET_REQUEST_PARAMS:
      return { ...state, request: { ...state.request, ...action.payload } };

    case ReduxConstants.fetch.admin.event.updateEvent.LOADING:
      return { ...state, loading: true };

    case ReduxConstants.fetch.admin.event.updateEvent.LOADED:
      return { ...state, loading: false };

    case ReduxConstants.fetch.admin.event.updateEvent.LOAD_SUCCESS:
      return {
        ...state,
        request: updateEventInitialState.request,
        response: action.payload,
      };

    case ReduxConstants.fetch.admin.event.updateEvent.LOAD_FAILED:
      return {
        ...state,
        response: {
          data: updateEventInitialState.response.data,
          message: action.payload,
        },
      };

    default:
      return state;
  }
};

const deleteEventInitialState = {
  request: null,
  response: {
    message: "",
    data: {
      _id: "",
      adminID: null,
      title: "",
      description: "",
      category: "",
      date: "",
      isVirtual: false,
      address: "",
      createdAt: "",
      updatedAt: "",
    },
  },
  loading: false,
};
const deleteEvent = (state = deleteEventInitialState, action) => {
  switch (action.type) {
    case ReduxConstants.fetch.admin.event.deleteEvent.SET_REQUEST_PARAMS:
      return { ...state, request: null };

    case ReduxConstants.fetch.admin.event.deleteEvent.LOADING:
      return { ...state, loading: true };

    case ReduxConstants.fetch.admin.event.deleteEvent.LOADED:
      return { ...state, loading: false };

    case ReduxConstants.fetch.admin.event.deleteEvent.LOAD_SUCCESS:
      return { ...state, response: action.payload };

    case ReduxConstants.fetch.admin.event.deleteEvent.LOAD_FAILED:
      return {
        ...state,
        response: {
          data: deleteEventInitialState.response.data,
          message: action.payload,
        },
      };

    default:
      return state;
  }
};

const adminEventReducer = combineReducers({
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent
});

export default adminEventReducer;
