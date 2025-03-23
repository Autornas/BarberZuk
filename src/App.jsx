import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./pages/LoginScreen/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen/RegisterScreen";
import Web from "./web";
import About from "./pages/AboutScreen/About";
import Contact from "./pages/ContactScreen/ContactScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Web />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/web" element={<Web />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
