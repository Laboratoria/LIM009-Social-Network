// Registro con solo correo y contraseña
const signUp = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};
export { signUp };

// Registro con google
const signUpWithGoogle = () => {
  let googleprovider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(googleprovider);
};
export { signUpWithGoogle };
// Registro con faceboook

const signUpWithFacebook = () => {
  const facebookprovider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(facebookprovider);   
};
export { signUpWithFacebook };
// Inicion de sesión  con solo email y contraseña
export const signIn = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);


// Inicio de sesión con g-mail y contraseña de g-mail
const signInWhitGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(googleProvider);
};
export { signInWhitGoogle }
// Inicio de sesión con  cuenta de facebook y contraseña de facebook
const signInWithFacebook = () => {
  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(facebookProvider);
};
export { signInWithFacebook };

// Cerrar Sesion
export const signOut = () => {
 return firebase.auth().signOut();
}