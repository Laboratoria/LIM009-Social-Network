import { changeview } from './view-controller/router.js';
//import login from './view/login.js';

  var config = {
    apiKey: "AIzaSyBGr7XcDErKCQR-5WRR4IjWiL3nr2o8GMQ",
    authDomain: "social-network-5a022.firebaseapp.com",
    databaseURL: "https://social-network-5a022.firebaseio.com",
    projectId: "social-network-5a022",
    storageBucket: "social-network-5a022.appspot.com",
    messagingSenderId: "587244163856"
  };
  firebase.initializeApp(config);

const init = () => {
 changeview(window.location.hash)
  window.addEventListener('hashchange', () => changeview(window.location.hash));
}

window.addEventListener('load', init);
