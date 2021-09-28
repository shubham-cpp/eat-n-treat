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

import AdminLogin from "./components/Admin/AdminLogin";
import ProtectedRoute from "./components/Admin/ProtectedRoute";
import AdminDash from "./components/Admin/AdminDash";

const NoMatch = () => {
  return (
    <div>
      <h3>
        404 - No match found <code>{window.location.pathname}</code>
      </h3>
    </div>
  )
}

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [navChange, setNavChange] = useState(false);

  const [admin, setAdmin] = useState({});
  const [auth, setAuth] = useState(false);


  return (
    <>
      <div style={{ backgroundColor: "#FFFDD0" }}>
        <Router>
          <AuthProvider>
            <Navbar btn={<button>Click me</button>} change={navChange}/>
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
              <Route path="/admin">
                <AdminLogin setAdmin={setAdmin} setAuth={setAuth} disableNavbar={setNavChange}/>
              </Route>
              <ProtectedRoute path="/adminDashboard" component={AdminDash} auth={auth} admin={admin} disableNavbar={setNavChange}/>
              <Route>
                <NoMatch />
              </Route>
            </Switch>
          </AuthProvider>
        </Router>{" "}
      </div>
    </>
  );
}
export default App;
