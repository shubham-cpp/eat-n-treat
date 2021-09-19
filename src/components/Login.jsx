import React from 'react';
import styled from 'styled-components';
import { makeStyles } from "@mui/styles";
import { MdClose } from 'react-icons/md';
import { Grid, Avatar, Typography, Button, TextField, Link, colors, modal} from "@mui/material";
import { createTheme, } from '@mui/material/styles'


const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display:flex;
  justify-content: conter;
  align-items: center;
`

const LoginWrapper = styled.div`
  width: 500px;
  height: 450px;

  top: 40%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -40%;
  transform: translate(-50%, -50%);

  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  //background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(157,157,190,1) 35%, rgba(0,212,255,1) 100%);
  
  position: relative;
  z-index: 10;
  border-radius: 10px;
`
const LoginImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
`
const LoginContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.5;
  color: #141414;

  padding: 20px;
  margin: 20px 30px;

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

const CloseLoginButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
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


const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6"
    },
    secondary: {
      main: "#19857b"
    },
    error: {
      main: colors.red.A400
    },
    background: {
      default: "#fff"
    }
  },
  Typography: {
    body1: {
      FontFamily: "Comic Sans"
    }
  },

});

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "30px",
    padding: "10px 0px", 
    borderRadius: "6px", 
    fontSize: "16px", 
    textTransform: "none", 
      "&:hover": { background: "#efe", }, 
  },
  avatar: {
    margin: "0 8px"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    
  },
  submit: {
    
  }
}));





export const Login = ({ showLogin, setShowLogin}) => {

  const classes = useStyles();

  return (
    <>
    { showLogin ? (
      <Background>
        <LoginWrapper showLogin={ showLogin }>
          <LoginContent>
            

        <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h4" >
          Log In
        </Typography>

        </div>

        <div>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>

            <Grid item xs={12}>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Log In
              </Button>
            </Grid>
           
          </Grid>

          <div style={{ height: "20px"}}></div>

          <Grid container spacing={2}>
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account?   <span style={{color: "coral"}}>Create Account </span>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      

        



          </LoginContent>
          <CloseLoginButton aria-label="close login" onClick={ () => setShowLogin(prev => !prev)} />
        </LoginWrapper>
      </Background>
    ) : null }
    </>
  );
};
