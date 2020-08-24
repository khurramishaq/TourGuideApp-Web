import React, { useEffect, useState } from 'react'
import firebase from '../firebase'
import Loader from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Title from '../Title'

const MyPlan = () => {

    const [email, setEmail] = useState(window.localStorage.getItem("email"));
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchPlan();
    }, []);

    const fetchPlan = () => {
        firebase.firestore()
            .collection("plans")
            .where("createdBy", "==", email)
            .get()
            .then(async snapshot => {
                let list = [];
                await snapshot.forEach((doc) => {
                    let plan = {
                        id: doc.id,
                        data: doc.data()
                    }

                    list.push(plan);
                })
                // console.log(list)
                setPlans(list);
                setLoading(false);
            }).catch(error => {
                setLoading(false);
                var errorMessage = error.message;
                // console.log(errorMessage)
                toast.error(errorMessage)
            });;
    }
    const style = {
        maxWidth: "800px",
        width: "100%",
        height: 80,
        background: "#eee",
        margin: "15px auto",
        padding: "30px",
        verticalAlign: "middle",
        borderRadius: "5px"
    }
    const anchorStyle = {
        textDecoration: "none",
        cursor: "pointer",
        color: "#000"
    }
    return (
        <div className="container">
            <div className="wrapper-search">
                <Title title="Saved Plans"></Title>
                {loading ?
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                        <Loader type="ThreeDots" color="#af9a7d" height="100" width="100" />

                    </div>
                    :
                    <>
                        {plans.map(plan => (
                            <div style={style}>
                                <Link style={anchorStyle} to={`/plans/${plan.id}`}>
                                    <h4>{plan.data.searchedPlace.name}</h4>
                                </Link>
                            </div>
                        ))}
                    </>
                }
            </div>
            <ToastContainer />
        </div>
    )
}

export default MyPlan