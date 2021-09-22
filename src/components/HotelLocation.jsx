import React from 'react'
import data from '../assets/data.json'
import HotelDisplay from './HotelDisplay'


function HotelLocation() {
    let arr=[]
    const userLoc = "pune"
    const exist = data.find((item) => item.location.toLowerCase() === userLoc);

    if(exist){
    data.map(item=>{
        if(userLoc===item.location.toLowerCase() && (item.rating===4 || item.rating===5)){
            arr.push(item.restaurantName+" "+"rating "+item.rating.toString()+" stars")
        }
    })
    }
    else{
        arr=["We dont provide service at this location"]
    }
    return (
        <div>
            {
            arr.map(item=>{
                return (
                <HotelDisplay res={item}/>
                );  
            })           
            }
            </div>
    )
}

export default HotelLocation
