// aqui exportaras las funciones que necesites
import {activeUserPage, page1} from '../view/template.js';

//salir
export const exit = () => firebase.auth().signOut()
.then(()=> {
  // Sign-out successful.
  page1();
}).catch((error) =>{
  // An error happened.
});

//rcrear cuenta
export const createUser = (emailSignIn, passwordSignIn) => {
  firebase.auth().createUserWithEmailAndPassword(emailSignIn, passwordSignIn)
    .then((result) => {
      console.log(result);
    })
    .catch((error)=>{
      alert("no se realizado la autenticacion");
      console.log(error);
    })
};

//acceder con gmail y contraseña
export const signInUser = (emailLogIn, passwordLogIn) => {
  return firebase.auth().signInWithEmailAndPassword(emailLogIn, passwordLogIn)
};
//usuario con sesion activa
export const userSesionActive = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log("logeado")
      activeUserPage(user);
    } else {
      console.log("no logeado")
    }
  });
};
//iniciar con google
export const googleLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
  .then(result => {
    alert ('exito');
    console.log(result);
	})
	.catch(error => {
    alert('error')
		console.log(error);
	});
};
//iniciar confabcebook
export const facebookLogin = () => {
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider)
  .then(result => {
    alert ('exito');
    console.log(result);
	})
	.catch(error => {
    alert(error)
		console.log(error);
	});
};