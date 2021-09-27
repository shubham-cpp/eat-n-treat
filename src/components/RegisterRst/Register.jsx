import React, { useState } from 'react';
// import firebase from '../../firebase';
import { Grid, InputLabel, Select, MenuItem, Button, FormControl} from '@mui/material';
import { useHistory } from "react-router-dom";

import swal from "sweetalert";
import { useAuth } from "../../auth";
import axios from 'axios';

export const Register = () => {

    const { register } = useAuth();
    const history = useHistory();

    const [city, setCity] = React.useState("");
    const [labelWidth] = React.useState(0);
    const [rname, setRname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [cusines, setCusines] = useState([]);
    const [image, setImg] = React.useState(null);

    const inputLabel = React.useRef("");

    const handleChange = (e) => setCity(e.target.value);
    const handleRnameChange = (e) => setRname(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePhoneChange = (e) => setPhone(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleCityChange = (e) => setCity(e.target.value);

    const handleImageChange = (e) => {
      if (e.target.files && e.target.files[0]) {
        let image = e.target.files[0];
          setImg(URL.createObjectURL(image))
      }
      
    }

    // const handleSubmit = (e1) = {};

  const [err, setErr] = useState([]);
  const [loading, setLoading] = useState(false);
  // const DisplayErrors = () =>
  // err.map((error, i) => <p key={i}>{error?.message}</p>);

  return (
    <div className="register">
      <div className="register__header">Register</div>
      <div className="register__contents">
        <div className="img">
          <img src="https://tse3.mm.bing.net/th?id=OIP.JS985O5Qa72tf9p1FucX-QHaE7&pid=1.7&w=306&h=205&c=8&dpr=1.5" alt="" />
        </div>
        <div className="register__form">
        
          
          <div className="register__formGroup">
            <input
              type="text"
              name="restaurantname"
              placeholder="Restaurant Name"
              // value={rname} onChange={handleInput}
            />
          </div>
          <div className="register__formGroup">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
            //   onChange={handleInput}
            />
          </div>
          <div className="register__formGroup">
            <input
              type="text"
              name="phone"
              placeholder="Contact Number"
              // value={phone}
            //   onChange={handleInput}
            />
          </div>
          <div className="register__formGroup">
            <input
              type="text"
              name="cusines"
              placeholder="Cusines"
              // value={phone}
            //   onChange={handleInput}
            />
          </div>
          <div className="register__formGroup">
          
            <input
              type="password"
              name="password"
              placeholder="Password"
              // value={password}
            //   onChange={handleInput}
            />
          </div>
          
          
        <div className="register__formGroup" >
          
            {/* {image && (<div>
              <img alt="not fount" width={"250px"} src={image} />
              <button onClick={()=>setImg(null)}>Remove</button>  </div>
            )} */}

            {/* <label htmlFor="myImage">Select Image</label> */}
            
            <input type="file" name="myImage" onChange={handleImageChange} />
           
        </div>
          
        </div>
        
        <div style={{padding: '10px 0'}}>
          <FormControl className="register__formGroup"fullWidth size="small">
          <InputLabel id="city" ref={inputLabel}  required>
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
                      <MenuItem value="Nagpur">Goa</MenuItem>
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
          className={loading ? 'loading' : ''}
        //   onClick={handleSubmit}
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
