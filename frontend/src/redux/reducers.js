

// // src/redux/reducers.js
// import {
//   FETCH_TASKS_REQUEST,
//   FETCH_TASKS_SUCCESS,
//   FETCH_TASKS_FAILURE,
//   ADD_TASK,
//   UPDATE_TASK,
//   DELETE_TASK,
//   UPDATE_TASK_STATUS,
//   SET_CHOSEN_DAY_TASKS,
//   SET_WEEKLY_TASKS,
//   SET_FILTERED_TASKS,
// } from "./constants";

// const initialState = {
//   allTasks: [],
//   weeklyTasks: [],
//   chosenDayTasks: [],
//   filteredTasks: [],
//   loading: false,
//   error: null,
// };

// const taskReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case FETCH_TASKS_REQUEST:
//       return { ...state, loading: true };
//     case FETCH_TASKS_SUCCESS:
//       return { ...state, loading: false, allTasks: action.payload };
//     case FETCH_TASKS_FAILURE:
//       return { ...state, loading: false, error: action.payload };
//     case ADD_TASK:
//       return { ...state, allTasks: [...state.allTasks, action.payload] };
//     case UPDATE_TASK:
//       return {
//         ...state,
//         allTasks: state.allTasks.map((task) =>
//           task.id === action.payload.id ? action.payload : task
//         ),
//       };
//     case DELETE_TASK:
//       return {
//         ...state,
//         allTasks: state.allTasks.filter((task) => task.id !== action.payload),
//       };
//     case UPDATE_TASK_STATUS:
//       return {
//         ...state,
//         allTasks: state.allTasks.map((task) =>
//           task.id === action.payload.id ? { ...task, status: action.payload.status } : task
//         ),
//       };
//     case SET_CHOSEN_DAY_TASKS:
//       return { ...state, chosenDayTasks: action.payload };
//     case SET_WEEKLY_TASKS:
//       return { ...state, weeklyTasks: action.payload };
//     case SET_FILTERED_TASKS:
//       return { ...state, filteredTasks: action.payload };
//     default:
//       return state;
//   }
// };

// export default taskReducer;






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
    case UPDATE_TASK: {
      const updatedTask = action.payload; // The task being updated

      // Update allTasks
      const updatedAllTasks = state.allTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      );

      // Update chosenDayTasks
      const updatedChosenDayTasks = state.chosenDayTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      );

      // Update chosenWeekTasks
      const updatedChosenWeekTasks = state.chosenWeekTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      );

      return {
        ...state,
        allTasks: updatedAllTasks,
        chosenDayTasks: updatedChosenDayTasks,
        chosenWeekTasks: updatedChosenWeekTasks,
      };
    }

    case DELETE_TASK: {
      // Remove task from allTasks
      const updatedAllTasks = state.allTasks.filter(
        (task) => task._id !== action.payload
      );

      // Remove task from chosenDayTasks
      const updatedChosenDayTasks = state.chosenDayTasks.filter(
        (task) => task._id !== action.payload
      );

      // Remove task from chosenWeekTasks
      const updatedChosenWeekTasks = state.chosenWeekTasks.filter(
        (task) => task._id !== action.payload
      );

      return {
        ...state,
        allTasks: updatedAllTasks,
        chosenDayTasks: updatedChosenDayTasks,
        chosenWeekTasks: updatedChosenWeekTasks,
      };
    }

    // Reducer case for updating task status
    case UPDATE_TASK_STATUS: {
      // Update all tasks
      const updatedAllTasks = state.allTasks.map((task) =>
        task._id === action.payload._id
          ? { ...task, status: action.payload.status }
          : task
      );

      // Update chosenDayTasks
      const updatedChosenDayTasks = state.chosenDayTasks.map((task) =>
        task._id === action.payload._id
          ? { ...task, status: action.payload.status }
          : task
      );

      // Update chosenWeekTasks
      const updatedChosenWeekTasks = state.chosenWeekTasks.map((task) =>
        task._id === action.payload._id
          ? { ...task, status: action.payload.status }
          : task
      );

      return {
        ...state,
        allTasks: updatedAllTasks,
        chosenDayTasks: updatedChosenDayTasks,
        chosenWeekTasks: updatedChosenWeekTasks,
      };
    }

    case SET_CHOSEN_DAY_TASKS:
      return { ...state, chosenDayTasks: action.payload };
    case SET_WEEKLY_TASKS:
      return { ...state, weeklyTasks: action.payload };
    default:
      return state;
  }
};

export default taskReducer;
