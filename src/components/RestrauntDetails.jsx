// import React, { useEffect, useReducer, useRef, useState } from "react";
import { useParams } from "react-router";
import data from "../assets/data.json";

export default function RestrauntDetails(props) {
  const { id } = useParams();
  // const quantity = useRef(1);
  // const [totalItems, setTotalItems] = useState(0);
  // const [cartList, dispatchCart] = useReducer((state, action) => {
  //   switch (action.type) {
  //     case "add":
  //       return [
  //         ...state,
  //         {
  //           id: action.id,
  //           name: action.name,
  //           qty: action.qty,
  //         },
  //       ];
  //     case "dec":
  //       return [
  //         ...state,
  //         {
  //           id: action.id,
  //           name: action.name,
  //           qty: action.qty,
  //         },
  //       ];

  //     default:
  //       return state;
  //   }
  // }, []);

  const restaurant = data.find(
    ({ restaurantID }) => restaurantID === Number(id)
  );

  return (
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
                  Qty:{" "}
                  <input
                    style={{ width: "10rem" }}
                    type="number"
                    name="quantity"
                    min="1"
                    max="100"
                    // ref={quantity}
                  />
                </p>
                {/* <p>Total : {totalItems}</p> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
