import "bootstrap/dist/css/bootstrap.min.css";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import Chatbot from "./components/Chatbotcomp";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Restaurants from "./assets/data.json";
import RestaurantList from "./components/RestaurantList";

import { Main as RestDetails } from "./components/RestrauntDetails/Main";

function App() {
  return (
    <div>
      <Navbar />
      <Searchbar />
      <Router>
        <Switch>
          <Route path="/" exact>
            <RestaurantList restaurants={Restaurants} />
          </Route>
          <Route path="/restaurant/:id" component={RestDetails} />
        </Switch>
      </Router>
      <Chatbot />
    </div>
  );
}
export default App;
