import * as actions from "../actions/actions";

const initState = {
  name: "",
  source: [],
  language: "",
  banner: [],
  imageUrl: "",

  editedFile: [],
  commands: "",

  keys: [],
  inputTestcase: [],

  description: ""
};

const NewChallengeReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.UPDATE_STEP_ONE:
      return { ...state,
        name: action.payload.name,
        source: action.payload.source,
        language: action.payload.language,
        banner: action.payload.banner,
        imageUrl: action.payload.imageUrl,
      };
    case actions.UPDATE_STEP_TWO:
      return { ...state,
        editedFile: action.payload.editedFile,
        commands: action.payload.commands,
      };
    case actions.UPDATE_STEP_THREE:
      return { ...state,
        keys: action.payload.keys,
        inputTestcase: action.payload.inputTestcase,
      };
    case actions.UPDATE_STEP_FOUR:
      return { ...state,
        description: action.payload.description,
      };
    default:
      return state;
  }
};

export default NewChallengeReducer;
