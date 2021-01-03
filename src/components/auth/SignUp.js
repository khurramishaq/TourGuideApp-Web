import React, { Component } from 'react';
import firebase from '../firebase';
import { ToastContainer, toast } from 'react-toastify';

class SignUp extends Component {

        constructor(props) {
                super(props)
                this.state = {
                        fullName: '',
                        email: '',
                        phone: '',
                        cnic: '',
                        passport: '',
                        dob: '',
                        gender: '',
                        password: '',
                        reEnter: '',
                        register: "Register",
                        enable: true
                }
        };


        handleChange = (e) => {
                this.setState({
                        [e.target.id]: e.target.value
                })
        }

        handleSubmit = (e) => {
                e.preventDefault();
                this.setState({
                        register: "Please wait ......",
                        enable: false
                });
                firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(async () => {
                        firebase
                                .firestore()
                                .collection("users")
                                .doc(this.state.email)
                                .set({
                                        name: this.state.fullName,
                                        email: this.state.email,
                                        phone: this.state.phone,
                                        cnic: this.state.cnic,
                                        passport: this.state.passport,
                                        dob: this.state.dob,
                                        gender: this.state.gender,
                                        password: this.state.password
                                }).then(() => {
                                        window.localStorage.setItem("isLogged", true);
                                        window.localStorage.setItem("email", this.state.email);
                                        this.setState({
                                                fullName: '',
                                                email: '',
                                                phone: '',
                                                cnic: '',
                                                passport: '',
                                                dob: '',
                                                gender: '',
                                                password: '',
                                                reEnter: ''
                                        });
                                        toast.success("you have successfully register in!")
                                        window.location.replace("/");
                                }).catch(error => {
                                        var errorMessage = error.message;
                                        console.log(errorMessage)
                                        toast.error(errorMessage)
                                });

                }).catch(error => {
                        // Handle Errors here.
                        var errorMessage = error.message;
                        console.log(errorMessage)
                        toast.error(errorMessage)
                })
        }

        render() {
                let {
                        register,
                        enable
                } = this.state
                return (
                        <>
                                <div
                                        style={{
                                                width: "100%",
                                                height: "100%",
                                                display: "flex",
                                                backgroundColor: "#ffff",
                                                justifyContent: "center",
                                                alignItems: "center"
                                        }}>
                                        <div className="container">
                                                <div class="wrapper">
                                                        <div class="title">
                                                                Registration Form
          </div>
                                                        <form class="form" onSubmit={this.handleSubmit}>
                                                                <div class="inputfield">
                                                                        <label>Full Name</label>
                                                                        <input
                                                                                type="text"
                                                                                class="input"
                                                                                id="fullName"
                                                                                onChange={this.handleChange}
                                                                                required />
                                                                </div>
                                                                <div class="inputfield">
                                                                        <label>Email Address</label>
                                                                        <input
                                                                                type="text"
                                                                                class="input"
                                                                                id="email"
                                                                                onChange={this.handleChange}
                                                                                required />
                                                                </div>
                                                                <div class="inputfield">
                                                                        <label>Contact</label>
                                                                        <input
                                                                                type="text"
                                                                                class="input"
                                                                                id="phone"
                                                                                onChange={this.handleChange}
                                                                                required />
                                                                </div>
                                                                <div class="inputfield">
                                                                        <label>CNIC</label>
                                                                        <input
                                                                                type="text"
                                                                                class="input"
                                                                                id="cnic"
                                                                                onChange={this.handleChange}
                                                                                required />
                                                                </div>
                                                                <div class="inputfield">
                                                                        <label>Passport#</label>
                                                                        <input
                                                                                type="text"
                                                                                class="input"
                                                                                id="passport"
                                                                                onChange={this.handleChange}
                                                                                required />
                                                                </div>
                                                                <div class="inputfield">
                                                                        <label>D.O.B</label>
                                                                        <input
                                                                                type="date"
                                                                                class="input"
                                                                                id="dob"
                                                                                onChange={this.handleChange}
                                                                                required />
                                                                </div>
                                                                <div class="inputfield">
                                                                        <label>Gender</label>
                                                                        <div class="custom_select">
                                                                                <select id="gender" onChange={this.handleChange} required>
                                                                                        <option value="">Select</option>
                                                                                        <option value="male">Male</option>
                                                                                        <option value="female">Female</option>
                                                                                        <option value="female">Other</option>
                                                                                </select>
                                                                        </div>
                                                                </div>
                                                                <div class="inputfield">
                                                                        <label>Password</label>
                                                                        <input
                                                                                type="password"
                                                                                class="input"
                                                                                id="password"
                                                                                onChange={this.handleChange}
                                                                                required />
                                                                </div>
                                                                <div class="inputfield">
                                                                        <label>Confirm Password</label>
                                                                        <input
                                                                                type="password"
                                                                                class="input"
                                                                                id="reEnter"
                                                                                onChange={this.handleChange}
                                                                                required />
                                                                </div>
                                                                <div class="inputfield">
                                                                        <input type="submit" value={register} enabled={enable} class="btn" />
                                                                </div>
                                                        </form>
                                                </div>

                                                <ToastContainer />
                                        </div>
                                </div>

                        </>
                )
        }
}

export default SignUp
