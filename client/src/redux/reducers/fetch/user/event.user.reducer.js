import { combineReducers } from "redux";
import ReduxConstants from "../../../constants/index.constants";

const searchEventInitialState = {
  request: {
    title: "",
    categories: [],
    dateRange: null,
    isVirtual: null,
    address: "",
  },
  response: {
    message: "",
    data: [],
  },
  loading: false,
};
const searchEvent = (state = searchEventInitialState, action) => {
  switch (action.type) {
    case ReduxConstants.fetch.event.searchEvent.SET_REQUEST_PARAMS:
      return { ...state, request: { ...state.request, ...action.payload } };

    case ReduxConstants.fetch.event.searchEvent.LOADING:
      return { ...state, fetching: true };

    case ReduxConstants.fetch.event.searchEvent.LOADED:
      return { ...state, fetching: false };

    case ReduxConstants.fetch.event.searchEvent.LOAD_SUCCESS:
      return {
        ...state,
        response: action.payload,
      };

    case ReduxConstants.fetch.event.searchEvent.LOAD_FAILED:
      return {
        ...state,
        response: {
          data: searchEventInitialState.response.data,
          message: action.payload,
        },
      };

    default:
      return state;
  }
};

const getEventCategoriesInitialState = {
  request: null,
  response: {
    message: "",
    data: [],
  },
  loading: false,
};
const getEventCategories = (state = getEventCategoriesInitialState, action) => {
  switch (action.type) {
    case ReduxConstants.fetch.event.getEventCategories.SET_REQUEST_PARAMS:
      return { ...state, request: null };

    case ReduxConstants.fetch.event.getEventCategories.LOADING:
      return { ...state, fetching: true };

    case ReduxConstants.fetch.event.getEventCategories.LOADED:
      return { ...state, fetching: false };

    case ReduxConstants.fetch.event.getEventCategories.LOAD_SUCCESS:
      return { ...state, response: action.payload };

    case ReduxConstants.fetch.event.getEventCategories.LOAD_FAILED:
      return {
        ...state,
        response: {
          data: getEventCategoriesInitialState.response.data,
          message: action.payload,
        },
      };

    default:
      return state;
  }
};

const userEventReducer = combineReducers({ searchEvent, getEventCategories });

export default userEventReducer;
