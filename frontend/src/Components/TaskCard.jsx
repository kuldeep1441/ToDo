import React, { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTaskStatus, deleteTask } from "../redux/action";
import TaskEditScreen from "../Components/TaskEditScreen";
import { useSwipeable } from "react-swipeable"; // Import the useSwipeable hook

const TaskCard = ({ task, onEdit }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showEditTaskForm, setShowEditTaskForm] = useState(false);

  const handleTaskClick = (taskId) => {
    navigate(`/task/${taskId}`);
  };

  const handleEdit = () => {
    setShowEditTaskForm(true);
  };

  const handleStatusChange = async () => {
    const newStatus =
      task.status === "In Progress" ? "Completed" : "In Progress";
    await dispatch(updateTaskStatus(task._id, newStatus));
  };

  const handleDelete = async () => {
    await dispatch(deleteTask(task._id));
  };

  // Swipe handlers
  const handleSwipeLeft = () => {
    handleDelete(); // Call delete function on swipe left
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft, // Handle left swipe
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // Allow swiping with mouse
  });

  return (
    <div
      {...handlers} // Add swipe handlers to the main div
      className="flex items-center justify-between py-2 border-b border-gray-200"
    >
      {/* Checkbox for completion */}
      <input
        type="checkbox"
        checked={task.status === "Completed"}
        onChange={handleStatusChange}
        className="form-checkbox h-5 w-5 text-blue-600"
      />

      {/* Task Title */}
      <button
        className={`flex-1 ml-4 text-left ${
          task.status === "Completed"
            ? "line-through text-gray-400"
            : "text-black"
        }`}
        onClick={() => handleTaskClick(task._id)}
      >
        {task.title}
      </button>

      {/* Edit and Delete Icons */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handleEdit}
          className="text-gray-400 hover:text-blue-500"
        >
          <FiEdit2 size={18} />
        </button>
        <button
          onClick={() => handleDelete()}
          className="text-gray-400 hover:text-red-500"
        >
          <FiTrash2 size={18} />
        </button>
      </div>

      {showEditTaskForm && (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow w-full">
          <TaskEditScreen
            setShowEditTaskForm={setShowEditTaskForm}
            initialData={task}
          />
        </div>
      )}
    </div>
  );
};

export default TaskCard;
