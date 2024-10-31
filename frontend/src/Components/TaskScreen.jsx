




// src/components/TaskScreen.js
import React, { useState } from "react";
import {
  CalendarIcon,
  ClockIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateTask, deleteTask, updateTaskStatus } from "../redux/action";
import TaskEditScreen from "./TaskEditScreen";

const TaskScreen = ({ task }) => {
  const { title, description, date, startTime, endTime, status, priority } = task;
  const [currentStatus, setCurrentStatus] = useState(status || "");
  const [currentTask, setCurrentTask] = useState(task || []);
  const [showEditTaskForm, setShowEditTaskForm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleDelete = async () => {
    try {
      dispatch(deleteTask(currentTask._id));
      navigate(-1); // Go back to the previous route after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleStatusChange = async () => {
    try {
      const newStatus = currentTask.status === "In Progress" ? "Completed" : "In Progress";
      dispatch(updateTaskStatus(currentTask._id, newStatus));
      setCurrentStatus(newStatus);
    } catch (error) {
      console.error("Error changing task status:", error);
    }
  };

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
          {description || "No description provided."}
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
          {priority || "Low"}
        </p>
      </div>

      <div className="flex justify-between gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
            <ClockIcon className="h-4 w-4" />
            Start
          </label>
          <p className="text-gray-800">{startTime || "N/A"}</p>
        </div>
        <div className="flex-1">
          <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
            <ClockIcon className="h-4 w-4" />
            Ends
          </label>
          <p className="text-gray-800">{endTime || "N/A"}</p>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
          <CalendarIcon className="h-4 w-4" />
          Date
        </label>
        <p className="text-gray-800">{date.match(/^\d{4}-\d{2}-\d{2}/)[0]}</p>
      </div>

      <div className="flex space-x-3 items-center">
        <input
          type="checkbox"
          checked={currentStatus === "Completed"}
          onChange={handleStatusChange} // Call handleStatusChange on change
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
          onClick={() => handleDelete()}
          className="text-red-500"
          aria-label="Delete"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
        {/* Task Form Modal */}
        {showEditTaskForm && (
          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow w-full">
            <TaskEditScreen setShowEditTaskForm={setShowEditTaskForm} initialData={currentTask} setCurrentTask={setCurrentTask}  />
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskScreen;
