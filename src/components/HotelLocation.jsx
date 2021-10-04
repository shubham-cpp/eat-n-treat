import React, { useState, useEffect } from "react";
import HotelDisplay from "./HotelDisplay";
import axios from "axios";
function HotelLocation(props) {
  let arr = [];
  const [Restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios.get("http://eat-n-treat-serv.herokuapp.com/restaurant").then((restaurants) => {
      setRestaurants(restaurants.data);
      props.cbRestaurants(restaurants.data);
    });
  }, [props.cbRestaurants]);
  const userLoc = "mumbai";
  console.log("Location" + Restaurants);
  const exist = Restaurants.find(
    (item) => item.rCity.toLowerCase() === userLoc
  );

  if (exist) {
    Restaurants.map((item) => {
      if (
        userLoc === item.location.toLowerCase() &&
        (item.rating === 4 || item.rating === 5)
      ) {
        arr.push(
          `${item.restaurantName} rating ${item.rating.toString()} stars`
        );
      }
    });
  } else {
    arr = ["We dont provide service at this location"];
  }
  return (
    <div>
      {arr.map((item) => {
        return <HotelDisplay res={item} />;
      })}
    </div>
  );
}

export default HotelLocation;
