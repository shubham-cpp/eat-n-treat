import "bootstrap/dist/css/bootstrap.min.css";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import { AuthProvider } from "./auth";
import Chatbotcomp from "./components/Chatbotcomp";
import Checkout from "./components/Checkout";

import RestaurantList from "./components/RestaurantList";
import { Main as RestDetails } from "./components/RestrauntDetails/Main";
import EditRestaurant from "./components/RestaurantEdit/EditRestaurant";
import LogReg from "./components/RegisterRst";

import AdminLogin from "./components/Admin/AdminLogin";
import ProtectedRoute from "./components/Admin/ProtectedRoute";
import AdminDash from "./components/Admin/AdminDash";
import Orders from "./components/Orders";

const NoMatch = () => {
  return (
    <div>
      <h3>
        404 - No match found <code>{window.location.pathname}</code>
      </h3>
    </div>
  );
};

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [navChange, setNavChange] = useState(false);

  const [admin, setAdmin] = useState({});
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const url = "http://localhost:5000/restaurant";
    axios.get(url).then((restaurants) => {
      setRestaurants(restaurants.data);
    });
  }, []);
  return (
    <>
      <Router>
        <AuthProvider>
          <Navbar change={navChange} />
          <Chatbotcomp disabled={navChange} />
          <Switch>
            <Route path="/" exact>
              <RestaurantList Restaurants={restaurants} />
            </Route>
            <Route path="/restaurant/:id" exact>
              <RestDetails data={restaurants} />
            </Route>
            <Route path="/checkout">
              <Checkout />
            </Route>
            <Route path="/restaurant/edit/:id" exact>
              <EditRestaurant data={restaurants} />
            </Route>
            <Route path="/customers/orders">
              <Orders restaurants={restaurants} />
            </Route>
            <Route path="/r/login" component={LogReg} exact />
            <Route path="/r/register" component={LogReg} exact />
            <Route path="/admin">
              <AdminLogin
                setAdmin={setAdmin}
                setAuth={setAuth}
                disableNavbar={setNavChange}
              />
            </Route>
            <ProtectedRoute
              path="/adminDashboard"
              component={AdminDash}
              auth={auth}
              admin={admin}
              disableNavbar={setNavChange}
            />
            <Route>
              <NoMatch />
            </Route>
          </Switch>
        </AuthProvider>
      </Router>{" "}
    </>
  );
}

export default App;
