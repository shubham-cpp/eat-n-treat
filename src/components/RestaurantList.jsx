import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import axios from "axios";

export default function RestaurantList({ cbRestaurants }) {
  const [res, setRes] = useState([]);
  // NOTE: First start express server
  // Then start react server
  const url = "http://localhost:5000/restaurant";

  const [Restaurants, setRestaurants] = useState([]);

  // TODO: Solve warning react-hooks/exhaustive-deps
  // Look into useCallback
  useEffect(() => {
    axios.get(url).then((restaurants) => {
      setRestaurants(restaurants.data);
      cbRestaurants(restaurants.data);
    });
  }, [cbRestaurants]);

  const filterdata = Restaurants.filter((item) => {
    return res !== ""
      ? item.restaurantName.toLowerCase().includes(res)  || item.rCity.toLowerCase().includes(res)
      : item;
  });

  return (
    <div
      className="container"
      style={{ marginTop: "30px", verticalAlign: "auto", padding: "10px" }}
    >
      <div className="search">
        <div className="searchInputs">
          <input
            type="text"
            placeholder="Enter Restaurant Name or location"
            onChange={(event) => {
              setRes(event.target.value);
            }}
          />
          <div className="searchIcon">
            <SearchOutlinedIcon />
          </div>
        </div>
      </div>
      <div className="row flex-row" style={{ marginTop: "5%" }}>
        {filterdata.map((restaurant) => {
          return (
            <div className="col-4 pt-4">
              <RestaurantCard restaurant={restaurant} />
            </div>
          );
        })}
      </div>
      {/* <Switch>
        <Route path="/restaurant/:id" >
          <RestDetails data={ Restaurants }/>
        </Route>
      </Switch> */}
    </div>
  );
}
