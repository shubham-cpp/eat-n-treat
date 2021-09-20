import React, { useState } from "react";
// import { Tab, Tabs, Container } from "react-bootstrap";
import data from "../assets/data.json";
// import { Switch, Route, Link } from "react-router-dom";
// props.match.params.id
export default function RestrauntDetails(props) {
  const id = props.match.params.id || props.id;
  const [totalItems, setTotalItems] = useState(0);
  const [cartList, setCartList] = useState({});
  const [subBtnState, setSubBtnState] = useState(true);
  const restaurant = data.find(
    ({ restaurantID }) => restaurantID === Number(id)
  );

  const changeCart = (obj, key) => {
    typeof obj[key] === 'undefined' ? obj[key] = 1 : obj[key]++;
  }

  const changeCartDec = (obj, key) => {
    typeof obj[key] === 'undefined' ? obj[key] = 0 : obj[key]--;
  }

  const addItem = (dishId) => {
    // setCartList(prevCartList => ({
    //   ...prevCartList,
    //   typeof prevCartList[dishId] === 'undefined' ? prevCartList[dishId] = 1:prevCartList[dishId]++
    // }))
    changeCart(cartList, dishId);
    setTotalItems(prevTotal => prevTotal + 1);
    if (totalItems > 0)
      setSubBtnState(false)
  }

  const removeItem = (dishId) => {
    if (totalItems >= 0) {
      changeCartDec(cartList, dishId)
      // setCartList(prevCartList => (prevCartList[dishId] ?? 0) - 1)
      setTotalItems(prevTotal => prevTotal - 1)
      setSubBtnState(false)
    } else {
      setSubBtnState(true)
    }
  }
  console.log(restaurant);
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
                  <span>Item : {cartList[dish.dishID]}</span> <br />
                  <button className="btn btn-outline-dark" onClick={() => addItem(dish.dishID)}>
                    <span class="material-icons md-18">add_circle_outline</span>
                  </button>
                  <button className="btn btn-outline-dark" disabled={subBtnState} onClick={() => removeItem(dish.dishID)}>
                    <span class="material-icons md-18"> remove_circle_outline </span>
                  </button>
                </p>
                <p>Total : {totalItems}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}