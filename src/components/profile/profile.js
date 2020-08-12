import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './profile.css'
import { FaEdit } from 'react-icons/fa';
import { FiMail, FiPhone } from 'react-icons/fi';
import firebase from '../firebase'
import Loader from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-responsive-modal/styles.css';
import Modal from 'react-responsive-modal';


export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: window.localStorage.getItem("email"),
            name: "------------",
            mobile: "-------------",
            loading: false,
            open: false,
            update: "Update",
            enable: true,
            newName: "",
            newMobile: "",
            n: false,
            m: false
        }
    }

    componentDidMount() {
        this.fetchProfile();
    }

    fetchProfile = () => {
        this.setState({
            loading: true
        })
        firebase
        .firestore()
        .collection("users")
        .doc(this.state.email)
        .get()
        .then(async snapShot => {
            this.setState({
                name: snapShot.data().name,
                mobile: snapShot.data().phone,
                email: snapShot.data().email,
                newName: snapShot.data().name,
                newMobile: snapShot.data().phone,
                loading: false
            })

        }).catch(error => {
            this.setState({
                loading: false
            })
            var errorMessage = error.message;
            console.log(errorMessage)
            toast.error(errorMessage)
        });
    }
    openModal = (att) => {

        this.setState({
            open: true,
            n: att === "name" ? true : false,
            m: att === "mobile" ? true : false
        })
    }
    closeModal = () => {
        this.setState({
            open: false
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let {
            email,
            newName,
            newMobile
        } = this.state
        this.setState({
            update: "Updating ........",
            enable: false,
        })
        firebase
        .firestore()
        .collection("users")
        .doc(email)
        .update({
            name: newName,
            phone: newMobile
        })
        .then(() => {
            toast.success("profile successfully updated!")
            this.setState({
                update: "Update",
                enable: true,
            })
            this.closeModal();
            this.fetchProfile();
        }).catch(error => {
            this.setState({
                update: "Updating ........",
                enable: true,
            })
            var errorMessage = error.message;
                console.log(errorMessage)
                toast.error(errorMessage)
        });
    }

    render() {
        let {
            email,
            name,
            mobile,
            loading,
            open,
            update,
            enable,
            newMobile,
            newName,
            n,
            m
        } = this.state
        return (
            <>
                <Modal
                    open={open}
                    onClose={this.closeModal}
                >
                    <div className="modal-header" />
                    <div className="container">
                        <div class="wrapper">
                            <div class="title">
                                Update Profile
                            </div>
                            <form class="form" onSubmit={this.handleSubmit}>
                                {n &&
                                    <div class="inputfield">
                                        <label>Name: </label>
                                        <input
                                            type="text"
                                            class="input"
                                            id="newName"
                                            value={newName}
                                            required 
                                            onChange={this.handleChange}/>
                                    </div>
                                }
                                {m &&
                                    <div class="inputfield">
                                        <label>Mobile</label>
                                        <input
                                            type="text"
                                            class="input"
                                            id="newMobile"
                                            value={newMobile}
                                            required 
                                            onChange={this.handleChange}/>
                                    </div>
                                }

                                <div class="inputfield">
                                    <input type="submit" value={update} enabled={enable} class="btn" />
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>
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
                    <div className="container">
                        <div class="wrapper">
                            <div className="title">
                                Profile
                            </div>
                            <div className="profile-img">
                                <img src={"https://coolbackgrounds.io/images/backgrounds/black/pure-black-background-f82588d3.jpg"} alt="profile img" />
                            </div>
                            <div className="name">
                                {name}
                                <Link onClick={() => this.openModal("name")}><FaEdit /></Link>
                            </div>
                            <div className="extra">
                                <div className="email">
                                    <span><FiMail /></span>
                                    {email}
                                </div>
                                <div className="mobile">
                                    <span><FiPhone /></span>
                                    {mobile}
                                    <Link onClick={() => this.openModal("mobile")}><FaEdit /></Link>
                                </div>
                            </div>
                            {/* <div className="other">
                                <Link to="/reset-password">
                                    Change Password
                                </Link>
                            </div> */}
                        </div>
                    </div>
                }

                <ToastContainer />
            </>
        )
    }
}


