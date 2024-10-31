

import React, { useState } from "react";
import { addTask } from "../redux/action";
import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";

const TaskForm = ({ initialData = {}, setShowTaskForm }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");

  // Format date to YYYY-MM-DD if initialData.date is present, otherwise set to today's date
  const formatDate = (date) => date.toISOString().split("T")[0];
  const [date, setDate] = useState(
    initialData.date
      ? formatDate(new Date(initialData.date))
      : formatDate(new Date())
  );

  // Helper function to format time to HH:MM
  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // Set startTime and endTime to current time
  const [startTime, setStartTime] = useState(
    initialData.startTime || formatTime(new Date())
  );
  const [endTime, setEndTime] = useState(
    initialData.endTime || formatTime(new Date())
  );

  const [priority, setPriority] = useState(initialData.priority || "Low");
  const [error, setError] = useState(""); // Error state for handling submission errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = {
        title,
        description,
        date,
        startTime: new Date(`${date}T${startTime}`), // Combine date and time
        endTime: new Date(`${date}T${endTime}`), // Combine date and time
        priority,
      };
      await dispatch(addTask(newTask));
      setShowTaskForm(false); // Close form after adding task
    } catch (error) {
      setError("Failed to add task. Please try again."); // Display error message
      console.error("Error adding task:", error);
    }
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-md mx-auto"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Add New Task</h2>
        <button
          type="button"
          onClick={() => setShowTaskForm(false)}
          className="text-gray-500 hover:text-gray-700 text-2xl"
          aria-label="Close"
        >
          &times;
        </button>
      </div>

      <div>
        <label htmlFor="title" className="text-sm font-medium text-gray-600">
          Task title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="w-full mt-1 p-1 border rounded focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      <div className="flex justify-between gap-4">
        <div className="flex-1">
          <label
            htmlFor="startTime"
            className="text-sm font-medium text-gray-600 flex items-center gap-2"
          >
            <ClockIcon className="h-4 w-4" />
            Start
          </label>
          <input
            id="startTime"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full mt-1 p-1 border rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor="endTime"
            className="text-sm font-medium text-gray-600 flex items-center gap-2"
          >
            <ClockIcon className="h-4 w-4" />
            Ends
          </label>
          <input
            id="endTime"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full mt-1 p-1 border rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="date"
          className="text-sm font-medium text-gray-600 flex items-center gap-2"
        >
          <CalendarIcon className="h-4 w-4" />
          Set Date
        </label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full mt-1 p-1 border rounded focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="text-sm font-medium text-gray-600"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add Description"
          className="w-full mt-1 mb-0 p-1 border rounded focus:outline-none focus:border-blue-500"
          rows="3"
        />
      </div>

      {/* Priority Selection */}
      <div>
        <label htmlFor="priority" className="text-sm font-medium text-gray-600">
          Priority
        </label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full mt-1 p-1 border rounded focus:outline-none focus:border-blue-500"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Create task
      </button>
    </form>
  );
};

export default TaskForm;
