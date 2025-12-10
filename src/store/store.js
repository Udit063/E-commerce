const { legacy_createStore, applyMiddleware, combineReducers } = require("redux");
const { thunk } = require("redux-thunk");

const rootReducers = combineReducers({

})

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk))