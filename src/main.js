// Este es el punto de entrada de tu aplicacion

// import { myFunction } from './lib/index.js';

// myFunction();

const email = document.getElementById('email');
const password = document.getElementById('password');
const email2 = document.getElementById('email2');
const password2 = document.getElementById('password2');
const btnRegister = document.getElementById('btn-register');
const btnSubmit = document.getElementById('btn-submit');
const btnGoogle = document.getElementById('btn-google');
const root = document.getElementById('root');
var provider = new firebase.auth.GoogleAuthProvider();


btnRegister.addEventListener('click',()=>{
  firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
   .catch(function(error) {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       console.log(errorCode);
       console.log(errorMessage);
     });
})

btnSubmit.addEventListener('click',()=>{
  firebase.auth().signInWithEmailAndPassword(email2.value, password2.value).
  catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
})


btnGoogle.addEventListener('click', () => {
  firebase.auth()
  .signInWithPopup(provider)
  .then(result => {
    console.log(result.user);
    guardarDatosFirebase(result.user);
    root.innerHTML=`<img src='${result.user.photoURL}'/>`;
  })
});

const guardarDatosFirebase = user => {
  const usuario = {
    uid : user.uid,
    nombre : user.displayName,
    email : user.email,
    foto : user.photoURL
  }
  firebase.database().ref(`colección/${user.uid}`).set(usuario);
}

firebase.database().ref('colección')
.on('child_added', s => {
  var user = s.val();
  root.innerHTML=`<img width ='100px' src='${user.foto}'/>`;
})


