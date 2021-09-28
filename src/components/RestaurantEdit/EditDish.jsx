import React from "react";
import { makeStyles } from "@mui/styles";
import { Box, Grid, Button, Divider, Modal } from "@mui/material";
import { FormGroup } from "react-bootstrap";

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
  openRestaurantUpdate,
  handleCloseRestaurantUpdate,
  handleOpenRestaurantUpdate,
  setMenuName,
  setMenuPrice,
}) {
  const classes = useStyles();

  return (
    <>
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
            onClick={handleOpenRestaurantUpdate}
            className="btn btn-outline-success float-top-end m-2"
          >
            Update
          </button>
        </p>
      </div>

      <Modal
        open={openRestaurantUpdate}
        onClose={handleCloseRestaurantUpdate}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
      >
        <Box sx={style}>
          <div className="paperLogin">
            <h6>Edit Restaurant Details</h6>
            <div
              className="container"
              style={{ overflow: "scroll", maxHeight: "300px" }}
            >
              {/* Make axios request instead of form action */}
              {/* Create Function to do this */}
              <form className={classes.form} onSubmit={updateFunction}>
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
