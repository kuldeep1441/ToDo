
// // src/components/WelcomeComponent.js
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { FaHourglassHalf } from "react-icons/fa"; // Import the hourglass icon

// const Onboarding = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="flex flex-col h-screen">
//       {/* Top Section with Background and Pattern */}
//       <div className="relative flex-grow bg-blue-600 flex items-center justify-center">
//         {/* Decorative Patterns */}
//         <div
//           className="absolute top-16 left-8 w-20 h-20 opacity-20"
//           style={{
//             backgroundImage: 'url("https://path/to/pattern1.svg")',
//             backgroundSize: "cover",
//           }}
//         ></div>
//         <div
//           className="absolute bottom-16 right-8 w-20 h-20 opacity-20"
//           style={{
//             backgroundImage: 'url("https://path/to/pattern2.svg")',
//             backgroundSize: "cover",
//           }}
//         ></div>

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




// src/components/WelcomeComponent.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHourglassHalf } from "react-icons/fa"; // Import the hourglass icon

const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen">
      {/* Top Section with Background and Pattern */}
      <div className="relative flex-grow bg-blue-600 flex items-center justify-center">
        {/* Decorative Patterns */}
        <div
          className="absolute top-16 left-8 w-20 h-20 opacity-20"
          style={{
            backgroundImage: 'url("https://path/to/pattern1.svg")',
            backgroundSize: "cover",
          }}
        ></div>
        <div
          className="absolute bottom-16 right-8 w-20 h-20 opacity-20"
          style={{
            backgroundImage: 'url("https://path/to/pattern2.svg")',
            backgroundSize: "cover",
          }}
        ></div>

        {/* Hourglass Icon */}
        <FaHourglassHalf className="text-white text-6xl opacity-70" />
      </div>

      {/* Text Section */}
      <div className="bg-white py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Manage What To Do</h2>
        <p className="text-gray-500 mt-2 text-sm">
          The best way to manage what you have to do, don’t forget your plans
        </p>
      </div>

      {/* Get Started Button */}
      <div className="flex justify-center w-full pb-6">
        <button
          onClick={() => navigate("/home")}
          className="w-3/4 py-3 bg-blue-600 text-white font-semibold text-center rounded hover:bg-blue-700 focus:outline-none"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
