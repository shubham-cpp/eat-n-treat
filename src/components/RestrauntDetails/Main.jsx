import React, { useState } from "react";
import { useParams } from "react-router";
import { useLocalStorage } from "../useLocalStorage";
import Cart from "./Cart";
import Details from "./Details";


export function Main(props) {
  const data = props.data;
  const { id } = useParams();
  // const [cartItems, setCartItems] = useState([]);
  const [cartItems, setCartItems] = useLocalStorage('cart',[]);
  // const [totalItems, setTotalItems] = useState(0);

  // Reducer function. Will return total items quantity
  // const calculateQty = (total, item) => total + item.qty;

  const addToCart = (dish) => {
    const exist = cartItems.find((item) => item._id === dish._id);
    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item._id === dish._id ? { ...exist, qty: exist.qty + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...dish, qty: 1 }]);
    }

    // setTotalItems(cartItems.reduce(calculateQty, 0));
  };

  const removeFromCart = (dish) => {
    const exist = cartItems.find((item) => item._id === dish._id);
    // Remove item from cart
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((item) => item._id !== dish._id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item._id === dish._id ? { ...exist, qty: exist.qty - 1 } : item
        )
      );
    }

    // setTotalItems(cartItems.reduce(calculateQty, 0));
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
          total={cartItems.length}
        />
      </div>
    </div>
  );
}
