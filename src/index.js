import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {BrowserRouter as Router} from 
'react-router-dom'

import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from './context'
import {PlaceProvider} from './placecontext'
<<<<<<< HEAD
=======
import {TourProvider} from './tourcontext'
import {PlanProvider} from './plancontext'
>>>>>>> parent of 154c679... Home Page updated

import 'react-toastify/dist/ReactToastify.css';

// import './components/css/font-awesome.css'
// import * as firebase from './components/firebase';

// // var firebaseConfig = {
// //     apiKey: "AIzaSyDcsKN8jRQZzty_gFqcE7Nv_jD5CQeksGA",
// //     authDomain: "tourguideapplication-2ec9d.firebaseapp.com",
// //     databaseURL: "https://tourguideapplication-2ec9d.firebaseio.com",
// //     projectId: "tourguideapplication-2ec9d",
// //     storageBucket: "tourguideapplication-2ec9d.appspot.com",
// // }
// firebase.initializeApp(firebaseConfig);

ReactDOM.render(

<Provider>
<Router>
<PlaceProvider>
<App />
</PlaceProvider>
</Router>
</Provider>
,
 document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
