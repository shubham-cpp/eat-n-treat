import React, { useState } from "react";
import { useParams } from "react-router";
import { Link, Route } from "react-router-dom";
import Cart from "./Cart";
import Details from "./Details";
import data from "../../assets/data.json";

export function Main() {
  const { id } = useParams();
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  // Reducer function. Will return total items quantity
  const calculateQty = (total, item) => total + item.qty;

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

    setTotalItems(cartItems.reduce(calculateQty, 0));
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

    setTotalItems(cartItems.reduce(calculateQty, 0));
  };

  return (
    <div className="container">
      <div className="col">
        <Details addToCart={addToCart} id={id} data={data} />
      </div>
      <div className="col">
        {/* <Cart
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          cartItems={cartItems}
        /> */}
        {/* <h4>{totalItems}</h4> */}
        <button className="btn btn-outline-primary">
          <Link to="/place-order" style={{ textDecoration: "none" }}>
            Check Out{" "}
            <span class="badge badge-light">
              {totalItems > 0 && totalItems}
            </span>
          </Link>
        </button>
      </div>
      <Route path="/place-order">
        <Cart
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          cartItems={cartItems}
        />
      </Route>
    </div>
  );
}
