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
            m: false,
            fileName: "",
            img: "",
            photo: ""
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
                    photo: snapShot.data().photoURL,
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

    // File select
    fileSelect = (e) => {
        let fullPath = e.target.files[0];
        console.log(fullPath)
        if (fullPath != null) {
            const name = fullPath.name;
            const type = fullPath.type;
            const lastDot = name.lastIndexOf('.');

            const fileName = name.substring(0, lastDot);

            this.setState({
                img: fullPath,
                photo: fullPath,
                fileName: `${fileName}`,
            });
            let reader = new FileReader();
            reader.onloadend = () => {
                //preview = reader.result;
                this.setState({
                    photo: reader.result
                });
            }
            reader.readAsDataURL(fullPath)
            this.handleUpdate(fullPath);

        }
    };

    // Uploading image to firebase
    uploadImage = async (image) => {

        const imageRef = firebase.storage().ref(`/profile/${image.name}`);
        await imageRef.put(image).catch((error) => {
            throw error;
        });
        const url = await imageRef.getDownloadURL().catch((error) => {
            throw error;
        });
        return url;
    };

    handleUpdate = (image) => {
        toast.info("please wait....")
        let {
            email
        } = this.state

        this.uploadImage(image).then((url) => {

            firebase.firestore().collection("users").doc(email).update({
                photoURL: url
            })
                .then(() => {
                    this.setState({
                        img: "",
                        fileName: "",
                        photo: url

                    });
                    toast.success("Profile Image updated!");
                }).catch(error => {
                    var errorMessage = error.message;
                    console.log(errorMessage)
                    toast.error(errorMessage)
                });
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
            m,
            photo
        } = this.state
        return (
            <>
                <Modal
                    open={open}
                    onClose={this.closeModal}
                >
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
                                            onChange={this.handleChange} />
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
                                            onChange={this.handleChange} />
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
                            height: window.innerHeight,
                            backgroundColor: "#ffff",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                        <Loader type="ThreeDots" color="#072100" height="100" width="100" />

                    </div>
                    :
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            height: window.innerHeight,
                            backgroundColor: "#ffff",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>>
                        <div className="container">
                            <div class="profile-wrapper">
                                <div className="title">
                                    Profile
                            </div>
                                <div className="profile-img">
                                    <img src={photo ? photo : "https://coolbackgrounds.io/images/backgrounds/black/pure-black-background-f82588d3.jpg"} alt="profile img" />
                                </div>
                                <div style={{ textAlign: "center", fontSize: 12 }}>
                                    <input type="file" name="file" id="file" class="inputfile" accept="image/*" onChange={this.fileSelect} />
                                    <label for="file">Update Profile Picture</label>
                                    {/* <Link style={{color: "#000"}} onClick={this.fileSelect}>Change Profile</Link> */}
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
                    </div>
                }

                <ToastContainer />
            </>
        )
    }
}


