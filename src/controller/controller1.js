import {signIn, signUp, signUpWithGoogle, signUpWithFacebook } from "../services/firebase.js";
// import { signUp } from "../services/firebase.js";
/* import { signUpWithGoogle } from "../services/firebase.js"  */


export const signInOnSubmit = () => {

  const btnSignIn = document.querySelector('#btn-sign-in');
  btnSignIn.addEventListener('click', () => {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    signIn(email, password)
      .then(() => {
        console.log ('usuario logeado');
      });
  });
};


export const signUpOnSubmit = () => {
  const btnSignUp = document.querySelector('#btn-sign-up');
  btnSignUp.addEventListener('click', () => {
    const email = document.querySelector('#email2').value;
    const password = document.querySelector('#password2').value;
    signUp(email, password)
      .then(() => {
        console.log('usuario registrado');
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

export const signUpOnSubmitGoogle = () => {
  const iconGoogle = document.querySelector('#icon-google');
  iconGoogle.addEventListener('click', () => {     
    signUpWithGoogle()
      .then(() => {
        console.log(" exitosamente con google");
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

export const signUpOnSubmitFacebook = () => {
  const iconFacebook = document.querySelector('#icon-facebook');
  iconFacebook.addEventListener('click', () => {     
    signUpWithFacebook()
      .then(() => {
        console.log(" exitosamente con facebook");
      })
      .catch((error) => {
        console.log(error);
      });
  });
};