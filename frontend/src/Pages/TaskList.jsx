


// // src/Pages/TaskList.js
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import TaskCard from "../Components/TaskCard";
// import TaskForm from "../Components/TaskForm";
// import {
//   fetchTasks,
//   addTask,
//   deleteTask,
//   updateTask,
//   updateTaskStatus,
// } from "../redux/action";

// const TaskList = ({ tasks = [] }) => {
//   const [showForm, setShowForm] = useState(false);
//   const [currentTask, setCurrentTask] = useState(null);
//   const [filteredTasks, setFilteredTasks] = useState([]);
//   const navigate = useNavigate();

//   // Sort and filter tasks by status and priority when tasks prop changes
//   useEffect(() => {
//     if (tasks.length > 0) {
//       const sortedTasks = [...tasks].sort((a, b) => {
//         if (a.status === "In Progress" && b.status === "Completed") return -1;
//         if (a.status === "Completed" && b.status === "In Progress") return 1;
//         const priorityOrder = { High: 1, Medium: 2, Low: 3 };
//         return priorityOrder[a.priority] - priorityOrder[b.priority];
//       });
//       setFilteredTasks(sortedTasks);
//     }
//   }, [tasks]);

//   const handleEdit = async (task) => {
//     try {
//       setCurrentTask(task);
//       setShowForm(true);
//       await updateTask(task._id, task); // Call the action to update task
//     } catch (error) {
//       console.error("Error editing task:", error);
//     }
//     setShowForm(false);
//     setCurrentTask(null);
//   };

//   const handleDelete = async (task) => {
//     try {
//       await deleteTask(task._id); // Call the action to delete task
//       const remainingTasks = filteredTasks.filter((t) => t._id !== task._id);
//       setFilteredTasks(remainingTasks);
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   const handleStatusChange = async (task) => {
//     const newStatus =
//       task.status === "In Progress" ? "Completed" : "In Progress";
//     try {
//       await updateTaskStatus(task._id, newStatus); // Call action to update status
//       const updatedTasks = filteredTasks.map((t) =>
//         t._id === task._id ? { ...t, status: newStatus } : t
//       );
//       setFilteredTasks(updatedTasks);
//     } catch (error) {
//       console.error("Error changing task status:", error);
//     }
//   };

//   const handleTaskClick = (taskId) => {
//     navigate(`/task/${taskId}`);
//   };

//   return (
//     <div>
//       <div
//         className="mt-4 space-y-4"
//         style={{
//           maxHeight: "400px",
//           overflowY: "auto",
//         }}
//       >
//         {filteredTasks.length > 0 ? (
//           filteredTasks.map((task) => (
//             <div key={task._id} onClick={() => handleTaskClick(task._id)}>
//               <TaskCard
//                 task={task}
//                 onEdit={handleEdit}
//                 onDelete={() => handleDelete(task)}
//                 onStatusChange={() => handleStatusChange(task)}
//               />
//             </div>
//           ))
//         ) : (
//           <p>No tasks to display.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TaskList;






import React, { useState, useEffect } from "react";
import TaskCard from "../Components/TaskCard";
import TaskEditScreen from "../Components/TaskEditScreen";

const TaskList = ({ tasks = [], onTaskStatusChange, onTaskDelete }) => {
  const [currentTask, setCurrentTask] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [showEditTaskForm, setShowEditTaskForm] = useState(false);

  useEffect(() => {
    if (tasks.length > 0) {
      const sortedTasks = [...tasks].sort((a, b) => {
        if (a.status === "In Progress" && b.status === "Completed") return -1;
        if (a.status === "Completed" && b.status === "In Progress") return 1;
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
      setFilteredTasks(sortedTasks);
    } else {
      setFilteredTasks([]);
    }
  }, [tasks]);

  const handleEdit = (task) => {
    setCurrentTask(task);
    setShowEditTaskForm(true);
  };

  return (
    <div>
      {filteredTasks.length === 0 ? (
        <p className="text-gray-500">
          No tasks available for the selected date.
        </p>
      ) : (
        <div
          className="mt-4 space-y-4"
          style={{ maxHeight: "400px", overflowY: "auto" }}
        >
          {filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={handleEdit}
              onDelete={() => onTaskDelete(task._id)}
              onStatusChange={() => onTaskStatusChange(task._id, task.status)}
            />
          ))}
        </div>
      )}
      {showEditTaskForm && (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow w-full">
          <TaskEditScreen
            setShowEditTaskForm={setShowEditTaskForm}
            initialData={currentTask}
            setCurrentTask={setCurrentTask}
          />
        </div>
      )}
    </div>
  );
};

export default TaskList;
