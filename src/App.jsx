import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./pages/LoginScreen/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen/RegisterScreen";
import HomeScreen from "./pages/HomeScreen/HomeScreen";
import Web from "./web";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/web" element={<Web />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
