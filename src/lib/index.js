// aqui exportaras las funciones que necesites

// export const myFunction = () => {
//   // aqui tu codigo
// }
import { emailSignIn, passwordSignIn, emailLogInEmail, passwordLogInEmail} from '../main.js';


// Initialize Firebase

const config = {
  apiKey: "AIzaSyDq83GdPtM8kOrF6BGhTuAkFFFC7T-ou2c",
  authDomain: "fir-basics-c204d.firebaseapp.com",
  databaseURL: "https://fir-basics-c204d.firebaseio.com",
  projectId: "fir-basics-c204d",
  storageBucket: "fir-basics-c204d.appspot.com",
  messagingSenderId: "582126712915"
};
firebase.initializeApp(config);

const funcRegister = () => {
  firebase.auth().createUserWithEmailAndPassword(emailSignIn.value, passwordSignIn.value)
    .then(res => { 
      console.log(res);
      verify();
    })
    .catch(error => console.log(error.message + error.code));
};

const activeUser = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // User is signed in.
      console.log("existe usuario acctivo");
      const displayName = user.displayName;
      const email = user.email;
      const emailVerified = user.emailVerified;
      const photoURL = user.photoURL;
      const isAnonymous = user.isAnonymous;
      const uid = user.uid;
      const providerData = user.providerData;
      showContent(user);
    } else {
      console.log("no existe usuario activo");
    }
  });
};

 const showContent = user => {
  const content = document.getElementById('content');
  if (user.emailVerified) {
    const string = `
    <p>Welcome </p>
    <button id="buttonLogOut">Cerrar sesión</button>
    `
    const div = document.createElement('div')
    div.innerHTML = string;
    content.appendChild(div);
  };

  const buttonLogOut = document.getElementById('buttonLogOut');
  buttonLogOut.addEventListener('click', signOut);
};
 const verify = () => {
  const user = firebase.auth().currentUser;

  user.sendEmailVerification()
.then(() => console.log('enviando email'))
.catch(error => console.log(error));
};

 const funcLogin = () => {
  firebase.auth().signInWithEmailAndPassword(emailLogInEmail.value, passwordLogInEmail.value)
    .then(res => console.log(res))
    .catch(error => console.log(error.message + error.code));
};

 const signOut = () => {
  firebase.auth().signOut()
    .then(() => {
      console.log('saliendo')
    })
.catch(err => {console.log(err)})
};

 const funcGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      document.write('Hello' + user.displayName);
      console.log(user);
    })
    .catch(console.log);

};

 const funcFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      const userPhoto = `<img src=${user.photoURL}>`
      document.write('Hello' + user.displayName + userPhoto);
      console.log(user);
    })
    .catch(console.log);
};


export {funcRegister, funcLogin, funcGoogle, funcFacebook, activeUser};