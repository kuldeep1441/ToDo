

// src/redux/reducers.js
import {
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  UPDATE_TASK_STATUS,
  SET_CHOSEN_DAY_TASKS,
  SET_WEEKLY_TASKS,
  SET_FILTERED_TASKS,
} from "./constants";

const initialState = {
  allTasks: [],
  weeklyTasks: [],
  chosenDayTasks: [],
  filteredTasks: [],
  loading: false,
  error: null,
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASKS_REQUEST:
      return { ...state, loading: true };
    case FETCH_TASKS_SUCCESS:
      return { ...state, loading: false, allTasks: action.payload };
    case FETCH_TASKS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_TASK:
      return { ...state, allTasks: [...state.allTasks, action.payload] };
    case UPDATE_TASK:
      return {
        ...state,
        allTasks: state.allTasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case DELETE_TASK:
      return {
        ...state,
        allTasks: state.allTasks.filter((task) => task.id !== action.payload),
      };
    case UPDATE_TASK_STATUS:
      return {
        ...state,
        allTasks: state.allTasks.map((task) =>
          task.id === action.payload.id ? { ...task, status: action.payload.status } : task
        ),
      };
    case SET_CHOSEN_DAY_TASKS:
      return { ...state, chosenDayTasks: action.payload };
    case SET_WEEKLY_TASKS:
      return { ...state, weeklyTasks: action.payload };
    case SET_FILTERED_TASKS:
      return { ...state, filteredTasks: action.payload };
    default:
      return state;
  }
};

export default taskReducer;
