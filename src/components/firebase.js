import * as firebase from "firebase";
import "firebase/firestore"
import 'firebase/auth';

var firebaseConfig = {
  apiKey: "AIzaSyDcsKN8jRQZzty_gFqcE7Nv_jD5CQeksGA",
  authDomain: "tourguideapplication-2ec9d.firebaseapp.com",
  databaseURL: "https://tourguideapplication-2ec9d.firebaseio.com",
  projectId: "tourguideapplication-2ec9d",
  storageBucket: "tourguideapplication-2ec9d.appspot.com",
  messagingSenderId: "989267935189",
  appId: "1:989267935189:web:7026d39b9db54328d9875c",
  measurementId: "G-GN7VJ4DXQH"
};
let Firebase;

if (!firebase.apps.length) {
  Firebase = firebase.initializeApp(firebaseConfig);

}


export default Firebase;
