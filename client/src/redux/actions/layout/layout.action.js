import ReduxConstants from "../../constants/index.constants";

export const changeNotificationSystem = (notificationSystem) => ({
  type: ReduxConstants.layout.CHANGE_NOTIFICATION_SYSTEM,
  payload: notificationSystem,
});

export const changeSidebarBackgroundImage = (image) => ({
  type: ReduxConstants.layout.CHANGE_SIDEBAR_BACKGROUND_IMAGE,
  payload: image,
});

export const changeSidebarBackgroundColor = (color) => ({
  type: ReduxConstants.layout.CHANGE_SIDEBAR_BACKGROUND_COLOR,
  payload: color,
});

export const toggleHasBackground = (hasBackground) => ({
  type: ReduxConstants.layout.TOGGLE_SIDEBAR_HAS_BACKGROUND_IMAGE,
  payload: hasBackground,
});

export const changeFixedClasses = (classes) => ({
  type: ReduxConstants.layout.CHANGE_FIXED_CLASSESS,
  payload: classes,
});

export const restoreRootDefaultState = () => ({
  type: ReduxConstants.layout.RESTORE_ROOT_DEFAULT_STATE,
});
