import React from "react";

export default function Dish({ dish, btnName, handleFunction }) {
  return (
    <div
      className="card mx-2"
      style={{ width: "20rem", backgroundColor: "#deeaee" }}
    >
      <div className="card-title">{dish.menuName}</div>
      <p className="card-text">
        Rs.{dish.menuPrice} <br />
        <button
          onClick={handleFunction}
          className="btn btn-outline-success float-end m-2"
        >
          {btnName}
        </button>
      </p>
    </div>
  );
}
