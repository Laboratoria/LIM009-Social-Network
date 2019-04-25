//Este es el punto de entrada de tu aplicacion

/* import * from './lib/index.js'
import { myFunction } from './lib/index.js';
myFunction(); */

// Initialize Firebase
const config = {
    apiKey: "AIzaSyDq83GdPtM8kOrF6BGhTuAkFFFC7T-ou2c",
    authDomain: "fir-basics-c204d.firebaseapp.com",
    databaseURL: "https://fir-basics-c204d.firebaseio.com",
    projectId: "fir-basics-c204d",
    storageBucket: "fir-basics-c204d.appspot.com",
    messagingSenderId: "582126712915"
};
firebase.initializeApp(config);

const buttonRegisterEmail = document.getElementById('buttonRegister')
const funcRegister = () => {
    const emailSignIn = document.getElementById('email-signin').value;
    const passwordSignIn = document.getElementById('password-signin').value;

    firebase.auth().createUserWithEmailAndPassword(emailSignIn, passwordSignIn)
        .then( res => {
            verify()
            console.log(res)
        })
        .catch( error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            swal(errorMessage, errorCode, "error");
        });

}
buttonRegisterEmail.addEventListener('click', funcRegister);



const buttonLogInEmail = document.getElementById('buttonLogInEmail')
const funcLogin = () => {
    const emailLogInEmail = document.getElementById('email-login').value;
    const passwordLogInEmail = document.getElementById('password-login').value;

    firebase.auth().signInWithEmailAndPassword(emailLogInEmail, passwordLogInEmail)
        .then(res => console.log(res))
        .catch( error => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            swal(errorMessage, errorCode, "error");
        });


}
buttonLogInEmail.addEventListener('click', funcLogin);



const activeUser = () => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // User is signed in.
            console.log(" existe usuario acctivo")
            const displayName = user.displayName;
            const email = user.email;
            console.log(email);

            const emailVerified = user.emailVerified;
            const photoURL = user.photoURL;
            const isAnonymous = user.isAnonymous;
            const uid = user.uid;
            const providerData = user.providerData;
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
    if (user.emailVerified) {
        const string = `
    <p>Welcome</p>
    <button id="buttonLogOut">Cerrar sesión</button>`
        const div = document.createElement('div')
        div.innerHTML = string
        content.appendChild(div)
    }

    const buttonLogOut = document.getElementById('buttonLogOut');
    buttonLogOut.addEventListener('click', signOut);
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
    const user = firebase.auth().currentUser;

    user.sendEmailVerification().then( ()=> {
        // Email sent.
        console.log('enviando email')
    }).catch( error => {
        // An error happened.
        console.log(error)
    });
}

const googleLogin = document.getElementById('google-login')
const funcGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const user = result.user;
            document.write('Hello' + user.displayName);
            console.log(user)
        })
        .catch(err => console.log(err))

}
googleLogin.addEventListener('click', funcGoogle);

const facebookLogin = document.getElementById('fb-login')
const funcFacebook = () => {
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
facebookLogin.addEventListener('click', funcFacebook);

console.log(`${funcFacebook()} ${funcGoogle()} ${funcLogin()} ${funcRegister()}`)