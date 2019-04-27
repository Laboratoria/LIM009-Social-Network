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



const loginGoogle = () => {
  const providerGoogle = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(providerGoogle);
};

export {loginGoogle};