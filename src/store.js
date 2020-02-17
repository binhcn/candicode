import thunk from "redux-thunk";
import logger from "redux-logger";
import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers";

const store = createStore(reducers, compose(applyMiddleware(thunk, logger)));

export default store;
