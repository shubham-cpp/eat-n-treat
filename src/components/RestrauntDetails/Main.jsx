import React, { useState } from "react";
import { useParams } from "react-router";
import { useLocalStorage } from "../useLocalStorage";
import Cart from "./Cart";
import Details from "./Details";


export function Main(props) {
  const data = props.data;
  const { id } = useParams();
  const [cartItems, setCartItems] = useLocalStorage('cart',[]);
 

  const addToCart = (dish) => {
    if(localStorage.getItem('rID')===id || localStorage.getItem('rID')===null ){
      const exist = cartItems.find((item) => item._id === dish._id);

      if (exist) {

        setCartItems(
          cartItems.map((item) =>
            item._id === dish._id ? { ...exist, qty: exist.qty + 1 } : item
          )
        );
      } else {
        
        setCartItems([...cartItems, { ...dish, qty: 1 }]);
  
        localStorage.setItem('rID',id)
        
      }
    }

  };

  const removeFromCart = (dish) => {
    const exist = cartItems.find((item) => item._id === dish._id);
    // Remove item from cart
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((item) => item._id !== dish._id));
      localStorage.removeItem('rID')
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
        <Details addToCart={addToCart} id={id} data={data} total={cartItems.length}/>
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
