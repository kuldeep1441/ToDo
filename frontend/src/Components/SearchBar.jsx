import React, { useState, useEffect } from "react";
import TaskList from "../Pages/TaskList";
import { FiArrowLeft } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateTaskStatus, deleteTask } from "../redux/action";

const SearchBar = () => {
  const { text } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  const { allTasks, chosenDayTasks, chosenWeekTasks } = useSelector(
    (state) => state.task
  );

  // Determine initial tasks based on the URL parameter (dayTasks or allTasks)
  const initialTasks =
    text === "dayTasks"
      ? chosenDayTasks
      : text === "weekTasks"
      ? chosenWeekTasks
      : allTasks;

  useEffect(() => {
    // Filter tasks whenever the search term or initial tasks change
    filterTasks(searchTerm, initialTasks);
  }, [searchTerm, initialTasks]); // Ensure initialTasks is included as dependency

  const filterTasks = (term, tasks) => {
    if (term) {
      const filtered = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(term.toLowerCase()) ||
          (task.description &&
            task.description.toLowerCase().includes(term.toLowerCase()))
      );
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks(tasks);
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
