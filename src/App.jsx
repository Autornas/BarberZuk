import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from "./pages/LoginScreen/LoginScreen.jsx";
import RegisterScreen from "./pages/RegisterScreen/RegisterScreen.jsx";
import Web from "./web.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/web" element={<Web />} />
        <Route path="/" element={<RegisterScreen />} />
      </Routes>
    </Router>
  );
}

export default App;