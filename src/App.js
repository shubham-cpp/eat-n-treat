import "bootstrap/dist/css/bootstrap.min.css";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from "./components/Navbar";
import React from "react"
import RestaurantList from "./components/RestaurantList";
import { Main as RestDetails } from "./components/RestrauntDetails/Main";


function App() {
  return (
  <div style={{backgroundColor:"#FFFDD0"}}>
      <Router>
        <Navbar/>
        <Switch>
          <Route path="/" exact>
            <RestaurantList />
          </Route>
          <Route path="/restaurant/:id" component={RestDetails} />
        </Switch>
      </Router>
      </div>
  );
}
export default App;
