import AdminContants from "./admin/admin.constants";
import AdminEventContants from "./admin/event.admin.constants";
import UserEventContants from "./user/event.user.constants";

const FetchConstants = {
  /**
   * Admin Constants
   */
  admin: {
    ...AdminContants,
    
    /**
     * Admin Event Constants
     */ event: { ...AdminEventContants },
  },

  /**
   * User Event Constants
   */
  event: { ...UserEventContants },
};

export default FetchConstants;
