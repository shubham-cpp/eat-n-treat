import React from "react";

import RestaurantCard from "./RestaurantCard";

export default function RestaurantList(props) {
    return (
        <div className="container-fluid">
            <div className="row flex-row p-5">
                {props.restaurants.map(restaurant => {
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