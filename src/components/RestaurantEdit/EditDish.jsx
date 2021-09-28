import React from "react";
import { makeStyles } from "@mui/styles";
import { Box, Grid, Button, Divider, Modal } from "@mui/material";
import { FormGroup } from "react-bootstrap";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 925,
  bgcolor: "background.paper",
  border: "1px solid #141414",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
  justifyContent: "space-between",
};

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: "0 8px",
  },
  input: {
    padding: "10px",
    lineHeight: "normal",
    textAlign: "center",
    "&&:placeholder": { color: "#f00" },
  },
  submit: {},
}));

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
          className="card-text"
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
