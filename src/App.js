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
import Chart from "./components/Chart";
import RestaurantList from "./components/RestaurantList";
import { Main as RestDetails } from "./components/RestrauntDetails/Main";
import EditRestaurant from "./components/RestaurantEdit/EditRestaurant";
import LogReg from "./components/RegisterRst";

import AdminLogin from "./components/Admin/AdminLogin";
import ProtectedRoute from "./components/Admin/ProtectedRoute";
import AdminDash from "./components/Admin/AdminDash";
import Orders from "./components/Orders";
import OrdersRestaurant from "./components/OrdersRestaurant";

const NoMatch = () => {
  return (
    <div style={{ marginTop: "5rem" }}>
      <h3>
        404 - No match found <code>{window.location.pathname}</code>
      </h3>
    </div>
  );
};

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [navChange, setNavChange] = useState(false);

  const [callRest, setCallRest] = useState(false);

  const [rID, setRID] = useState(sessionStorage.getItem("rID"));
  const [custId, setCustId] = useState(sessionStorage.getItem("custId"));

  const [admin, setAdmin] = useState({});
  const [auth, setAuth] = useState(false);

  const cbCallRest = () => {
    setCallRest(!callRest).then(() => {
      console.log("CallRest " + callRest);
    });
  };

  const getCallRest = () => {
    return callRest;
  };

  useEffect(() => {
    console.log("Ran this");
    const url = "http://localhost:5000/restaurant";
    axios.get(url).then((restaurants) => {
      setRestaurants(restaurants.data);
    });
  }, [callRest]);
  return (
    <>
      <Router>
        <AuthProvider>
          <Navbar change={navChange} setRID={setRID} setCustId={setCustId} />
          <Chatbotcomp disabled={navChange} />
          <Switch>
            {/* <Route path="/" exact>
              <RestaurantList Restaurants={restaurants} />
            </Route> */}
            <ProtectedRoute
              path="/"
              component={RestaurantList}
              auth={sessionStorage.getItem("rID") === null}
              pathname={`/restaurant/edit/${sessionStorage.getItem("rID")}`}
              Restaurants={restaurants}
              exact
            />
            {/* <Route path="/restaurant/:id" exact>
              <RestDetails
                data={restaurants}
                cbCallRest={cbCallRest}
                getCallRest={getCallRest}
              />
            </Route> */}
            <ProtectedRoute
              path="/restaurant/:id"
              component={RestDetails}
              auth={sessionStorage.getItem("rID") === null}
              pathname={`/restaurant/edit/${sessionStorage.getItem("rID")}`}
              data={restaurants}
              cbCallRest={cbCallRest}
              getCallRest={getCallRest}
              exact
            />
            {/* <Route path="/checkout">
              <Checkout />
            </Route> */}
            <ProtectedRoute
              path="/checkout"
              component={Checkout}
              auth={sessionStorage.getItem("custId") !== null}
              pathname="/"
              exact
            />
            {/* <Route path="/restaurant/edit/:id" exact>
              <EditRestaurant data={restaurants} />
            </Route> */}
            <Route path="/restaurant/edit/:id" exact>
              <ProtectedRoute
                path="/restaurant/edit/:id"
                component={EditRestaurant}
                auth={sessionStorage.getItem("rID") !== null}
                pathname="/"
                data={restaurants}
                matchID={sessionStorage.getItem("rID")}
                exact
              />
            </Route>
            {/* <Route path="/customers/orders">
              <Orders restaurants={restaurants} />
            </Route> */}
            <ProtectedRoute
              path="/customer/order"
              component={Orders}
              auth={sessionStorage.getItem("custId") !== null}
              pathname="/"
              restaurants={restaurants}
              exact={false}
            />
            {/* <Route path="/order/:id">
              <OrdersRestaurant />
            </Route> */}
            <Route path="/order/:id" exact>
              <ProtectedRoute
                path="/order/:id"
                component={OrdersRestaurant}
                auth={sessionStorage.getItem("rID") !== null}
                matchID={sessionStorage.getItem("rID")}
                pathname="/"
                exact
              />
            </Route>
            <Route path="/r/login" exact>
              <LogReg setRID={setRID} />
            </Route>
            <Route path="/r/register" exact>
              <LogReg setRID={setRID} />
            </Route>
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
              pathname="/admin"
              admin={admin}
              disableNavbar={setNavChange}
              exact={false}
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
