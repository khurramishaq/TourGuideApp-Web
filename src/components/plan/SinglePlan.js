import React, { useEffect, useState } from 'react'
import Title from '../Title'
import Place from './Place';
import PlaceMeta from './PlaceMeta';
import Nearby from './Nearby';
import firebase from '../firebase'
import Loader from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';

const SinglePlan = (props) => {

    const [id, setId] = useState(props.match.params.id);
    const [plan, setPlan] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // console.log(id)
        fetchPlan();
    }, []);

    const fetchPlan = () => {
        firebase.firestore()
            .collection("plans")
            .doc(id)
            .get()
            .then(async snapshot => {
                setPlan(snapshot.data());
                setLoading(false);
            }).catch(error => {
                setLoading(false);
                var errorMessage = error.message;
                toast.error(errorMessage)
            });;
    }

    return (
        <div>
            {loading ?
                <div
                    style={{
                        backgroundColor: "#ffff",
                        minHeight: window.innerHeight,
                        height: window.innerHeight
                    }}>
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                        <Loader type="ThreeDots" color="#072100" height="100" width="100" />

                    </div>
                </div>
                :
                <div className="container">
                    <div className="wrapper-search">
                        <Title title={`${plan.searchedPlace.name} Trip`}></Title>

                        <Place place={{ placeID: id, description: plan.searchedPlace.address, city: plan.searchedPlace.name }} />
                        <Nearby places={plan.nearbyRestaurantsOfPlace} del={false} />
                        <PlaceMeta
                            meta={{
                                distance: plan.distanceFromSelectedPlace.text,
                                duration: plan.durationFromSelectedPlace.text,
                                distanceValue: plan.distanceFromSelectedPlace.value
                            }} />
                    </div>
                </div>
            }
            <ToastContainer />
        </div >

    )
}
export default SinglePlan