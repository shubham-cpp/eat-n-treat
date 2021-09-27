import "bootstrap/dist/css/bootstrap.min.css";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chatbotcomp from "./components/Chatbotcomp";
import Navbar from "./components/Navbar";
import React, { useState } from "react";
import RestaurantList from "./components/RestaurantList";
import { Main as RestDetails } from "./components/RestrauntDetails/Main";
import { AuthProvider } from "./auth";
import Checkout from "./components/Checkout";
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
              <Route path="/restaurant/:id">
                <RestDetails data={restaurants} />
              </Route>
              <Route path="/checkout">
                <Checkout />
              </Route>
            </Switch>
          </AuthProvider>
        </Router>{" "}
      </div>
    </>
  );
}
export default App;
