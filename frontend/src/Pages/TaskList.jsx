import React, { useState, useEffect } from "react";
import TaskCard from "../Components/TaskCard";

const TaskList = ({ tasks = [] }) => {
  const [filteredTasks, setFilteredTasks] = useState([]);

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

  return (
    <div>
      {filteredTasks.length === 0 ? (
        <p className="text-gray-500">
          No tasks available for the selected date.
        </p>
      ) : (
        <div
          className="mt-4 space-y-4 overflow-y-auto"
          style={{ maxHeight: "230px" }} // Set height to allow for 4 tasks
        >
          {filteredTasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
