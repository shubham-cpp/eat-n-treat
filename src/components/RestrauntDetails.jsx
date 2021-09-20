import React, { useState } from "react";
import { useParams } from "react-router";
import data from "../assets/data.json";

export default function RestrauntDetails(props) {
  const { id } = useParams();
  const restaurant = data.find(
    ({ restaurantID }) => restaurantID === Number(id)
  );
  return (
    <div className="container-fluid">
      <div>
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
            <div className="card" key={dish.dishID}>
              <div className="card-title">{dish.dishName}</div>
              <p className="card-text">
                Rs.{dish.price} <br />
                Qty:{" "}
                <input
                  style={{ width: "5rem" }}
                  type="number"
                  name="quantity"
                />
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
