// src/redux/store.js
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import taskReducer from "./reducers";

// Retrieve initial state from localStorage
const allTasksFromStorage = localStorage.getItem("allTasks")
  ? JSON.parse(localStorage.getItem("allTasks"))
  : [];
const chosenDayTasksFromStorage = localStorage.getItem("chosenDayTasks")
  ? JSON.parse(localStorage.getItem("chosenDayTasks"))
  : [];
const chosenWeekTasksFromStorage = localStorage.getItem("chosenWeekTasks")
  ? JSON.parse(localStorage.getItem("chosenWeekTasks"))
  : [];

// Set initial state
const initialState = {
  task: {
    // Change this key to match `combineReducers`
    allTasks: allTasksFromStorage,
    chosenDayTasks: chosenDayTasksFromStorage,
    chosenWeekTasks: chosenWeekTasksFromStorage,
  },
};

// Combine reducers
const rootReducer = combineReducers({
  task: taskReducer, // Keep the key consistent with `initialState`
});

// Configure store with middleware and dev tools
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
