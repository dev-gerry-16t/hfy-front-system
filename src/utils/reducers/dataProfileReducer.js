import produce from "immer";

const initialDataProfile = {};

const dataProfile = (state = initialDataProfile, action) => {
  return produce(state, (draft) => {
    const darftState = draft;
    switch (action.type) {
      case "SET_DATA_USER_PROFILE":
        darftState.dataProfile = action.dataProfile;
        break;
      default:
        return state;
    }
  });
};

export { dataProfile };
