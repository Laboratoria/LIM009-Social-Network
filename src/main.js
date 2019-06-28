import { changeView } from './View_Controler.js/routes.js'

//configuracion de firebase
var firebaseConfig = {
  apiKey: "AIzaSyBA0RSvroCJctftZYX4PslIpqJ4caZtNco",
  authDomain: "mi-pimeraredsocial.firebaseapp.com",
  databaseURL: "https://mi-pimeraredsocial.firebaseio.com",
  projectId: "mi-pimeraredsocial",
  storageBucket: "mi-pimeraredsocial.appspot.com",
  messagingSenderId: "797512164640",
  appId: "1:797512164640:web:58ea75e79ef07fee"
};

firebase.initializeApp(firebaseConfig);

window.addEventListener('load', (event) => {
  changeView(window.location.hash);
  event.currentTarget.addEventListener('hashchange', () => {
    changeView(window.location.hash);
  })
})