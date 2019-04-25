//Este es el punto de entrada de tu aplicacion

import { myFunction } from './lib/index.js';
myFunction();

const btnRegister = document.getElementById('btn-register');
const btnEnter = document.getElementById('btn-enter');


btnRegister.addEventListener('click', ()=>{
 const email = document.getElementById('email').value;
 const password = document.getElementById('password').value;

 firebase.auth().createUserWithEmailAndPassword(email, password)
 .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    console.log(errorCode);
    console.log(errorMessage);
    // ...
  });  
});

btnEnter.addEventListener('click',()=>{
    const email2 = document.getElementById('email2').value;
    const password2 = document.getElementById('password2').value;
    firebase.auth().signInWithEmailAndPassword(email2, password2).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        
    console.log(errorCode);
    console.log(errorMessage);
      });
});

const observador = () =>{
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            aparece();
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // ...
        } else {
          // User is signed out.
          // ...
          
        }
      });
      email-password.html
      
}
observador();

const aparece =() =>{
    const content = document.getElementById ('content');
    content.innerHTML ="Solo lo ve usuario activo";
}

