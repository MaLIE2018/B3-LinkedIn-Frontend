import {createStore, applyMiddleware} from "redux";
import {allReducers} from "../reducers/index"
import {createLogger} from "redux-logger"


const logger = createLogger()

export const store = createStore(allReducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


// ,applyMiddleware(logger)  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()}