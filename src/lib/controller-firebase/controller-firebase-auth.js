export const signOut = () => firebase.auth().signOut();
// const verify = () => firebase.auth().currentUsersendEmailVerification()

export const funcRegister = (emailSignIn, passwordSignIn, cb1) => firebase.auth().createUserWithEmailAndPassword(emailSignIn, passwordSignIn)
  // VERIFY: firebase.auth().currentUsersendEmailVerification()
  .then(cb1)
// .catch(cb2);
// .catch(error => console.log(error.message + error.code));


export const funcLogin = (emailLogIn, passwordLogIn, cb1, cb2) => {
  return firebase.auth().signInWithEmailAndPassword(emailLogIn, passwordLogIn)
    .then(cb1)
    .catch(cb2);
};

export const activeUser = (cb) => firebase.auth().onAuthStateChanged(cb);

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
