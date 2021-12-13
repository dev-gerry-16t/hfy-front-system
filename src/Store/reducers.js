import { combineReducers } from "redux";
import { purgeStoredState } from "redux-persist";
import {
  dataProfile,
  dataProfileMenu,
} from "../utils/reducers/dataProfileReducer";
import { dataUserRedirect } from "../utils/reducers/dataRedirectReducer";

const appReducers = combineReducers({
  dataProfile,
  dataProfileMenu,
  dataUserRedirect,
});

const rootReducer = (state, action, persistConfig) => {
  // Reset to initialState
  if (action.type === "PURGE") {
    purgeStoredState(persistConfig);
    // Default or Current State
    return appReducers({}, action);
  }

  return appReducers(state, action);
};

export default rootReducer;
