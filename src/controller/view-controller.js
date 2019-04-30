import { signInWithEmail, signInWithGoogle, signInWithFacebook } from "../lib/lib-firebase.js";
import { dataBaseUser } from '../model/model.js'
import { changeHash } from '../Utils/util.js'
export const email = (email, password) => {
  return signInWithEmail(email, password)
    .then(() => {
      console.log("todo ha ido bien");
    })
    .catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ...
    });
};

export const google = () => {
  return signInWithGoogle().then(result => {
    dataBaseUser(result.user);
    //       // let imgUser = document.createElement("img");
    //       // imgUser.src = `${result.user.photoURL}`;
    //       // document.body.appendChild(imgUser);
  });
}

export const facebook = () => {
  return signInWithFacebook().then(result => {
    dataBaseUser(result.user)
  })
}

export const newVista = () => {
  changeHash('/welcomeUser');
}
