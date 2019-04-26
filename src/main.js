//Este es el punto de entrada de tu aplicacion
import { funcRegister, funcLogin, funcGoogle, funcFacebook, activeUser } from './lib/index.js'

// Initialize Firebase
const config = {
  apiKey: "AIzaSyDq83GdPtM8kOrF6BGhTuAkFFFC7T-ou2c",
  authDomain: "fir-basics-c204d.firebaseapp.com",
  databaseURL: "https://fir-basics-c204d.firebaseio.com",
  projectId: "fir-basics-c204d",
  storageBucket: "fir-basics-c204d.appspot.com",
  messagingSenderId: "582126712915"
};
firebase.initializeApp(config);

const buttonRegisterEmail = document.getElementById('button-register');
const emailSignIn = document.getElementById('email-signin');
const passwordSignIn = document.getElementById('password-signin');
buttonRegisterEmail.addEventListener('click', (event) => {
  event.preventDefault();
  funcRegister(emailSignIn.value, passwordSignIn.value);
});

const buttonLogInEmail = document.getElementById('button-login-email');
const emailLogInEmail = document.getElementById('email-login');
const passwordLogInEmail = document.getElementById('password-login');
buttonLogInEmail.addEventListener('click', (event) => {
  event.preventDefault();
  funcLogin(emailLogInEmail.value, passwordLogInEmail.value);
});
activeUser();

const googleLogin = document.getElementById('google-login');
googleLogin.addEventListener('click', funcGoogle);

const facebookLogin = document.getElementById('fb-login');
facebookLogin.addEventListener('click', funcFacebook);
facebookLogin.addEventListener('click', funcFacebook);
