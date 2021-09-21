import React from "react";

export default function Cart({ cartItems, addToCart, removeFromCart }) {
  return (
    <>
      <aside className="col dishes">
        <h2>Cart Items</h2>
        <div className="container">
          {cartItems.length === 0 && <p>Cart is empty</p>}
          {cartItems.map((item) => (
            <div key={item.dishID} className="row">
              <div className="col">{item.dishName}</div>
              <div className="col">
                <button onClick={() => addToCart(item)}>+</button>
              </div>
              <div className="col">
                <button onClick={() => removeFromCart(item)}>-</button>
              </div>
              <div className="col">
                {item.qty} x Rs. {item.price}
              </div>
            </div>
          ))}
        </div>
      </aside>
      <button className="btn btn-primary">Place Order</button>
    </>
  );
}
