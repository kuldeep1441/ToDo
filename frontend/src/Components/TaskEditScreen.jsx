

// import React, { useState } from "react";
// import { updateTask } from "../redux/action";
// import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";
// import { useDispatch } from "react-redux";

// const TaskEditScreen = ({setShowEditTaskForm,initialData = {},setCurrentTask,}) => {
//   const dispatch = useDispatch();
//   const [title, setTitle] = useState(initialData.title || "");
//   const [description, setDescription] = useState(initialData.description || "");

//   // Format date to YYYY-MM-DD if initialData.date is present, otherwise set to today's date
//   const formatDate = (date) => date.toISOString().split("T")[0];
//   const [date, setDate] = useState(
//     initialData.date
//       ? formatDate(new Date(initialData.date))
//       : formatDate(new Date())
//   );

//   // // Set startTime and endTime directly from initialData or use current time if not provided
//   // const [startTime, setStartTime] = useState(
//   //   initialData.startTime || formatTime(new Date())
//   // );
//   // const [endTime, setEndTime] = useState(
//   //   initialData.endTime || formatTime(new Date())
//   // );

//   // Helper function to format time to HH:MM
//   const formatTime = (date) => {
//     const hours = String(date.getHours()).padStart(2, "0");
//     const minutes = String(date.getMinutes()).padStart(2, "0");
//     return `${hours}:${minutes}`;
//   };

//   // Set startTime and endTime to current time
//   const [startTime, setStartTime] = useState(
//     initialData.startTime || formatTime(new Date())
//   );
//   const [endTime, setEndTime] = useState(
//     initialData.endTime || formatTime(new Date())
//   );

//   const [priority, setPriority] = useState(initialData.priority || "Low");
//   const [status, setStatus] = useState(initialData.status || "In Progress");
//   const [error, setError] = useState(""); // Error state for handling submission errors

//   // // Helper function to format time to HH:MM
//   // const formatTime = (date) => {
//   //   const hours = String(date.getHours()).padStart(2, "0");
//   //   const minutes = String(date.getMinutes()).padStart(2, "0");
//   //   return `${hours}:${minutes}`;
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const newTask = {
//         title,
//         description,
//         date,
//         startTime, // Only time is passed
//         endTime, // Only time is passed
//         priority,
//         status,
//       };
//       dispatch(updateTask(newTask));
//       setCurrentTask(newTask);
//       setShowEditTaskForm(false); // Close form after editing task
//     } catch (error) {
//       setError("Failed to edit task. Please try again."); // Display error message
//       console.error("Error editing task:", error);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-md mx-auto"
//     >
//       <div className="flex justify-between items-center">
//         <h2 className="text-lg font-semibold">Edit Task</h2>
//         <button
//           type="button"
//           onClick={() => setShowEditTaskForm(false)}
//           className="text-gray-500 hover:text-gray-700 text-2xl"
//           aria-label="Close"
//         >
//           &times;
//         </button>
//       </div>

//       <div>
//         <label htmlFor="title" className="text-sm font-medium text-gray-600">
//           Task title
//         </label>
//         <input
//           id="title"
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Task title"
//           className="w-full mt-1 p-1 border rounded focus:outline-none focus:border-blue-500"
//           required
//         />
//       </div>

//       <div className="flex justify-between gap-4">
//         <div className="flex-1">
//           <label
//             htmlFor="startTime"
//             className="text-sm font-medium text-gray-600 flex items-center gap-2"
//           >
//             <ClockIcon className="h-4 w-4" />
//             Start
//           </label>
//           <input
//             id="startTime"
//             type="time"
//             value={startTime}
//             onChange={(e) => setStartTime(e.target.value)}
//             className="w-full mt-1 p-1 border rounded focus:outline-none focus:border-blue-500"
//             required
//           />
//         </div>
//         <div className="flex-1">
//           <label
//             htmlFor="endTime"
//             className="text-sm font-medium text-gray-600 flex items-center gap-2"
//           >
//             <ClockIcon className="h-4 w-4" />
//             Ends
//           </label>
//           <input
//             id="endTime"
//             type="time"
//             value={endTime}
//             onChange={(e) => setEndTime(e.target.value)}
//             className="w-full mt-1 p-1 border rounded focus:outline-none focus:border-blue-500"
//             required
//           />
//         </div>
//       </div>

//       <div>
//         <label
//           htmlFor="date"
//           className="text-sm font-medium text-gray-600 flex items-center gap-2"
//         >
//           <CalendarIcon className="h-4 w-4" />
//           Set Date
//         </label>
//         <input
//           id="date"
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           className="w-full mt-1 p-1 border rounded focus:outline-none focus:border-blue-500"
//           required
//         />
//       </div>

//       <div>
//         <label
//           htmlFor="description"
//           className="text-sm font-medium text-gray-600"
//         >
//           Description
//         </label>
//         <textarea
//           id="description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Add Description"
//           className="w-full mt-1 mb-0 p-1 border rounded focus:outline-none focus:border-blue-500"
//           rows="3"
//         />
//       </div>

//       {/* Priority Selection */}
//       <div>
//         <label htmlFor="priority" className="text-sm font-medium text-gray-600">
//           Priority
//         </label>
//         <select
//           id="priority"
//           value={priority}
//           onChange={(e) => setPriority(e.target.value)}
//           className="w-full mt-1 p-1 border rounded focus:outline-none focus:border-blue-500"
//         >
//           <option value="Low">Low</option>
//           <option value="Medium">Medium</option>
//           <option value="High">High</option>
//         </select>
//       </div>

//       {error && <p className="text-red-500 text-sm">{error}</p>}

//       <button
//         type="submit"
//         className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//       >
//         Edit task
//       </button>
//     </form>
//   );
// };

// export default TaskEditScreen;







import React, { useState } from "react";
import { updateTask } from "../redux/action";
import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";

const TaskEditScreen = ({
  setShowEditTaskForm,
  initialData = {},
  setCurrentTask,
}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");

  // Use initialData.date directly if available, else set today's date
  const [date, setDate] = useState(
    initialData.date || new Date().toISOString().split("T")[0]
  );

  // // Use startTime and endTime as strings in HH:MM format
  // const [startTime, setStartTime] = useState(
  //   initialData.startTime ||
  //     new Date().toLocaleTimeString("en-GB", {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     })
  // );
  // const [endTime, setEndTime] = useState(
  //   initialData.endTime ||
  //     new Date().toLocaleTimeString("en-GB", {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     })
  // );
  // Helper function to format time to HH:MM
  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // Set startTime and endTime to current time
  const [startTime, setStartTime] = useState(
    initialData.startTime || formatTime(new Date())
  );
  const [endTime, setEndTime] = useState(
    initialData.endTime || formatTime(new Date())
  );

  const [priority, setPriority] = useState(initialData.priority || "Low");
  const [status, setStatus] = useState(initialData.status || "In Progress");
  const [error, setError] = useState(""); // Error state for handling submission errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedTask = {
        title,
        description,
        date, // Date as string (YYYY-MM-DD)
        startTime, // Start time as string (HH:MM)
        endTime, // End time as string (HH:MM)
        priority,
        status,
      };
      dispatch(updateTask(updatedTask));
      setCurrentTask(updatedTask);
      setShowEditTaskForm(false); // Close form after editing task
    } catch (error) {
      setError("Failed to edit task. Please try again.");
      console.error("Error editing task:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-md mx-auto"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Edit Task</h2>
        <button
          type="button"
          onClick={() => setShowEditTaskForm(false)}
          className="text-gray-500 hover:text-gray-700 text-2xl"
          aria-label="Close"
        >
          &times;
        </button>
      </div>

      <div>
        <label htmlFor="title" className="text-sm font-medium text-gray-600">
          Task title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="w-full mt-1 p-1 border rounded focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      <div className="flex justify-between gap-4">
        <div className="flex-1">
          <label
            htmlFor="startTime"
            className="text-sm font-medium text-gray-600 flex items-center gap-2"
          >
            <ClockIcon className="h-4 w-4" />
            Start
          </label>
          <input
            id="startTime"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full mt-1 p-1 border rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor="endTime"
            className="text-sm font-medium text-gray-600 flex items-center gap-2"
          >
            <ClockIcon className="h-4 w-4" />
            Ends
          </label>
          <input
            id="endTime"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full mt-1 p-1 border rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="date"
          className="text-sm font-medium text-gray-600 flex items-center gap-2"
        >
          <CalendarIcon className="h-4 w-4" />
          Set Date
        </label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full mt-1 p-1 border rounded focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="text-sm font-medium text-gray-600"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add Description"
          className="w-full mt-1 mb-0 p-1 border rounded focus:outline-none focus:border-blue-500"
          rows="3"
        />
      </div>

      {/* Priority Selection */}
      <div>
        <label htmlFor="priority" className="text-sm font-medium text-gray-600">
          Priority
        </label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full mt-1 p-1 border rounded focus:outline-none focus:border-blue-500"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Edit task
      </button>
    </form>
  );
};

export default TaskEditScreen;
