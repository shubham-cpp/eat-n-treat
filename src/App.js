import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Restaurants from "./assets/data.json";
import RestaurantList from "./components/RestaurantsList";
import RestrauntDetails from "./components/RestrauntDetails";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Searchbar from "./components/Searchbar";
import Chatbot from "./components/Chatbotcomp";
function App() {
  return (
    <div>
     <Navbar/>
     <Searchbar/>
     <Chatbot/>
      <Router>
        <Switch>
            <Route path="/" exact>
              <RestaurantList restaurants={Restaurants}/>
            </Route>
            <Route path="/restaurant/:id" component={RestrauntDetails} />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
