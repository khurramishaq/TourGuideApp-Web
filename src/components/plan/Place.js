import React from 'react'
import { FaStar } from 'react-icons/fa';
import { MdLocationOn } from "react-icons/md";

export default function Place({place}) {
    return (
        <div className="wrapper-place">
            <p className="place-id">Place ID: {place.placeID}</p>
            <h3>{place.city}</h3>
            <p className="place-description">
                <span><FaStar /></span>0,  
                <span> <MdLocationOn /> </span> 
                {place.description}</p>
        </div>
    )
}
