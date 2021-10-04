import axios from "axios";
import React, { useState, useEffect } from "react";
import { makeStyles, Drawer, CssBaseline, Container } from "@material-ui/core";

import clsx from "clsx";
import OrderAppMenu, { AllOrders } from "./OrdersAppMenu";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
}));

export default function OrdersRestaurant() {
  const rID = sessionStorage.getItem("rID");
  const [orders, setOrders] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  const classes = useStyles();

  const [component, setComponent] = useState();

  useEffect(() => {
    const url = `/order/${rID}`;
    axios
      .get(url)
      .then((res) => {
        setOrders(res.data);
        console.log(orders);
        // setComponent(
        //   <AllOrders orders={res.data} handleOrderStatus={handleOrderStatus} />
        // );
      })
      .catch((err) => console.log("Error in axios request for order ", err));
  }, [fetchAgain, rID]);

  /**
   * Code to Change the order status to delivered
   * @param {event} e Event Object
   * @param {String} oid Order ID
   */
  const handleOrderStatus = (e, oid) => {
    e.preventDefault();
    console.log(oid);
    axios
      .patch("/order/" + oid)
      .then(() => setFetchAgain((prev) => !prev))
      .catch((err) => console.log("Error While changing order status ", err));
  };

  return (
    <div
      className={clsx("App", classes.root)}
      style={{ marginTop: "5%", position: "fixed" }}
    >
      <CssBaseline />
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {orders && (
          <OrderAppMenu
            setComponent={setComponent}
            orders={orders}
            handleOrderStatus={handleOrderStatus}
          />
        )}
      </Drawer>
      <main className={classes.content}>
        <Container
          style={{ width: "100%", height: "100%" }}
          className={classes.container}
        >
          {component}
        </Container>
      </main>
    </div>
  );
}
