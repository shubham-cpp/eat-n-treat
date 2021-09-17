import React from "react";
import { Link, Switch, Route } from 'react-router-dom';

export default function RestaurantCard(props) {

    return (
        <div className="card">
            <img
                src="https://mdbootstrap.com/img/new/standard/nature/184.jpg"
                className="card-img-top"
                alt="..."
            />
            <div className="card-body">
                <h5 className="card-title">{props.restaurant.restaurantName}</h5>
                <p className="card-text">
                    {/* <div className="scrollableDiv" style={{ display: "d-flex flex-row flex-nowrap overflow-auto" }}>
                        {
                            props.restaurant.cuisines.map(cuisine => {
                                return (
                                    <div class="chip">
                                        { cuisine }
                                    </div>
                                );
                            })
                        }
                    </div> <br /> */}
                    {props.restaurant.location} <br />
                    Ratings: <br />
                    {props.restaurant.rating}/5
                </p>
                <button className="btn btn-primary">VIEW MORE</button>
            </div>
            <Switch>
                <Route path="/restaurant"/>
            </Switch> 
        </div>
    );
}