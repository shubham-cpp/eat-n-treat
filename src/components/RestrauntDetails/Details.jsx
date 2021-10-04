import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Dish from "./Dish";
import { Divider } from "@material-ui/core";
import { lineHeight, padding } from "@mui/system";

export default function Details({ addToCart, getCallRest }) {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState();
  useEffect(() => {
    axios
      .get(`/restaurant/${id}`)
      .then((res) => setRestaurant(res.data))
      .catch((err) => console.log("Error in edit restaurant ", err));
  }, [id, getCallRest()]);

  return (
    <>
      {restaurant && (
        <div
          className="col"
          style={{
            marginTop: "5rem",
            backgroundColor: "white",
            padding: "2px 15px",
          }}
        >
          <h3 className="text-center">{restaurant.restaurantName}</h3>
          <p>Location: {restaurant.rCity}</p>
          <p>Rating: {restaurant.rating}</p>
          <p>
            Cuisines :{" "}
            {restaurant.cuisine.map((item) => (
              <span>{item} </span>
            ))}
          </p>
          <hr />
          {/* <Divider spacing={1} sx={{ lineHeight: "5px" }}></Divider> */}
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
