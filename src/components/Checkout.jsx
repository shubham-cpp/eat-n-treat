import React from "react";

function Checkout() {
  const restID = localStorage.getItem("rID");
  const cartItems = JSON.parse(localStorage.getItem("cart"));
  console.log(cartItems);
  return (
    <div className="container" style={{ marginTop: "4rem" }}>
      <h1>Order Details</h1>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Q x P</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr>
              <td>{item.menuName}</td>
              <td>{item.qty}</td>
              <td>{item.menuPrice}</td>
              <th>{item.qty * item.menuPrice}</th>
            </tr>
          ))}
        </tbody>
      </table>
      <h4>
        Total :{" "}
        {cartItems.reduce(
          (tot, current) => tot + current.menuPrice * current.qty,
          0
        )}
      </h4>
      <button>Place order</button>
    </div>
  );
}

export default Checkout;
