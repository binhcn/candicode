import * as actions from "../actions/actions";

const initState = {
  id: '',
  title: "",
  author: '',
  description: "",
  level: "",
  point: 0,
  likes: 0,
  dislikes: 0,
  tcOutputFormat: "",
  tcInputFormat: "",
  contents: [],
  testcases: [],
  comments: [],
  submissions: [],
  leaderBoard: [],

  isContest: false,
  roundChallengeList: [],
  endsAt: '',
  contestId: null,
  currentRoundChallengeIdx: 0,
};

const codeEditorReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.GET_CHALLENGE_DETAILS:
      return {
        ...state,
        id: action.payload.id,
        title: action.payload.title,
        author: action.payload.author,
        description: action.payload.description,
        level: action.payload.level,
        point: action.payload.point,
        likes: action.payload.likes,
        dislikes: action.payload.dislikes,
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
      return { ...state, isContest: true, 
        roundChallengeList: action.payload.roundChallengeList,
        endsAt: action.payload.endsAt,
        contestId: action.payload.contestId,
      };

    case actions.HANDLE_CONTEST_MODE:
      return { ...state, isContest: action.payload };

    case actions.NAVIGATE_ROUND_CHALLENGE:
      var newCurrentRoundChallengeIdx = state.currentRoundChallengeIdx + action.payload;
      return { ...state, currentRoundChallengeIdx: newCurrentRoundChallengeIdx };

    case actions.GET_CHALLENGE_SUBMISSIONS:
      var data = [];
      action.payload.forEach((submission, index) => {
        data.push({
          key: index + 1,
          id: submission.submissionId,
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

    case actions.GET_CHALLENGE_LEADER_BOARD:
      var leaderBoard = [];
      action.payload.forEach((user, index) => {
        leaderBoard.push({
          key: index + 1,
          id: user.userId,
          fullName: user.fullName,
          firstName: user.fistName,
          lastName: user.lastName,
          avatar: user.avatar,
          time: user.time,
          submitAt: user.submitAt.substring(0, user.submitAt.length - 4),
          formattedScore: user.gainedScore + '/' + user.maxScore,
        });
      });
      return { ...state, leaderBoard };

    case actions.REACTION_CHALLENGE:
      var { likes, dislikes } = state;
      if (action.payload.like) {
        likes += 1;
      } else {
        dislikes += 1;
      }
      return { ...state, likes, dislikes };

    default:
      return state;
  }
};

export default codeEditorReducer;
