// aqui exportaras las funciones que necesites

// const myFunction = () => {
//   // aqui tu codigo
// }

<<<<<<< HEAD
=======
  user.sendEmailVerification()
    .then(() => console.log('enviando email'))
    .catch(error => console.log(error));
}

>>>>>>> cfd72cd31ee3984b70e9b574a4165142eb57e2d3
const signOut = () => {
  firebase.auth().signOut()
    // .then(() => {
    //   console.log('saliendo')
    // })
    // .catch(err => {
    //   console.log(err)
    // })
}
const funcRegister = (emailSignIn, passwordSignIn) => {
  firebase.auth().createUserWithEmailAndPassword(emailSignIn, passwordSignIn)
    .then(res =>{ 
      console.log(res)
      verify()})
    .catch(error => console.log(error.message+ error.code));
}

const funcLogin = (emailLogIn, passwordLogIn) => {
  firebase.auth().signInWithEmailAndPassword(emailLogIn, passwordLogIn)
    .then(res => console.log(res))
    .catch(error => console.log(error.message + error.code));
}

<<<<<<< HEAD

=======
>>>>>>> cfd72cd31ee3984b70e9b574a4165142eb57e2d3
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

<<<<<<< HEAD
 const showContent = user => {
  const content = document.getElementById('content')
  if (user.emailVerified) {
=======
const showContent = user => {
  const content = document.getElementById('content')
  if (user) {
>>>>>>> cfd72cd31ee3984b70e9b574a4165142eb57e2d3
    const string = `
    <p>Welcome</p>
    <button id="buttonLogOut">Cerrar sesión</button>
    `
    const div = document.createElement('div')
    div.innerHTML = string
    content.appendChild(div)
<<<<<<< HEAD
  }

  const buttonLogOut = document.getElementById('buttonLogOut');
  buttonLogOut.addEventListener('click', signOut);
}




const funcGoogle = () => {
=======
    const buttonLogOut = document.getElementById('buttonLogOut');
    buttonLogOut.addEventListener('click', signOut);
  };
};

 const funcLogin = (emailLogInEmail, passwordLogInEmail) => {
  firebase.auth().signInWithEmailAndPassword(emailLogInEmail, passwordLogInEmail)
    .then(res => console.log(res))
    .catch(error => console.log(error.message + error.code));
};

 const funcGoogle = () => {
>>>>>>> cfd72cd31ee3984b70e9b574a4165142eb57e2d3
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      document.write('Hello' + user.displayName);
      console.log(user);
    })
<<<<<<< HEAD
    .catch(console.log)

}
=======
    .catch(console.log);
};
>>>>>>> cfd72cd31ee3984b70e9b574a4165142eb57e2d3

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
<<<<<<< HEAD
export {funcRegister, activeUser, funcLogin, funcFacebook, funcGoogle}
=======
export { funcRegister, activeUser, funcLogin, funcFacebook, funcGoogle }
>>>>>>> cfd72cd31ee3984b70e9b574a4165142eb57e2d3
