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
  Button,
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

const Requests = () => {
  const [open, setOpen] = useState([]);
  const [requests, setRequests] = useState([]);
  const [temp, setTemp] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    axios
      .get("/restaurant")
      .then((res) => {
        console.log(res.data);
        let arr = new Array(res.data.length).fill(false);
        console.log(arr);
        setOpen(arr);
        setRequests(res.data);
      })
      .catch((err) => console.log(err));
  }, [temp]);

  function handleClick(index) {
    console.log(index);
    let tempOpen = open;
    tempOpen[index] = !tempOpen[index];
    console.log(tempOpen);
    setOpen([...tempOpen]);
    //setTemp(!temp);
  }

  function approveRequest(event, rID) {
      event.preventDefault();

      axios.patch(`/restaurant/status/${rID}`)
        .then(() => {
            setTemp(!temp)
        }).catch(err => console.log(err))
  }

  return (
    <Card style={{ height: "100%", width: "100%", overflow: "scroll" }}>
      <CardHeader title="Restaurant Registration Approval" />
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
          {requests.map((restaurant, index) =>
            !restaurant.restaurantRegistrationStatus ? (
              <div key={restaurant._id}>
                <ListItem
                  button
                  onClick={() => handleClick(index)}
                  className={classes.menuItem}
                >
                  <ListItemIcon className={classes.menuItemIcon}>
                    <Group />
                  </ListItemIcon>
                  <ListItemText primary={`${restaurant.restaurantName}`} />
                  <Button onClick={(e) => approveRequest(e, restaurant._id)} style={{ backgroundColor: "green", color: "white", marginRight: "3%" }}>Approve</Button>
                  {open[index] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open[index]} timeout="auto" unmountOnExit>
                  <Divider />
                  <List component="div" disablePadding>
                    {Object.keys(restaurant).map((key) => (
                      <ListItem className={classes.menuSubItem}>
                        <ListItemIcon>
                          <SubdirectoryArrowRightTwoTone />
                        </ListItemIcon>
                        <ListItemText secondary={key} />
                        {Array.isArray(restaurant[key]) ? (
                          <ListItemText
                            secondary={`Array (${restaurant[key].length})`}
                            style={{ float: "right", textAlign: "right" }}
                          />
                        ) : (
                          <ListItemText
                            secondary={restaurant[key]}
                            style={{ float: "right", textAlign: "right" }}
                          />
                        )}
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </div>
            ) : (
              <></>
            )
          )}
        </List>
      </CardContent>
    </Card>
  );
};

export default Requests;
