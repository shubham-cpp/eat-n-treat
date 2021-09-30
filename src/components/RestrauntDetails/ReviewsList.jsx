import React, { useEffect, useState } from "react";
import axios from "axios";

import { Card, CardContent, CardHeader } from "@material-ui/core";

const ReviewsList = (props) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`/reviews/${props.id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [reviews]);

  return (
    <Card style={{ height: "25vh", width: "100%", overflow: "scroll" }}>
      <CardHeader title="Reviews" />
      <CardContent></CardContent>
    </Card>
  );
};

export default ReviewsList;
