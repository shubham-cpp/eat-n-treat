import React, { useState } from "react";
import firebase from "firebase";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormControl,
} from "@mui/material";
import { useHistory } from "react-router-dom";

import swal from "sweetalert";
import { useAuth } from "../../auth";
import axios from "axios";

export const Register = () => {
  const { signup, logout } = useAuth();
  const history = useHistory();

  const [city, setCity] = React.useState("");
  const [labelWidth] = React.useState(0);
  const [rname, setRname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [cuisines, setCuisines] = useState("");
  const [image, setImage] = React.useState(null);

  const inputLabel = React.useRef("");
  const storageRef = firebase.storage().ref();
  var downloadURL = "";

  const handleRnameChange = (e) => setRname(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleCityChange = (e) => setCity(e.target.value);

  const handleCuisinesChange = (e) => {
    // var cusine = cuisines.slice();
    // cusine[index] = e.target.value;
    setCuisines(e.target.value);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let image = e.target.files[0];
      //setImg(URL.createObjectURL(image));
    }
  };

  const handleSubmit = (e1) => {
    var regExpPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    var regExpPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    e1.preventDefault();
    if (rname === "") {
      swal({
        title: "Enter the restaurant name!",
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    } else if (phone === "" || !phone.match(regExpPhone)) {
      swal({
        title: "Enter correct 10 digit phone number!",
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    } else if (cuisines === "") {
      swal({
        title: "Enter the Cusines separating with spaces!",
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    } else if (password === "" || !password.match(regExpPassword)) {
      swal({
        title: "Wrong password syntax!",
        text:
          "The password must contain at least 1 lowercase alphabet, at least 1 uppercase alphabet, at least 1 number and must be 6 characters or longer.",
        icon: "error",
        buttons: false,
        timer: 12000,
      });
    } else {
      console.log("Endpoint");
      var file = document.getElementById("files").files[0];
      var uploadTask = storageRef.child("restaurants/" + file.name).put(file);
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          //var progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes))*100;
          //this.setState({progress});
        },
        (error) => {
          throw error;
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            // downloadURL = url;
            setImage(url);
            console.log(url);
            const data = {
              restaurantName: rname,
              restaurantPhone: phone,
              restaurantEmail: email,
              cuisine: cuisines.trim().split(","),
              rCity: city,
              path: image,
            };

            axios
              .post("http://localhost:5000/restaurant", data, {
                headers: {
                  "Content-Type": "application/json",
                },
              })
              .then((res) => {
                signup(email, password)
                  .then(() => {
                    swal({
                      title:
                        "Registration Request Send Successfully! Please wait till your request is accepted to continue.",
                      icon: "success",
                      buttons: false,
                      timer: 5000,
                    });

                    sessionStorage.setItem("rID", res.data._id);
                    history.push("/restaurant/edit/" + res.data._id);
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
              })
              .catch((err) => console.log(err));
            // logout();
          });
        }
      );
    }
  };

  const [err, setErr] = useState([]);
  const [loading, setLoading] = useState(false);
  // const DisplayErrors = () =>
  // err.map((error, i) => <p key={i}>{error?.message}</p>);

  return (
    <div className="register">
      <div className="register__header">Register</div>
      <div className="register__contents">
        <div className="img">
          <img
            src="https://tse3.mm.bing.net/th?id=OIP.JS985O5Qa72tf9p1FucX-QHaE7&pid=1.7&w=306&h=205&c=8&dpr=1.5"
            alt=""
          />
        </div>
        <div className="register__form">
          <div className="register__formGroup">
            <input
              type="text"
              name="restaurantname"
              placeholder="Restaurant Name"
              value={rname}
              onChange={handleRnameChange}
            />
          </div>
          <div className="register__formGroup">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="register__formGroup">
            <input
              type="text"
              name="phone"
              placeholder="Contact Number"
              value={phone}
              onChange={handlePhoneChange}
            />
          </div>
          <div className="register__formGroup">
            <input
              type="text"
              name="cuisines"
              placeholder="Cuisines"
              value={cuisines}
              onChange={handleCuisinesChange}
            />
          </div>
          <div className="register__formGroup">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="register__formGroup">
            {/* {image && (<div>
              <img alt="not fount" width={"250px"} src={image} />
              <button onClick={()=>setImg(null)}>Remove</button>  </div>
            )} */}

            {/* <label htmlFor="myImage">Select Image</label> */}

            <input
              type="file"
              accept=".jpg, .png, .jpeg, .svg|image/*"
              id="files"
              name="files[]"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div style={{ padding: "10px 0" }}>
          <FormControl className="register__formGroup" fullWidth size="small">
            <InputLabel id="city" ref={inputLabel} required>
              {" "}
              City
            </InputLabel>
            <Select
              labelId="city"
              id="select"
              value={city}
              onChange={handleCityChange}
              labelWidth={labelWidth}
            >
              <MenuItem value="Pune">Pune</MenuItem>
              <MenuItem value="Mumbai">Mumbai</MenuItem>
              <MenuItem value="Nagpur">Nagpur</MenuItem>
              <MenuItem value="Goa">Goa</MenuItem>
              <MenuItem value="Kolhapur">Kolhapur</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="register__footer">
        <Button
          disabled={loading}
          type="button"
          id="btn"
          className={loading ? "loading" : ""}
          onClick={handleSubmit}
        >
          Register
        </Button>
      </div>

      {err.length > 0 && (
        <div className="error">
          <h3>Error</h3>
          {/* <DisplayErrors /> */}
        </div>
      )}
    </div>
  );
};
