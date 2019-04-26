// aqui exportaras las funciones que necesites

// const myFunction = () => {
//   // aqui tu codigo
// }

import {leaveSesion,withPhoto} from '../lib/templates.js'
const verify = () => {
  const user = firebase.auth().currentUser;

  user.sendEmailVerification()
    .then(() => console.log('enviando email'))
    .catch(error => console.log(error));
}

const signOut = () => {
  firebase.auth().signOut()
  // .then(() => {
  //   console.log('saliendo')
  // })
  // .catch(err => {
  //   console.log(err)
  // })
}
const funcRegister = (emailSignIn, passwordSignIn) => {
  firebase.auth().createUserWithEmailAndPassword(emailSignIn, passwordSignIn)
    .then(res => {
      console.log(res)
      verify()
    })
    .catch(error => console.log(error.message + error.code));
}

const funcLogin = (emailLogIn, passwordLogIn) => {
  firebase.auth().signInWithEmailAndPassword(emailLogIn, passwordLogIn)
    .then(res => console.log(res))
    .catch(error => console.log(error.message + error.code));
}

const activeUser = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // User is signed in.
      console.log("existe usuario acctivo");
      const displayName = user.displayName;
      const email = user.email;
      const emailVerified = user.emailVerified;
      const photoURL = user.photoURL;
      const isAnonymous = user.isAnonymous;
      const uid = user.uid;
      const providerData = user.providerData;
      showContent(user);
    } else {
      console.log("no existe usuario activo");
    }
  });
};

 const showContent = user => {
  const content = document.getElementById('content');
  if (user.emailVerified) {
    leaveSesion;
  };
};

 const funcLogin = (emailLogInEmail, passwordLogInEmail) => {
  firebase.auth().signInWithEmailAndPassword(emailLogInEmail, passwordLogInEmail)
    .then(res => console.log(res))
    .catch(error => console.log(error.message + error.code));
};

 const funcGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      document.write('Hello' + user.displayName);
      console.log(user);
    })
    .catch(console.log);
};

const funcFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      withPhoto;
    })
    .catch(console.log)
}
export { funcRegister, activeUser, funcLogin, funcFacebook, funcGoogle }
