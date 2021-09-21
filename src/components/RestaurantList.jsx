import React from "react";

import RestaurantCard from "./RestaurantCard";

export default function RestaurantList(props) {
    return (
        <div className="container">
            <div className="row flex-row">
                {
                    props.restaurants.map(restaurant => {
                        return (
                            <div className="col-3 pt-4">
                                <RestaurantCard restaurant={restaurant}/>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}