import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

export default function RestaurantCard(props) {
  let scrollRef = useRef();
  const restaurant = props.restaurant;

  useEffect(() => {
    scrollRef.current.addEventListener("mousewheel", horizontalScroll, false);
  }, []);

  const horizontalScroll = (e) => {
    e = window.event || e;
    var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
    scrollRef.current.scrollLeft -= delta * 40; // Multiplied by 40
    e.preventDefault();
  };

  return (
    <div className="card">
      <img
        src={restaurant.resturanturl}
        width="200"
        height="200"
        className="card-img-top"
        alt="..."
      />
      <div className="card-body1">
        <h5 className="card-title">{restaurant.restaurantName}</h5>
        <div className="card-text">
          <div className="flex-nowrap scrollableDiv" ref={scrollRef}>
            {restaurant.cuisine.map((cuis, index) => {
              return (
                <div
                  key={index}
                  className="chip"
                  style={{ width: "fit-content" }}
                >
                  {cuis}
                </div>
              );
            })}
          </div>{" "}
          <br />
          {restaurant.rCity} <br />
          Ratings: <br />
          <ReactStars
            count={5}
            value={restaurant.rating}
            edit={false}
            size={24}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
          />
          {restaurant.rating.toFixed(1)}/5
        </div>
        <Link to={`/restaurant/${restaurant._id}`} className="btn btn-primary">
          VIEW MORE
        </Link>
      </div>
    </div>
  );
}
