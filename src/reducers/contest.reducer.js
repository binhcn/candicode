import * as actions from "../actions/actions";

const initState = {
  id: '',
  title: "",
  tagList: [],
  banner: null,
  imageUrl: "",

  description: "",
  content: "",

  data: [],
  visible: false,
  currentStep: 0,
};

const contestReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.HANDLE_CONTEST:
      return {
        ...state,
        id: action.payload.contestId,
        title: action.payload.title,
        author: action.payload.author,
        tagList: action.payload.tags,
        banner: action.payload.banner,
        description: action.payload.description,
        content: action.payload.content,
        createdAt: action.payload.createdAt,
        likes: action.payload.likes,
        dislikes: action.payload.dislikes,
        currentStep: 0,
      };

    case actions.HANDLE_CONTEST_MODAL:
      return { ...state, visible: action.payload };

    case actions.UPDATE_STEP_ONE_CONTEST:
      return {
        ...state,
        title: action.payload.title,
        tagList: action.payload.tagList,
        description: action.payload.description,
        banner: action.payload.banner,
        imageUrl: action.payload.imageUrl,
      };

    case actions.UPDATE_STEP_TWO_CONTEST:
      return {
        ...state,
        content: action.payload.content,
      };

    case actions.UPDATE_CONTEST:
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

    case actions.UPDATE_STEP_CONTEST:
      return {
        ...state,
        currentStep: state.currentStep + action.payload,
      }

    case actions.DELETE_CONTEST:
      return { ...state, data: state.data.filter(item => item.id !== action.payload) };

    case actions.GET_ALL_CONTESTS:
      var data = [];
      action.payload.forEach((contest, index) => {
        data.push({
          key: index + 1,
          id: contest.contestId,
          title: contest.title,
          banner: contest.banner,
          imageUrl: "",

          description: contest.description,
          numComments: contest.numComments,
          createdAt: contest.createdAt,
          author: contest.author,
          tagList: contest.tags,
          likes: contest.likes,
          dislikes: contest.dislikes,
        });
      });
      return {
        ...state,
        data: data,
      }

    default:
      return state;
  }
};

export default contestReducer;
