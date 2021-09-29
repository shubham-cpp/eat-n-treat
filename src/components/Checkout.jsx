import React from "react";
import axios from "axios";
import { useHistory } from "react-router";

function Checkout() {
  const history = useHistory();
  const restID = localStorage.getItem("rID");
  const custId = sessionStorage.getItem("custID");
  const cartItems = JSON.parse(localStorage.getItem("cart"));
  const totalAmount = cartItems.reduce(
    (tot, current) => tot + current.menuPrice * current.qty,
    0
  );
  const handleOrder = () => {
    axios
      .post("http://localhost:5000/order/", {
        customerID: custId,
        cartList: cartItems,
        restrauntID: restID,
        totalAmount: totalAmount,
      })
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        console.log("error while placing order", err);
      });
  };
  // console.log(cartItems);
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
          {cartItems.map((item, index) => (
            <tr key={index}>
              <td>{item.menuName}</td>
              <td>{item.qty}</td>
              <td>{item.menuPrice}</td>
              <th>{item.qty * item.menuPrice}</th>
            </tr>
          ))}
        </tbody>
      </table>
      <h4>Total : {totalAmount}</h4>
      <button onClick={handleOrder}>Place order</button>
    </div>
  );
}

export default Checkout;
