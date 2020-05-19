import * as actions from "../actions/actions";

const initState = {
  projects: [],

  // currentUser: null,
  // isAuthenticated: false,

  currentUser: {
    accruedPoint: 0,
    createdAt: "26-04-2020 07:24:38.000",
    email: "coder1@gmail.com",
    firstName: "Coder 1",
    id: 1,
    lastName: "Duy",
    plan: {name: "BASIC", issuedAt: "26-04-2020", expiration: "26-04-2021"},
    updatedAt: "26-04-2020 07:24:38.000",
    userType: "CODER",
    uuid: "2a6a6644-807a-4a73-b65b-71c47cbb852a"
  },
  isAuthenticated: true,
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
    
    

    case actions.GET_ALL_PROJECT:
    case actions.GET_BY_IP_ADDRESS:
    case actions.GET_BY_PROJECT_NAME:
      return { loading: true, ...state };
    case actions.GET_ALL_PROJECT_SUCCESS:
    case actions.GET_BY_IP_ADDRESS_SUCCESS:
    case actions.GET_BY_PROJECT_NAME_SUCCESS:
      return { loading: false, projects: action.data.content };
    case actions.GET_BY_PROJECT_NAME_FAILED:
    case actions.GET_ALL_PROJECT_FAILED:
    case actions.GET_BY_IP_ADDRESS_FAILED:
      return { loading: false, projects: [] };
    case actions.CREATE_SINGLE_PROJECT_SUCCESS:
      return { loading: false, projects: [action.payload, ...state.projects] };
    default:
      return state;
  }
};

export default UserReducer;
