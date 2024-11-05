// src/components/TaskScreen.js
import React, { useState, useEffect } from "react";
import {
  CalendarIcon,
  ClockIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteTask, updateTaskStatus } from "../redux/action";
import TaskEditScreen from "./TaskEditScreen";

const TaskScreen = ({ task = [] }) => {
  // const [currentTask, setCurrentTask] = useState(task);
  // useEffect(() => {                  // WHENEVER PROP CHANGES YOU HAVE TO UPDATE THE CURRENT TASK AS CURRENTtASK TAKE IT'S VALUE ONLY ON FIRST RENDERING
  //   setCurrentTask(task);
  // }, [task]);
  const {
    title,
    description = "No description provided.",
    date,
    startTime,
    endTime,
    status = "In Progress",
    priority = "Low",
  } = task;
  const [showEditTaskForm, setShowEditTaskForm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      dispatch(deleteTask(task._id));
      navigate(-1);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleStatusChange = async () => {
    try {
      const newStatus =
        task.status === "In Progress" ? "Completed" : "In Progress";
      dispatch(updateTaskStatus(task._id, newStatus));
    } catch (error) {
      console.error("Error changing task status:", error);
    }
  };

  // const handleEdit = (updatedTask) => {
  //   setCurrentTask(updatedTask); // Update state to trigger a re-render
  //   // dispatch(updateTask(currentTask._id, updatedTask)); // Ensure you're dispatching a new object
  // };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-md mx-auto">
      <div className="flex space-x-3 items-center">
        <label className="text-sm font-medium text-gray-600">Title :</label>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-600">
          Description :
        </label>
        <div className="text-gray-800 max-h-24 overflow-y-auto p-2 border rounded">
          {description}
        </div>
      </div>

      <div className="flex space-x-3">
        <label className="text-sm font-medium text-gray-600">Priority :</label>
        <p
          className={`text-sm font-semibold ${
            priority === "High"
              ? "text-red-500"
              : priority === "Medium"
              ? "text-yellow-500"
              : "text-green-500"
          }`}
        >
          {priority}
        </p>
      </div>

      <div className="flex justify-between gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
            <ClockIcon className="h-4 w-4" />
            Start
          </label>
          <p className="text-gray-800">{startTime}</p>
        </div>
        <div className="flex-1">
          <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
            <ClockIcon className="h-4 w-4" />
            Ends
          </label>
          <p className="text-gray-800">{endTime}</p>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
          <CalendarIcon className="h-4 w-4" />
          Date
        </label>
        <p className="text-gray-800">{date}</p>
      </div>

      <div className="flex space-x-3 items-center">
        <input
          type="checkbox"
          checked={task.status === "Completed"}
          onChange={handleStatusChange}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <label className="text-sm">Mark as Complete</label>

        <button
          onClick={() => setShowEditTaskForm(true)}
          className="text-blue-500"
          aria-label="Edit"
        >
          <PencilIcon className="h-5 w-5" />
        </button>

        <button
          onClick={handleDelete}
          className="text-red-500"
          aria-label="Delete"
        >
          <TrashIcon className="h-5 w-5" />
        </button>

        {showEditTaskForm && (
          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow w-full">
            <TaskEditScreen
              setShowEditTaskForm={setShowEditTaskForm}
              initialData={task}
              // handleEdit={handleEdit} // Update this to pass handleEdit
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskScreen;
