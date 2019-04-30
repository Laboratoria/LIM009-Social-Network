// aqui exportaras las funciones que necesites

// export const loginGoogle = () => {
//   btnGoogle.addEventListener('click', () => {
//       firebase.auth()
//       .signInWithPopup(provider)
//       .then(result => {
//         console.log(result.user);
//         guardarDatosFirebase(result.user);
//         root.innerHTML=`<img src='${result.user.photoURL}'/>`;
//       })
//     });
// };


// const guardarDatosFirebase = user => {
//   const usuario = {
//     uid : user.uid,
//     nombre : user.displayName,
//     email : user.email,
//     foto : user.photoURL
//   }
//   firebase.database().ref(`colección/${user.uid}`).set(usuario);
// };

// Funcion para inicar sesión con Google
export const signInWithGoogle = () => {
  // console.log('llegue a fn google');
  let googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(googleProvider)
    .then((result) => console.log(result));
};

// Funcion para inicar sesión con Facebook
export const signInWithFacebook = () => {
  const providerFacebook = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(providerFacebook)
  .then(result => console.log(result));
};

// Funcion registrar nuevo usuario 
export const createEmailAndPassword = (email,password) => {
  firebase.auth().createUserWithEmailAndPassword(email,password)
  .then(result => console.log(result));
 };

 // Funcion inicio de sesion
 export const signInWithEmail = (email,password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
   //.catch(function(error) {
  //   const errorCode = error.code;
  //   console.log(errorCode);
  //   const errorMessage = error.message;
  //   console.log(errorMessage);
  // });
 };




