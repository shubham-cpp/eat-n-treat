import React from 'react'

export default function RestaurantDetails(props) {
    return (
        <div>
            { props.match.params.id }
        </div>
    )
}
