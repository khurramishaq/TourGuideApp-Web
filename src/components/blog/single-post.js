import React, { Component } from 'react'
import './blog.css'
import defaultBcg from '../../images/room-1.jpeg'
import Banner from '../Banner'
import firebase from '../firebase'
import Loader from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';

export default class SinglePost extends Component {
    constructor(props) {
        super(props)
        //console.log(this.props);
        this.state = {
            slug: this.props.match.params.slug,
            defaultBcg,
            title: "",
            description: "",
            thumbnail: "",
            show: false,
            loading: true
        };

    }

    componentDidMount() {
        this.fetchPost();
    }

    fetchPost = () => {
        firebase.firestore()
            .collection("BLOG")
            .doc(this.state.slug)
            .get()
            .then(async snapshot => {
                console.log(snapshot.data())
                this.setState({
                    title: snapshot.data().title,
                    description: snapshot.data().description,
                    thumbnail: snapshot.data().thumbnail,
                    show: true,
                    loading: false
                })
            }).catch(error => {
                this.setState({
                    loading: false
                })
                var errorMessage = error.message;
                console.log(errorMessage)
                toast.error(errorMessage)
            });;
    }
    render() {
        let {
            title,
            description,
            thumbnail,
            show,
            loading
        } = this.state
        return (
            <>
                {loading ?
                    <div
                        style={{
                            backgroundColor: "#ffff",
                            height: window.innerHeight
                        }}>>
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
                    <>
                        
                            <div className="container">
                                    <img src={thumbnail} className="center" id="imageAlign"  alt="Avatar" />
                                <h1 id="overlayAlign">{title} </h1>
                            </div>

                            <div className="single-post-container">
                                <article className="descrip">
                                    <h3>Description</h3>
                                    <p>{description}</p>
                                </article>

                            </div>
                    </>
                }
                <ToastContainer />
            </>
        )
    }
}
