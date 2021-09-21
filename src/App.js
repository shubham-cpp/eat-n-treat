// // import "bootstrap/dist/css/bootstrap.min.css";
// // import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import React, {useState} from 'react';
// // import Modal from "react-responsive-modal";

// // import Restaurants from "./assets/data.json";
// // import RestaurantList from "./components/RestaurantsList";
// // import RestrauntDetails from "./components/RestrauntDetails";

// // import { SignUp } from './components/SignUp';
// // import { Login } from './components/Login';
// import { Log } from './components/log';

// // import { dividerClasses } from "@mui/material";
// import ModelLogin from './components/ModelLogin'
// import BootLogin from './components/BootLogin'

// import ModelSignUp from './components/ModelSignUp'
// import BootSignup from './components/BootSignup'

<<<<<<< HEAD
=======
import Restaurants from "./assets/data.json";
import RestaurantList from "./components/RestaurantsList";
import { Main as RestDetails } from "./components/RestrauntDetails/Main";
>>>>>>> 2eaa9dba41579af6d4fbfdaa3ad20f26e8dd3a7a

function App() {

//   const [showSignUp, setShowSignUp] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);

//   const openSignUp = () => {
//     setShowSignUp(prev => !prev)
//   };

//  const openLogin = () => {
//    setShowLogin(prev => !prev)
//  };


  return (
    <div id="app">
      {/* <Router>
        <Switch>
          <Route path="/" exact>
            <RestaurantList restaurants={Restaurants} />
          </Route>
          <Route path="/restaurant/:id" component={RestDetails} />
        </Switch>
      </Router> */}
      
    
      {/* <div class="loginButtonContainer">

        <button className="loginButton" onClick={ openLogin }>Log in</button>
        <Login showLogin={ showLogin } setShowLogin={setShowLogin} />

        

        <button className="loginButton" onClick={ openSignUp }>Sign Up</button>
        <SignUp showSignUp={ showSignUp } setShowSignUp={setShowSignUp} />

      </div> */}

        {/* <button onClick={ openLogin }>Log in</button>
        <Log showLogin={ showLogin } setShowLogin={setShowLogin} /> */}

        {/* <button onClick={ openSignUp }>Sign Up</button>
        <SignUp showSignUp={ showSignUp } setShowSignUp={setShowSignUp} /> */}
      {/* <sign /> */}
      {/* <ModelLogin /> */}
      {/* <BootLogin /> */}
      {/* <BootSignup /> */}


      
    </div>    

  );
}

export default App;
