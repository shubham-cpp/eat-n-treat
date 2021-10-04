import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { makeStyles } from "@mui/styles";
import { Box, Grid, Button, Divider, Modal } from "@mui/material";
import { FormGroup } from "react-bootstrap";
import axios from "axios";

import EditDish from "./EditDish";

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

export default function EditRestaurant({ data }) {
  const { id } = useParams();
  const classes = useStyles();

  const [restaurant, setRestaurant] = useState();
  useEffect(() => {
    axios
      .get(`/restaurant/${id}`)
      .then((res) => setRestaurant(res.data))
      .catch((err) => console.log("Error in edit restaurant ", err));
  }, [id]);
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openRestaurantUpdate, setOpenRestaurantUpdate] = useState(false);
  const [menuName, setMenuName] = useState("");
  const [menuPrice, setMenuPrice] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantNumber, setRestaurantNumber] = useState(0);
  const [restaurantEmail, setRestaurantEmail] = useState("");

  // This is for add item to menu pop up
  const handleCloseLogin = () => setOpenLogin(false);
  const handleOpenLogin = () => setOpenLogin((prev) => !prev);

  // This is for restaurant pop up
  const handleCloseRestaurantUpdate = () => setOpenRestaurantUpdate(false);
  const handleOpenRestaurantUpdate = () =>
    setOpenRestaurantUpdate((prev) => !prev);

  // This is for update item popup
  const handleOpenPopup = () => setOpenPopup((prev) => !prev);
  const handleClosePopup = () => setOpenPopup(false);

  /**
   * Delete item from menu
   * Will send a delete request to server using @rid and @mid
   * @param {string} rid Restaurant Id
   * @param {string} mid Menu id
   */
  const handleDelete = (rid, mid) => {
    const url = `http://localhost:5000/restaurant/menu/${rid}/${mid}`;

    axios
      .delete(url)
      .then((res) => setRestaurant(res.data))
      .catch((err) => console.log("Unable to delete record ", err.message));
  };

  /**
   * Will add the item to menu by
   * Sending post request
   * @param {event} e Event Object
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    const url = `http://localhost:5000/restaurant/menu/${id}`;
    const data = { menuName, menuPrice };

    axios
      .post(url, data)
      .then((res) => {
        handleCloseLogin();
        setRestaurant(res.data);
      })
      .catch((err) => console.log("Some error occured ", err));
  };

  /**
   * Update item from menu
   * @param {event} e Event Object
   * @param {string} mid Menu id
   */
  const handleUpdate = (e, mid) => {
    e.preventDefault();
    const url = `http://localhost:5000/restaurant/menu/${mid}`;
    const data = { menuName, menuPrice };

    // console.log(data);
    // console.log(mid);
    axios
      .patch(url, data)
      .then((res) => {
        // handleClosePopup();
        setRestaurant(res.data);
      })
      .catch((err) => console.log("Some error occured ", err));
  };

  /**
   * Send a patch request to update restaurant details
   * @param {event} e Event Object
   */
  const handleRestaurantUpdate = (e) => {
    e.preventDefault();
    const url = `http://localhost:5000/restaurant/${id}`;
    const data = { restaurantName, restaurantNumber, restaurantEmail };
    axios
      .patch(url, data)
      .then((res) => {
        handleCloseRestaurantUpdate();
        setRestaurant(res.data);
      })
      .catch((err) => console.log("Some error occured ", err));
  };
  return (
    <>
      {restaurant && (
        <div
          className="container"
          style={{
            marginTop: "5rem",
            backgroundColor: "white",
            padding: "2px 15px",
          }}
        >
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
            <span className="material-icons md-18">add</span>
          </button>
          <button onClick={handleOpenRestaurantUpdate}>
            <span className="material-icons md-18">edit</span>
          </button>
          <div className="dishes">
            {restaurant.menus.map((dish) => {
              return (
                <div>
                  <EditDish
                    dish={dish}
                    key={dish._id}
                    btnName="Delete"
                    handleFunction={() => handleDelete(id, dish._id)}
                    updateFunction={handleUpdate}
                    // updateFunction={(e) => handleUpdate(e, dish._id)}
                    setMenuName={setMenuName}
                    setMenuPrice={setMenuPrice}
                    openPopup={openPopup}
                    handleOpenPopup={handleOpenPopup}
                    handleClosePopup={handleClosePopup}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

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

      <Modal
        open={openRestaurantUpdate}
        onClose={handleCloseRestaurantUpdate}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
      >
        <Box sx={style}>
          <div className="paperLogin">
            <h6>Update Restaurant Details</h6>
            <div
              className="container"
              style={{ overflow: "scroll", maxHeight: "300px" }}
            >
              {/* Make axios request instead of form action */}
              {/* Create Function to do this */}
              <form
                className={classes.form}
                onSubmit={(e) => handleRestaurantUpdate(e)}
              >
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <FormGroup>
                      <input
                        type="text"
                        className="form-control"
                        name="restaurantName"
                        placeholder="Restaurant Name"
                        onChange={(e) => setRestaurantName(e.target.value)}
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12}>
                    <FormGroup>
                      <input
                        type="email"
                        className="form-control"
                        name="restaurantEmail"
                        placeholder="Restaurant Email"
                        onChange={(e) => setRestaurantEmail(e.target.value)}
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12}>
                    <FormGroup>
                      <input
                        type="number"
                        className="form-control"
                        name="restaurantPhone"
                        placeholder="Restaurant Phone Number"
                        onChange={(e) => setRestaurantNumber(e.target.value)}
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
