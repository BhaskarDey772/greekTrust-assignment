import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const LogIn = () => {
  const userRef = useRef();
  const errorRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const { checkValidUser, setAuth, auth } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkValidUser()) {
      navigate("/");
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      setErrMsg("Invalid username or password");
    }
  };

  return (
    <div className="login">
      <section>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setAuth({ ...auth, name: e.target.value })}
            value={auth?.name}
            required
          />
          <br />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setAuth({ ...auth, password: e.target.value })}
            value={auth?.password}
            required
            autoComplete="off"
            style={{ marginLeft: "0.8rem" }}
          />
          <br />
          <br />
          <button type="submit">Sign In</button>
        </form>

        <p
          ref={errorRef}
          className={errMsg ? "errmsg" : "offscreen"}
          arial-live="assertive"
        >
          {errMsg}
        </p>
      </section>
    </div>
  );
};

export default LogIn;
