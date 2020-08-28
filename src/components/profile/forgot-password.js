import React, { Component } from 'react';
// import '../auth/login.css'
import firebase from '../firebase'
import { ToastContainer, toast } from 'react-toastify';


class ForgotPassword extends Component {

    state =
        {
            email: "",
            reset: "Submit",
            enable: true
        }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.currentPassword);
        console.log(this.state.newPassword);
        this.setState({
            reset: "Please wait....",
            enable: false
        })
        firebase.auth().sendPasswordResetEmail(this.state.email).then(() => {
            this.setState({
                email: "",
                reset: "Submit",
                enable: true
            })
            toast.success("Password Reset Link Sent your Email!")
        }).catch(error => {
            this.setState({
                reset: "Submit",
                enable: true
            })
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
            toast.error(errorMessage)
        });

    }

    render() {
        let {
            email,
            reset,
            enable
        } = this.state
        return (
            <div className="container">
                <div class="profile-wrapper">
                    <div class="title">
                        Forgot Password
            </div>
                    <form class="form" onSubmit={this.handleSubmit}>

                        <div class="inputfield">
                            <label>Email Address</label>
                            <input
                                type="email"
                                class="input"
                                id="email"
                                onChange={this.handleChange}
                                value={email}
                                required />
                        </div>
                        <div class="inputfield">
                            <input type="submit" value={reset} enabled={enable} class="btn" />
                        </div>
                    </form>
                </div>
                <ToastContainer />
            </div>
        )
    }
}

export default ForgotPassword
