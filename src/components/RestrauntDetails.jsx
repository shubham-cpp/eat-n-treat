import React from "react";
// import { Tab, Tabs, Container } from "react-bootstrap";
import data from "../assets/data.json";
// import { Switch, Route, Link } from "react-router-dom";
// props.match.params.id
export default function RestrauntDetails(props) {
  const restaurant = data.find(
    ({ restaurantID }) => restaurantID === Number(props.id)
  );
  console.log(restaurant);
  return (
    /* <h2>{restaurant && restaurant.restaurantName}</h2> */
    <div className="container-fluid">
      <div className="">
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
            <div className="card">
              <div className="card-body">
                <div className="card-title">{dish.dishName}</div>
                <p className="card-text">
                  Rs.{dish.price} <br />
                  {/* <span className="material-icons">Add</span> */}
                  <span class="material-icons md-18">add_circle_outline</span>
                  <span class="material-icons md-18">
                    remove_circle_outline
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
