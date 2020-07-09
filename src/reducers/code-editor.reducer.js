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
  comments: [],
  submissions: [],
  leaderBoard: [],

  isContest: false,
  roundChallengeList: [],
  currentRoundChallengeIdx: 0,
};

const codeEditorReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.GET_CHALLENGE_DETAILS:
      return {
        ...state,
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

    case actions.GET_CHALLENGE_COMMENTS:
      return { ...state, comments: action.payload };

    case actions.ADD_CHALLENGE_COMMENTS:
      var comments = [...state.comments, action.payload];
      return { ...state, comments: comments };

    case actions.PREPARE_CONTEST_CHALLENGES:
      return { ...state, isContest: true, roundChallengeList: action.payload };

    case actions.HANDLE_CONTEST_MODE:
      return { ...state, isContest: action.payload };

    case actions.NAVIGATE_ROUND_CHALLENGE:
      var newCurrentRoundChallengeIdx = state.currentRoundChallengeIdx + action.payload;
      return { ...state, currentRoundChallengeIdx: newCurrentRoundChallengeIdx };

    case actions.GET_CHALLENGE_SUBMISSIONS:
      return { ...state, submissions: action.payload };

    case actions.GET_CHALLENGE_LEADER_BOARD:
      return { ...state, leaderBoard: action.payload };

    default:
      return state;
  }
};

export default codeEditorReducer;
