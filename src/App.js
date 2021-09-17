import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router } from 'react-router-dom';

import Restaurants from './assets/data.json'

import RestaurantList from './components/RestaurantsList';

function App() {
  return (
    <Router>
      <RestaurantList restaurants={Restaurants}/>
    </Router>
  );
}

export default App;
