import { funcRegister, funcLogin, funcGoogle, funcFacebook, activeUser } from '../controller-firebase/controller-firebase-auth.js';
import { printInfoUser } from '../../ui/info-user.js';
import { ShowErrorMessaggeDom } from '../../ui/login.js'

const login = () => {
  const emailLogInEmail = document.getElementById('email-login');
  const passwordLogInEmail = document.getElementById('password-login');
  const buttonLogInEmail = document.getElementById('button-login-email');
  buttonLogInEmail.addEventListener('click', (event) => {
    event.preventDefault();
    funcLogin(emailLogInEmail.value, passwordLogInEmail.value, result => printInfoUser(result) ,error => ShowErrorMessaggeDom(error));
  });
}
// activeUser();
const getActiveUser = (user) => {
  if (user) {
    // User is signed in.
    console.log("existe usuario acctivo")
    // const displayName = user.displayName;
    // const email = user.email;
    // const emailVerified = user.emailVerified;
    // const photoURL = user.photoURL;
    // const isAnonymous = user.isAnonymous;
    // const uid = user.uid;
    // const providerData = user.providerData;
  } else {
    console.log("no existe usuario activo")
  }
}

const googleLogin = () => {
  const login = document.getElementById('google-login');
  login.addEventListener('click', () => {
    funcGoogle(result => printInfoUser(result));
  });
}

const facebookLogin = () => {
  const facebookLogin = document.getElementById('fb-login');
  facebookLogin.addEventListener('click', () => {
    funcFacebook(result => {
      printInfoUser(result);
    });
  });
}

export const loginButtons = () => {
  login();
  activeUser(getActiveUser);
  googleLogin();
  facebookLogin();
}
export const registerAfterTemplate = () => {
  const buttonRegisterEmail = document.getElementById('button-register');
  const emailSignIn = document.getElementById('email-signin');
  const passwordSignIn = document.getElementById('password-signin');

  buttonRegisterEmail.addEventListener('click', (event) => {
    event.preventDefault();
    funcRegister(emailSignIn.value, passwordSignIn.value, result => printInfoUser(result));
  });
}
