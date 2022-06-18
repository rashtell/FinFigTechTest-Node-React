import { combineReducers } from "redux";
import ReduxConstants from "../../../constants/index.constants";

const createAdminInitialState = {
  request: {
    username: "",
    password: "",
    name: "",
    email: "",
  },
  response: {
    message: "",
    data: {
      id: "",
      autoID: null,
      username: "",
      name: "",
      email: "",
    },
  },
  loading: false,
};
const createAdmin = (state = createAdminInitialState, action) => {
  switch (action.type) {
    case ReduxConstants.fetch.event.createAdmin.SET_REQUEST_PARAMS:
      return { ...state, request: { ...state.request, ...action.payload } };

    case ReduxConstants.fetch.event.createAdmin.LOADING:
      return { ...state, fetching: true };

    case ReduxConstants.fetch.event.createAdmin.LOADED:
      return { ...state, fetching: false };

    case ReduxConstants.fetch.event.createAdmin.LOAD_SUCCESS:
      return {
        ...state,
        request: createAdminInitialState.request,
        response: action.payload,
      };

    case ReduxConstants.fetch.event.createAdmin.LOAD_FAILED:
      return {
        ...state,
        response: {
          data: createAdminInitialState.response.data,
          message: action.payload,
        },
      };

    default:
      return state;
  }
};

const loginAdminInitialState = {
  request: {
    username: "",
    password: "",
  },
  response: {
    message: "",
    data: {
      id: "",
      autoID: null,
      username: "",
      name: "",
      email: "",
    },
  },
  loading: false,
};
const loginAdmin = (state = loginAdminInitialState, action) => {
  switch (action.type) {
    case ReduxConstants.fetch.event.loginAdmin.SET_REQUEST_PARAMS:
      return { ...state, request: { ...state.request, ...action.payload } };

    case ReduxConstants.fetch.event.loginAdmin.LOADING:
      return { ...state, fetching: true };

    case ReduxConstants.fetch.event.loginAdmin.LOADED:
      return { ...state, fetching: false };

    case ReduxConstants.fetch.event.loginAdmin.LOAD_SUCCESS:
      return {
        ...state,
        request: loginAdminInitialState.request,
        response: action.payload,
      };

    case ReduxConstants.fetch.event.loginAdmin.LOAD_FAILED:
      return {
        ...state,
        response: {
          data: loginAdminInitialState.response.data,
          message: action.payload,
        },
      };

    default:
      return state;
  }
};

const getAdminInitialState = {
  request: null,
  response: {
    message: "",
    data: {
      id: "",
      autoID: null,
      username: "",
      name: "",
      email: "",
    },
  },
  loading: false,
};
const getAdmin = (state = getAdminInitialState, action) => {
  switch (action.type) {
    case ReduxConstants.fetch.event.getAdmin.SET_REQUEST_PARAMS:
      return { ...state, request: null };

    case ReduxConstants.fetch.event.getAdmin.LOADING:
      return { ...state, fetching: true };

    case ReduxConstants.fetch.event.getAdmin.LOADED:
      return { ...state, fetching: false };

    case ReduxConstants.fetch.event.getAdmin.LOAD_SUCCESS:
      return {
        ...state,
        response: action.payload,
      };

    case ReduxConstants.fetch.event.getAdmin.LOAD_FAILED:
      return {
        ...state,
        response: {
          data: getAdminInitialState.response.data,
          message: action.payload,
        },
      };

    default:
      return state;
  }
};

const logoutAdminInitialState = {
  request: null,
  response: {
    message: "",
    data: null,
  },
  loading: false,
};
const logoutAdmin = (state = logoutAdminInitialState, action) => {
  switch (action.type) {
    case ReduxConstants.fetch.event.logoutAdmin.SET_REQUEST_PARAMS:
      return { ...state, request: null };

    case ReduxConstants.fetch.event.logoutAdmin.LOADING:
      return { ...state, fetching: true };

    case ReduxConstants.fetch.event.logoutAdmin.LOADED:
      return { ...state, fetching: false };

    case ReduxConstants.fetch.event.logoutAdmin.LOAD_SUCCESS:
      return {
        ...state,
        response: action.payload,
      };

    case ReduxConstants.fetch.event.logoutAdmin.LOAD_FAILED:
      return {
        ...state,
        response: {
          data: logoutAdminInitialState.response.data,
          message: action.payload,
        },
      };

    default:
      return state;
  }
};

const adminAdminReducer = combineReducers({
  createAdmin,
  loginAdmin,
  getAdmin,
  logoutAdmin,
});

export default adminAdminReducer;
