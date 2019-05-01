// aqui exportaras las funciones que necesites

// export const myFunction = () => {
//   // aqui tu codigo
// }


export const createEmailAndPassword = (email,password)=>{
  return firebase.auth().createUserWithEmailAndPassword(email, password)

 };

export const signInWithEmail = (email, password) =>{
 return firebase.auth().signInWithEmailAndPassword(email, password)
  .then(result => result);
}
// google
export const signInWithGoogle = () => {
  let providerGoogle = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(providerGoogle)
  .then(result => result);
};
// Facebook
export const signInWithFacebook = () => {
  const providerFacebook = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(providerFacebook)
  .then(result => result);
};

