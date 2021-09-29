import * as React from "react";
import { makeStyles } from "@mui/styles";
import { Box, Grid, Typography, Button, Divider, Modal } from "@mui/material";
import { FormGroup } from "react-bootstrap";
import swal from "sweetalert";
import { useAuth } from "../auth";

import "./loginStyle.css";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

// export var user = null;

// function getSessionStorageOrDefault(key, defaultValue) {
//   const stored = sessionStorage.getItem(key);
//   if (!stored) {
//     return defaultValue;
//   }
//   return JSON.parse(stored);
// }

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 425,
  bgcolor: "background.paper",
  border: "1px solid #141414",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
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

export default function BootLogin() {
  const { login } = useAuth();
  const history = useHistory();
  const classes = useStyles();

  const [openLogin, setOpenLogin] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleCloseLogin = () => setOpenLogin(false);
  const handleOpenLogin = () => setOpenLogin((prev) => !prev);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  function handleSubmit(e) {
    e.preventDefault();
    login(email, password)
      .then(function(d) {
        swal({
          title: "Logged In Successfully !",
          icon: "success",
          buttons: false,
          timer: 2000,
        });

        // console.log(" login", d.user.email);
        const email = d.user.email;
        axios.get("http://localhost:5000/customer/" + email).then((res) => {
          sessionStorage.setItem("custId", res.data._id);
        });

        handleCloseLogin();
        // history.push("/");
      })

      .catch(function(error) {
        var errorMessage = error.message;
        swal({
          title: "Error!",
          text: errorMessage,
          buttons: false,
          timer: 2000,
          icon: "error",
        });
      });
  }

  return (
    <div>
      <Button onClick={handleOpenLogin}> Login </Button>
      <Modal
        open={openLogin}
        onClose={handleCloseLogin}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="login-modal-title"
            variant="h5"
            component="h3"
            textAlign="center"
            fontWeight="bold"
          >
            Log In
          </Typography>

          <div id="login-modal-description" className="paperLogin">
            <form className={classes.form}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <FormGroup>
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      className="form-control"
                      name="email"
                      // ref={emailRef}
                      placeholder="Enter Email"
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12}>
                  <FormGroup>
                    <input
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      className="form-control"
                      name="password"
                      // ref={passwordRef}
                      placeholder="Enter Password"
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Log In
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Divider spacing={1}></Divider>
                </Grid>
              </Grid>
            </form>

            <Box
              sx={{
                textAlign: "center",
                textDecoration: "none",
                margin: "0px",
              }}
            >
              <Link href="#" variant="body2" style={{ textDecoration: "none" }}>
                New to EatNTreat?{" "}
                <span style={{ color: "coral", fontSize: "1.1rem" }}>
                  Create Account{" "}
                </span>
              </Link>
            </Box>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
