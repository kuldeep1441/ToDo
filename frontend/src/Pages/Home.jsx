import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTasks,
  setChosenDayTasks,
  setChosenWeekTasks,
} from "../redux/action";
import { FiSearch } from "react-icons/fi";
import {
  startOfWeek,
  endOfWeek,
  format,
  isWithinInterval,
  addDays,
  subWeeks,
  addWeeks,
} from "date-fns";
import { useSwipeable } from "react-swipeable";
import TaskForm from "../Components/TaskForm";
import TaskList from "./TaskList";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [weeklySummary, setWeeklySummary] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [chosenDate, setChosenDate] = useState(new Date());

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const { allTasks, chosenDayTasks } = useSelector((state) => state.task);

  useEffect(() => {
    if (allTasks.length > 0) {
      categorizeTasksByWeek(allTasks);
      filterTasksForChosenDate(allTasks, chosenDate);
    } else {
      setWeeklySummary([]); // Clear weekly summary if no tasks
    }
  }, [allTasks, chosenDate, currentWeek]);

  const categorizeTasksByWeek = (tasks) => {
    const taskWeeks = [];
    const currentWeekEnd = endOfWeek(currentWeek);
    const weekLabel = `${format(currentWeek, "d MMM")} - ${format(
      currentWeekEnd,
      "d MMM"
    )}`;
    const tasksForWeek = tasks.filter((task) =>
      isWithinInterval(new Date(task.date), {
        start: currentWeek,
        end: currentWeekEnd,
      })
    );

    dispatch(setChosenWeekTasks(tasksForWeek));

    const completedCount = tasksForWeek.filter(
      (task) => task.status === "Completed"
    ).length;
    const openCount = tasksForWeek.filter(
      (task) => task.status !== "Completed"
    ).length;

    taskWeeks.push({
      label: weekLabel,
      open: openCount,
      completed: completedCount,
      total: tasksForWeek.length,
      tasks: tasksForWeek,
      startDate: currentWeek,
    });

    setWeeklySummary(taskWeeks);
  };

  const isChosenDay = (taskDate, chosenDate) =>
    new Date(taskDate).toDateString() === chosenDate.toDateString();

  const filterTasksForChosenDate = (tasks, date) => {
    const todayTasks = tasks.filter((task) => isChosenDay(task.date, date));
    dispatch(setChosenDayTasks(todayTasks)); // Dispatch even if empty
  };

  const renderWeekDays = () => {
    const startOfCurrentWeek = startOfWeek(currentWeek, { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, index) => {
      const day = addDays(startOfCurrentWeek, index);
      return (
        <div
          key={index}
          onClick={() => {
            setChosenDate(day);
            filterTasksForChosenDate(allTasks, day);
          }}
          className={`flex flex-col items-center p-2 cursor-pointer ${
            day.toDateString() === chosenDate.toDateString()
              ? "bg-blue-500 text-white rounded-lg"
              : "text-gray-500"
          }`}
        >
          <p className="text-xs font-medium">{format(day, "EEE")}</p>
          <p className="text-sm font-semibold">{format(day, "dd")}</p>
        </div>
      );
    });
  };

  const handleSwipeLeft = () => {
    const newWeek = addWeeks(currentWeek, 1);
    setCurrentWeek(newWeek);
  };

  const handleSwipeRight = () => {
    const newWeek = subWeeks(currentWeek, 1);
    setCurrentWeek(newWeek);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const getProgressBarWidth = (completed, total) => {
    return total > 0 ? (completed / total) * 100 : 0;
  };

  return (
    <div className="p-4">
      <button
        onClick={() => navigate(`/search/allTasks`)}
        className="text-gray-400 hover:text-red-500"
      >
        <FiSearch size={18} />
      </button>
      {/* Week Navigation */}
      <div
        {...swipeHandlers}
        className="flex justify-between items-center mb-4 overflow-hidden"
      >
        {renderWeekDays()}
      </div>
      {/* Task Summary */}
      <div
        onClick={() => navigate(`/search/weekTasks`)}
        className="cursor-pointer w-full mb-4"
      >
        <div className="flex gap-4 mb-4">
          <div className="bg-blue-100 p-4 rounded-lg flex-1 text-center">
            <p className="text-blue-700 font-semibold">Task Complete</p>
            <p className="text-2xl font-bold">
              {weeklySummary.reduce((acc, week) => acc + week.completed, 0)}
            </p>
            <p>This Week</p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg flex-1 text-center">
            <p className="text-red-700 font-semibold">Task Pending</p>
            <p className="text-2xl font-bold">
              {weeklySummary.reduce((acc, week) => acc + week.open, 0)}
            </p>
            <p>This Week</p>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{
              width: `${getProgressBarWidth(
                weeklySummary.reduce((acc, week) => acc + week.completed, 0),
                weeklySummary.reduce((acc, week) => acc + week.total, 0)
              )}%`,
            }}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <h2 className="text-lg font-semibold mb-2">
          Tasks for {format(chosenDate, "dd MMM")}
        </h2>
        <button
          onClick={() => navigate(`/search/dayTasks`)}
          className="text-blue-500"
        >
          View All
        </button>
      </div>
      {/* Task List */}
      <TaskList tasks={chosenDayTasks} />

      <button
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-2xl pb-1 bg-blue-500 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg"
        onClick={() => setShowTaskForm(!showTaskForm)}
      >
        +
      </button>

      {showTaskForm && (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow w-full">
          <TaskForm setShowTaskForm={setShowTaskForm} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
