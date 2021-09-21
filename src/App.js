import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbotcomp";
import React from "react"
import RestaurantList from "./components/RestaurantList";
import { Main as RestDetails } from "./components/RestrauntDetails/Main";

function App() {
  return (
    <div>
      <Navbar />
      <Chatbot />
      <Router>
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
