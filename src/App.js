import React from "react";
import "./App.css";
import db from "./db.json";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import TabOne from "./components/TabOne";
import TabTwo from "./components/TabTwo";
import LogIn from "./components/Login";
import Error from "./components/Error";
import RequireAuth from "./components/RequireAuth";
const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="*" element={<Error />} />
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />}>
              <Route path="/tabone" element={<TabOne />} />
              <Route path="/tabtwo" element={<TabTwo />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
