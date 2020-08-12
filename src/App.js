import React, { Component } from "react";
import './App.css';
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import SingleRoom from "./pages/SingleRoom";

import Tours from "./pages/Tours";
import SingleTourPackage from "./pages/SingleTourPackage";

import Places from "./pages/Places";
import SinglePlace from "./pages/SinglePlace";

import Error from "./pages/Error";
import Navbar from "./components/Navbar";
import {Route, Switch, BrowserRouter} from 
'react-router-dom';

import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import PlanTrip from "./pages/PlanTrip";

import Blog from "./components/blog/list-posts"
import AddPost from "./components/blog/add-post"
import SinglePost from "./components/blog/single-post"
import UserPosts from "./components/blog/list-user-post"

import Profile from "./components/profile/profile"
import ResetPassword from "./components/profile/reset-password"
import ForgotPassword from "./components/profile/forgot-password"

import firebase from './components/firebase'

class App extends Component{

  componentDidMount(){
    console.log("FIRE",firebase);
  }
render(){
  return (

    <BrowserRouter>
    <Navbar />
    
    <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/rooms/" component={Rooms}/>
    <Route exact path="/rooms/:slug" component={SingleRoom}/>
    
    <Route exact path="/tours/" component={Tours}/>
    <Route exact path="/tours/:slug" component={SingleTourPackage}/>
    
    <Route exact path="/places/" component={Places}/>
    <Route exact path="/places/:slug" component={SinglePlace}/>
    
     <Route exact path='/login' component={Login}/>
     <Route exact path='/signup' component={SignUp}/>
    
     <Route exact path='/plans' component={PlanTrip}/>

     <Route exact path='/blog' component={Blog}/>
     <Route exact path='/blog/:slug' component={SinglePost}/>
     <Route exact path='/blog/new/add-post' component={AddPost}/>
     <Route exact path='/blog/my/posts' component={UserPosts}/>

     <Route exact path='/profile' component={Profile}/>
     <Route exact path='/reset-password' component={ResetPassword}/>
     <Route exact path='/forgot-password' component={ForgotPassword}/>
    
    <Route component={Error}/>
    
    </Switch>
    </BrowserRouter>
  );
}
}

export default App;
