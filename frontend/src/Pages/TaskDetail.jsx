import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateTask, deleteTask, fetchTasks } from "../redux/action";
import TaskScreen from "../Components/TaskScreen";
import { FiArrowLeft } from "react-icons/fi";

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // dispatch(fetchTasks());

  const allTasks = useSelector((state) => state.task.allTasks); // Ensure state is accessed correctly

  // Retrieve task by ID from Redux state
  const task = allTasks.find((t) => t._id === id);
  if (error) return <div>{error}</div>;
  if (!task) return <div>Task not found</div>;

  return (
    <div className="p-4">
      <div className="flex">
        <button onClick={() => navigate(-1)} className="flex items-center">
          <FiArrowLeft />
        </button>
        <h2 className="font-semibold text-2xl mb-4 mx-auto">Task Details</h2>
      </div>
      <TaskScreen task={task} />
    </div>
  );
};

export default TaskDetail;
