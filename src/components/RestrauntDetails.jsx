import React from "react";
// import { Tab, Tabs, Container } from "react-bootstrap";
import data from "../assets/data.json";
// import { Switch, Route, Link } from "react-router-dom";

export default function RestrauntDetails(props) {
  const restaurant = data.find(
    ({ restaurantID }) => restaurantID === Number(props.id)
  );
  console.log(restaurant);
  return (
    /* <h2>{restaurant && restaurant.restaurantName}</h2> */
    <div className="container position-relative">
      <div className="position-absolute top-0 start-50 translate-middle">
        <h3 className="text-center">{restaurant.restaurantName}</h3>
        <p>Location: {restaurant.location}</p>
        <p>Rating: {restaurant.rating}</p>
        <p>
          Cuisines :{" "}
          {restaurant.cuisines.map((item) => (
            <span>{item};</span>
          ))}
        </p>
        <h4>Order</h4>
        {restaurant.dishes.map((dish) => {
          return (
            <ul>
              <li>
                {dish.dishName} Rs.{dish.price}
              </li>
              {/* <p>{dish.price}</p> */}
            </ul>
          );
        })}
        <span className="add_circle_outline">Add</span>
      </div>
    </div>
  );
}
