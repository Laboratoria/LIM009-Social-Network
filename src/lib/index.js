// aqui exportaras las funciones que necesites

// const myFunction = () => {
//   // aqui tu codigo
// }
const config = {
  apiKey: "AIzaSyDq83GdPtM8kOrF6BGhTuAkFFFC7T-ou2c",
  authDomain: "fir-basics-c204d.firebaseapp.com",
  databaseURL: "https://fir-basics-c204d.firebaseio.com",
  projectId: "fir-basics-c204d",
  storageBucket: "fir-basics-c204d.appspot.com",
  messagingSenderId: "582126712915"
};
firebase.initializeApp(config);
import {leaveSesion, } from './templates.js';

const signOut = () => firebase.auth().signOut()
// const verify = () => {
//   firebase.auth().currentUsersendEmailVerification();
// }

const funcRegister = (emailSignIn, passwordSignIn) => {
  firebase.auth().createUserWithEmailAndPassword(emailSignIn, passwordSignIn)
    // VERIFY: firebase.auth().currentUsersendEmailVerification()
  // .catch(error => console.log(error.message + error.code));
}


const funcLogin = (emailLogIn, passwordLogIn) => {
  firebase.auth().signInWithEmailAndPassword(emailLogIn, passwordLogIn)
    // .then(res => console.log(res))
    // .catch(error => console.log(error.message + error.code));
};


const activeUser = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // User is signed in.
      console.log("existe usuario acctivo")
      // const displayName = user.displayName;
      // const email = user.email;
      // const emailVerified = user.emailVerified;
      // const photoURL = user.photoURL;
      // const isAnonymous = user.isAnonymous;
      // const uid = user.uid;
      // const providerData = user.providerData;
      showContent(user);
    } else {
      console.log("no existe usuario activo")
    }
  });
};

const showContent = user => {
  if (user) {
    leaveSesion();
   }

  const buttonLogOut = document.getElementById('buttonLogOut');
  buttonLogOut.addEventListener('click', signOut);
};

const funcGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      document.write('Hello' + user.displayName);
      console.log(user);
    })
    .catch(console.log)

};

const funcFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      const userPhoto = `<img src=${user.photoURL}>`
      document.write('Hello' + user.displayName + userPhoto);
      console.log(user);
    })
    .catch(console.log)
}
export { funcRegister, activeUser, funcLogin, funcFacebook, funcGoogle };
