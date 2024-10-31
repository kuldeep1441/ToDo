

// src/redux/actions.js
import axios from "axios";
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

// Action to fetch tasks
export const fetchTasks = () => async (dispatch) => {
  dispatch({ type: FETCH_TASKS_REQUEST });
  try {
    const response = await axios.get("/api/tasks");
    const tasks = response.data;
    localStorage.setItem("allTasks", JSON.stringify(tasks));
    dispatch({ type: FETCH_TASKS_SUCCESS, payload: tasks });
  } catch (error) {
    dispatch({ type: FETCH_TASKS_FAILURE, payload: error.message });
  }
};

// Action to add a task
export const addTask = (task) => async (dispatch) => {
  try {
    const response = await axios.post("/api/tasks", task);
    const newTask = response.data;
    const currentTasks = JSON.parse(localStorage.getItem("allTasks")) || [];
    const updatedTasks = [...currentTasks, newTask];
    localStorage.setItem("allTasks", JSON.stringify(updatedTasks));
    dispatch({ type: ADD_TASK, payload: newTask });
  } catch (error) {
    console.error("Error adding task:", error);
  }
};

// Action to update a task
export const updateTask = (id, task) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/tasks/${id}`, task);
    const updatedTask = response.data;
    const currentTasks = JSON.parse(localStorage.getItem("allTasks")) || [];
    const updatedTasks = currentTasks.map((t) => (t.id === id ? updatedTask : t));
    
    // Save updated tasks to local storage
    localStorage.setItem("allTasks", JSON.stringify(updatedTasks));
    
    // Update chosen day tasks in local storage
    const currentDayTasks = JSON.parse(localStorage.getItem("chosenDayTasks")) || [];
    const updatedDayTasks = currentDayTasks.map((t) => (t.id === id ? updatedTask : t));
    localStorage.setItem("chosenDayTasks", JSON.stringify(updatedDayTasks));
    
    // Update chosen week tasks in local storage
    const currentWeekTasks = JSON.parse(localStorage.getItem("chosenWeekTasks")) || [];
    const updatedWeekTasks = currentWeekTasks.map((t) => (t.id === id ? updatedTask : t));
    localStorage.setItem("chosenWeekTasks", JSON.stringify(updatedWeekTasks));

    dispatch({ type: UPDATE_TASK, payload: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

// Action to delete a task
export const deleteTask = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/tasks/${id}`);
    
    // Update tasks in local storage
    const currentTasks = JSON.parse(localStorage.getItem("allTasks")) || [];
    const updatedTasks = currentTasks.filter((task) => task.id !== id);
    localStorage.setItem("allTasks", JSON.stringify(updatedTasks));
    
    // Update chosen day tasks in local storage
    const currentDayTasks = JSON.parse(localStorage.getItem("chosenDayTasks")) || [];
    const updatedDayTasks = currentDayTasks.filter((task) => task.id !== id);
    localStorage.setItem("chosenDayTasks", JSON.stringify(updatedDayTasks));
    
    // Update chosen week tasks in local storage
    const currentWeekTasks = JSON.parse(localStorage.getItem("chosenWeekTasks")) || [];
    const updatedWeekTasks = currentWeekTasks.filter((task) => task.id !== id);
    localStorage.setItem("chosenWeekTasks", JSON.stringify(updatedWeekTasks));

    dispatch({ type: DELETE_TASK, payload: id });
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

// Action to update task status
export const updateTaskStatus = (id, status) => async (dispatch) => {
  try {
    const response = await axios.patch(`/api/tasks/${id}`, { status });
    const updatedTask = response.data;
    
    // Update tasks in local storage
    const currentTasks = JSON.parse(localStorage.getItem("allTasks")) || [];
    const updatedTasks = currentTasks.map((task) => (task.id === id ? updatedTask : task));
    localStorage.setItem("allTasks", JSON.stringify(updatedTasks));
    
    // Update chosen day tasks in local storage
    const currentDayTasks = JSON.parse(localStorage.getItem("chosenDayTasks")) || [];
    const updatedDayTasks = currentDayTasks.map((task) => (task.id === id ? updatedTask : task));
    localStorage.setItem("chosenDayTasks", JSON.stringify(updatedDayTasks));
    
    // Update chosen week tasks in local storage
    const currentWeekTasks = JSON.parse(localStorage.getItem("chosenWeekTasks")) || [];
    const updatedWeekTasks = currentWeekTasks.map((task) => (task.id === id ? updatedTask : task));
    localStorage.setItem("chosenWeekTasks", JSON.stringify(updatedWeekTasks));

    dispatch({ type: UPDATE_TASK_STATUS, payload: updatedTask });
  } catch (error) {
    console.error("Error updating task status:", error);
  }
};

// Additional actions
export const setChosenDayTasks = (tasks) => {
  localStorage.setItem("chosenDayTasks", JSON.stringify(tasks));
  return { type: SET_CHOSEN_DAY_TASKS, payload: tasks };
};

export const setChosenWeekTasks = (tasks) => {
  localStorage.setItem("chosenWeekTasks", JSON.stringify(tasks));
  return { type: SET_WEEKLY_TASKS, payload: tasks };
};
