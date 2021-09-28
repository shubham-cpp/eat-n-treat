import React, { useState } from "react";
import { useParams } from "react-router";
import { makeStyles } from "@mui/styles";
import { Box, Grid, Button, Divider, Modal } from "@mui/material";
import { FormGroup } from "react-bootstrap";

import Dish from "../RestrauntDetails/Dish";
import axios from "axios";

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

export default function EditRestaurant(props) {
  const { id } = useParams();
  const classes = useStyles();
  // const history = useHistory();

  const [openLogin, setOpenLogin] = React.useState(false);
  const [menuName, setMenuName] = useState("");
  const [menuPrice, setMenuPrice] = useState(0);

  const handleCloseLogin = () => setOpenLogin(false);
  const handleOpenLogin = () => setOpenLogin((prev) => !prev);

  const restaurant = props.data.find((r) => r._id === String(id));

  const handleDelete = (rid, mid) => {
    const url = `http://localhost:5000/restaurant/menu/${rid}/${mid}`;

    axios
      .delete(url)
      .then((res) => console.log("Record Deleted ", res))
      .catch((err) => console.log("Unable to delete record ", err.message));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = `http://localhost:5000/restaurant/menu/${id}`;
    const data = { menuName, menuPrice };

    axios
      .post(url, data)
      .then(() => {
        handleCloseLogin();
      })
      .catch((err) => console.log("Some error occured ", err));
  };

  return (
    <>
      <div className="container" style={{ marginTop: "5rem" }}>
        <h3 className="text-center">{restaurant.restaurantName}</h3>
        <p>Location: {restaurant.rCity}</p>
        <p>Rating: {restaurant.rating}</p>
        <p>
          Cuisines :{" "}
          {restaurant.cuisine.map((item) => (
            <span>{item};</span>
          ))}
        </p>
        <h4>Order</h4>
        <button onClick={handleOpenLogin}>
          <span class="material-icons">add</span>
        </button>
        <div className="dishes">
          {restaurant.menus.map((dish) => {
            return (
              <Dish
                dish={dish}
                key={dish._id}
                handleFunction={() => handleDelete(id, dish._id)}
                btnName="Delete"
              />
            );
          })}
        </div>
      </div>

      <Modal
        open={openLogin}
        onClose={handleCloseLogin}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
      >
        <Box sx={style}>
          <div className="paperLogin">
            <h6>Add Menu Item</h6>
            <div
              className="container"
              style={{ overflow: "scroll", maxHeight: "300px" }}
            >
              {/* Make axios request instead of form action */}
              {/* Create Function to do this */}
              <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <FormGroup>
                      <input
                        type="text"
                        className="form-control"
                        name="menuName"
                        placeholder="Menu Name"
                        onChange={(e) => setMenuName(e.target.value)}
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12}>
                    <FormGroup>
                      <input
                        type="number"
                        className="form-control"
                        name="menuPrice"
                        placeholder="Menu Price"
                        onChange={(e) => setMenuPrice(e.target.value)}
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      // onClick={handleSubmit}
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Submit
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider spacing={1}></Divider>
                  </Grid>
                </Grid>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
