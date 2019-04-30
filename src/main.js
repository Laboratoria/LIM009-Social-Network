
import Login from './view/login.js';

const initializeFirebase = () => {
    const config = {
    apiKey: "AIzaSyBGr7XcDErKCQR-5WRR4IjWiL3nr2o8GMQ",
    authDomain: "social-network-5a022.firebaseapp.com",
    databaseURL: "https://social-network-5a022.firebaseio.com",
    projectId: "social-network-5a022",
    storageBucket: "social-network-5a022.appspot.com",
    messagingSenderId: "587244163856"
  };
  firebase.initializeApp(config);
  Login();
};

window.onload=initializeFirebase();
