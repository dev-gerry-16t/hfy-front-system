import { combineReducers } from "redux";
import { purgeStoredState } from "redux-persist";

const appReducers = combineReducers({});

export default (state, action, persistConfig) => {
  // Reset to initialState
  if (action.type === "PURGE") {
    purgeStoredState(persistConfig);
    // Default or Current State
    return appReducers({}, action);
  }

  return appReducers(state, action);
};
