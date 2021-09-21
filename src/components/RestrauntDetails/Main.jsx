import React, { useState } from "react";
import { useParams } from "react-router";
import Cart from "./Cart";
import Details from "./Details";
import data from "../../assets/data.json";

export function Main() {
  const { id } = useParams();
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (dish) => {
    const exist = cartItems.find((item) => item.dishID === dish.dishID);
    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.dishID === dish.dishID ? { ...exist, qty: exist.qty + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...dish, qty: 1 }]);
    }
  };

  const removeFromCart = (dish) => {
    const exist = cartItems.find((item) => item.dishID === dish.dishID);
    // Remove item from cart
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((item) => item.dishID !== dish.dishID));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.dishID === dish.dishID ? { ...exist, qty: exist.qty - 1 } : item
        )
      );
    }
  };

  return (
    <div className="container">
      <div className="col">
        <Details addToCart={addToCart} id={id} data={data} />
      </div>
      <div className="col">
        <Cart
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          cartItems={cartItems}
        />
      </div>
    </div>
  );
}
