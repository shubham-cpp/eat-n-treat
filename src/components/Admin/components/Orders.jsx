import React, { useEffect, useState } from "react";
import axios from "axios";

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

const Orders = () => {
  const [open, setOpen] = useState([]);
  const [orders, setOrders] = useState([]);
  // const [temp, setTemp] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    axios
      .get("/order")
      .then((res) => {
        console.log(res.data);
        let arr = new Array(res.data.length).fill(false);
        console.log(arr);
        setOpen(arr);
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleClick(index) {
    console.log(index);
    let tempOpen = open;
    tempOpen[index] = !tempOpen[index];
    console.log(tempOpen);
    setOpen([...tempOpen]);
    //setTemp(!temp);
  }

  return (
    <Card style={{ height: "100%", width: "100%", overflow: "scroll" }}>
      <CardHeader title="Orders" />
      <CardContent
        style={{
          alignItems: "center",
          paddingLeft: "auto",
          paddingRight: "auto",
          paddingTop: "1.5%",
          paddingBottom: "1%",
        }}
      >
        <List component="div" disablePadding>
          {orders.map((order, index) => (
            <div key={order._id}>
              <ListItem
                button
                onClick={() => handleClick(index)}
                className={classes.menuItem}
              >
                <ListItemIcon className={classes.menuItemIcon}>
                  <Group />
                </ListItemIcon>
                <ListItemText primary={`${order._id}`} />
                {open[index] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open[index]} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                  {Object.keys(order).map((key) => (
                    <ListItem className={classes.menuSubItem}>
                      <ListItemIcon>
                        <SubdirectoryArrowRightTwoTone />
                      </ListItemIcon>
                      <ListItemText secondary={key} />
                      {Array.isArray(order[key]) ? (
                        <ListItemText
                          secondary={`Array (${order[key].length})`}
                          style={{ float: "right", textAlign: "right" }}
                        />
                      ) : (
                        <ListItemText
                          secondary={order[key]}
                          style={{ float: "right", textAlign: "right" }}
                        />
                      )}
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </div>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default Orders;
