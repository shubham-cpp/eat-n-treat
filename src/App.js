<<<<<<< HEAD


















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
=======
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Restaurants from "./assets/data.json";
import RestaurantList from "./components/RestaurantsList";
import RestrauntDetails from "./components/RestrauntDetails";

function App() {
  return (
    <div id="app">
      <Router>
        <Switch>
            <Route path="/" exact>
              <RestaurantList restaurants={Restaurants}/>
            </Route>
            <Route path="/restaurant/:id" component={RestrauntDetails} />
        </Switch>
      </Router>
>>>>>>> 9f898d9ade63bd6544494195141ab8c54d454759
    </div>
  );
}
export default App;
