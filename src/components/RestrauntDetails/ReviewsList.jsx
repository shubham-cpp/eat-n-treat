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
  IconButton,
  Modal,
  Box,
  Typography,
} from "@material-ui/core";

import { Person, Close } from "@material-ui/icons";
import ReactStars from "react-rating-stars-component";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  //   height: 600,
  bgcolor: "background.paper",
  border: "1px solid #141414",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const ReviewsList = (props) => {
  const [reviews, setReviews] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [editing, setEditing] = useState(false);
  const [currentReview, setCurrentReview] = useState("");
  const [currentCustomer, setCurrentCustomer] = useState("");

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

  const editReview = (e) => {
    e.preventDefault();
    if (reviewText.trim() === "") {
      alert("Review Should not be empty");
    }
    axios
      .patch(`/restaurant/reviews/${props.id}`, {
        rating: rating,
        reviewText: reviewText,
        user: userId,
      })
      .then((res) => {
        console.log(res.data.reviews);
        let revIndex = res.data.reviews.findIndex((r) => {
          return userId === r.userID;
        });
        if (revIndex !== null) {
          console.log(
            res.data.reviews.unshift(res.data.reviews.splice(revIndex, 1)[0])
          );
        }
        setReviews(res.data.reviews);
        setEditing(false);
      })
      .catch((err) => console.log(err));
  };

  // const handleEditing = (e) => {
  //   setEditing(true);
  //   setCurrentReview(reviews.splice(0, 1)[0]);
  //   setReviews(reviews);
  // };

  // const cancelEditing = (e) => {
  //   e.preventDefault();
  //   reviews.unshift(currentReview);
  //   setReviews(reviews);
  //   setEditing(false);
  // };

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
  }, [props.id, userId]);

  return (
    <>
      {editing ? (
        <Modal
          open={editing}
          onClose={() => setEditing(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <IconButton
              onClick={() => setEditing(false)}
              style={{ float: "right" }}
            >
              <Close />
            </IconButton>
            <Typography
              id="signup-modal-title"
              variant="h5"
              component="h5"
              textAlign="center"
              fontWeight="bold"
              align="center"
            >
              Enter New Review
            </Typography>
            <ListItem>
              <Avatar>
                <Person style={{ fontSize: 25 }} />
              </Avatar>
              <ListItemText
                style={{
                  overflowWrap: "normal",
                  marginLeft: "3%",
                  marginRight: "4%",
                }}
                primary={`${currentCustomer.customerFName} ${currentCustomer.customerLName}`}
              ></ListItemText>
            </ListItem>
            <TextareaAutosize
              minRows={8}
              placeholder="Enter your review"
              onChange={(event) => {
                console.log(event.target.value);
                setReviewText(event.target.value);
              }}
              style={{
                margin: "4%",
                maxWidth: "40.2rem",
              }}
              required
              title="Review should not be empty"
            />
            <div className="modalRatingStar">
              <ReactStars
                count={5}
                edit={true}
                size={35}
                isHalf={false}
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
                style={{
                  backgroundColor: "teal",
                  color: "white",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                onClick={(e) => {
                  editReview(e);
                }}
              >
                Submit
              </Button>
            </div>
          </Box>
        </Modal>
      ) : (
        <></>
      )}
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
            {userId &&
            reviews.find((r) => userId === r.userID) === undefined ? (
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
                  <div className="ratingStar">
                    <ReactStars
                      count={5}
                      edit={true}
                      size={20}
                      isHalf={false}
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
                  if (
                    review.userID === customer._id &&
                    customer._id === userId
                  ) {
                    console.log(review);
                  }
                  return (
                    <>
                      <ListItem
                        key={customer._id}
                        style={{ overflowWrap: "none" }}
                      >
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
                        <div className="ratingStar">
                          {!editing ? (
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
                          ) : (
                            <></>
                          )}
                          {/* <p>{`${review.rating}/5`}</p> */}
                          <br />
                          {review.userID === customer._id &&
                          customer._id === userId &&
                          !editing ? (
                            <Button
                              style={{
                                backgroundColor: "teal",
                                color: "white",
                              }}
                              onClick={(e) => {
                                e.preventDefault();
                                setEditing(true);
                                setCurrentCustomer(customer);
                              }}
                            >
                              Edit your review
                            </Button>
                          ) : (
                            <></>
                          )}
                        </div>
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
    </>
  );
};

export default ReviewsList;
