import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from
    'react-router-dom'

import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from './context'
import { PlaceProvider } from './placecontext'

import { PlanProvider } from './plancontext'

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
            <PlanProvider>
                <PlaceProvider>
                    <App />
                </PlaceProvider>
            </PlanProvider>
        </Router>
    </Provider>
    ,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
