// import React, { useState } from "react";
import { useParams } from "react-router";
import Dish from "./Dish";

export default function Details({ data, addToCart }) {
  const { id } = useParams();
  const restaurant = data.find(
    ({ restaurantID }) => restaurantID === Number(id)
  );
  return (
    <>
      <div className="col">
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
        <div className="dishes">
          {restaurant.dishes.map((dish) => (
            <Dish dish={dish} key={dish.dishID} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </>
  );
}
