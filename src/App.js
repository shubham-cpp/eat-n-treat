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
// import { Main as EditRestaurant } from "./components/RestrauntEdit/Main";
import EditRestaurant from "./components/RestaurantEdit/EditRestaurant";

function App() {
  const [restaurants, setRestaurants] = useState([]);

  return (
    <>
      <div style={{ backgroundColor: "#FFFDD0" }}>
        <Router>
          <AuthProvider>
            <Navbar btn={<button>Click me</button>} />
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
            </Switch>
          </AuthProvider>
        </Router>{" "}
      </div>
    </>
  );
}
export default App;
