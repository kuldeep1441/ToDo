// // import React, { useEffect, useState } from "react";
// // import {
// //   BrowserRouter as Router,
// //   Routes,
// //   Route,
// //   Navigate,
// // } from "react-router-dom";
// // import Home from "./Pages/Home";
// // import TaskList from "./Pages/TaskList";
// // import TaskDetail from "./Pages/TaskDetail";
// // import SearchBar from "./Components/SearchBar";
// // import Onboarding from "./Pages/Onboarding";

// // function App() {
// //   const [isFirstVisit, setIsFirstVisit] = useState(true);

// //   useEffect(() => {
// //     // Check if the user has visited before
// //     const hasVisited = localStorage.getItem("hasVisited");
// //     if (hasVisited) {
// //       setIsFirstVisit(false);
// //     } else {
// //       localStorage.setItem("hasVisited", "true");
// //       setIsFirstVisit(true);
// //     }
// //   }, []);

// //   return (
// //     <Router>
// //       <Routes>
// //         {isFirstVisit ? (
// //           <Route path="/" element={<Onboarding />} />
// //         ) : (
// //           <Route path="/" element={<Navigate to="/home" />} />
// //         )}
// //         <Route path="/home" element={<Home />} />
// //         <Route path="/task/:id" element={<TaskDetail />} />
// //         {/* Uncomment below if you need the SearchBar page */}
// //         {/* <Route path="/search" element={<SearchBar />} /> */}
// //         <Route path="*" element={<Navigate to="/" />} />
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;




// import React, { useEffect, useState } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import Home from "./Pages/Home";
// import TaskList from "./Pages/TaskList";
// import TaskDetail from "./Pages/TaskDetail";
// // import SearchBar from "./Components/SearchBar";
// import Onboarding from "./Pages/Onboarding";

// function App() {
//   const [showOnboarding, setShowOnboarding] = useState(false);

//   useEffect(() => {
//     // Check if the user has visited in this session
//     const sessionVisited = sessionStorage.getItem("sessionVisited");

//     // Check if the user has visited in previous sessions
//     const hasVisitedBefore = localStorage.getItem("hasVisited");

//     // If it's a new session or first-time visit, show the onboarding page
//     if (!sessionVisited && !hasVisitedBefore) {
//       setShowOnboarding(true);
//       localStorage.setItem("hasVisited", "true");
//       sessionStorage.setItem("sessionVisited", "true");
//     }
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         {showOnboarding ? (
//           <Route path="/" element={<Onboarding />} />
//         ) : (
//           <Route path="/" element={<Navigate to="/home" />} />
//         )}
//         <Route path="/home" element={<Home />} />
//         <Route path="/task/:id" element={<TaskDetail />} />
//         {/* Uncomment below if you need the SearchBar page */}
//         {/* <Route path="/search" element={<SearchBar />} /> */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;




import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home";
import TaskList from "./Pages/TaskList";
import TaskDetail from "./Pages/TaskDetail";
import SearchBar from "./Components/SearchBar";
import Onboarding from "./Pages/Onboarding";

function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check if onboarding has been shown in this session
    const sessionVisited = sessionStorage.getItem("sessionVisited");

    if (!sessionVisited) {
      // If not, show the onboarding page
      setShowOnboarding(true);
      sessionStorage.setItem("sessionVisited", "true");
    }
  }, []);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  return (
    <Router>
      <Routes>
        {showOnboarding ? (
          // Show onboarding page and mark it complete after viewing
          <Route
            path="/"
            element={<Onboarding onComplete={handleOnboardingComplete} />}
          />
        ) : (
          // Redirect "/" to home after onboarding is viewed in the session
          <Route path="/" element={<Navigate to="/home" />} />
        )}
        <Route path="/home" element={<Home />} />
        <Route path="/task/:id" element={<TaskDetail />} />
        {/* Uncomment below if you need the SearchBar page */}
        <Route path="/search/:text" element={<SearchBar />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;
