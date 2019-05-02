import {signIn} from "../services/firebase.js";


export const signInOnSubmit = () => {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  signIn(email, password)
    .then(() => {
      console.log("todo ha ido bien");
    });
};

