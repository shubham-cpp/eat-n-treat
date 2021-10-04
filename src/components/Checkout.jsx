import React from "react";
import axios from "axios";
import swal from "sweetalert";
import { useHistory } from "react-router";

function Checkout() {
  const history = useHistory();
  const restrauntID = localStorage.getItem("rID");
  const customerID = sessionStorage.getItem("custId");
  const cartList = JSON.parse(localStorage.getItem("cart"));
  const totalAmount = cartList.reduce(
    (tot, current) => tot + current.menuPrice * current.qty,
    0
  );
  const handleOrder = () => {
    const data = {
      cartList,
      restrauntID,
      customerID,
      totalAmount,
    };
    axios
      .post("http://localhost:5000/order/", data)
      .then(() => {
        swal({
          title: "Order Placed Successfully !",
          icon: "success",
          buttons: false,
          timer: 2000,
        });
        localStorage.removeItem("cart");
        localStorage.removeItem("rID");
        history.push("/");
      })
      .catch((err) => {
        console.log("error while placing order", err);
      });
  };
  return (
    <div
      className="container"
      style={{
        marginTop: "5rem",
        backgroundColor: "white",
        padding: "10px 15px",
      }}
    >
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
          {cartList.map((item, index) => (
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
      <button
        style={{ marginBottom: "10px" }}
        className="btn btn-primary"
        onClick={handleOrder}
      >
        Place order
      </button>
    </div>
  );
}

export default Checkout;
