
import Login from './view/login.js';
import {changeview} from './view-controller/router.js';

const initializeFirebase = () => {
  var config = {
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

window.onload = initializeFirebase();
const init = () => {
window.addEventListener('hashchange', () => changeview(window.location.hash));
}

window.addEventListener('load', init);

const registerClick= document.querySelector("#register-link");
registerClick.addEventListener("click",changeview);
