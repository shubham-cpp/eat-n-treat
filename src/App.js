import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Restaurants from "./assets/data.json";
import RestaurantList from "./components/RestaurantsList";
import { Main as RestDetails } from "./components/RestrauntDetails/Main";

function App() {
  return (
    <div id="app">
      <Router>
        <Switch>
          <Route path="/" exact>
            <RestaurantList restaurants={Restaurants} />
          </Route>
          <Route path="/restaurant/:id" component={RestDetails} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
