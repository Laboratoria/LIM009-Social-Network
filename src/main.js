// Este es el punto de entrada de tu aplicacion
import { setRoute } from "./router.js";
// Initialize Firebase
const init = () => {
  const config = {
    apiKey: "AIzaSyCkwXG7Zx6u0mEUPjzTL19bG6O8bLQSyZY",
    authDomain: "red-social-e9df5.firebaseapp.com",
    databaseURL: "https://red-social-e9df5.firebaseio.com",
    projectId: "red-social-e9df5",
    storageBucket: "red-social-e9df5.appspot.com",
    messagingSenderId: "258184809756"
  };
  firebase.initializeApp(config);
  setRoute();
};

window.onload = init();
