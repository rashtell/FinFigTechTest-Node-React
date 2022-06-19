import FetchConstants from "./fetch/index.constants";
import LayoutConstants from "./layout/layout.constants";

/**
 * Single output for all redux constants
 */
const ReduxConstants = {
  /**
   * Fetch Constants
   */
  fetch: { ...FetchConstants },

  /**
   * Layout Constants
   */
  layout: { ...LayoutConstants },

  /**
   * App
   */
  app: {
    SET_AUTHENTICATED: "APP_SET_AUTHENTICATED",
    UNSET_AUTHENTICATED: "UNSET_AUTHENTICATED",
    SET_ERROR: "APP_SET_ERROR",
    CLEAR_ERROR: "APP_CLEAR_ERROR",
    SET_SUCCESS: "APP_SET_SUCCESS",
    CLEAR_SUCCESS: "APP_CLEAR_SUCCESS",
  },
};

export default ReduxConstants;
