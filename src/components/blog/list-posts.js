import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './blog.css'
import { FaPlus, FaClipboardList } from 'react-icons/fa';
import Post from './post'
import firebase from '../firebase'
import Loader from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';

export default class Blog extends Component {
    state = {
        posts: [],
        loading: true,
        areas: [],
        cities: [],
        places: []
    }

    componentDidMount() {
        this.fetchPost();
        
    }

    fetchPost = () => {
        firebase.firestore()
            .collection("BLOG")
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
    
    render() {
        let {
            posts,
            loading
        } = this.state
        return (
            <div>
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
                        <section className="post-container">
                            <div className="post-container-center">
                                {posts.map((post) => <Post post={post} />)}
                            </div>
                        </section>

                        <div className="floating">
                            <Link to="/blog/my/posts" className="float" style={{ marginRight: 10 }}>
                                <FaClipboardList className="my-float" />
                            </Link>
                            <Link to="/blog/new/add-post" className="float">
                                <FaPlus className="my-float" />
                            </Link>
                        </div>
                    </>
                }
                <ToastContainer />
            </div>
        )
    }
}
