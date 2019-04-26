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

activeUser();

const buttonRegisterEmail = document.getElementById('button-register');
const emailSignIn = document.getElementById('email-signin');
const passwordSignIn = document.getElementById('password-signin');
buttonRegisterEmail.addEventListener('click', (e) => {
  e.preventDefault();
  funcRegister(emailSignIn, passwordSignIn)
});

const buttonLogInEmail = document.getElementById('button-login-email');
const emailLogIn = document.getElementById('email-login').value;
const passwordLogIn = document.getElementById('password-login').value;
buttonLogInEmail.addEventListener('click', e => {
  e.preventDefault;
  funcLogin(emailLogIn, passwordLogIn)
});

const googleLogin = document.getElementById('google-login');
googleLogin.addEventListener('click', funcGoogle);

const facebookLogin = document.getElementById('fb-login');
facebookLogin.addEventListener('click', funcFacebook);
