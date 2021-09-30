import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Card,
  CardContent,
  CardHeader,
  List,
  Avatar,
  ListItem,
  Divider,
  ListItemText,
  TextareaAutosize,
  Button,
} from "@material-ui/core";

import { Person } from "@material-ui/icons";
import ReactStars from "react-rating-stars-component";

const ReviewsList = (props) => {
  const [reviews, setReviews] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const userId = sessionStorage.getItem("custId");

  const submitReview = (e) => {
    e.preventDefault();
    if (reviewText.trim() === "") {
      alert("Review Should not be empty");
    }
    axios
      .post(`/restaurant/reviews/${props.id}`, {
        rating: rating,
        reviewText: reviewText,
        user: userId,
      })
      .then((res) => {
        let revIndex = res.data.reviews.findIndex((r) => {
          return userId === r.userID;
        });
        if (revIndex !== null) {
          console.log(
            res.data.reviews.unshift(res.data.reviews.splice(revIndex, 1)[0])
          );
        }
        setReviews(res.data.reviews);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`/restaurant/reviews/${props.id}`)
      .then((res) => {
        console.log(res.data);

        let revIndex = res.data.reviews.findIndex((r) => {
          return userId === r.userID;
        });
        if (revIndex !== null) {
          console.log(
            res.data.reviews.unshift(res.data.reviews.splice(revIndex, 1)[0])
          );
        }

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
          {userId && reviews.find((r) => userId === r.userID) === undefined ? (
            <>
              <ListItem style={{ overflowWrap: "none" }}>
                <Avatar>
                  <Person style={{ fontSize: 25 }} />
                </Avatar>
                <TextareaAutosize
                  minRows={4}
                  placeholder="Enter your review"
                  onChange={(event) => {
                    console.log(event.target.value);
                    setReviewText(event.target.value);
                  }}
                  style={{
                    marginLeft: "3%",
                    marginRight: "4%",
                    maxWidth: "40.2rem",
                  }}
                  required
                  title="Review should not be empty"
                />
                <div style={{ right: 3 }}>
                  <ReactStars
                    count={5}
                    edit={true}
                    size={20}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                    onChange={(newRating) => {
                      console.log(newRating);
                      setRating(Number(newRating));
                    }}
                  />
                  <br />
                  <Button
                    style={{ backgroundColor: "teal", color: "white" }}
                    onClick={(e) => {
                      submitReview(e);
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </ListItem>
              <Divider />
            </>
          ) : (
            <></>
          )}

          {reviews.map((review) => {
            return customers.map((customer) => {
              //   console.log(customer);
              //console.log(customer._id === review.userID);
              if (customer._id === review.userID) {
                return (
                  <>
                    <ListItem style={{ overflowWrap: "none" }}>
                      <Avatar>
                        <Person style={{ fontSize: 25 }} />
                      </Avatar>
                      <ListItemText
                        style={{
                          overflowWrap: "normal",
                          marginLeft: "3%",
                          marginRight: "4%",
                        }}
                        primary={`${review.reviewText}`}
                        secondary={`${customer.customerFName} ${customer.customerLName}`}
                      />
                      <ReactStars
                        count={5}
                        value={review.rating}
                        edit={false}
                        size={20}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                      />
                    </ListItem>
                    <Divider />
                  </>
                );
              } else {
                return <></>;
              }
            });
          })}
        </List>
      </CardContent>
    </Card>
  );
};

export default ReviewsList;
