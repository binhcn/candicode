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

    tcInputFormat: "",
    tcOutputFormat: "",

    description: "",
  });
}


const initState = {
  id: '',
  title: "",
  level: "",
  language: "",
  source: null, //this field should be removed
  banner: null,
  imageUrl: "",

  targetPath: "",
  buildPath: "",
  editPath: "",

  tcInputFormat: "",
  tcOutputFormat: "",

  description: "",

  testcaseInput: ['1', '2'],
  testcaseOutput: ['a', 'b'],

  data: [],
  visible: false,
  visibleSourceModal: false,
  visibleTestcaseModal: false,
  projectStructure: null,
  currentStep: 0,
};

const challengeReducer = (state = initState, action) => {
  var newData, index;
  switch (action.type) {
    case actions.HANDLE_CHALLENGE:
      return { ...state,
        id: action.payload.id,
        title: action.payload.title,
        level: action.payload.level,
        language: action.payload.language,
        banner: action.payload.banner,
        targetPath: action.payload.targetPath,
        buildPath: action.payload.buildPath,
        editPath: action.payload.editPath,
        tcInputFormat: action.payload.tcInputFormat,          
        tcOutputFormat: action.payload.tcOutputFormat,          
        description: action.payload.description,
        currentStep: action.payload.currentStep,
      };
    case actions.DELETE_CHALLENGE:
      return {...state, data: state.data.filter(item => item.id !== action.payload) };

    case actions.HANDLE_MODAL:
      return {...state, visible: action.payload };

    case actions.HANDLE_SOURCE_MODAL:
      return {...state, visibleSourceModal: action.payload };

    case actions.HANDLE_TESTCASE_MODAL:
      return {...state, visibleTestcaseModal: action.payload };

    case actions.UPDATE_CHALLENGE:
      newData = [...state.data];
      index = newData.findIndex(item => action.payload.id === item.id)
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...action.payload,
        });
      } else {
        newData.push({...action.payload, id:state.data.length + 1, 
                  userType: 'coder', key:state.data.length + 1 });
      }
      return {...state, data: newData };

    case actions.UPDATE_LANGUAGE:
      if (action.payload.removedLanguage !== undefined) {
        for (let lan of action.payload.removedLanguage) {
          index = state.language.findIndex(item => item === lan);
          state.language.splice(index, 1);
        }
      }

      if (action.payload.addedLanguage !== undefined) {
        index = state.language.findIndex(item => item === action.payload.addedLanguage);
        if (index < 0) {
          state.language.push(action.payload.addedLanguage);
        }
      }

      newData = [...state.data];
      index = newData.findIndex(item => state.id === item.id);
      var item = newData[index];
      newData.splice(index, 1, {
        ...item,
        language: state.language,
      });
      return {...state, data: newData };

    case actions.CREATE_PROJECT_STRUCTURE:
      return {...state, projectStructure: action.payload };

    case actions.UPDATE_STEP_ONE:
      if (state.id !== '') {
        return { ...state,
          title: action.payload.title,
          level: action.payload.level,
          banner: action.payload.banner,
          imageUrl: action.payload.imageUrl,
        };
      }
      var language = Array.isArray(action.payload.language) 
            ? action.payload.language : [action.payload.language];
      return { ...state,
        title: action.payload.title,
        source: action.payload.source,
        language: language,
        level: action.payload.level,
        banner: action.payload.banner,
        imageUrl: action.payload.imageUrl,
      };
    case actions.UPDATE_STEP_TWO:
      return { ...state,
        targetPath: action.payload.targetPath,
        buildPath: action.payload.buildPath,
        editPath: action.payload.editPath,
        tcInputFormat: action.payload.tcInputFormat,
        tcOutputFormat: action.payload.tcOutputFormat,
      };
    case actions.UPDATE_STEP_THREE:
      return { ...state,
        description: action.payload.description,
      };
    case actions.UPDATE_STEP:
      return {...state,
        currentStep: state.currentStep + action.payload,
      }
    case actions.GET_ALL_CHALLENGES:
      console.log(action.payload)
      var data = [];
      action.payload.forEach((challenge, index) => {
        data.push({
          key: index + 1,
          id: challenge.id,
          title: challenge.title,
          level: challenge.level,
          language: challenge.languages,
          source: null,
          banner: challenge.banner,
          imageUrl: "",
      
          targetPath: "",
          buildPath: "",
      
          tcInputFormat: "",
          tcOutputFormat: "",
      
          description: challenge.description,

          point: challenge.point,
          numAttendees: challenge.numAttendees,
        });
      });
      console.log(data)
      return {...state,
        data: data,
      }
    default:
      return state;
  }
};

export default challengeReducer;
