import {
  signIn,
  signUp,
  signInWithGoogle,
  signInWithFacebook,
  currentUser,
  
} from "../services/firebase.js";


const changeHash = (hash) => {
  location.hash = hash;
};
/* import { signUpWithGoogle } from "../services/firebase.js"  */
const signInOnSubmit = () => {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  if (email === '' || password === '') {
    alert('Completa tus datos para ingresar');
  } else {
    signIn(email, password).then((cred) => {changeHash('#/user-profile');
  console.log(cred.user.uid);
  console.log(cred.user)
  

})
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        if (errorCode == 'auth/weak-password') {
          alert('El nivel de seguridad de la contraseña es : débil.');
        } else if (errorCode == "auth/email-already-in-use") {
          alert('Ya existe esta cuenta')
        } else if (errorCode == 'auth/invalid-email') {
          alert('La dirección de correo electrónico es inválida')
        } else if (errorCode == 'auth/invalid-email') {
          alert('La dirección de correo electrónico es inválida')
        } else {
          alert('No hay registro de usuario correspondiente a este identificador. El usuario puede haber sido eliminado.')
        }
        console.log(error);
      });
  }
};




const signUpOnSubmit = () => {
  const email2 = document.querySelector('#email2').value;
  const password2 = document.querySelector('#password2').value;
  const userName = document.querySelector('#name').value;
  const userLastName = document.querySelector('#last-name').value;
  if (email2 === '' || password2 === '') {
    alert('Completa tus datos para registrarte');
  } else {
    signUp(email2, password2).then((cred) => {
      console.log(cred.user);
      return firebase.firestore().collection('users').doc(cred.user.uid).set({
        name:userName,
        lastName:userLastName,
        uid:cred.user.uid,
        email:email2,
        password:password2,
      });
      }).then((nose)=>{
        console.log(nose);

      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        if (errorCode == 'auth/weak-password') {
          alert('El nivel de seguridad de la contraseña es : débil.');
        } else if (errorCode == "auth/email-already-in-use") {
          alert('Ya existe esta cuenta')
        } else if (errorCode == 'auth/invalid-email') {
          alert('La dirección de correo electrónico es inválida')
        } else if (errorCode == 'auth/invalid-email') {
          alert('La dirección de correo electrónico es inválida')
        } else {
          alert('No hay registro de usuario correspondiente a este identificador. El usuario puede haber sido eliminado.')
        }
        console.log(error);
      })
  };
};

const signInOnSubmitGoogle = () => {
  signInWithGoogle()
    .then(() => changeHash('#/user-profile'))
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
}

const signInOnSubmitFacebook = () => {
  signInWithFacebook()
    .then(() => changeHash('#/user-profile'))
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
}


// Funcion para actualizar un documento de la coleccion users like
 const addCommentToUserDoc = () => {//userId,commentValue
  const inputCommentUser = document.querySelector('#input-comment').value;
  console.log(inputCommentUser);
  const currentUserId= firebase.auth().currentUser.uid;
  console.log(currentUserId);
  return firebase.firestore().collection('users').doc(currentUserId).update({
    'comment': inputCommentUser,
  });
}; 


export {
  signInOnSubmit,
  signUpOnSubmit,
  signInOnSubmitGoogle,
  signInOnSubmitFacebook,
  addCommentToUserDoc 
  
};