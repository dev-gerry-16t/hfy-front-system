import produce from "immer";

const initialDataRedirect = {};

const dataUserRedirect = (state = initialDataRedirect, action) => {
  return produce(state, (draft) => {
    const darftState = draft;
    switch (action.type) {
      case "SET_DATA_USER_REDIRECT":
        darftState.dataUserRedirect = action.dataUserRedirect;
        break;
      default:
        return state;
    }
  });
};

export { dataUserRedirect };
