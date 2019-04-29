// Registro con solo correo y contraseña
export const signUp = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  };

// Registro con google
  export const signUpWithGoogle = () => {
    let googleprovider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleprovider)
      .then((result) => {
        console.log(" exitosamente con google");
      })
      .catch((error) => {
        console.log(error);
      });
  };
// Registro con faceboook
  
  export const signUpWithFacebook = () => {
    const facebookprovider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(facebookprovider)
      .then(result => {
        console.log("exitosamente con facebook");
      })
      .catch(error => {
        console.log(error);
      });
  };
  
// Inicion de sesión  con solo email y contraseña
  export const signIn = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  };

  // Inicio de sesión con g-mail y contraseña de g-mail
  export const signInWhitGoogle = () => { 
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider);
  };
  // Inicio de sesión con  cuenta de facebook y contraseña de facebook
  export const signInWithFacebook = () => {
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(facebookProvider);
  };