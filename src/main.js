//Este es el punto de entrada de tu aplicacion
import {funcRegister, funcLogin, funcGoogle, funcFacebook, activeUser} from './lib/index.js';
/* import * from './lib/index.js'
import { myFunction } from './lib/index.js';
myFunction(); */


const buttonRegisterEmail = document.getElementById('button-register');
export const emailSignIn = document.getElementById('email-signin');
export const passwordSignIn = document.getElementById('password-signin');
buttonRegisterEmail.addEventListener('click', funcRegister);


const buttonLogInEmail = document.getElementById('button-login-email');
export const emailLogInEmail = document.getElementById('email-login');
export const passwordLogInEmail = document.getElementById('password-login');
buttonLogInEmail.addEventListener('click', funcLogin);
activeUser();

const googleLogin = document.getElementById('google-login');
googleLogin.addEventListener('click', funcGoogle);

const facebookLogin = document.getElementById('fb-login');
facebookLogin.addEventListener('click', funcFacebook);


