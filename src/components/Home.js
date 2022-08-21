import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const Home = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth({});
    navigate("/login");
  };
  return (
    <div className="home">
      <div className="tab">
        <Link to="/tabone" className="tabone">
          TabOne
        </Link>
        <Link to="/tabtwo" className="tabtwo">
          TabTwo
        </Link>
        <button
          className="tabButton"
          onClick={handleLogout}
          style={{ width: "fit-content" }}
        >
          Logout
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
