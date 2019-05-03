// Registro con solo correo y contraseña
const signUp = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}
export { signUp };

// Inicion de sesión  con solo email y contraseña
const signIn = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);
export { signIn }

// Inicio de sesión con g-mail y contraseña de g-mail
const signInWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(googleProvider);
};
export { signInWithGoogle }

// Inicio de sesión con  cuenta de facebook y contraseña de facebook
const signInWithFacebook = () => {
  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(facebookProvider);
};
export { signInWithFacebook };