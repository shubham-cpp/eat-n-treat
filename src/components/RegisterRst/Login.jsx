import React, { useState } from "react";
import "./registerStyles.css";
import swal from "sweetalert";
import { useAuth } from "../../auth";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
export var user = null;

export const Login = ({ containerRef }) => {
  const { login } = useAuth();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .get("http://localhost:5000/restaurant/email/" + email)
      .then((res) => {
        if (res.data) {
          console.log(res);
          login(email, password)
            .then(() => {
              swal({
                title: "Logged In Successfully !",
                icon: "success",
                buttons: false,
                timer: 2000,
              });

              sessionStorage.setItem("rID", res.data._id);
              history.push("/restaurant/edit/" + res.data._id);
            })
            .catch(function(error) {
              let errorMessage = error.message;
              swal({
                title: "Error!",
                text: errorMessage,
                buttons: false,
                timer: 2000,
                icon: "error",
              });
            });
        } else {
          console.log("No entry");
          swal({
            title: "Not Found!",
            text: "Email address with this restaurant not Found",
            buttons: false,
            timer: 2000,
            icon: "error",
          });
        }
      })
      .catch((err) => console.log("error in login register ", err));
  }

  return (
    <div className="login" ref={containerRef}>
      <div className="login__header">Restraunt Login</div>
      <div className="login__contents">
        <div className="img">
          <img
            src="https://tse3.mm.bing.net/th?id=OIP.JS985O5Qa72tf9p1FucX-QHaE7&pid=1.7&w=306&h=205&c=8&dpr=1.5"
            alt=""
          />
        </div>
        <div className="login__form">
          <div className="login__formGroup">
            <label htmlFor="email">Enter Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="login__formGroup">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
        </div>
      </div>
      <div className="login__footer">
        <button type="button" id="btn" onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
  );
};
