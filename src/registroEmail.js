//Este es el punto de entrada de tu aplicacion

/* import { myFunction } from './lib/index.js';
myFunction(); */

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDq83GdPtM8kOrF6BGhTuAkFFFC7T-ou2c",
    authDomain: "fir-basics-c204d.firebaseapp.com",
    databaseURL: "https://fir-basics-c204d.firebaseio.com",
    projectId: "fir-basics-c204d",
    storageBucket: "fir-basics-c204d.appspot.com",
    messagingSenderId: "582126712915"
};
firebase.initializeApp(config);

const buttonRegisterEmail = document.getElementById('buttonRegister')

buttonRegisterEmail.addEventListener('click', () => {
    const emailSignIn = document.getElementById('email-signin').value;
    const passwordSignIn = document.getElementById('password-signin').value;

    firebase.auth().createUserWithEmailAndPassword(emailSignIn, passwordSignIn)
    .then((res) => {
        verify()
        console.log(res)
    })
    .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
    });

});


const buttonLogInEmail = document.getElementById('buttonLogInEmail')

buttonLogInEmail.addEventListener('click', () => {
    const emailLogInEmail = document.getElementById('email-login').value;
    const passwordLogInEmail = document.getElementById('password-login').value;

    firebase.auth().signInWithEmailAndPassword(emailLogInEmail, passwordLogInEmail)
    .then(res => console.log(res))
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
      });


});



const activeUser = () => {
    firebase.auth().onAuthStateChanged( user => {
        if (user) {
          // User is signed in.
          console.log(" existe usuario acctivo")
          var displayName = user.displayName; 
          var email = user.email;
          console.log(email);
         
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          showContent(user);
          // ...
        } else {
        console.log("noo existe usuario acctivo")
        }
      });
}

activeUser();


const showContent = user => {
    const content = document.getElementById('content')
    if (user.emailVerified){
    content.innerHTML = `
    <p>Welcome</p>
    <button id="buttonLogOut">Cerrar sesión</button>`
    }
    
    const buttonLogOut = document.getElementById('buttonLogOut');
    buttonLogOut.addEventListener('click',signOut);
}


const signOut = () => {
    firebase.auth().signOut()
        .then(() => {
            console.log('saliendo')
        })
        .catch(err => {
            console.log(err)
        })
}

const verify = () => {
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function () {
        // Email sent.
        console.log('enviando email')
    }).catch(function (error) {
        // An error happened.
        console.log(error)
    });
}

const googleLogin = document.getElementById('google-login')
googleLogin.addEventListener('click', ()=>{
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const user = result.user;
            document.write('Hello' + user.displayName);
            console.log(user)
        })
        .catch(err => console.log(err))

});

const facebookLogin = document.getElementById('fb-login')
facebookLogin.addEventListener('click', ()=>{
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const user = result.user;
            const userPhoto = `<img src=${user.photoURL}>`
            document.write('Hello' + user.displayName + userPhoto);
            console.log(user)
        })
        .catch(console.log)
});
