

// src/components/TaskCard.js
import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-200">
      {/* Checkbox for completion */}
      <input
        type="checkbox"
        checked={task.status === "Completed"}
        onChange={() => onStatusChange(task)}
        className="form-checkbox h-5 w-5 text-blue-600"
      />

      {/* Task Title */}
      <h3
        className={`flex-1 ml-4 ${
          task.status === "Completed" ? "line-through text-gray-400" : "text-black"
        }`}
      >
        {task.title}
      </h3>

      {/* Edit and Delete Icons */}
      <div className="flex items-center space-x-2">
        <button onClick={() => onEdit(task)} className="text-gray-400 hover:text-blue-500">
          <FiEdit2 size={18} />
        </button>
        <button onClick={() => onDelete(task._id)} className="text-gray-400 hover:text-red-500">
          <FiTrash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
