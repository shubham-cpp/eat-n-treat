import React from "react";
import { useHistory } from "react-router-dom";

import Box from "@mui/material/Box";
import { Form, FormGroup } from "react-bootstrap";
import {
  Grid,
  FormControl,
  Typography,
  Button,
  Divider,
  Select,
  InputLabel,
  MenuItem,
  Link,
  Modal,
} from "@mui/material";
import swal from "sweetalert";
import { useAuth } from "../auth";
import "./loginStyle.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  //   height: 600,
  bgcolor: "background.paper",
  border: "1px solid #141414",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

export default function Signup() {
  const { signup } = useAuth();
  const history = useHistory();

  const [openSignup, setOpenSignup] = React.useState(false);
  const [city, setCity] = React.useState("");
  const [labelWidth] = React.useState(0);
  const [fname, setFname] = React.useState("");
  const [lname, setLname] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const inputLabel = React.useRef("");

  const handleOpenSignup = () => setOpenSignup(true);
  const handleCloseSignup = () => setOpenSignup(false);

  const handleChange = (e) => setCity(e.target.value);
  const handleFnameChange = (e) => setFname(e.target.value);
  const handleLnameChange = (e) =>setLname(e.target.value);
  const handlePhoneChange = (e) =>setPhone(e.target.value);
  const handleAddressChange = (e) =>setAddress(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e1) => {
    var regExpPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    var regExpPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})$/;
    e1.preventDefault();
    if(fname===""){
      swal({
        title: "Enter the first name!",
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }
    else if(lname===""){
      swal({
        title: "Enter the last name!",
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }
    else if(phone===""||!phone.match(regExpPhone)){
      swal({
        title: "Enter correct 10 digit phone number!",
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }
    else if(address===""){
      swal({
        title: "Enter the address!",
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }
    else if(password===""||!password.match(regExpPassword)){
      swal({
        title: "Wrong password syntax!",
        text: "The password must contain at least 1 lowercase alphabet, at least 1 uppercase alphabet, at least 1 number, at least 1 special character and must be 6 characters or longer.",
        icon: "error",
        buttons: false,
        timer: 12000,
      })
    }
    else{
      signup(email, password)
      .then(() => {
        swal({
          title: "Signed Up Successfully !",
          icon: "success",
          buttons: false,
          timer: 2000,
        });

        console.log("Signup ");
        handleCloseSignup();
        history.push("/");
      })
      .catch((error) => {
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
  };

  return (
    <div>
      <Button onClick={handleOpenSignup}> Signup </Button>
      <Modal
        open={openSignup}
        onClose={handleCloseSignup}
        aria-labelledby="signup-modal-title"
        aria-describedby="signup-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="signup-modal-title"
            variant="h5"
            component="h3"
            textAlign="center"
            fontWeight="bold"
          >
            Sign Up
          </Typography>

          <div id="signup-modal-description" className="paper">
            {/* <form  className={classes.form}> */}

            <Form name="Signup">
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <FormGroup>
                    <input
                      //value={this.state.firstName} onBlur={handleFirstNameChange}
                      className="form-control"
                      name="firstname"
                      onChange = {handleFnameChange}
                      placeholder="First Name  *"
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormGroup>
                    <input
                      // value={this.state.lastName} onChange={this.handleLastNameChange}
                      className="form-control"
                      name="lastname"
                      onChange={handleLnameChange}
                      placeholder="Last Name  *"
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12}>
                  <FormGroup>
                    <input
                      type="number"
                      // value={this.state.email} onChange={this.handlePhoneChange}
                      className="form-control"
                      onChange={handlePhoneChange}
                      name="phone"
                      placeholder="Phone  *"
                    />
                  </FormGroup>
                </Grid>

                <Grid item xs={12}>
                  <FormGroup>
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      className="form-control"
                      // ref={emailRef}
                      name="email"
                      placeholder="Email  *"
                      required
                    />
                  </FormGroup>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormGroup>
                    <input
                      // value={this.state.email} onChange={this.handleAddChange}
                      className="form-control"
                      name="address"
                      onChange={handleAddressChange}
                      placeholder="Address  *"
                    />
                  </FormGroup>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="city" ref={inputLabel} fullWidth required>
                      {" "}
                      City
                    </InputLabel>
                    <Select
                      labelId="city"
                      id="select"
                      value={city}
                      onChange={handleChange}
                      labelWidth={labelWidth}
                    >
                      <MenuItem value="Pune">Pune</MenuItem>
                      <MenuItem value="Mumbai">Mumbai</MenuItem>
                      <MenuItem value="Nagpur">Nagpur</MenuItem>
                      <MenuItem value="Nagpur">Goa</MenuItem>
                      <MenuItem value="Kolhapur">Kolhapur</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormGroup>
                    <input
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      className="form-control"
                      // ref = {passwordRef}
                      name="password"
                      placeholder="Password * "
                      required
                    />
                  </FormGroup>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    input
                    type="submit"
                    fullWidth
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"

                    // className={classes.submit}
                  >
                    Create account
                  </Button>
                </Grid>

                <Grid item xs={12} xm={10}>
                  <Divider spacing={2} />
                  <Box
                    sx={{
                      textAlign: "center",
                      textDecoration: "none",
                      margin: "0px",
                    }}
                  >
                    <Link
                      href="#"
                      variant="body2"
                      style={{ textDecoration: "none" }}
                    >
                      Already have an account?{" "}
                      <span style={{ color: "coral", fontSize: "1.1rem" }}>
                        {" "}
                        Login{" "}
                      </span>
                    </Link>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
