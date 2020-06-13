import * as actions from "../actions/actions";

const initState = {
  id: '',
  title: "",
  description: "",
  level: "",
  points: 0,
  tcOutputFormat: "",
  tcInputFormat: "",
  contents: [],
  testcases: [],
};

const codeEditorReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.GET_CHALLENGE_DETAILS:
      return { ...state,
        id: action.payload.id,
        title: action.payload.title,
        description: action.payload.description,
        level: action.payload.level,
        points: action.payload.points,
        tcOutputFormat: action.payload.tcOutputFormat,
        tcInputFormat: action.payload.tcInputFormat,
        contents: action.payload.contents,
        testcases: action.payload.testcases,
      };

    case actions.HANDLE_TUTORIAL_MODAL:
      return {...state, visible: action.payload };

    default:
      return state;
  }
};

export default codeEditorReducer;
