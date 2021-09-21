import "bootstrap/dist/css/bootstrap.min.css";

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
      <Chatbot />
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
