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
import axios from 'axios';
import firebase from '../firebase'
import { ToastContainer, toast } from 'react-toastify';

const Plan = () => {

    const [description, setDescription] = useState("");
    const [placeID, setPlaceID] = useState("");
    const [city, setCity] = useState("");
    const [currentLatLng, setCurrentLatLng] = useState({});
    const [LatLng, setLatLng] = useState({});
    const [distance, setDistance] = useState("");
    const [duration, setDuration] = useState("");
    const [distanceValue, setDistanceValue] = useState(0);
    const [durationValue, setDurationVlaue] = useState(0);
    const [nearBy, setNearBy] = useState([]);
    const [dis, setDis] = useState(false)
    const [met, setMet] = useState(false)
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setCurrentLatLng({ lat: position.coords.latitude, lng: position.coords.longitude })
            // console.log("Latitude is :", position.coords.latitude);
            // console.log("Longitude is :", position.coords.longitude);
            // getNearBy({ lat: position.coords.latitude, lng: position.coords.longitude });
        });

    }, []);

    function _handleDelete(index) {
        nearBy.splice(index, 1);
        setNearBy([...nearBy]);
    }


    const getNearBy = async (LatLng) => {
        const response = await axios({
            // `url` is the server URL that will be used for the request
            url: '/nearby',

            // `method` is the request method to be used when making the request
            method: 'get', // default

            // `baseURL` will be prepended to `url` unless `url` is absolute.
            // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
            // to methods of that instance.
            baseURL: 'http://localhost:5000/',

            // `params` are the URL parameters to be sent with the request
            // Must be a plain object or a URLSearchParams object
            params: {
                lat: LatLng.lat,
                lng: LatLng.lng
            },
        });
        let {
            result,
            message
        } = response.data
        if (result === undefined) {
            // console.log(message)
            toast.error(message)
        } else {
            setNearBy(result);
            // console.log(result)
        }
    }

    const handleSubmit = () => {
        setSubmitting(true);
        const searchedPlace = {
            name: city,
            address: description,
            placeID: placeID,
            rating: 0
        }
        const distanceFromSelectedPlace = {
            text: distance,
            value: distanceValue
        };
        const durationFromSelectedPlace = {
            text: duration,
            value: durationValue
        };
        const nearbyRestaurantsOfPlace = nearBy;
        const createdBy = window.localStorage.getItem("email");

        firebase
            .firestore()
            .collection("plans")
            .doc(placeID)
            .set({
                searchedPlace,
                distanceFromSelectedPlace,
                durationFromSelectedPlace,
                nearbyRestaurantsOfPlace,
                createdBy
            }).then(() => {
                toast.success("you have successfully saved plan!")
                setSubmitting(false);
                setDescription("");
                setPlaceID("");
                setCity("");
                setCurrentLatLng({});
                setLatLng({});
                setDistance("");
                setDuration("");
                setDistanceValue(0);
                setDurationVlaue(0);
                setNearBy([]);
                setDis(false);
                setMet(false);
            }).catch(error => {
                var errorMessage = error.message;
                // console.log(errorMessage)
                toast.error(errorMessage)
                setSubmitting(false);
            });
    }

    return (
        <div className="container">
            <div className="wrapper-search">
                <Title title="Plan a trip"></Title>
                <GooglePlacesAutocomplete
                    onSelect={(result) => {
                        // console.log(result)
                        setPlaceID(result.place_id);
                        setDescription(result.description);
                        setCity(result.terms[0].value)
                        geocodeByAddress(result.description)
                            .then(results => getLatLng(results[0]))
                            .then(({ lat, lng }) => {
                                setLatLng({ lat, lng });
                                getNearBy({ lat, lng });
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
                                setDistanceValue(response.rows[0].elements[0].distance.value);
                                setDurationVlaue(response.rows[0].elements[0].duration.value);
                                setMet(true)
                            }}
                        />
                        {met &&
                            <>
                                <Place place={{ placeID, description, city }} />
                                <Nearby places={nearBy} _handleDelete={_handleDelete} del={true} />
                                <PlaceMeta meta={{ distance, duration, distanceValue }} />
                                <button
                                    className="add-plan"
                                    enabled={submitting}
                                    onClick={handleSubmit}>
                                    {submitting ? "Please wait...." : "Add Plan"}
                                </button>
                            </>
                        }

                    </>
                }
            </div>
            <ToastContainer />
        </div>
    )
}

export default Plan
// place_id