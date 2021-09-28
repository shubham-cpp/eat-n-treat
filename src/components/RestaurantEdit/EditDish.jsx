import React from "react";
import { useState } from "react";

export default function EditDish({
  dish,
  btnName,
  handleFunction,
  updateFunction,
  setMenuName,
  setMenuPrice,
}) {
  const [showForm, setShowForm] = useState(false);
  return (
    <form>
      <div className="card mx-2" style={{ width: "20rem" }}>
        {!showForm && <div className="card-title">{dish.menuName}</div>}
        {showForm && (
          <div className="card-title">
            <input
              type="text"
              name="menuName"
              placeholder="Menu Name"
              onChange={(e) => setMenuName(e.target.value)}
            />
          </div>
        )}
        {!showForm && <p className="card-text">Rs.{dish.menuPrice}</p>}
        {showForm && (
          <input
            type="number"
            name="menuPrice"
            placeholder="Menu Price"
            onChange={(e) => setMenuPrice(e.target.value)}
          />
        )}
        <button
          onClick={(e) => {
            updateFunction(e, dish._id);
            setShowForm((prev) => !prev);
          }}
          className="btn btn-outline-success float-top-end m-2"
        >
          {showForm ? "Save" : "Update"}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleFunction();
          }}
          disabled={showForm}
          className="btn btn-outline-success float-end m-2"
        >
          {btnName}
        </button>
      </div>
    </form>
  );
}
