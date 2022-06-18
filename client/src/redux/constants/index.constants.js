import FetchConstants from "./fetch/index.constants";
import LayoutConstants from "./layout/layout.constants";

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
    SET_ERROR: "APP_SET_ERROR",
  },
};

export default ReduxConstants;
