import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

import Dish from "./Dish";

export default function Details({ addToCart }) {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState();
  useEffect(() => {
    axios
      .get(`/restaurant/${id}`)
      .then((res) => setRestaurant(res.data))
      .catch((err) => console.log("Error in edit restaurant ", err));
  }, []);

  return (
    <>
      {restaurant && (
        <div className="col" style={{ marginTop: "5rem" }}>
          <h3 className="text-center">{restaurant.restaurantName}</h3>
          <p>Location: {restaurant.rCity}</p>
          <p>Rating: {restaurant.rating}</p>
          <p>
            Cuisines :{" "}
            {restaurant.cuisine.map((item) => (
              <span>{item};</span>
            ))}
          </p>
          <h4>Order</h4>
          <div className="dishes">
            {restaurant.menus.map((dish) => {
              return (
                <Dish
                  dish={dish}
                  key={dish._id}
                  handleFunction={() => addToCart(dish)}
                  btnName="Add"
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
