import { signInWithEmail, signInWithGoogle, signInWithFacebook ,createEmailAndPassword} from "../lib/lib-firebase.js";
import { dataBaseUser } from '../model/model.js'
// import { changeHash } from '../Utils/util.js'

export const registerUser = () => {
const emailRegister = document.querySelector('#email-register').value;
const passwordRegister = document.querySelector('#password-register').value;
return  createEmailAndPassword(emailRegister,passwordRegister)
  .then((result)=> 
    console.log(result)    
  ).catch(error => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if(errorCode == 'auth/invalid-email') {
      alert('El correo es inválido');
    } else if(errorCode == 'auth/email-already-in-use') {
      alert('El correo ya ha sido utilizado');
    } else if(errorCode == 'auth/weak-password') {
      alert('La contraseña no es lo suficientemente fuerte')
    } else {
      alert(errorMessage);
    }
  });
}

export const email = () => {
const valueEmail = document.querySelector("#email-id").value;
const password = document.querySelector("#password-id").value;
  return signInWithEmail(valueEmail, password)
    .then((result) => {
      console.log(result);
    }).catch(error => {
    // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/user-not-found') {
      alert('El correo no ha sido registrado');
      } else if (errorCode == 'auth/invalid-email') {
      alert('El correo es inválido')
      } else if(errorCode == 'auth/wrong-password') {
      alert('La contraseña es equivocada.')
      } else {
      alert(errorMessage);
      }
    });
};

export const google = () => {
  return signInWithGoogle().then(result => {
    dataBaseUser(result.user);
    }).catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/cancelled-popup-request') {
        alert('Sólo se permite una solicitud emergente a la vez.');
      } else if (errorCode == 'auth/invalid-email') {
        alert('El correo es inválido')
      } else if(errorCode == 'auth/wrong-password') {
        alert('La contraseña es equivocada.')
      } else {
        alert(errorMessage);
      }     
    })
    // console.log(result);
    //       // let imgUser = document.createElement("img");
    //       // imgUser.src = `${result.user.photoURL}`;
    //       // document.body.appendChild(imgUser);
 ;
}

export const facebook = () => {
  return signInWithFacebook().then(result => {
    dataBaseUser(result.user);
  });
}

/*export const newVista = () => {
  changeHash('/welcomeUser');
}*/
