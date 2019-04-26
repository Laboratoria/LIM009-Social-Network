//Este es el punto de entrada de tu aplicacion

import { myFunction } from './lib/index.js';
myFunction();

const btnRegister = document.getElementById('btn-register');
const btnEnter = document.getElementById('btn-login');
const btnLogInWhitGoogle = document.getElementById('btn-google-signIn');
const btnLogInWhitFacebook = document.getElementById('btn-facebook-signIn');

const registerUser =()=> {
 const email = document.getElementById('email').value;
 const password = document.getElementById('password').value;

 firebase.auth().createUserWithEmailAndPassword(email, password)
 .then(()=>{
   verify();
 })
 .catch((error)=> {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;

    console.log(errorCode);
    console.log(errorMessage);
    // ...
    
  });  
};
btnRegister.addEventListener('click', registerUser);


const loginUser =()=>{
    const email2 = document.getElementById('email2').value;
    const password2 = document.getElementById('password2').value;

    firebase.auth().signInWithEmailAndPassword(email2, password2).catch((error)=>{
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
        
    console.log(errorCode);
    console.log(errorMessage);
      });
}
btnEnter.addEventListener('click', loginUser);


const activeUser = () =>{
    firebase.auth().onAuthStateChanged(user=>{
        if (user) {          
          // User is signed in.
          const displayName = user.displayName;
          const email = user.email;
          const emailVerified = user.emailVerified;
          const photoURL = user.photoURL;
          const isAnonymous = user.isAnonymous;
          const uid = user.uid;
          const providerData = user.providerData;
          showUser(user);
          // ...
        } else {
          // User is signed out.
          console.log ('no existe usuario activo');
          
        }
      });
}
activeUser();

const showUser = user =>{
    
    const content = document.getElementById ('content');
    if(user.emailVerified){
    const string = `
     <p> Welcome! </p>
     <button id="sign-off">Cerrar Sesión</button>   `
     ;
     content.innerHTML=string;
        
     const btnSignOffUser =document.getElementById('sign-off');
     btnSignOffUser.addEventListener('click',signOff);
    }
}

const signOff =()=>{
  firebase.auth().signOut()
  .then (() =>{
      console.log('saliendo.....')
  })
  .catch(error =>{
    console.log(error)
  })
}


const verify =()=>{
  const user = firebase.auth().currentUser;

  user.sendEmailVerification()
  .then(()=> {
    console.log('enviando correo')
  }).catch((error)=> {
    console.log(error)
  });
}


const logInGoogle = () =>{
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
  .then((result)=>{
    console.log("exitosamente con google");
  })
  .catch((error)=>{
      console.log(error);
  })
}

btnLogInWhitGoogle.addEventListener('click',logInGoogle);



const logInFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(result => {
          console.log("exitosamente con facebook");
        })
        .catch((error)=>{
          console.log(error);
      })
    }
btnLogInWhitFacebook.addEventListener('click', logInFacebook);