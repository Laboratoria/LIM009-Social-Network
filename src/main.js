// Este es el punto de entrada de tu aplicacion

import { myFunction } from './lib/index.js';

const registrar = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('contraseña').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }

const ingreso = () => {
    const email2 = document.getElementById('email2').value;
    const password2 = document.getElementById('contraseña2').value;

    firebase.auth().signInWithEmailAndPassword(email2, password2)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ...
    }); 
  }

myFunction();