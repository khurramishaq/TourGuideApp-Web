import React, { Component } from 'react';
// import '../auth/login.css'
import firebase from '../firebase'
import { ToastContainer, toast } from 'react-toastify';


class ResetPassword extends Component {

    state =
        {
            currentPassword: "",
            newPassword: "",
            reset: "Reset Password",
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
        this.changePassword(this.state.currentPassword, this.state.newPassword);

    }

    changePassword = (currentPassword, newPassword) => {
        this.reauthenticate(currentPassword).then(() => {
            var user = firebase.auth().currentUser;
            user.updatePassword(newPassword).then(() => {

                console.log("Password updated!");
                toast.success("Password successfully updated!")
                this.setState({
                    currentPassword: '',
                    newPassword: '',
                    reset: "Reset Password",
                    enable: true
                })

            }).catch((error) => {

                console.log(error);
                var errorMessage = error.message;
                toast.error(errorMessage)
                this.setState({
                    reset: "Reset Password",
                    enable: true
                })

            });
        }).catch((error) => {

            console.log(error);
            toast.error("Authentication Failed!");
            window.localStorage.removeItem("isLogged");
            window.localStorage.removeItem("email");
            window.location.replace("/");

        });
    }

    reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        console.log(user.email);
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
            
        return user.reauthenticateWithCredential(cred);
    }

    render() {
        let {
            reset,
            enable
        } = this.state
        return (
            <div className="container">
                <div class="wrapper">
                    <div class="title">
                        Reset Password
            </div>
                    <form class="form" onSubmit={this.handleSubmit}>

                        <div class="inputfield">
                            <label>Current Password</label>
                            <input
                                type="password"
                                class="input"
                                id="currentPassword"
                                onChange={this.handleChange}
                                required />
                        </div>
                        <div class="inputfield">
                            <label>New Password</label>
                            <input
                                type="password"
                                class="input"
                                id="newPassword"
                                onChange={this.handleChange}
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

export default ResetPassword
