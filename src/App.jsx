import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Options from "./Options";
import Checklist from "./Checklist";
import Feedback from "./Feedback";
import Budget from "./Budget"; 
import Plan from "./Plan";
import { useEffect, useState } from "react";
import axios from "axios";


   


const App = () => {

  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/options" element={<Options />} />
        <Route path="/checklists" element={<Checklist />} />
        <Route path="/feedbacks" element={<Feedback />} />
        <Route path="/budget" element={<Budget />} /> {/* Add Budget route */}
        <Route path="/plan" element={<Plan/>}/>

      </Routes>
    </Router>
  );
};

export default App;
