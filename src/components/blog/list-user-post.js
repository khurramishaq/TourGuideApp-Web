import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../firebase'
import Loader from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';


export default class Blog extends Component {
    state = {
        email: window.localStorage.getItem("email"),
        posts: [],
        loading: false
    }

    componentDidMount() {
        this.setState({
            loading: true
        })
        this.fetchPost();
    }

    fetchPost = () => {
        firebase.firestore()
            .collection("BLOG")
            .where("createdBy", "==", this.state.email)
            .get()
            .then(async snapshot => {
                let list = [];
                await snapshot.forEach((doc) => {
                    let post = {
                        id: doc.id,
                        title: doc.data().title,
                        slug: doc.data().slug,
                        thumbnail: doc.data().thumbnail,
                        description: doc.data().description
                    }

                    list.push(post);
                })
                this.setState({
                    posts: list,
                    loading: false
                })
                if (list.length === 0) {
                    toast.success("you don't have any post");
                }
            }).catch(error => {
                this.setState({
                    list: null,
                    loading: false
                })
                var errorMessage = error.message;
                console.log(errorMessage)
                toast.error(errorMessage)
            });;
    }

    removePost = (slug) => {
        firebase
            .firestore()
            .collection("BLOG")
            .doc(slug)
            .delete()
            .then(() => {
                toast.success("post successfully deleted!")
                this.fetchPost();
            }).catch(error => {
                var errorMessage = error.message;
                console.log(errorMessage)
                toast.error(errorMessage)
            });
    }
    render() {
        let {
            posts,
            loading
        } = this.state
        return (
            <div
                style={{
                    backgroundColor: "#ffff",
                    height: window.innerHeight
                }}>
                {loading ?
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
                    :

                    <>
                        <section className="my-post-container">
                            <div className="my-post-container-center">
                                {posts.map((post) => (
                                    <div className="room">
                                        <Link to={`/blog/${post.slug}`}>
                                            <div className="image-container">
                                                <img
                                                    src={post.thumbnail}
                                                    alt={post.title}
                                                />
                                            </div>
                                        </Link>
                                        <div className="title">
                                            <h3>
                                                <Link to={`/blog/${post.slug}`}>
                                                    {post.title}
                                                </Link>
                                                <Link to="#" onClick={() => {
                                                    if (window.confirm('Are you sure you wish to delete this item?')) {
                                                        this.removePost(post.slug);
                                                    }
                                                }} style={{ marginLeft: 5 }}> <FaTrash style={{ color: "red" }} /></Link>
                                            </h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </>
                }
                <ToastContainer />
            </div>
        )
    }
}
