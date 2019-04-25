// Este es el punto de entrada de tu aplicacion

// import { myFunction } from './lib/index.js';

// myFunction();

// const email = document.getElementById('email');
// const password = document.getElementById('password');
const btnSubmit = document.getElementById('btn-submit');

var provider = new firebase.auth.GoogleAuthProvider();

btnSubmit.addEventListener('click', () => {
  firebase.auth()
  .signInWithPopup(provider)
  .then(result => {
    console.log(result.user);
    btnSubmit.append('src=""')
  })
});






// btnSubmit.addEventListener('click',()=>{
//   firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
//    .catch(function(error) {
//        // Handle Errors here.
//        var errorCode = error.code;
//        var errorMessage = error.message;
//        // ...
//      });
// })