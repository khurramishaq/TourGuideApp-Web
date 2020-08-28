import React, { Component } from 'react';
import './login.css'
import {Link} from 'react-router-dom'
import firebase from '../firebase'
import { ToastContainer, toast } from 'react-toastify';


class Login extends Component {

  state =
    {
      email: '',
      password: '',
      login: "Login",
      enable: true
    }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      login: "Please wait....",
      enable: false
    })

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        toast.success("you have successfully logged in!")
        window.localStorage.setItem("isLogged", true);
        window.localStorage.setItem("email", this.state.email);
        window.location.replace("/");

      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
        toast.error(errorMessage)
        // ...
      });
  }

  render() {
    let {
      login,
      enable
    } = this.state
    return (
      <div className="container">
        <div class="wrapper">
          <div class="title">
            Login Form
          </div>
          <form class="form" onSubmit={this.handleSubmit}>
            
            <div class="inputfield">
              <label>Email Address</label>
              <input 
                type="text" 
                class="input" 
                id="email" 
                onChange={this.handleChange} 
                required/>
            </div>
            <div class="inputfield">
              <label>Password</label>
              <input 
                type="password" 
                class="input" 
                id="password" 
                onChange={this.handleChange} 
                required/>
            </div>
            <div class="inputfield">
              <input type="submit" value={login} enabled={enable} class="btn" />
            </div>
          </form>
          <div class="forgotfield">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
        </div>
        <ToastContainer />
      </div>
    )
  }
}

export default Login
