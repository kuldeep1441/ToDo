

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { updateTask, deleteTask, fetchTasks } from "../redux/action";
// import TaskScreen from "../Components/TaskScreen";
// import { FiArrowLeft } from "react-icons/fi";

// const TaskDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const allTasks = useSelector((state) => state.allTasks);

//   // Get the task directly from Redux by ID
//   const task = allTasks.find((t) => t._id === id);

//   useEffect(() => {
//     // Fetch tasks if not available in Redux store
//     if (!allTasks) {
//       dispatch(fetchTasks())
//         .then(() => setLoading(false))
//         .catch((err) => setError("Failed to load tasks"));
//     } else {
//       setLoading(false);
//     }
//   }, [dispatch, allTasks]);

//   // Handle loading and error states
//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;
//   if (!task) return <div>Task not found</div>; // Handle missing task case

//   return (
//     <div className="p-4">
//       <div className="flex">
//         <button onClick={() => navigate(-1)} className="flex items-center">
//           <FiArrowLeft />
//         </button>
//         <h2 className="font-semibold text-2xl mb-4 mx-auto">Task Details</h2>
//       </div>
//       <TaskScreen task={task} />
//     </div>
//   );
// };

// export default TaskDetail;





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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const allTasks = useSelector((state) => state.allTasks);

  // Get the task directly from Redux by ID
  const task = allTasks.find((t) => t._id === id);

  useEffect(() => {
    // Fetch tasks if not available in Redux store
    if (!allTasks) {
      dispatch(fetchTasks())
        .then(() => setLoading(false))
        .catch((err) => setError("Failed to load tasks"));
    } else {
      setLoading(false);
    }
  }, [dispatch, allTasks]);

  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!task) return <div>Task not found</div>; // Handle missing task case

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
