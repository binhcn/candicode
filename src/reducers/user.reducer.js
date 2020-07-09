import * as actions from "../actions/actions";

const initState = {
  lang: 'en',

  currentUser: null,
  isAuthenticated: false,
  isLoading: false,

  visible: false,
  status: '',

  submissions: [],
};

const UserReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.LOAD_PAGE:
      return { ...state, isLoading: true };

    case actions.TRANSLATE_LANGUAGE:
      return { ...state, lang: action.payload };

    case actions.GET_CURRENT_USER_SUCCESS:
      return { ...state, isLoading: false, isAuthenticated: true, currentUser: action.payload };

    case actions.LOGOUT:
      return { ...state, isAuthenticated: false, currentUser: null };

    case actions.GET_PROFILE_SUBMISSIONS:
      return { ...state, submissions: action.payload };

    case actions.OPEN_USER_FORM:
      return { ...state, status: action.payload, visible: true };

    case actions.CLOSE_USER_FORM:
      return { ...state, visible: false };

    default:
      return state;
  }
};

export default UserReducer;
