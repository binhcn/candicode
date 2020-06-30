import * as actions from "../actions/actions";
import moment from 'moment';

const initState = {
  id: '',
  title: "",
  maxRegister: -1,
  registrationDeadline: null,
  tagList: [],
  banner: null,
  imageUrl: "",

  description: "",
  content: "",

  data: [],
  visible: false,
  visibleRoundModal: false,
  visibleUpdateRoundModal: false,
  visibleDeleteRoundModal: false,
  currentStep: 0,

  contestChallengeList: [],
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
        maxRegister: action.payload.maxRegister,
        registrationDeadline: moment(action.payload.registrationDeadline),
        rounds: action.payload.rounds,
        currentStep: 0,
      };

    case actions.HANDLE_CONTEST_MODAL:
      return { ...state, visible: action.payload };

    case actions.HANDLE_ROUND_MODAL:
      return { ...state, visibleRoundModal: action.payload };

    case actions.HANDLE_UPDATE_ROUND_MODAL:
      return { ...state, visibleUpdateRoundModal: action.payload };

    case actions.HANDLE_DELETE_ROUND_MODAL:
      return { ...state, visibleDeleteRoundModal: action.payload };

    case actions.UPDATE_STEP_ONE_CONTEST:
      return {
        ...state,
        title: action.payload.title,
        rounds: action.payload.rounds,
        maxRegister: action.payload.maxRegister,
        registrationDeadline: action.payload.registrationDeadline,
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
          registrationDeadline: contest.registrationDeadline,
          status: contest.status,
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

    case actions.GET_CONTEST_CHALLENGES:
      return { ...state, contestChallengeList: action.payload };

    default:
      return state;
  }
};

export default contestReducer;
