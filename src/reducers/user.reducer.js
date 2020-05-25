import * as actions from "../actions/actions";

const initState = {
  projects: [],

  currentUser: null,
  isAuthenticated: false,
  isLoading: false,
};

const UserReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.LOAD_PAGE:
      return { ...state, isLoading: true };
    case actions.GET_CURRENT_USER_SUCCESS:
      return { ...state, isLoading: false, isAuthenticated: true, currentUser: action.payload };
    case actions.LOGOUT:
      return { ...state, isAuthenticated: false, currentUser: null };
    default:
      return state;
  }
};

export default UserReducer;
