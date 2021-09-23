import React, { useEffect, useState } from "react";
import Restaurants from "../assets/data.json";
import RestaurantCard from "./RestaurantCard";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
export default function RestaurantList(props) {
  const [res, setRes] = useState([]);

  const filterdata = Restaurants.filter((item) => {
    return res !== ""
      ? item.restaurantName.toLowerCase().includes(res) ||
          item.location.toLowerCase().includes(res)
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
            placeholder="Enter Restaraunt Name or location"
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
    </div>
  );
}
