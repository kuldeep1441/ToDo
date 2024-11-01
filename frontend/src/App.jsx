

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
  // const [showOnboarding, setShowOnboarding] = useState(false);

  // useEffect(() => {
  //   // Check if onboarding has been shown in this session
  //   const sessionVisited = sessionStorage.getItem("sessionVisited");

  //   if (!sessionVisited) {
  //     // If not, show the onboarding page
  //     setShowOnboarding(true);
  //     sessionStorage.setItem("sessionVisited", "true");
  //   }
  // }, []);

  // const handleOnboardingComplete = () => {
  //   setShowOnboarding(false);
  // };

  return (
    <Router>
      <Routes>
          <Route
            path="/"
            element={<Onboarding />}
          />
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
