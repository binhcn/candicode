import { combineReducers } from "redux";

import userReducer from "./user.reducer";
import challengeReducer from "./challenge.reducer";
import tutorialReducer from "./tutorial.reducer";

const reducers = combineReducers({
  userReducer, challengeReducer, tutorialReducer
});

export default reducers;
