import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
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

const Reports = () => {
  const [open, setOpen] = useState([]);
  const [orders, setOrders] = useState([]);
  const classes = useStyles();

  function handleClick(index) {
    console.log(index);
    let tempOpen = open;
    tempOpen[index] = !tempOpen[index];
    console.log(tempOpen);
    setOpen([...tempOpen]);
    //setTemp(!temp);
  }

  useEffect(() => {
    const url = "http://localhost:5000/order/";
    axios
      .get(url)
      .then((res) => setOrders(res.data))
      .catch((err) => console.log("Error in axios request for order ", err));
  }, []);
  //   console.log(orders);
  let arr1 = [];
  orders.map((item) => {
    arr1.push(item.restrauntID);
  });
  const occurrences = arr1.reduce(function(acc, curr) {
    return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
  }, {});
  let Residarr = [];
  let noOfOrder = [];

  for (let value of Object.keys(occurrences)) {
    Residarr.push(value);
  }
  for (let value of Object.values(occurrences)) {
    noOfOrder.push(value);
  }

  return (
    <div>
      <Card style={{ width: "100%", height: "100%", overflow: "scroll" }}>
        <CardHeader title="Reports" />
        <CardContent
          style={{
            alignItems: "center",
            paddingLeft: "auto",
            paddingRight: "auto",
            paddingTop: "1.5%",
            paddingBottom: "1%",
          }}
        >
          <div style={{ width: "45rem", right: "28px" }}>
            <Bar
              data={{
                labels: Residarr,
                datasets: [
                  {
                    label: "No of orders",
                    data: noOfOrder,
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 206, 86, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(75, 192, 192, 1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
              height={400}
              width={600}
              options={{
                maintainAspectRatio: true,
              }}
            />
          </div>
        </CardContent>
      </Card>
      <Card style={{ width: "100%", height: "100%", overflow: "scroll" }}>
        <CardHeader title="Reports by hotel" />
        <CardContent
          style={{
            alignItems: "center",
            paddingLeft: "auto",
            paddingRight: "auto",
            paddingTop: "1.5%",
            paddingBottom: "1%",
          }}
        >
          <div style={{ width: "45rem", right: "28px" }}>
            <Bar
              data={{
                labels: Residarr,
                datasets: [
                  {
                    label: "No of orders",
                    data: noOfOrder,
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 206, 86, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(75, 192, 192, 1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
              height={400}
              width={600}
              options={{
                maintainAspectRatio: true,
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
