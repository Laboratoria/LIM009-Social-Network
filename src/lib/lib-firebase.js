// aqui exportaras las funciones que necesites

// export const myFunction = () => {
//   // aqui tu codigo
// }


export const createEmailAndPassword = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
};

export const signInWithEmail = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
};
// Inicio de sesión con Google
export const signInWithGoogle = () => {
  let providerGoogle = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(providerGoogle)
};
// Inicio de sesión con Facebook
export const signInWithFacebook = () => {
  const providerFacebook = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(providerFacebook)
};
// Cerrar sesión
export const signOut = () => {
  return firebase.auth().signOut()
};

