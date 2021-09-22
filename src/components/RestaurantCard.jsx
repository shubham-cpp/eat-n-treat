import React, { useRef, useEffect } from "react";
import { Link } from 'react-router-dom';

export default function RestaurantCard(props) {
    // var scrollRef = useRef();

    // useEffect(() => {
    //     scrollRef.current.addEventListener('mousewheel', horizontalScroll, false)
    // }, [])

    // const horizontalScroll = (e) => {
    //     e = window.event || e;
    //     var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    //     scrollRef.current.scrollLeft -= (delta * 40); // Multiplied by 40
    //     e.preventDefault();
    // }

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
                    <div className="flex-nowrap-scrollableDiv" style={{height: "80px", width: "120px",overflowY:"scroll"}} >
                        {
                            props.restaurant.cuisines.map(cuisine => {
                                return (
                                    <div className="chip" >
                                        { cuisine }
                                    </div>
                                );
                            })
                        }
                    </div> <br />
                    {props.restaurant.location} <br />
                    Ratings: <br />
                    {props.restaurant.rating}/5
                </div>
                <Link to={`/restaurant/${props.restaurant.restaurantID}`} className="btn btn-primary">VIEW MORE</Link>
            </div>
             
        </div>
    );
}