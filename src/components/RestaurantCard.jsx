import React, { useRef, useEffect } from "react";
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';


export default function RestaurantCard(props) {
    var scrollRef = useRef();

    useEffect(() => {
        scrollRef.current.addEventListener('mousewheel', horizontalScroll, false)
    }, [])

    const horizontalScroll = (e) => {
        e = window.event || e;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        scrollRef.current.scrollLeft -= (delta * 40); // Multiplied by 40
        e.preventDefault();
    }

    return (
        <div className="card">
            <img
                src="https://mdbootstrap.com/img/new/standard/nature/184.jpg"
                className="card-img-top"
                alt="..."
            />
            <div className="card-body">
                <h5 className="card-title">{props.restaurant.restaurantName}</h5>
                <div className="card-text">
                    <div className="flex-nowrap scrollableDiv" ref={scrollRef}>
                        {
                            props.restaurant.cuisines.map(cuisine => {
                                return (
                                    <div className="chip" style={{ width: "fit-content", display: "inline-block" }}>
                                        { cuisine }
                                    </div>
                                );
                            })
                        }
                    </div> <br />
                    {props.restaurant.location} <br />
                    Ratings: <br />
                    <ReactStars
                        count={5}
                        value={props.restaurant.rating}
                        edit={false}
                        size={24}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                    />
                    {props.restaurant.rating}/5
                </div>
                <Link to={`/restaurant/${props.restaurant.restaurantID}`} className="btn btn-primary">VIEW MORE</Link>
            </div>
             
        </div>
    );
}