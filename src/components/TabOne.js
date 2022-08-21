import React, { useEffect, useState } from "react";
import db from "../db.json";
import useAuth from "../hooks/useAuth";

const TabOne = () => {
  const [userChoice, setUserChoice] = useState(
    JSON.parse(localStorage.getItem("userChoice"))
  );

  const [state, setState] = useState(true);
  const [msg, setMsg] = useState("");

  const [vote, setVote] = useState({
    first: "",
    second: "",
    third: "",
  });

  const { auth } = useAuth();
  const { name } = auth;
  const handleChange = (e) => {
    setVote({ ...vote, [e.target.name]: e.target.value });
  };

  const handleVote = (e) => {
    e.preventDefault();
    if (
      vote?.first === vote?.second ||
      vote?.second === vote?.third ||
      vote?.first === vote?.third
    ) {
      setMsg("Please select different dishes for differnt rank");
      return;
    } else if (vote.first && vote.second && vote.third) {
      setUserChoice({ ...userChoice, [auth.name]: vote });
      setMsg("Successfully saved");
    }
  };
  !state && localStorage.setItem("userChoice", JSON.stringify(userChoice));

  const previousChoice = (rank) => {
    return db.find((item) => item.id === parseInt(userChoice?.[name]?.[rank]))
      ?.dishName;
  };

  const initUpdate = () => {
    setVote({
      ...vote,
      first: userChoice?.[name]?.first || "",
      second: userChoice?.[name]?.second || "",
      third: userChoice?.[name]?.third || "",
    });
    setState(false);
  };
  state && initUpdate();

  useEffect(() => {
    setMsg("");
  }, [vote]);

  return (
    <div className="main">
      <div className="left">
        {db.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                padding: "0.5rem 0",
                borderBottom: "1px solid black",
              }}
            >
              <p className="id">{item.id}</p>
              <h2 className="dish-name">{item.dishName}</h2>
              <p className="dish-desc">{item.description}</p>
            </div>
          );
        })}
      </div>

      <div className="right">
        <h1>Welcome {name}</h1>
        <h3>Enter your choice</h3>
        <form onSubmit={handleVote}>
          <span>
            <label>First Choice</label>
            <select name="first" onChange={handleChange} required>
              <option value={vote.first} selected disabled hidden>
                {previousChoice("first") || "Select your first choice"}
              </option>
              {db.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.dishName}
                  </option>
                );
              })}
            </select>
          </span>
          <span>
            <label>Second Choice</label>
            <select name="second" onChange={handleChange} required>
              <option value={vote.second} selected disabled hidden>
                {previousChoice("second") || "Select your second choice"}
              </option>
              {db.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.dishName}
                  </option>
                );
              })}
            </select>
          </span>
          <span>
            <label>Third Choice</label>
            <select name="third" onChange={handleChange} required>
              <option value={vote.third} selected disabled hidden>
                {previousChoice("third") || "Select your third choice"}
              </option>
              {db.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.dishName}
                  </option>
                );
              })}
            </select>
          </span>
          <button type="submit">Save</button>
        </form>
        <p>{msg}</p>
      </div>
    </div>
  );
};

export default TabOne;
