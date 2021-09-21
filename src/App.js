import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import RestaurauntList from './components/RestaurantList'
import RestrauntDetails from "./components/RestrauntDetails";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Chatbot from "./components/Chatbotcomp";

import React from "react"

function App() {
  return (
    <div>
     <Navbar/>
     <Chatbot/>
     <Router>
        <Switch>
            <Route path="/" exact>
              <RestaurauntList/>
            </Route>
            <Route path="/restaurant/:id" component={RestrauntDetails} />
        </Switch>
      </Router>
     
      
    </div>
  );
}
export default App;
