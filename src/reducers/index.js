import { combineReducers } from "redux";

import userReducer from "./user.reducer";
import newChallengeReducer from "./newchallenge.reducer";

const reducers = combineReducers({
  userReducer, newChallengeReducer
});

export default reducers;
