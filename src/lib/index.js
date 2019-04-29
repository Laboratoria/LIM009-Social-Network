// aqui exportaras las funciones que necesites

// const myFunction = () => {
//   // aqui tu codigo
// }
import {showContent, screen1} from './templates.js'

const initFirebase = () => {
  const config = {
    apiKey: "AIzaSyDq83GdPtM8kOrF6BGhTuAkFFFC7T-ou2c",
    authDomain: "fir-basics-c204d.firebaseapp.com",
    databaseURL: "https://fir-basics-c204d.firebaseio.com",
    projectId: "fir-basics-c204d",
    storageBucket: "fir-basics-c204d.appspot.com",
    messagingSenderId: "582126712915"
  };
  firebase.initializeApp(config);
  screen1();

}


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
  return firebase.auth().signInWithEmailAndPassword(emailLogIn, passwordLogIn)
    // .then(resolve => console.log(resolve))
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



const funcGoogle = (cb) => {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
    .then(cb)
    .catch(console.log)

};

const funcFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(result => {
      printInfoUser(result)
    })
    .catch(console.log)
}
export { initFirebase, funcRegister, activeUser, funcLogin, funcFacebook, funcGoogle, signOut };
