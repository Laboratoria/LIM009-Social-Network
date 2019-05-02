import {signIn, signUp } from "../services/firebase.js";
// import { signUp } from "../services/firebase.js";
/* import { signUpWithGoogle } from "../services/firebase.js"  */


export const signInOnSubmit = () => {

  const btnSignIn = document.querySelector('#btn-sign-in');
  btnSignIn.addEventListener('click', () => {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    signIn(email, password);
  });
};


export const signUpOnSubmit = () => {
  const btnSignUp = document.querySelector('#btn-sign-up');
  btnSignUp.addEventListener('click', () => {
    signUp(email, password)
      .then(() => {
        console.log('usuario registrado')
      }).catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
        console.log(errorCode);
        console.log(errorMessage);
      });
  });
};


/*
const signUpOnSubmitGoogle = () => {
    const btnSignUpgoo = document.querySelector('#btn-sign-up');
    const iconGoogle = document.querySelector('#icon-google');
    btnSignUpgoo.addEventListener('click', () => {
        const email = document.querySelector('#email2').value;
        const password = document.querySelector('#password2').value;
        signUp(email, password)
        document.getElementById("register-form").reset()
    });

    iconGoogle.addEventListener('click', signUpWithGoogle);
}; */