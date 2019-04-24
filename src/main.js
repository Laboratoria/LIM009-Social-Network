// Este es el punto de entrada de tu aplicacion

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

document.addEventListener('DOMContentLoaded', function () {
    const app = firebase.app();
})

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const user = result.user;
            document.write('Hello' + user.displayName);
            console.log(user)
        })
        .catch(err => console.log(err))

}

function authCuentaFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const user = result.user;
            const userPhoto = `<img src=${user.photoURL}>`
            document.write('Hello' + user.displayName + userPhoto);
            console.log(user)
        })
        .catch(console.log)
}

function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((res) => {
            verify()
            console.log(res)
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode + errorMessage)
            // ...
        });
}

function loginUser() {
    const email2 = document.getElementById('email2').value;
    const password2 = document.getElementById('password2').value;

    firebase.auth().signInWithEmailAndPassword(email2, password2)
        .then(res => console.log(res))
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode + errorMessage)
            // ...
        });
};

function observador() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            console.log('existe')
            showContent(user)
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // ...
        } else {
            console.log('no exist')
            // User is signed out.
            // ...
        }
    });
}
observador();

function showContent(user) {
    const content = document.getElementById('content')
    if (user.emailVerified){
    content.innerHTML = `
    <p>Welcome</p>
    <button onclick="signOut()">Cerrar sesión</button>`
    }
}

function signOut() {
    firebase.auth().signOut()
        .then(() => {
            console.log('saliendo')
        })
        .catch(err => {
            console.log(err)
        })
}

function verify() {
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function () {
        // Email sent.
        console.log('enviando email')
    }).catch(function (error) {
        // An error happened.
        console.log(error)
    });
}