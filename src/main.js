// Este es el punto de entrada de tu aplicacion
import { setRoute } from "./router.js";
// Initialize Firebase
const init = () => {
  var config = {
    apiKey: "AIzaSyDzoSiy9yDww7_JcTs9rdgOiKzGofYSO24",
    authDomain: "redsocial-e3089.firebaseapp.com",
    databaseURL: "https://redsocial-e3089.firebaseio.com",
    projectId: "redsocial-e3089",
    storageBucket: "redsocial-e3089.appspot.com",
    messagingSenderId: "1015631578701"
  };
  firebase.initializeApp(config);
  setRoute();
};

window.onload = init();
