import React, { Component } from 'react'
import './blog.css'
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
                        <div className="container">
                            <img src={thumbnail} alt="Avatar" class="image" />
                            <h1 className="overlay">{title} </h1>
                        </div>

                        <div className="single-post-container">
                            <article className="descrip">
                                <h3>Details</h3>
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
