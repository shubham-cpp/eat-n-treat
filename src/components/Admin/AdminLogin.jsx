import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FormControl, FormGroup, Button } from "react-bootstrap";
import axios from "axios";

import "../loginStyle.css";
// import ProtectedRoute from "./ProtectedRoute";
// import AdminDash from "./AdminDash";

const AdminLogin = (props) => {
  props.disableNavbar(true);

  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validations() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("/admin/auth", { username: username, password: password })
      .then((res) => {
        console.log(res.data);
        props.setAdmin({"adminID": res.data.adminID, "username": res.data.username});
        props.setAuth(true);
        console.log("Here")
        history.push("/adminDashboard")
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="paper paperLogin" style={{ marginTop: "5%" }}>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="username">
          <label>Username</label>
          <FormControl
            autoFocus
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <label>Password</label>
          <FormControl
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block disabled={!validations()} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default AdminLogin;
