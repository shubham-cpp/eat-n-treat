import "bootstrap/dist/css/bootstrap.min.css";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState } from "react";

import Navbar from "./components/Navbar";
import { AuthProvider } from "./auth";
import Chatbotcomp from "./components/Chatbotcomp";
import Checkout from "./components/Checkout";
import RestaurantList from "./components/RestaurantList";
import { Main as RestDetails } from "./components/RestrauntDetails/Main";
import EditRestaurant from "./components/RestaurantEdit/EditRestaurant";
import LogReg from "./components/RegisterRst";

function App() {
  const [restaurants, setRestaurants] = useState([]);
  return (
    <>
      <Router>
        <AuthProvider>
          <Navbar />
          <Chatbotcomp />
          <Switch>
            <Route path="/" exact>
              <RestaurantList cbRestaurants={setRestaurants} />
            </Route>
            <Route path="/restaurant/:id" exact>
              <RestDetails data={restaurants} />
            </Route>
            <Route path="/checkout">
              <Checkout />
            </Route>
            <Route path="/restaurant/edit/:id">
              <EditRestaurant data={restaurants} />
            </Route>
            <Route path="/login" component={LogReg} />
            <Route path="/register" component={LogReg} />
          </Switch>
        </AuthProvider>
      </Router>{" "}
    </>
  );
}
export default App;
