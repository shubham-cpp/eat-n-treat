import React from "react";

export default function EditDish({
  dish,
  btnName,
  handleFunction,
  updateFunction,
}) {
  return (
    <div className="card mx-2" style={{ width: "20rem" }}>
      <div className="card-title">{dish.menuName}</div>
      <p className="card-text">
        Rs.{dish.menuPrice} <br />
        <button
          onClick={handleFunction}
          className="btn btn-outline-success float-end m-2"
        >
          {btnName}
        </button>
        <button
          onClick={updateFunction}
          className="btn btn-outline-success float-top-end m-2"
        >
          Update
        </button>
      </p>
    </div>
  );
}
