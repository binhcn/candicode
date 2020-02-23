import * as actions from "../actions/actions";

const initState = {
  name: "",
  source: {},
  language: "",
  banner: {},

  editedFile: [],
  commands: "",
};

const NewChallengeReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.UPDATE_STEP_ONE:
      return { ...state, isLoading: true };
    case actions.UPDATE_STEP_TWO:
      return { ...state, 
        editedFile: action.payload.editedFile,
        commands: action.payload.commands, 
      };
    case actions.UPDATE_STEP_THREE:
      return { ...state, isAuthenticated: false, currentUser: null };
    case actions.UPDATE_STEP_FOUR:
      return { ...state, isAuthenticated: false, currentUser: null };
    default:
      return state;
  }
};

export default NewChallengeReducer;
