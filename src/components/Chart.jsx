import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { width } from "@mui/system";
function Chart() {
  const [orders, setOrders] = useState([]);

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

  console.log(Residarr);
  console.log(noOfOrder);
  return (
    <div style={{ marginTop: "5rem", right: "28px" }}>
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
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
}

export default Chart;
