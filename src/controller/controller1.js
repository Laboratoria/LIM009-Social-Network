import { signIn, signUp, signInWithGoogle, signInWithFacebook } from "../services/firebase.js";
/* import { signUpWithGoogle } from "../services/firebase.js"  */
const signInOnSubmit = () => {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  if (email === '' || password === '') {
    alert('Completa tus datos para ingresar');
  } else {
    signIn(email, password)
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
        }
        else if (errorCode == 'auth/invalid-email') {
          alert('La dirección de correo electrónico es inválida')
        }
        else {
          alert('No hay registro de usuario correspondiente a este identificador. El usuario puede haber sido eliminado.')
        }
        console.log(error);
      });
  }
};




const signUpOnSubmit = () => {
  const email2 = document.querySelector('#email2').value;
  const password2 = document.querySelector('#password2').value;
  if (email2 === '' || password2 === '') {
    alert('Completa tus datos para registrarte');
  } else {
    signUp(email2, password2)
      .then((result) => {
        console.log(" exitosamente registrado");
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
        }
        else if (errorCode == 'auth/invalid-email') {
          alert('La dirección de correo electrónico es inválida')
        }
        else {
          alert('No hay registro de usuario correspondiente a este identificador. El usuario puede haber sido eliminado.')
        }
        console.log(error);
      })
  };
};

const signInOnSubmitGoogle = () => {
  signInWithGoogle()
    .then(result => {
      console.log("exitosamente con google");
    })
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
    .then((result) => {
      console.log(" exitosamente con facebook");
    })
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


export { signInOnSubmit, signUpOnSubmit, signInOnSubmitGoogle, signInOnSubmitFacebook };