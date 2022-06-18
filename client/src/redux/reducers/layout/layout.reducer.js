import { combineReducers } from "redux";
import ReduxConstants from "../../constants/index.constants";

const initialState = {

}

const root = (state = initialState, action) => {
  switch (action.type) {
    case ReduxConstants.CHANGE_NOTIFICATION_SYSTEM:
      return { ...state, _notificationSystem: action.payload };

    case ReduxConstants.CHANGE_SIDEBAR_BACKGROUND_IMAGE:
      return { ...state, image: action.payload };

    case ReduxConstants.CHANGE_SIDEBAR_BACKGROUND_COLOR:
      return { ...state, color: action.payload };

    case ReduxConstants.TOGGLE_SIDEBAR_HAS_BACKGROUND_IMAGE:
      return { ...state, hasImage: action.payload };

    case ReduxConstants.CHANGE_FIXED_CLASSESS:
      return { ...state, fixedClasses: action.payload };

    case ReduxConstants.RESTORE_ROOT_DEFAULT_STATE:
      return {
        ...state,
        _notificationSystem: null,
        image: "assets/img/sidebar-3.jpg",
        color: "black",
        hasImage: true,
        fixedClasses: "dropdown show-dropdown open"
      };

    default:
      return state;
  }
};

export const layoutReducer = combineReducers({
  root
});

export default layoutReducer;
