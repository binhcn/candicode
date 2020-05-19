import { combineReducers } from "redux";

import userReducer from "./user.reducer";
import challengeReducer from "./challenge.reducer";

const reducers = combineReducers({
  userReducer, challengeReducer,
});

export default reducers;
