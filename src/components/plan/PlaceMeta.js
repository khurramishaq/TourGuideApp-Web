import React from 'react'

export default function PlaceMeta({meta}) {
    return (
        <div className="place-meta">
            <div id="distance">
                <p className="value">{meta.distance}</p>
                <p>Distance</p>
            </div>
            <div id="time">
                <p className="value">{meta.duration}</p>
                <p>Duration</p>
            </div>
            <div id="cost">
                <p className="value"> 192.27</p>
                <p>Travel Cost</p>
            </div>
        </div>
    )
}
