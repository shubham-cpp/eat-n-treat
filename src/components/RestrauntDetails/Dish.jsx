import React from "react";

export default function Dish({ dish, addToCart }) {
  return (
    <div className="card mx-2" style={{ width: "20rem" }}>
      <div className="card-title">{dish.dishName}</div>
      <p className="card-text">
        Rs.{dish.price} <br />
        Qty: <input
          style={{ width: "5rem" }}
          type="number"
          name="quantity"
        />{" "}
        <br />
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
