// aqui exportaras las funciones que necesites

// const myFunction = () => {
//   // aqui tu codigo
// }

const signOut = () => firebase.auth().signOut()
const verify = () => {
   firebase.auth().currentUsersendEmailVerification();
 }

const funcRegister = (emailSignIn, passwordSignIn) => {
  firebase.auth().createUserWithEmailAndPassword(emailSignIn, passwordSignIn)
    .then(user => { 
      console.log(user);
       verify()})
    .catch(error => console.log(error.message+ error.code));
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
      console.log("existe usuario acctivo")
      // const displayName = user.displayName;
      // const email = user.email;
      // const emailVerified = user.emailVerified;
      // const photoURL = user.photoURL;
      // const isAnonymous = user.isAnonymous;
      // const uid = user.uid;
      // const providerData = user.providerData;
      showContent(user);
    } else {
      console.log("no existe usuario activo")
    }
  });
}

 const showContent = user => {
  const content = document.getElementById('content')
  if (user) {
    const string = `
    <p>Welcome</p>
    <button id="buttonLogOut">Cerrar sesión</button>
    `
    const div = document.createElement('div')
    div.innerHTML = string
    content.appendChild(div)
  }

  const buttonLogOut = document.getElementById('buttonLogOut');
  buttonLogOut.addEventListener('click', signOut);
}



const funcGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      document.write('Hello' + user.displayName);
      console.log(user);
    })
    .catch(console.log)

}

const funcFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      const userPhoto = `<img src=${user.photoURL}>`
      document.write('Hello' + user.displayName + userPhoto);
      console.log(user);
    })
    .catch(console.log)
}
export {funcRegister, activeUser, funcLogin, funcFacebook, funcGoogle}
