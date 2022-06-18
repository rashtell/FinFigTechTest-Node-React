export const consoleReduxState = store => next => action => {
  let result;

  console.groupCollapsed(`dispatching action => ${action.type}`);

  result = next(action);

  let {} = store.getState();

  console.log("currentState:", store.getState());

  console.groupEnd();

  return result;
};

export default consoleReduxState;
