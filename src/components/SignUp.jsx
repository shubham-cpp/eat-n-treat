import React , {useState, useRef} from 'react';
import styled from 'styled-components';
import { makeStyles } from "@mui/styles";
import { MdClose } from 'react-icons/md';
import { Grid, Avatar, TextField, FormControl, Select, Divider, InputLabel, MenuItem, modal} from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import Checkbox from "@mui/material/Checkbox";
import { GoogleLogin } from "react-google-login";


const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display:flex;
  justify-content: conter;
  align-items: center;
`

const SignUpWrapper = styled.div`
  width: 500px;
  height: 550px;

  top: 45%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -40%;
  transform: translate(-45%, -50%);


  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  
  position: relative;
  z-index: 10;
  border-radius: 10px;
`
const SignupImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
`
const SignUpContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1;
  color: #141414;
  height: 100%;

  padding: 0 10px;
  margin: 5px 15px;

  p {
    margin-bottom: 1rem;
  }

  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`;

const CloseSignUpButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;


const ButtonWrapper = styled.button`
  width: 100%;
  margin: 20px 0px;
  padding: 10px 0px;
  border-radius: 6px;
  color: white;
`;

const GoogleButton = styled.button`
  width: 100%;
  margin: 10px 0px 10px 0px;
  padding: 10px 0px;
  background-color: gray;
  color: rgb(156, 156, 156);
  border: 0.5px solid rgb(156, 156, 156);
  border-radius: 8px;
  display: flex;
  align-items: center;
`;

const DividerWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  
  hr {
    width: 100%;
  }
  span {
    position: absolute;
    font-size: 20px;
    top: -10px;
    left: 50%;
    color: rgb(105, 105, 105);
    background: white;
    transform: translateX(-50%);
  }
`;

const LinkWrapper = styled.div`
  padding-top: 10px;
  button {
    border: none;
    background-color: inherit;
    color: rgb(237, 90, 107);
    margin: 0px 15px;
  }
`;


const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  
  },
  formControl: {
    minWidth: 120,
    padding : 0,
    margin: 0,
  },
  form: {
    width: "100%", // Fix IE 11 issue.

  },
  signupNotice: {
    display: "flex",
    alignItems: "start",
    "& div": {
      padding: "5px 0px 0px 0px",
      fontSize: "13px",
      "& span": {
        color: "rgb(237, 90, 107)",
        fontWeight: 450,
      },
    },
  },
}));




export const SignUp = (props) => {

  const classes = useStyles();
  const {
    showSignUp, 
    setShowSignUp,     

  } = props;

  const [acceptNotice, setAcceptNotice] = useState(false);
  const [city, setCity] = useState("");

  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  const defaultState = () => {
    setAcceptNotice(false);
  };

  const handleChange = e => {
    setCity(e.target.value);
  };


  return (
    <>
    { showSignUp ? (
      <Background>
        <SignUpWrapper showSignUp={ showSignUp }>
          <SignUpContent>
          
            <div style={{ padding: "20px 0"}}>
              <h2>Signup</h2>  
              <CloseSignUpButton aria-label="close signup" onClick={ () => {
                setShowSignUp(prev => !prev)
                }} 
              />          
            </div>



        <form className={classes.form} noValidate>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name" 
                  autoFocus size="small"
                />
            </Grid>     
            
            <Grid item xs={12} sm={6}>
              <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname" size="small"
                />
            </Grid>
            <Grid item xs={12}>
              <TextField
                  label="Email" fullWidth required  
                  variant="outlined" id="email"
                  name="email"
                  autoComplete="email" size="small"
                />
            </Grid>
            <Grid item xs={12}>
              <TextField
                  label="Phone" fullWidth required
                  variant="outlined" size="small"

                />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField 
                    label="Address" fullWidth required  
                    variant="outlined" className={classes.textField} size="small"
              /> 
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth >
                  <InputLabel id='city' ref={inputLabel} fullWidth required > City</InputLabel>
                  <Select labelId='city' id='select' 
                  value={city}
                  onChange={handleChange}
                  labelWidth={labelWidth}
                  >
                      <MenuItem value="Pune" selected>Pune</MenuItem>
                      <MenuItem value="Mumbai">Mumbai</MenuItem>
                      <MenuItem value="Nagpur">Nagpur</MenuItem>
                      <MenuItem value="Kolhapur">Kolhapur</MenuItem>
                  </Select>
                </FormControl>
            </Grid>  
              
            <Grid item xs={12}>

            <div className={classes.signupNotice}>
              <div>
                <Checkbox onChange={(e) => setAcceptNotice(e.target.checked)} />                
                  I agree to EatNtreat's <span>Terms of Service</span> and
                  <span> Privacy Policy </span> 
                </div>
              </div>
              <ButtonWrapper
                disabled={acceptNotice === false ? true : false}  
              >
                Create account
              </ButtonWrapper>
            </Grid>
          </Grid>
              
          
            


              
          <DividerWrapper>
            <Divider />
            <span>or</span>
          </DividerWrapper>



          <GoogleButton>
            <Avatar sx={{ width: 24, height: 24, bgcolor: "#000"}}><GoogleIcon /></Avatar>
              <h4 style={{float: "right", flex: 1}}> Continue with Google </h4>  
          </GoogleButton>

          <Grid container spacing={2} justify="flex-start">  
            <Grid item>
              <LinkWrapper>
                Already have an account?{" "}
                <button className={{fontSize: "1.2rem", fontWeight: "bold"}}
                  onClick={() => {
                    defaultState();
                    setShowSignUp(false);
                    
                    // setShowLogin(true);
                  }}
                >
                <h3>  Login </h3>
                </button>
            </LinkWrapper>
            </Grid>
          </Grid>
        </form>

          </SignUpContent>
          
        </SignUpWrapper>
      </Background>
    ) : null }
    </>
  );
};
