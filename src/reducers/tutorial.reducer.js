import * as actions from "../actions/actions";

const initState = {
  id: '',
  title: "",
  tagList: [],
  banner: null,
  imageUrl: "",
  loading: false,

  description: "",
  content: "",

  data: [],
  visible: false,
  currentStep: 0,

  comments: [],
};

const tutorialReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.HANDLE_TUTORIAL:

      return {
        ...state,
        id: action.payload.tutorialId,
        title: action.payload.title,
        author: action.payload.author,
        tagList: action.payload.tags,
        banner: action.payload.banner,
        imageUrl: '',
        description: action.payload.description,
        content: action.payload.content,
        createdAt: action.payload.createdAt,
        likes: action.payload.likes,
        dislikes: action.payload.dislikes,
        currentStep: 0,
      };

    case actions.HANDLE_TUTORIAL_MODAL:
      return { ...state, visible: action.payload };

    case actions.UPDATE_STEP_ONE_TUTORIAL:
      return {
        ...state,
        title: action.payload.title,
        tagList: action.payload.tagList,
        description: action.payload.description,
        banner: action.payload.banner,
        imageUrl: action.payload.imageUrl,
      };

    case actions.UPDATE_STEP_TWO_TUTORIAL:
      return {
        ...state,
        content: action.payload.content,
      };

    case actions.UPDATE_TUTORIAL:
      var newData = [...state.data];
      var index = newData.findIndex(item => action.payload.id === item.id)
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

    case actions.UPDATE_STEP_TUTORIAL:
      return {
        ...state,
        currentStep: state.currentStep + action.payload,
      }

    case actions.DELETE_TUTORIAL:
      return { ...state, data: state.data.filter(item => item.id !== action.payload) };

    case actions.GET_ALL_TUTORIALS:
      var data = [];
      action.payload.forEach((tutorial, index) => {
        data.push({
          key: index + 1,
          id: tutorial.tutorialId,
          title: tutorial.title,
          banner: tutorial.banner,
          imageUrl: "",

          description: tutorial.description,
          numComments: tutorial.numComments,
          createdAt: tutorial.createdAt,
          author: tutorial.author,
          tagList: tutorial.tags,
          likes: tutorial.likes,
          dislikes: tutorial.dislikes,
        });
      });
      return {
        ...state,
        data: data,
      }

    case actions.GET_TUTORIAL_COMMENTS:
      return { ...state, comments: action.payload };

    case actions.ADD_TUTORIAL_COMMENTS:
      var comments = [action.payload, ...state.comments];
      return { ...state, comments: comments };

    case actions.UPDATE_TUTORIAL_IMAGE_URL:
      return { ...state, imageUrl: action.payload, loading: false };

    case actions.START_TUTORIAL_LOADING:
      return { ...state, loading: true };

    default:
      return state;
  }
};

export default tutorialReducer;
