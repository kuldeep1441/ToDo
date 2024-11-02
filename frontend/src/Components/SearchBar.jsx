

// // src/components/SearchBar.js
// import React, { useState, useEffect, useMemo } from "react";
// import TaskList from "../Pages/TaskList";
// import { FiArrowLeft } from "react-icons/fi";
// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchTasks, setChosenDayTasks } from "../redux/action"; // Import actions

// const SearchBar = () => {
//   const { text } = useParams(); // Get filter type from URL
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [searchTerm, setSearchTerm] = useState("");

//   // Fetch all tasks and day-specific tasks from Redux
//   const allTasks = useSelector((state) => state.allTasks);
//   const chosenDayTasks = useSelector((state) => state.chosenDayTasks);

//   // Fetch tasks based on filter type
//   useEffect(() => {
//     if (text === "dayTasks") {
//       dispatch(setChosenDayTasks()); // Fetch day-specific tasks if filter is "dayTasks"
//     } else {
//       dispatch(fetchTasks()); // Fetch all tasks if not filtering by day
//     }
//   }, [dispatch, text]);

//   // Set initialTasks based on the URL filter and available data
//   const initialTasks = useMemo(() => {
//     if (text === "dayTasks" && chosenDayTasks) {
//       return chosenDayTasks;
//     }
//     return allTasks || []; // Default to allTasks if not "dayTasks"
//   }, [text, allTasks, chosenDayTasks]);

//   // Filter tasks based on the search term
//   const filteredTasks = useMemo(() => {
//     if (searchTerm) {
//       return initialTasks.filter(
//         (task) =>
//           task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           (task.description &&
//             task.description.toLowerCase().includes(searchTerm.toLowerCase()))
//       );
//     }
//     return initialTasks; // Show initial tasks if no search term is entered
//   }, [searchTerm, initialTasks]);

//   // Handle search input changes
//   const handleSearch = (term) => {
//     setSearchTerm(term);
//   };

//   return (
//     <div className="p-4">
//       <button onClick={() => navigate(-1)} className="flex items-center mb-2">
//         <FiArrowLeft />
//       </button>
//       <input
//         type="text"
//         placeholder="Search tasks..."
//         className="input w-full p-2 border rounded-md shadow-sm"
//         value={searchTerm}
//         onChange={(e) => handleSearch(e.target.value)}
//       />
//       {filteredTasks && filteredTasks.length > 0 ? (
//         <TaskList tasks={filteredTasks} />
//       ) : (
//         <p>No tasks found</p> // Display this when no tasks match the search term
//       )}
//     </div>
//   );
// };

// export default SearchBar;





import React, { useState, useEffect } from "react";
import TaskList from "../Pages/TaskList";
import { FiArrowLeft } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTasks,
  setChosenDayTasks,
  updateTaskStatus,
  deleteTask,
} from "../redux/action";

const SearchBar = () => {
  const { text } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  const allTasks = useSelector((state) => state.allTasks);
  const chosenDayTasks = useSelector((state) => state.chosenDayTasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const initialTasks = text === "dayTasks" ? chosenDayTasks : allTasks;

  useEffect(() => {
    filterTasks(); // Filter tasks whenever the search term or initial tasks change
  }, [searchTerm, initialTasks]);

  const filterTasks = () => {
    if (searchTerm) {
      const filtered = initialTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (task.description &&
            task.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks(initialTasks);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleTaskStatusChange = (id, currentStatus) => {
    const newStatus =
      currentStatus === "In Progress" ? "Completed" : "In Progress";
    // Update task status in Redux and locally
    dispatch(updateTaskStatus(id, newStatus));
    setFilteredTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleTaskDelete = (id) => {
    dispatch(deleteTask(id));
    setFilteredTasks((prevTasks) =>
      prevTasks.filter((task) => task._id !== id)
    );
  };

  return (
    <div className="p-4">
      <button onClick={() => navigate(-1)} className="flex items-center mb-2">
        <FiArrowLeft />
      </button>
      <input
        type="text"
        placeholder="Search tasks..."
        className="input w-full p-2 border rounded-md shadow-sm"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {filteredTasks.length > 0 ? (
        <TaskList
          tasks={filteredTasks}
          onTaskStatusChange={handleTaskStatusChange}
          onTaskDelete={handleTaskDelete}
        />
      ) : (
        <p>No tasks found</p>
      )}
    </div>
  );
};

export default SearchBar;
