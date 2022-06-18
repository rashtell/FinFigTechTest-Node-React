import C from "constants/index.constants";

export const changeNotificationSystem = notificationSystem => ({
  type: C.CHANGE_NOTIFICATION_SYSTEM,
  payload: notificationSystem
});

export const changeSidebarBackgroundImage = image => ({
  type: C.CHANGE_SIDEBAR_BACKGROUND_IMAGE,
  payload: image
});

export const changeSidebarBackgroundColor = color => ({
  type: C.CHANGE_SIDEBAR_BACKGROUND_COLOR,
  payload: color
});

export const toggleHasBackground = hasBackground => ({
  type: C.TOGGLE_SIDEBAR_HAS_BACKGROUND_IMAGE,
  payload: hasBackground
});

export const changeFixedClasses = classes => ({
  type: C.CHANGE_FIXED_CLASSESS,
  payload: classes
});

export const restoreRootDefaultState = () => ({
  type: C.RESTORE_ROOT_DEFAULT_STATE
});
