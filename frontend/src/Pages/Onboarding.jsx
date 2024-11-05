// // src/components/WelcomeComponent.js
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { FaHourglassHalf } from "react-icons/fa"; // Import the hourglass icon

// const Onboarding = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="flex flex-col h-screen">
//       {/* Top Section with Background and Pattern */}
//       <div className="relative flex-grow bg-blue-600 flex items-center justify-center h-3/5">
//         {/* Hourglass Icon */}
//         <FaHourglassHalf className="text-white text-6xl opacity-70" />
//       </div>

//       {/* Text Section */}
//       <div className="bg-white py-8 text-center">
//         <h2 className="text-2xl font-bold text-gray-900">Manage What To Do</h2>
//         <p className="text-gray-500 mt-2 text-sm">
//           The best way to manage what you have to do, don’t forget your plans
//         </p>
//       </div>

//       {/* Get Started Button */}
//       <div className="flex justify-center w-full pb-6">
//         <button
//           onClick={() => navigate("/home")}
//           className="w-3/4 py-3 bg-blue-600 text-white font-semibold text-center rounded hover:bg-blue-700 focus:outline-none"
//         >
//           Get Started
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Onboarding;

// // src/components/WelcomeComponent.js
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { FaHourglassHalf } from "react-icons/fa";

// const WelcomeComponent = () => { // Renamed component for consistency
//   const navigate = useNavigate();

//   return (
//     <div className="flex flex-col h-screen">
//       {/* Top Section with Background and Pattern */}
//       <div className="relative flex-grow bg-blue-600 flex items-center justify-center h-1/5">
//         {/* Hourglass Icon */}
//         <FaHourglassHalf className="text-white text-6xl opacity-70" />
//       </div>

//       {/* Text Section */}
//       <div className="bg-white py-8 text-center">
//         <h2 className="text-2xl font-bold text-gray-900">Manage What To Do</h2>
//         <p className="text-gray-500 mt-2 text-sm">
//           The best way to manage what you have to do, don’t forget your plans
//         </p>
//       </div>

//       {/* Get Started Button */}
//       <div className="flex justify-center w-full pb-6">
//         <button
//           onClick={() => navigate("/home")}
//           className="w-3/4 py-3 bg-blue-600 text-white font-semibold text-center rounded hover:bg-blue-700 focus:outline-none"
//         >
//           Get Started
//         </button>
//       </div>
//     </div>
//   );
// };

// export default WelcomeComponent;

// // src/components/WelcomeComponent.js
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { FaHourglassHalf } from "react-icons/fa";

// const WelcomeComponent = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Top Section with Background and Pattern */}
//       <div className="flex-grow h-1/5 bg-blue-600 flex items-center justify-center">
//         {/* Hourglass Icon */}
//         <FaHourglassHalf className="text-white text-6xl opacity-70" />
//       </div>

//       {/* Text Section */}
//       <div className="h-2/5 bg-white flex flex-col justify-center items-center py-8">
//         <h2 className="text-2xl font-bold text-gray-900">Manage What To Do</h2>
//         <p className="text-gray-500 mt-2 text-sm">
//           The best way to manage what you have to do, don’t forget your plans
//         </p>

//         {/* Get Started Button */}
//         <button
//           onClick={() => navigate("/home")}
//           className="mt-6 w-3/4 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 focus:outline-none"
//         >
//           Get Started
//         </button>
//       </div>
//     </div>
//   );
// };

// export default WelcomeComponent;

// src/components/WelcomeComponent.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHourglassHalf } from "react-icons/fa";

const WelcomeComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Section with Background and Pattern */}
      <div className="flex-shrink-0 h-[60vh] bg-blue-600 flex items-center justify-center">
        {/* Hourglass Icon */}
        <FaHourglassHalf className="text-white text-6xl opacity-70" />
      </div>

      {/* Text Section */}
      <div className="flex-grow h-[40vh] bg-white flex flex-col justify-center items-center py-8">
        <h2 className="text-2xl font-bold text-gray-900">Manage What To Do</h2>
        <p className="text-gray-500 mt-2 text-sm">
          The best way to manage what you have to do, don’t forget your plans
        </p>

        {/* Get Started Button */}
        <button
          onClick={() => navigate("/home")}
          className="mt-6 w-3/4 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 focus:outline-none"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default WelcomeComponent;
