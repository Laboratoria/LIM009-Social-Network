export const signOut = () => firebase.auth().signOut()
// const verify = () => {
//   firebase.auth().currentUsersendEmailVerification();
// }

export const funcRegister = (emailSignIn, passwordSignIn) => {
  return firebase.auth().createUserWithEmailAndPassword(emailSignIn, passwordSignIn)
    // VERIFY: firebase.auth().currentUsersendEmailVerification()
  // .catch(error => console.log(error.message + error.code));
}

export const funcLogin = (emailLogIn, passwordLogIn, cb) => {
  return firebase.auth().signInWithEmailAndPassword(emailLogIn, passwordLogIn)
    // .then(resolve => console.log(resolve))
    .catch(cb);
};

export const activeUser = (cb) => {
  return firebase.auth().onAuthStateChanged(cb)
};



export const funcGoogle = (cb) => {
  const provider = new firebase.auth.GoogleAuthProvider();

  return firebase.auth().signInWithPopup(provider)
    .then(cb)
    .catch(console.log)

};

export const funcFacebook = (cb) => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider)
    .then(cb)
    .catch(console.log)
}
