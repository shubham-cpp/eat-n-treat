import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Card,
  CardContent,
  CardHeader,
  List,
  Avatar,
  ListItem,
} from "@material-ui/core";

const ReviewsList = (props) => {
  const [reviews, setReviews] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios
      .get(`/restaurant/reviews/${props.id}`)
      .then((res) => {
        console.log(res.data);
        setReviews(res.data.reviews);
      })
      .catch((err) => console.log(err));

    axios
      .get("/customer/")
      .then((res) => {
        console.log(res.data);
        setCustomers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Card
      style={{
        height: "90vh",
        width: "100%",
        overflowY: "scroll",
        marginTop: "3%",
      }}
    >
      <CardHeader title={`Showing ${reviews.length} Review(s)`} />
      <CardContent
        style={{
          alignItems: "center",
          //   paddingLeft: "auto",
          //   paddingRight: "auto",
          paddingTop: "1.5%",
          paddingBottom: "1%",
        }}
      >
        <List component="div">
          {reviews.map((review) => {
            return (
              <ListItem>
                <Avatar></Avatar>
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
};

export default ReviewsList;
