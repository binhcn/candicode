import * as actions from "../actions/actions";

const data = [];
for (let i = 0; i < 3; i++) {
  var level = i % 3 === 0 ? 'easy' : (i % 3 === 1 ? 'moderate' : 'hard');
  data.push({
    key: i + 1,
    id: i + 1,
    title: `Challenge ${i + 1}`,
    level: level,
    language: ['Java', 'Python'],
    source: null,
    banner: null,
    imageUrl: "",

    targetPath: "",
    buildPath: "",

    testcaseInputFormat: "",
    testcaseOutputFormat: "",

    description: ""
  });
}


const initState = {
  title: "",
  level: "",
  language: "",
  source: null,
  banner: null,
  imageUrl: "",

  targetPath: "",
  buildPath: "",

  testcaseInputFormat: "",
  testcaseOutputFormat: "",

  description: "",

  data: data,
  visible: false,
};

const challengeReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.HANDLE_CHALLENGE:
      return { ...state, 
        title: action.payload.title,
        level: action.payload.level,
        language: action.payload.language,
        banner: action.payload.banner,
        targetPath: action.payload.targetPath,
        buildPath: action.payload.buildPath,
        testcaseInputFormat: action.payload.testcaseInputFormat,          
        testcaseOutputFormat: action.payload.testcaseOutputFormat,          
        description: action.payload.description, 
      };
    case actions.DELETE_CHALLENGE:
      return {...state, data: state.data.filter(item => item.id !== action.payload) };
    case actions.HANDLE_MODAL:
      return {...state, visible: action.payload };
    case actions.UPDATE_STEP_ONE:
      return { ...state,
        title: action.payload.title,
        source: action.payload.source,
        language: action.payload.language,
        level: action.payload.level,
        banner: action.payload.banner,
        imageUrl: action.payload.imageUrl,
      };
    case actions.UPDATE_STEP_TWO:
      return { ...state,
        targetPath: action.payload.targetPath,
        buildPath: action.payload.buildPath,
      };
    case actions.UPDATE_STEP_THREE:
      return { ...state,
        testcaseInputFormat: action.payload.testcaseInputFormat,
        testcaseOutputFormat: action.payload.testcaseOutputFormat
      };
    case actions.UPDATE_STEP_FOUR:
      return { ...state,
        description: action.payload.description,
      };
    default:
      return state;
  }
};

export default challengeReducer;
