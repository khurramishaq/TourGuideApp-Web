import React, { useEffect, useState, useContext } from 'react'
import './plan.css'
import Title from '../Title'
import Place from './Place';
import PlaceMeta from './PlaceMeta';
import Nearby from './Nearby';
import GooglePlacesAutocomplete,
{
    getLatLng,
    geocodeByAddress
} from 'react-google-places-autocomplete';
// If you want to use the provided css
import 'react-google-places-autocomplete/dist/index.min.css';

import { DistanceMatrixService } from "@react-google-maps/api";

const Plan = () => {

    const [description, setDescription] = useState("");
    const [placeID, setPlaceID] = useState("");
    const [city, setCity] = useState("");
    const [currentLatLng, setCurrentLatLng] = useState({});
    const [LatLng, setLatLng] = useState({});
    const [distance, setDistance] = useState("");
    const [duration, setDuration] = useState("");
    const [dis, setDis] = useState(false)
    const [met, setMet] = useState(false)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setCurrentLatLng({ lat: position.coords.latitude, lng: position.coords.longitude })
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
        });

    }, [])

    function getDistance() {
        console.log("clicked......");
        console.log("Latitude is :", LatLng.lat);
        console.log("Longitude is :", LatLng.lng);
        setDis(true);

    }
    return (
        <div className="container">
            <div className="wrapper-search">
                <Title title="Plan a trip"></Title>
                <GooglePlacesAutocomplete
                    onSelect={(result) => {
                        console.log(result)
                        setPlaceID(result.place_id);
                        setDescription(result.description);
                        setCity(result.terms[0].value)
                        geocodeByAddress(result.description)
                            .then(results => getLatLng(results[0]))
                            .then(({ lat, lng }) => {
                                setLatLng({ lat, lng });
                            });
                        setDis(true)
                    }}
                    placeholder="Search City..."
                />
                {dis &&
                    <>
                        <DistanceMatrixService
                            options={{
                                destinations: [{ lat: LatLng.lat, lng: LatLng.lng }],
                                origins: [{ lng: currentLatLng.lng, lat: currentLatLng.lat }],
                                travelMode: "DRIVING",
                            }}
                            callback={(response) => {
                                console.log(response)
                                setDistance(response.rows[0].elements[0].distance.text);
                                setDuration(response.rows[0].elements[0].duration.text);
                                setMet(true)
                            }}
                        />
                        {met &&
                            <>
                                <Place place={{ placeID, description, city }} />
                                <Nearby />
                                <PlaceMeta meta={{distance, duration}}/>
                            </>
                        }

                    </>
                }
            </div>
        </div>
    )
}

export default Plan
// place_id