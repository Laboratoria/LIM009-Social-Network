//Este es el punto de entrada de tu aplicacion
import { funcRegister, funcLogin, funcGoogle, funcFacebook, activeUser, initFirebase } from './lib/index.js';
import { printInfoUser } from './lib/templates.js';
// Initialize Firebase

window.onload = initFirebase();

export const registerAfterTemplate = () => {
  const buttonRegisterEmail = document.getElementById('button-register');
  const emailSignIn = document.getElementById('email-signin');
  const passwordSignIn = document.getElementById('password-signin');

  buttonRegisterEmail.addEventListener('click', (event) => {
    event.preventDefault();
    funcRegister(emailSignIn.value, passwordSignIn.value);
  });
}


const buttonLogin = () => {
  const emailLogInEmail = document.getElementById('email-login');
  const passwordLogInEmail = document.getElementById('password-login');
  const buttonLogInEmail = document.getElementById('button-login-email');
  buttonLogInEmail.addEventListener('click', (event) => {
    event.preventDefault();
    funcLogin(emailLogInEmail.value, passwordLogInEmail.value);
  });
}
activeUser();
buttonLogin();

const googleLogin = document.getElementById('google-login');
googleLogin.addEventListener('click', () => {
  funcGoogle(result => {
    printInfoUser(result);
  });
});

const facebookLogin = document.getElementById('fb-login');
facebookLogin.addEventListener('click', funcFacebook);
facebookLogin.addEventListener('click', funcFacebook);
