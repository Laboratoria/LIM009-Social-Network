import { screen1 } from './views/login.js'

// Initialize Firebase
const initFirebase = () => {
  const config = {
    apiKey: "AIzaSyDq83GdPtM8kOrF6BGhTuAkFFFC7T-ou2c",
    authDomain: "fir-basics-c204d.firebaseapp.com",
    databaseURL: "https://fir-basics-c204d.firebaseio.com",
    projectId: "fir-basics-c204d",
    storageBucket: "fir-basics-c204d.appspot.com",
    messagingSenderId: "582126712915"
  };
  firebase.initializeApp(config);
  screen1();

}

window.onload = initFirebase();

