import { combineReducers } from "redux";

import userReducer from "./user.reducer";
import challengeReducer from "./challenge.reducer";
import tutorialReducer from "./tutorial.reducer";
import codeEditorReducer from "./code-editor.reducer";

const reducers = combineReducers({
  userReducer, challengeReducer, tutorialReducer, codeEditorReducer
});

export default reducers;
