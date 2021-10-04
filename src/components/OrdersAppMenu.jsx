import React, { useEffect } from "react";
import IconShoppingCart from "@material-ui/icons/ShoppingCart";
import IconRestaurant from "@material-ui/icons/Restaurant";
import IconAdd from "@material-ui/icons/Add";

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  createStyles,
  Container,
} from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
  createStyles({
    appMenu: {
      width: "100%",
      backgroundColor: "#eeeeee",
      height: "100%",
    },
    navList: {
      width: drawerWidth,
    },
    menuItem: {
      width: drawerWidth,
      color: "#555555",
      height: "70%",
    },
    menuItemIcon: {
      color: "#555555",
    },
    root: {
      display: "flex",
    },
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      background: "#eeeeee",
      color: "#666666",
    },
    content: {
      flexGrow: 1,
      height: "100vh",
      width: "85vw",
      marginRight: "5%",
      overflow: "auto",
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  })
);

const Orders = ({ orders, handleOrderStatus }) => {
  const rID = sessionStorage.getItem("rID");

  const classes = useStyles();

  const sumTotal = orders.reduce(
    (total, order) => total + order.totalAmount,
    0
  );
  return (
    <main className={classes.content}>
      <Container
        className={classes.container}
        style={{ overflow: "scroll", height: "72%" }}
      >
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
            {sessionStorage.getItem("rID") && order.orderStatus === "Pending" && (
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
      </Container>
      <h4>
        Total Amount {rID != null ? "Sold" : "Spent"} : {sumTotal}
      </h4>
    </main>
  );
};

export const AllOrders = ({ orders, handleOrderStatus }) => {
  return <Orders orders={orders} handleOrderStatus={handleOrderStatus} />;
};

const PendingOrders = ({ orders, handleOrderStatus }) => {
  const pendingOrders = orders.filter(
    (order) => order.orderStatus === "Pending"
  );
  return (
    <Orders orders={pendingOrders} handleOrderStatus={handleOrderStatus} />
  );
};

const DeliveredOrders = ({ orders, handleOrderStatus }) => {
  const deliveredOrders = orders.filter(
    (order) => order.orderStatus === "Delivered"
  );
  return (
    <Orders orders={deliveredOrders} handleOrderStatus={handleOrderStatus} />
  );
};

const OrderAppMenu = ({ orders, setComponent, handleOrderStatus }) => {
  // TODO: Why doesn't this work though
  // useEffect(() => {
  //   orders.length &&
  //     setComponent(
  //       <AllOrders orders={orders} handleOrderStatus={handleOrderStatus} />
  //     );
  // }, []);
  console.log(handleOrderStatus);
  const classes = useStyles();
  return (
    <List component="nav" className={classes.appMenu} disablePadding>
      <div
        onClick={() => {
          console.log(orders);
          setComponent(
            <AllOrders orders={orders} handleOrderStatus={handleOrderStatus} />
          );
        }}
      >
        <ListItem button className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIcon}>
            <IconRestaurant />
          </ListItemIcon>
          <ListItemText primary="All Orders" />
        </ListItem>
      </div>

      <div
        onClick={() =>
          setComponent(
            <PendingOrders
              handleOrderStatus={handleOrderStatus}
              orders={orders}
            />
          )
        }
      >
        <ListItem button className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIcon}>
            <IconShoppingCart />
          </ListItemIcon>
          <ListItemText primary="Pending Orders" />
        </ListItem>
      </div>

      <div
        onClick={() =>
          setComponent(
            <DeliveredOrders
              handleOrderStatus={handleOrderStatus}
              orders={orders}
            />
          )
        }
      >
        <ListItem button className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIcon}>
            <IconAdd />
          </ListItemIcon>
          <ListItemText primary="Delivered Order" />
        </ListItem>
      </div>
    </List>
  );
};

export default OrderAppMenu;
