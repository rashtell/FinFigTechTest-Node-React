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
    case ReduxConstants.fetch.admin.createAdmin.SET_REQUEST_PARAMS:
      return { ...state, request: { ...state.request, ...action.payload } };

    case ReduxConstants.fetch.admin.createAdmin.LOADING:
      return { ...state, loading: true };

    case ReduxConstants.fetch.admin.createAdmin.LOADED:
      return { ...state, loading: false };

    case ReduxConstants.fetch.admin.createAdmin.LOAD_SUCCESS:
      return {
        ...state,
        request: createAdminInitialState.request,
        response: action.payload,
      };

    case ReduxConstants.fetch.admin.createAdmin.LOAD_FAILED:
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
    case ReduxConstants.fetch.admin.loginAdmin.SET_REQUEST_PARAMS:
      return { ...state, request: { ...state.request, ...action.payload } };

    case ReduxConstants.fetch.admin.loginAdmin.LOADING:
      return { ...state, loading: true };

    case ReduxConstants.fetch.admin.loginAdmin.LOADED:
      return { ...state, loading: false };

    case ReduxConstants.fetch.admin.loginAdmin.LOAD_SUCCESS:
      return {
        ...state,
        request: loginAdminInitialState.request,
        response: action.payload,
      };

    case ReduxConstants.fetch.admin.loginAdmin.LOAD_FAILED:
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
    case ReduxConstants.fetch.admin.getAdmin.SET_REQUEST_PARAMS:
      return { ...state, request: null };

    case ReduxConstants.fetch.admin.getAdmin.LOADING:
      return { ...state, loading: true };

    case ReduxConstants.fetch.admin.getAdmin.LOADED:
      return { ...state, loading: false };

    case ReduxConstants.fetch.admin.getAdmin.LOAD_SUCCESS:
      return {
        ...state,
        response: action.payload,
      };

    case ReduxConstants.fetch.admin.getAdmin.LOAD_FAILED:
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
    case ReduxConstants.fetch.admin.logoutAdmin.SET_REQUEST_PARAMS:
      return { ...state, request: null };

    case ReduxConstants.fetch.admin.logoutAdmin.LOADING:
      return { ...state, loading: true };

    case ReduxConstants.fetch.admin.logoutAdmin.LOADED:
      return { ...state, loading: false };

    case ReduxConstants.fetch.admin.logoutAdmin.LOAD_SUCCESS:
      return {
        ...state,
        response: action.payload,
      };

    case ReduxConstants.fetch.admin.logoutAdmin.LOAD_FAILED:
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
