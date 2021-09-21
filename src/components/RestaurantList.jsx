import React from "react";

import RestaurantCard from "./RestaurantCard";

export default function RestaurantList(props) {
    return (
        <div className="container" style={{ marginTop: "130px" }}>
            <div className="row flex-row">
                {
                    props.restaurants.map(restaurant => {
                        return (
                            <div className="col-4 pt-4">
                                <RestaurantCard restaurant={restaurant}/>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}