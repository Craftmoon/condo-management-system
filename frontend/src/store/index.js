import { createStore } from "redux";

// reducer
const INITIAL_STATE = {
  token: null,
  operatorId: null,
};

function authInfo(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "UPDATE_AUTH_INFO":
      return { token: action.token, operatorId: action.operatorId };
    default:
      return state;
  }
}

const store = createStore(
  authInfo,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
