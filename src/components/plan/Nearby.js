import React from 'react'
import { FaStar } from 'react-icons/fa';
import { MdLocationOn, MdDelete } from "react-icons/md";

export default function Nearby({ places, _handleDelete, del }) {

    const cancelStyle = {
        fontSize: "15px",
        marginBottom: "-3px",
        textAlign: "center",
        marginLeft: "50px",
        cursor: "pointer"
    }

    const handleDelete = (id) => {
        _handleDelete(id)
    }


    return (

        <>
            <div className="nearby-container">
                <h3 className="nearby-header">NearBy Hotels / Restaurants & Places</h3>
                <div className="wrapper-nearby">
                    {places.map((place, index) => (
                        <>
                            {/* <div className="columns">
                                <div className="left-col" > */}
                            <p className="place-id">Place ID: {place.place_id}
                                {del && <MdDelete style={cancelStyle} onClick={() => handleDelete(index)} />}
                            </p>
                            <h4>{place.name}</h4>
                            <p className="place-description">
                                <span><FaStar /></span>{place.rating ? place.rating : 0},
                                        <span> <MdLocationOn /> </span>
                                {place.vicinity}</p>
                            {/* </div>
                                <div className="right-col" >
                                    
                                </div>
                            </div> */}
                        </>
                    ))}
                </div>
            </div>
        </>
    )
}
