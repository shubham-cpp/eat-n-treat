import axios from "axios";
import React, { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  makeStyles,
  createStyles,
  CardHeader,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  List,
} from "@material-ui/core";

import {
  ExpandMore,
  ExpandLess,
  SubdirectoryArrowRightTwoTone,
  Group,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) =>
  createStyles({
    menuItem: {
      width: "65vw",
      color: "#555555",
    },
    menuSubItem: {
      width: "60vw",
      color: "#555555",
      marginLeft: "7%",
      height: "fit-content",
    },
    menuItemIcon: {
      color: "#555555",
    },
  })
);

export default function OrdersRestaurant() {
  const rID = sessionStorage.getItem("rID");
  const [orders, setOrders] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);

  useEffect(() => {
    const url = `http://localhost:5000/order/${rID}`;
    axios
      .get(url)
      .then((res) => setOrders(res.data))
      .catch((err) => console.log("Error in axios request for order ", err));
  }, [fetchAgain]);

  /**
   * Code to Change the order status to delivered
   * @param {event} e Event Object
   * @param {String} oid Order ID
   */
  const handleOrderStatus = (e, oid) => {
    e.preventDefault();
    axios
      .patch("http://localhost:5000/order/" + oid)
      .then((res) => setFetchAgain((prev) => !prev))
      .catch((err) => console.log("Error While changing order status ", err));
  };

  const sumTotal = orders.reduce(
    (total, order) => total + order.totalAmount,
    0
  );
  return (
    <div className="container" style={{ marginTop: "5rem" }}>
      <h1>Welcome to orders page</h1>
      {orders.map((order) => (
        <fieldset
          style={{ border: "0.1rem solid black", marginBottom: "0.5rem" }}
          key={order._id}
        >
          <table className="table">
            <thead>
              <tr>
                <th className="order-item" scope="col">
                  #
                </th>
                <th className="order-item" scope="col">
                  Item Name
                </th>
                <th className="order-item" scope="col">
                  Price
                </th>
              </tr>
            </thead>

            <tbody>
              {order.cart.map((item, index) => (
                <tr>
                  <th className="order-item" scope="row">
                    {index + 1}
                  </th>
                  <td className="order-item">{item.menuName}</td>
                  <td className="order-item">{item.menuPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h6>Status: {order.orderStatus}</h6>
          {order.orderStatus === "Pending" && (
            <button
              className="btn btn-outline-success"
              onClick={(e) => handleOrderStatus(e, order._id)}
            >
              Accept Order
            </button>
          )}
          <h6>Total : {order.totalAmount}</h6>
        </fieldset>
      ))}

      <h3>Total Amount Sold: {sumTotal}</h3>
    </div>
  );
}
