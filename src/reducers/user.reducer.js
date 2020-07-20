import * as actions from "../actions/actions";

const initState = {
  lang: 'en',

  currentUser: null,
  isAuthenticated: false,
  isLoading: false,

  visible: false,
  status: '',

  fullName: '',
  firstName: '',
  lastName: '',
  slogan: '',
  facebook: '',
  github: '',
  linkedin: '',
  location: '',
  company: '',
  university: '',

  avatar: null,
  loading: false,
  imageUrl: '',

  roles: null,
  submissions: [],
};

const UserReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.LOAD_PAGE:
      return { ...state, isLoading: true };

    case actions.TRANSLATE_LANGUAGE:
      return { ...state, lang: action.payload };

    case actions.GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        currentUser: action.payload,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        fullName: action.payload.fullName,
        slogan: action.payload.slogan,
        facebook: action.payload.facebook,
        github: action.payload.github,
        linkedin: action.payload.linkedin,
        location: action.payload.location,
        company: action.payload.company,
        university: action.payload.university,
        roles: action.payload.roles,
        avatar: action.payload.avatar,
      };

    case actions.LOGOUT:
      return { ...state, isAuthenticated: false, currentUser: null, roles: null, };

    case actions.GET_PROFILE_SUBMISSIONS:
      var data = [];
      action.payload.forEach((submission, index) => {
        data.push({
          key: index + 1,
          id: submission.submissionId,
          challengeTitle: submission.challengeTitle,
          compiled: submission.compiled,
          point: submission.point,
          author: submission.author,
          execTime: submission.execTime,
          doneWithin: submission.doneWithin,
          passedTestcases: submission.passedTestcases,
          totalTestcases: submission.totalTestcases,
          submitAt: submission.submitAt.substring(0, submission.submitAt.length - 4),
          contestChallenge: submission.contestChallenge,
          formattedTestcase: submission.passedTestcases + '/' + submission.totalTestcases,
        });
      });
      return { ...state, submissions: data };

    case actions.OPEN_USER_FORM:
      return { ...state, status: action.payload, visible: true };

    case actions.CLOSE_USER_FORM:
      return { ...state, visible: false };

    case actions.UPDATE_USER_PROFILE:
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        slogan: action.payload.slogan,
        facebook: action.payload.facebook,
        github: action.payload.github,
        linkedin: action.payload.linkedin,
        location: action.payload.location,
        company: action.payload.company,
        university: action.payload.university,
      };

    case actions.UPDATE_AVATAR_URL:
      return { ...state, imageUrl: action.payload, loading: false };

    case actions.START_AVATAR_LOADING:
      return { ...state, loading: true };

    default:
      return state;
  }
};

export default UserReducer;
