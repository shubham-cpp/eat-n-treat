import React, {useState} from 'react';
import styled from 'styled-components';
import { SignUp } from './SignUp';
import { GlobalStyle } from '../globalStyles';
import { Login } from './Login';


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Button = styled.button`
  min-width: 100px;
  padding: 16px 32px;
  border-radius: 4px;
  border: none;
  background: #141414
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  margin: 0 10px;
`

function Landing() {
 const [showSignUp, setShowSignUp] = useState(false);
 const [showLogin, setShowLogin] = useState(false);

 const openSignUp = () => {
   setShowSignUp(prev => !prev)
 };

 const openLogin = () => {
   setShowLogin(prev => !prev)
 };

  return (
    
      <Container>

      <Button onClick={ openLogin }>Log in</Button>
      <Login showLogin={ showLogin } setShowLogin={setShowLogin} />


      <Button onClick={ openSignUp }>Sign Up</Button>
      <SignUp showSignUp={ showSignUp } setShowSignUp={setShowSignUp} />

        <GlobalStyle />

        
      </Container>
    
  );
}


export default Landing;
