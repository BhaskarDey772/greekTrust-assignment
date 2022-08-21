import React from "react";
import db from "../db.json";
import useAuth from "../hooks/useAuth";
const TabTwo = () => {
  const userChoice = JSON.parse(localStorage.getItem("userChoice"));
  const newArr = [];
  const { auth } = useAuth();
  const { name } = auth;

  userChoice &&
    Object.keys(userChoice).forEach((key) => {
      newArr.push(userChoice[key]);
    });

  let arr = [];
  arr = db.map((item, index) => {
    let rank = 0;
    newArr.map((itm, indx) => {
      if (item.id === parseInt(itm.first)) {
        rank = rank + 30 || 30;
      } else if (item.id === parseInt(itm.second)) {
        rank = rank + 20 || 20;
      } else if (item.id === parseInt(itm.third)) {
        rank = rank + 10 || 10;
      }
    });
    return { ...item, rank };
  });
  const sortedDishes = arr.sort((a, b) => b.rank - a.rank);
  const userChoiceFirstDishes =
    db.filter((item) => item.id === parseInt(userChoice?.[name]?.first)) || [];
  const userChoiceSecondDishes =
    db.filter((item) => item.id === parseInt(userChoice?.[name]?.second)) || [];
  const userChoiceThirdDishes =
    db.filter((item) => item.id === parseInt(userChoice?.[name]?.third)) || [];
  const userChoiceDishes = [
    ...userChoiceFirstDishes,
    ...userChoiceSecondDishes,
    ...userChoiceThirdDishes,
  ];
  return (
    <div className="main">
      <div className="left">
        <h1>Overall Rank</h1>
        {sortedDishes.map((item, index) => {
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
              <p className="id">ID: {item.id}</p>
              <p>SCORE: {item?.rank}</p>
              <h2 className="dish-name">NAME: {item.dishName}</h2>
              <p className="dish-desc">DESC: {item.description}</p>
            </div>
          );
        })}
      </div>
      <div className="right">
        <h1>Welcome {name}</h1>
        <h3>Your Choice</h3>
        {userChoiceDishes.map((item, index) => (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <p className="id">ID: {item.id}</p>
            <h2 className="dish-name">NAME: {item.dishName}</h2>
            <p className="dish-desc">DESC: {item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabTwo;
