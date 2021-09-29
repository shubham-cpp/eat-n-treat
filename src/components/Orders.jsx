import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Orders() {
  const custId = sessionStorage.getItem("custId");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const url = `http://localhost:5000/order/customer/${custId}`;
    axios
      .get(url)
      .then((res) => setOrders(res.data))
      .catch((err) => console.log("Error in axios request for order ", err));
  }, []);

  const sumTotal = orders.reduce(
    (total, order) => total + order.totalAmount,
    0
  );
  return (
    <div className="container" style={{ marginTop: "5rem" }}>
      <h1>Welcome to orders page</h1>
      {orders.map((order) => (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Item Name</th>
                <th scope="col">Price</th>
              </tr>
            </thead>

            <tbody>
              {order.cart.map((item, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{item.menuName}</td>
                  <td>{item.menuPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h6>Status: {order.orderStatus}</h6>
          <h6>Total : {order.totalAmount}</h6>
        </div>
      ))}

      <h3>Total Amount Spent: {sumTotal}</h3>
    </div>
  );
}
