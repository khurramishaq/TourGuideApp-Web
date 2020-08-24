import React, { useEffect, useState } from 'react'

export default function PlaceMeta({ meta }) {
    const [cost, setCost] = useState(0);
    useEffect(() => {
        setCost(Math.round(((meta.distanceValue / 1000) / 12) * 100));
    });
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
                <p className="value">{cost}</p>
                <p>Travel Cost</p>
            </div>
        </div>
    )
}
