import React from "react";

export default function Dish({ dish, addToCart }) {
  return (
    <div className="card mx-2" style={{ width: "20rem" }}>
      <div className="card-title">{dish.menuName}</div>
      <p className="card-text">
        Rs.{dish.menuPrice} <br />
        <button
          onClick={() => addToCart(dish)}
          className="btn btn-outline-success float-end m-2"
        >
          Add
        </button>
      </p>
    </div>
  );
}
