import axios from "axios";
import React, { useState, useEffect } from "react";
import { makeStyles, Drawer, CssBaseline, Container } from "@material-ui/core";

import clsx from "clsx";
import OrderAppMenu from "./OrdersAppMenu";

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

export default function Orders({ restaurants }) {
  const classes = useStyles();
  const custId = sessionStorage.getItem("custId");
  const [orders, setOrders] = useState([]);
  const [component, setComponent] = useState(null);

  useEffect(() => {
    const url = `http://eat-n-treat-serv.herokuapp.com/order/customer/${custId}`;
    axios
      .get(url)
      .then((res) => setOrders(res.data))
      .catch((err) => console.log("Error in axios request for order ", err));
  }, [custId]);

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
            // restaurants={restaurants}
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
