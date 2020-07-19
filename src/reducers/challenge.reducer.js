import * as actions from "../actions/actions";

const initState = {
  id: '',
  title: "",
  level: "",
  language: [],
  source: null, //this field should be removed
  tagList: [],
  banner: null,
  imageUrl: "",
  loading: false,

  compilePath: "",
  runPath: "",
  implementedPath: "",
  nonImplementedPath: "",

  tcInputFormat: [],
  tcOutputFormat: [],
  contestChallenge: false,

  description: "",

  data: [],
  visible: false,
  visibleSourceModal: false,
  visibleDeleteLanguageModal: false,
  visibleTestcaseModal: false,
  visibleUpdateTestcaseModal: false,
  visibleDeleteTestcaseModal: false,
  visibleAddResultModal: false,
  projectStructure: null,
  currentStep: 0,

  challengeDir: '',

  addResult: null,
};

const challengeReducer = (state = initState, action) => {
  var newData, index, item;
  switch (action.type) {
    case actions.HANDLE_CHALLENGE:
      return {
        ...state,
        id: action.payload.challengeId,
        title: action.payload.title,
        description: action.payload.description,
        level: action.payload.level,
        tagList: action.payload.tags,
        language: action.payload.languages,
        banner: action.payload.banner,
        imageUrl: '',
        tcInputFormat: action.payload.tcInputFormat,
        tcOutputFormat: action.payload.tcOutputFormat,
        contestChallenge: action.payload.contestChallenge,
        contents: action.payload.contents,
        testcases: action.payload.testcases,
        categories: action.payload.categories,
        currentStep: 0,
      };

    case actions.DELETE_CHALLENGE:
      return { ...state, data: state.data.filter(item => item.id !== action.payload) };

    case actions.HANDLE_MODAL:
      return { ...state, visible: action.payload };

    case actions.HANDLE_SOURCE_MODAL:
      return { ...state, visibleSourceModal: action.payload };

    case actions.HANDLE_DELETE_LANGUAGE_MODAL:
      return { ...state, visibleDeleteLanguageModal: action.payload };

    case actions.HANDLE_TESTCASE_MODAL:
      return { ...state, visibleTestcaseModal: action.payload };

    case actions.HANDLE_UPDATE_TESTCASE_MODAL:
      return { ...state, visibleUpdateTestcaseModal: action.payload };

    case actions.HANDLE_DELETE_TESTCASE_MODAL:
      return { ...state, visibleDeleteTestcaseModal: action.payload };

    case actions.HANDLE_ADD_RESULT_MODAL:
      return { ...state, visibleAddResultModal: action.payload };

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
        newData.push({
          ...action.payload, id: action.payload.id,
          key: state.data.length + 1
        });
      }
      return { ...state, data: newData };

    case actions.ADD_LANGUAGE:
      console.log(action.payload)
      newData = [...state.data];
      index = newData.findIndex(item => state.id === item.id);
      state.language = newData[index].language

      var idxLan = state.language.findIndex(item => item === action.payload.data.language);
      if (idxLan < 0) {
        state.language.push(action.payload.data.language);
      }

      item = newData[index];
      newData.splice(index, 1, {
        ...item,
        language: state.language,
      });
      return { ...state, data: newData, addResult: action.payload.result, visibleAddResultModal: true };

    case actions.DELETE_LANGUAGE:
      index = state.language.findIndex(item => item === action.payload.language);
      state.language.splice(index, 1);

      newData = [...state.data];
      index = newData.findIndex(item => state.id === item.id);
      item = newData[index];
      newData.splice(index, 1, {
        ...item,
        language: state.language,
      });
      return { ...state, data: newData };

    case actions.CREATE_PROJECT_STRUCTURE:
      return {
        ...state, projectStructure: action.payload.children,
        challengeDir: action.payload.challengeDir
      };

    case actions.UPDATE_STEP_ONE:
      var language = action.payload.language
        ? action.payload.language : state.language;
      language = Array.isArray(language)
        ? language : [language];
      var tagList = action.payload.tagList ? action.payload.tagList : [];
      if (state.id !== '') {
        return {
          ...state,
          title: action.payload.title,
          level: action.payload.level,
          banner: action.payload.banner,
          imageUrl: action.payload.imageUrl,
          source: action.payload.sourceCode,
          language: language,
          tagList: tagList,
        };
      }
      return {
        ...state,
        title: action.payload.title,
        source: action.payload.source,
        language: language,
        level: action.payload.level,
        banner: action.payload.banner,
        imageUrl: action.payload.imageUrl,
        tagList: tagList,
      };
    case actions.UPDATE_STEP_TWO:
      return {
        ...state,
        compilePath: action.payload.compilePath,
        runPath: action.payload.runPath,
        implementedPath: action.payload.implementedPath,
        nonImplementedPath: action.payload.nonImplementedPath,
        tcInputFormat: action.payload.tcInputFormat,
        tcOutputFormat: action.payload.tcOutputFormat,
        contestChallenge: action.payload.contestChallenge ? action.payload.contestChallenge : false,
      };

    case actions.UPDATE_STEP_THREE:
      return {
        ...state,
        description: action.payload.description,
      };

    case actions.UPDATE_STEP:
      return {
        ...state,
        currentStep: state.currentStep + action.payload,
      }

    case actions.GET_ALL_CHALLENGES:
      var data = [];
      action.payload.forEach((challenge, index) => {
        data.push({
          key: index + 1,
          id: challenge.challengeId,
          title: challenge.title,
          level: challenge.level,
          language: challenge.languages,
          source: null,
          banner: challenge.banner,
          imageUrl: "",

          compilePath: "",
          runPath: "",
          implementedPath: "",
          nonImplementedPath: "",

          tcInputFormat: "",
          tcOutputFormat: "",

          description: challenge.description,

          point: challenge.point,
          numAttendees: challenge.numAttendees,
          numComments: challenge.numComments,
          createdAt: challenge.createdAt,
          author: challenge.author,
          tags: challenge.tags,
          rate: challenge.rate,
          numRates: challenge.numRates,
        });
      });
      return {
        ...state,
        data: data,
      }

    case actions.UPDATE_CHALLENGE_IMAGE_URL:
      return { ...state, imageUrl: action.payload, loading: false };

    case actions.START_CHALLENGE_LOADING:
      return { ...state, loading: true };

    default:
      return state;
  }
};

export default challengeReducer;
