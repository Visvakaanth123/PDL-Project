import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./Signin"; 
import Signup from "./Signup"; 
import Home from "./Home";
function App() {
  return (
    <Router>
      <div>
        
        <Routes>
          <Route path="/signin" element={<Signin />} />  
          <Route path="/signup" element={<Signup />} /> 
          <Route path="/home" element={<Home />} /> 
          <Route path="/" element={<Signin />} />  
        </Routes>
      </div>
    </Router>
  );
}

export default App;
