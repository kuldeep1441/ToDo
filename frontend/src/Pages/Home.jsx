

// HomePage.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, setChosenDayTasks, setChosenWeekTasks } from "../redux/action";
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
  const [allTasks, setAllTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedWeekTasks, setSelectedWeekTasks] = useState([]);
  const [chosenDate, setChosenDate] = useState(new Date());
  const [chosenDateTasks, setChosenDateTasks] = useState([]);

  const totalTasks = useSelector((state) => state.allTasks); // Fetch tasks from Redux
  const chosenWeekTasks = useSelector((state) => state.chosenWeekTasks); // Assuming weeklySummary is managed in Redux
  const chosenDayTasks = useSelector((state) => state.chosenDayTasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    if (totalTasks.length > 0) {
      setAllTasks(totalTasks)
      categorizeTasksByWeek(totalTasks);
      filterTasksForChosenDate(totalTasks, chosenDate);
    }
  }, [totalTasks, chosenDate, currentWeek]);

  const categorizeTasksByWeek = (tasks) => {
    if (!Array.isArray(tasks)) return;
    const taskWeeks = [];
    const taskDates = tasks.map((task) => new Date(task.date));
    const firstDate = startOfWeek(new Date(Math.min(...taskDates)));
    const lastDate = endOfWeek(new Date(Math.max(...taskDates)));
    let currentWeekStart = firstDate;

    while (currentWeekStart <= lastDate) {
      const currentWeekEnd = endOfWeek(currentWeekStart);
      const weekLabel = `${format(currentWeekStart, "d MMM")} - ${format(currentWeekEnd, "d MMM")}`;
      const tasksForWeek = tasks.filter((task) =>
        isWithinInterval(new Date(task.date), {
          start: currentWeekStart,
          end: currentWeekEnd,
        })
      );
      setSelectedWeekTasks(tasksForWeek);
      dispatch(setChosenWeekTasks(tasksForWeek));

      taskWeeks.push({
        label: weekLabel,
        open: tasksForWeek.filter((task) => task.status !== "Completed").length,
        completed: tasksForWeek.filter((task) => task.status === "Completed").length,
        tasks: tasksForWeek,
        startDate: currentWeekStart,
      });

      currentWeekStart = addWeeks(currentWeekStart, 1);
    }
    setWeeklySummary(taskWeeks.sort((a, b) => b.startDate - a.startDate));
  };

  const isChosenDay = (taskDate, chosenDate) =>
    new Date(taskDate).toDateString() === chosenDate.toDateString();

  const filterTasksForChosenDate = (tasks = [], date) => {
    const todayTasks = tasks.filter((task) => isChosenDay(task.date, date));
    setChosenDateTasks(todayTasks);
    dispatch(setChosenDayTasks(todayTasks));
  };

  const renderWeekDays = () => {
    const startOfCurrentWeek = startOfWeek(currentWeek);
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

  const handleSwipeLeft = () => setCurrentWeek(addWeeks(currentWeek, 1));
  const handleSwipeRight = () => setCurrentWeek(subWeeks(currentWeek, 1));

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="p-4">
      <button onClick={() => navigate(`/search/allTasks`)} className="text-gray-400 hover:text-red-500">
        <FiSearch size={18} />
      </button>
      <div {...swipeHandlers} className="flex justify-between items-center mb-4 overflow-hidden">
        {renderWeekDays()}
      </div>

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

      <div className="bg-gray-200 h-2 rounded-full mb-4">
        <div
          className="bg-blue-500 h-2 rounded-full"
          style={{
            width: `${
              (weeklySummary[0]?.completed /
                (weeklySummary[0]?.open + weeklySummary[0]?.completed || 1)) *
              100
            }%`,
          }}
        ></div>
      </div>

      <div className="flex justify-between">
        <h2 className="text-lg font-semibold mb-2">
          Tasks for {format(chosenDate, "dd MMM")}
        </h2>
        <button onClick={() => navigate(`/search/dayTasks`)} className="text-blue-500">
          View All
        </button>
      </div>

      <TaskList tasks={chosenDateTasks} />

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


