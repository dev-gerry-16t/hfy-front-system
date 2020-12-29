import { combineReducers } from "redux";
import { purgeStoredState } from "redux-persist";
import { dataProfile } from "../utils/reducers/dataProfileReducer";

const appReducers = combineReducers({
  dataProfile,
});

export default (state, action, persistConfig) => {
  // Reset to initialState
  if (action.type === "PURGE") {
    purgeStoredState(persistConfig);
    // Default or Current State
    return appReducers({}, action);
  }

  return appReducers(state, action);
};
