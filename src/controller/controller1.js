import { signIn, signUp, signInWithGoogle, signInWithFacebook } from "../services/firebase.js";
/* import { signUpWithGoogle } from "../services/firebase.js"  */
const signInOnSubmit = () => {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  return signIn(email, password);
};


const signUpOnSubmit = () => {
  const email2 = document.querySelector('#email2').value;
  const password2 = document.querySelector('#password2').value;
  return signUp(email2, password2);
};

const signInOnSubmitGoogle = () => {
  signInWithGoogle()
    .then(result => {
      console.log("exitosamente con google");
    })
    .catch(error => {
      console.log(error);
    });
}

const signInOnSubmitFacebook = () => {
  signInWithFacebook()
    .then((result) => {
      console.log(" exitosamente con facebook");
    })
    .catch((error) => {
      console.log(error);
    });
}

export { signInOnSubmit, signUpOnSubmit, signInOnSubmitGoogle, signInOnSubmitFacebook };